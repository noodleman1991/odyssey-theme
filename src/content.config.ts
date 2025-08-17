import { defineCollection, z } from "astro:content";
import client from "../tina/__generated__/client";

// Helper type guard for GraphQL nodes
function notNull<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined;
}

// Blog collection
const blog = defineCollection({
	loader: async () => {
		const postsResponse = await client.queries.blogConnection();
		const edges = postsResponse.data.blogConnection.edges ?? [];

		return edges
			.map((edge) => edge?.node)
			.filter(notNull)
			.map((node) => {
				return {
					...node,
					id: node._sys.relativePath.replace(/\.mdx?$/, ""),
					tinaInfo: node._sys,
					// Map Tina field names to Astro expected names
					pubDate: node.publishDate, // Let Zod coerce this to Date
					heroImage: node.featuredImage, // Let Zod handle nullish values
				};
			});
	},
	schema: z.object({
		tinaInfo: z.object({
			filename: z.string(),
			basename: z.string(),
			path: z.string(),
			relativePath: z.string(),
		}),
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(), // Will be undefined if not in Tina schema
		heroImage: z.string().nullish(),
		body: z.any(),
	}),
});

// Page collection
const page = defineCollection({
	loader: async () => {
		const pagesResponse = await client.queries.pageConnection();
		const edges = pagesResponse.data.pageConnection.edges ?? [];

		return edges
			.map((edge) => edge?.node)
			.filter(notNull)
			.map((node) => ({
				...node,
				id: node._sys.relativePath.replace(/\.mdx?$/, ""),
				tinaInfo: node._sys,
			}));
	},
	schema: z.object({
		tinaInfo: z.object({
			filename: z.string(),
			basename: z.string(),
			path: z.string(),
			relativePath: z.string(),
		}),
		title: z.string(),
		description: z.string().optional(),
		lang: z.enum(["he", "en", "ar"]).default("he"),
		ogImage: z.string().nullish(),
		blocks: z.array(z.any()).optional(),
	}),
});

export const collections = { blog, page };
