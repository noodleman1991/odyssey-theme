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
					// Normalize field names for Astro schema
					pubDate: node.publishDate ? new Date(node.publishDate) : new Date(),
					updatedDate: node.updatedDate
						? new Date(node.updatedDate)
						: undefined,
					heroImage: node.featuredImage ?? undefined, // normalize field naming
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
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		heroImage: z.string().optional(),
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
		ogImage: z.string().optional(),
		blocks: z.array(z.any()).optional(),
	}),
});

export const collections = { blog, page };
