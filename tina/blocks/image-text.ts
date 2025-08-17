export const imageTextBlockSchema = {
	name: "textImage",
	label: "Text & Image",
	ui: {
		previewSrc: "/blocks/image-text.png",
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
			label: "Text Content",
		},
		{
			type: "image" as const,
			name: "image",
			label: "Image",
		},
		{
			type: "string" as const,
			name: "imageAlt",
			label: "Image Alt Text",
		},
		{
			type: "string" as const,
			name: "layout",
			label: "Layout",
			options: ["image-left", "image-right"],
		},
		{
			type: "boolean" as const,
			name: "sticky",
			label: "Sticky Image on Scroll",
		},
	],
};
