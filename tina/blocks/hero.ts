export const heroBlockSchema = {
	name: "hero",
	label: "Hero Section",
	ui: {
		previewSrc: "/blocks/hero.png",
		defaultItem: {
			heading: "Welcome to Our Site",
			subheading: "Your journey starts here",
			layout: "centered",
		},
	},
	fields: [
		{
			type: "string" as const,
			name: "heading",
			label: "Heading",
		},
		{
			type: "string" as const,
			name: "subheading",
			label: "Subheading",
		},
		{
			type: "rich-text" as const,
			name: "text",
			label: "Text",
		},
		{
			type: "image" as const,
			name: "image",
			label: "Hero Image",
		},
		{
			type: "object" as const,
			name: "cta",
			label: "Call to Action",
			fields: [
				{
					type: "string" as const,
					name: "text",
					label: "Button Text",
				},
				{
					type: "string" as const,
					name: "href",
					label: "Link",
				},
			],
		},
		{
			type: "string" as const,
			name: "layout",
			label: "Layout",
			options: ["text-left", "text-right", "centered", "full-width"],
		},
	],
};
