import { auth, googleAuth } from '$lib/server/auth/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const storedState = cookies.get('oauth_state');
    if (storedState !== state || !code || !state) throw new Response(null, { status: 401 });
    try {
        const { existingUser, providerUser, createUser } = await googleAuth.validateCallback(code);
        const user =
            existingUser ??
            (await createUser({
                name: providerUser.name,
            }));
        const session = await auth.createSession(user.userId);
        locals.auth.setSession(session);
    } catch (e) {
        console.error(e);
        return new Response(null, {
            status: 500
        });
    }
    throw redirect(302, '/');
};