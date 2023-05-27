import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

// svelteKit default action
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name') as string;
        
        try {
            const result = await prisma.item.create({
                data: {
                    name
                }
            })
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
}