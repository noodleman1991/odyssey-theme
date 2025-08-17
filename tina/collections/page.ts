import type { Collection } from "tinacms";
import { heroBlockSchema } from "../blocks/hero";
import { textBlockSchema } from "../blocks/text";
import { imageTextBlockSchema } from "../blocks/image-text";
import { ctaBlockSchema } from "../blocks/cta";
import { testimonialsBlockSchema } from "../blocks/testimonials";

export const PageCollection: Collection = {
	name: "page",
	label: "Pages",
	path: "src/content/pages",
	format: "mdx",

	ui: {
		router: ({ document }) => {
			if (document._sys.filename === "home") {
				return "/";
			}
			return `/${document._sys.filename}`;
		},
		beforeSubmit: async ({ form, cms, values }) => {
			// Custom validation for Hebrew content
			if (!values.title || values.title.trim() === '') {
				throw new Error('Title is required');
			}
		},
	},

	fields: [
		{
			type: "string",
			name: "title",
			label: "Page Title",
			isTitle: true,
			required: true,
			ui: {
				component: "text",
				validate: (value) => {
					if (!value) return "Title is required";
					if (value.length < 3) return "Title must be at least 3 characters";
				},
			},
		},
		{
			type: "string",
			name: "description",
			label: "SEO Description",
			ui: {
				component: "textarea",
				description: "Brief description for SEO and social sharing",
			},
		},
		{
			type: "string",
			name: "lang",
			label: "Language",
			options: [
				{ value: "he", label: "Hebrew" },
				{ value: "en", label: "English" },
				{ value: "ar", label: "Arabic" },
			],
			required: true,
			ui: {
				defaultValue: "he",
			},
		},
		{
			type: "image",
			name: "ogImage",
			label: "Social Media Image",
			ui: {
				description: "Image for social media sharing (1200x630px recommended)",
			},
		},
		{
			type: "object",
			list: true,
			name: "blocks",
			label: "Page Content",
			ui: {
				visualSelector: true,
				description: "Build your page using content blocks",
			},
			templates: [
				heroBlockSchema,
				textBlockSchema,
				imageTextBlockSchema,
				ctaBlockSchema,
				testimonialsBlockSchema,
			],
		},
	],
};
