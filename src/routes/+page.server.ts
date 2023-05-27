import type { PageServerLoad } from './$types';
import { type Actions, fail } from "@sveltejs/kit";
import { auth } from "$lib/server/auth/lucia";

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ locals }) => {
        const { session } = await locals.auth.validateUser();
        if (!session) return fail(401);
        await auth.invalidateSession(session.sessionId); // invalidate session
        locals.auth.setSession(null); // remove cookie
    }
};