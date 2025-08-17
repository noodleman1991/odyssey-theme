export const ctaBlockSchema = {
	name: "cta",
	label: "Call to Action",
	ui: {
		previewSrc: "/blocks/cta.png",
	},
	fields: [
		{
			type: "string",
			name: "heading",
			label: "Heading",
			required: true,
		},
		{
			type: "rich-text",
			name: "content",
			label: "Content",
		},
		{
			type: "object",
			name: "primaryCTA",
			label: "Primary Button",
			fields: [
				{
					type: "string",
					name: "text",
					label: "Button Text",
					required: true,
				},
				{
					type: "string",
					name: "href",
					label: "Link",
					required: true,
				},
			],
		},
		{
			type: "object",
			name: "secondaryCTA",
			label: "Secondary Button",
			fields: [
				{
					type: "string",
					name: "text",
					label: "Button Text",
				},
				{
					type: "string",
					name: "href",
					label: "Link",
				},
			],
		},
	],
};
