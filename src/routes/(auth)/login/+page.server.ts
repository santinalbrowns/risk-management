import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as bcrypt from "bcrypt";
import { database } from '$lib';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ cookies, request }) => {
        // Retrieve form data from the request
        const data = await request.formData();

        // Extract email and password from the form data
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        // If email or password is missing, return an authentication failure response
        if (!email || !password) {
            return fail(401, { invalid: true });
        }

        // Fetch the user details using the provided email
        const user = await database.user.findUnique({
            where: { email: email }
        })

        // If no user is found with the provided email, return a credentials failure response
        if (!user) {
            return fail(400, { credentials: true })
        }

        // Compare the provided password with the hashed password stored for the user
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the passwords don't match, return a credentials failure response
        if (!isPasswordValid) {
            return fail(400, { credentials: true })
        }

        // Set a session cookie for the authenticated user with a one-month expiry
        cookies.set('session', user.id.toString(), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30, // set cookie to expire after a month
        });

        // Redirect the user to the homepage
        throw redirect(302, '/')
    }
}