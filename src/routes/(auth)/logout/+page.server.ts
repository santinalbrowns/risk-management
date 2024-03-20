import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: ({ cookies }) => {
        // eat the cookie
        /* cookies.set('session', '', {
            path: '/',
            expires: new Date(0),
        }) */

        // redirect the user
        throw redirect(302, '/login')
    }
}