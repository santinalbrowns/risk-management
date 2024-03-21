import { database } from '$lib';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
    const session = event.cookies.get('session');

    if (event.url.pathname.startsWith("/login") && session) {
        throw redirect(302, '/');
    }

    if (!event.url.pathname.startsWith('/login') || !event.url.pathname.startsWith('/signup')) {
        if (!session) {
            throw redirect(302, '/login');
        }

        // Fetch user details based on the session ID from the 'session' cookie
         const user = await database.user.findUnique({
             where: { id: Number.parseInt(session) },
             select: { id: true, email: true }
         });

        // If the user is not found, redirect to '/login'
        if (!user) {
            throw redirect(302, '/login');
        }

        // Set the authenticated user details in 'event.locals.user'
        event.locals.user = user;
    }

    // Resolve the incoming event and get the response
    const response = await resolve(event);
    return response;
}