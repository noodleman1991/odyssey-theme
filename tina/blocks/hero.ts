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
			type: "string",
			name: "heading",
			label: "Main Heading",
			required: true,
			ui: {
				component: "text",
				description: "Large heading text",
			},
		},
		{
			type: "string",
			name: "subheading",
			label: "Subheading",
			ui: {
				component: "text",
			},
		},
		{
			type: "rich-text",
			name: "content",
			label: "Content",
			ui: {
				description: "Additional content below the heading",
			},
		},
		{
			type: "image",
			name: "backgroundImage",
			label: "Background Image",
		},
		{
			type: "object",
			name: "cta",
			label: "Call to Action",
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
					ui: {
						description: "Internal link (e.g., /about) or external URL",
					},
				},
				{
					type: "string",
					name: "style",
					label: "Button Style",
					options: ["primary", "secondary", "outline"],
					ui: {
						defaultValue: "primary",
					},
				},
			],
		},
		{
			type: "string",
			name: "layout",
			label: "Layout Style",
			options: [
				{ value: "centered", label: "Centered" },
				{ value: "left", label: "Left Aligned" },
				{ value: "right", label: "Right Aligned" },
				{ value: "split", label: "Split Layout" },
			],
			ui: {
				defaultValue: "centered",
			},
		},
	],
};
