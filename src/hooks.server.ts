import { auth } from "$lib/server/auth/lucia";
import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.auth = auth.handleRequest(event);
    const user = await event.locals.auth.validate();
    
    if (!(event.url.pathname === "/login" || event.url.pathname.startsWith("/api/oauth")) && !user) {
        throw redirect(303, "/login");
    }

    if (user && event.url.pathname === "/login") {
        throw redirect(303, "/");
    }
    return await resolve(event);
};
