export const textBlockSchema = {
	name: "textBlock",
	label: "Rich Text",
	ui: {
		previewSrc: "/blocks/text.png",
	},
	fields: [
		{
			type: "string",
			name: "heading",
			label: "Section Heading",
		},
		{
			type: "rich-text",
			name: "content",
			label: "Content",
			isBody: true,
			templates: [
				{
					name: "Quote",
					label: "Quote",
					fields: [
						{
							name: "text",
							label: "Quote Text",
							type: "string",
							ui: {
								component: "textarea",
							},
						},
						{
							name: "author",
							label: "Author",
							type: "string",
						},
					],
				},
				{
					name: "Button",
					label: "Button",
					fields: [
						{
							name: "text",
							label: "Button Text",
							type: "string",
						},
						{
							name: "href",
							label: "Link",
							type: "string",
						},
						{
							name: "style",
							label: "Style",
							type: "string",
							options: ["primary", "secondary", "outline"],
						},
					],
				},
			],
		},
		{
			type: "string",
			name: "textAlign",
			label: "Text Alignment",
			options: ["left", "center", "right", "justify"],
			ui: {
				defaultValue: "right", // Default for Hebrew
			},
		},
		{
			type: "boolean",
			name: "narrow",
			label: "Narrow Container",
			ui: {
				description: "Use a narrower container for better readability",
			},
		},
	],
};
