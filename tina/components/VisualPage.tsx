import { defineCollection, z } from "astro:content";
import client from "../../tina/__generated__/client";

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
		excerpt: z.string().optional(),
		tags: z.array(z.string()).optional(),
		authors: z.array(z.string()).optional(),
		lang: z.string(),
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
		lang: z.string(),
		blocks: z.array(z.any()).optional(),
	}),
});

// Activities collection (from your Tina schema)
const activities = defineCollection({
	loader: async () => {
		const activitiesResponse = await client.queries.activitiesConnection();
		const edges = activitiesResponse.data.activitiesConnection.edges ?? [];

		return edges
			.map((edge) => edge?.node)
			.filter(notNull)
			.map((node) => ({
				...node,
				id: node._sys.relativePath.replace(/\.mdx?$/, ""),
				tinaInfo: node._sys,
				activityDate: node.date, // Map to more Astro-friendly name
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
		type: z.string().optional(),
		date: z.coerce.date(),
		activityDate: z.coerce.date(), // Mapped field
		location: z.string().optional(),
		description: z.string().optional(),
		image: z.string().optional(),
		upcoming: z.boolean().optional(),
		lang: z.string(),
		body: z.any(),
	}),
});

export const collections = { blog, page, activities };

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import type { PageQuery, PageQueryVariables } from '../__generated__/types';
import { HeroBlock } from './blocks/HeroBlock';
import { TextBlock } from './blocks/TextBlock';
import { ImageTextBlock } from './blocks/ImageTextBlock';

// Type for TinaCMS query result
interface VisualPageProps {
	data: PageQuery;
	variables: PageQueryVariables;
	query: string;
}

// Grab the union type of blocks directly from props
type PageBlock = NonNullable<VisualPageProps['data']['page']['blocks']>[number];

// Type guards
function isHeroBlock(block: PageBlock): block is Extract<PageBlock, { __typename: 'PageBlocksHero' }> {
	return block?.__typename === 'PageBlocksHero';
}

function isTextBlock(block: PageBlock): block is Extract<PageBlock, { __typename: 'PageBlocksTextBlock' }> {
	return block?.__typename === 'PageBlocksTextBlock';
}

function isImageTextBlock(block: PageBlock): block is Extract<PageBlock, { __typename: 'PageBlocksTextImage' }> {
	return block?.__typename === 'PageBlocksTextImage';
}


const VisualPage: React.FC<VisualPageProps> = (props) => {
	// TinaCMS hook for visual editing
	const { data } = useTina(props);
	const page = data.page;

	// Determine if language is RTL
	const isRTL = page.lang === 'he' || page.lang === 'ar';

	// Handle missing or invalid page data
	if (!page) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-gray-500">Page not found</p>
			</div>
		);
	}

	return (
		<div
			className={`visual-page ${isRTL ? 'rtl' : 'ltr'}`}
			dir={isRTL ? 'rtl' : 'ltr'}
			data-tina-field="page"
		>
			{/* Page metadata for SEO (handled by Astro layout) */}

			{/* Render page blocks */}
			{page.blocks?.map((block, index) => {
				if (!block) return null;

				const blockKey = `block-${index}`;
				const tinaField = `page.blocks.${index}`;

				try {
					// Hero Block
					if (isHeroBlock(block)) {
						return (
							<HeroBlock
								key={blockKey}
								data={block}
								tinaField={tinaField}
								isRTL={isRTL}
							/>
						);
					}

					// Text Block
					if (isTextBlock(block)) {
						return (
							<TextBlock
								key={blockKey}
								data={{
									...block,
									heading: block.heading ?? undefined,
									content: block.content ?? undefined,
									narrow: block.narrow ?? undefined,
									//alignment: block.alignment ?? undefined,
								}}
								tinaField={tinaField}
								isRTL={isRTL}
							/>
						);
					}

					// Image + Text Block
					if (isImageTextBlock(block)) {
						return (
							<ImageTextBlock
								key={blockKey}
								data={block}
								tinaField={tinaField}
								isRTL={isRTL}
							/>
						);
					}

					// Fallback for unknown block types
					console.warn(`Unknown block type`);
					return (
						<div
							key={blockKey}
							className="p-4 bg-yellow-100 border border-yellow-300 rounded-md m-4"
							data-tina-field={tinaField}
						>
							<p className="text-yellow-800">
								Unknown block type
							</p>
							<pre className="text-xs mt-2 text-yellow-700">
                {JSON.stringify(block, null, 2)}
              </pre>
						</div>
					);

				} catch (error) {
					console.error(`Error rendering block ${index}:`, error);
					return (
						<div
							key={blockKey}
							className="p-4 bg-red-100 border border-red-300 rounded-md m-4"
						>
							<p className="text-red-800">
								Error rendering block {index}: {error instanceof Error ? error.message : 'Unknown error'}
							</p>
						</div>
					);
				}
			})}

			{/* Empty state when no blocks */}
			{(!page.blocks || page.blocks.length === 0) && (
				<div
					className="min-h-screen flex items-center justify-center bg-gray-50"
					data-tina-field="page.blocks"
				>
					<div className="text-center p-8">
						<h2 className="text-2xl font-semibold text-gray-700 mb-4">
							{isRTL ? 'עמוד ריק' : 'Empty Page'}
						</h2>
						<p className="text-gray-500">
							{isRTL
								? 'הוסף בלוקים כדי להתחיל לבנות את העמוד'
								: 'Add blocks to start building your page'
							}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default VisualPage;
