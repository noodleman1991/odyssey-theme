export const textBlockSchema = {
	name: "textBlock",
	label: "Text Block",
	ui: {
		previewSrc: "/blocks/text.png",
	},
	fields: [
		{
			type: "string" as const,
			name: "heading",
			label: "Heading",
		},
		{
			type: "rich-text" as const,
			name: "content",
			label: "Content",
			isBody: true,
		},
		{
			type: "string" as const,
			name: "alignment",
			label: "Text Alignment",
			options: ["left", "center", "right", "justify"],
		},
		{
			type: "boolean" as const,
			name: "narrow",
			label: "Narrow Container",
		},
	],
};
