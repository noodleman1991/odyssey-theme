export const imageTextBlockSchema = {
	name: "imageText",
	label: "Image + Text",
	ui: {
		previewSrc: "/blocks/image-text.png",
	},
	fields: [
		{
			type: "string",
			name: "heading",
			label: "Heading",
		},
		{
			type: "rich-text",
			name: "content",
			label: "Content",
		},
		{
			type: "image",
			name: "image",
			label: "Image",
			required: true,
		},
		{
			type: "string",
			name: "imageAlt",
			label: "Image Alt Text",
			ui: {
				description: "Describe the image for accessibility",
			},
		},
		{
			type: "string",
			name: "layout",
			label: "Layout",
			options: [
				{ value: "image-left", label: "Image Left" },
				{ value: "image-right", label: "Image Right" },
				{ value: "image-top", label: "Image Top" },
				{ value: "image-bottom", label: "Image Bottom" },
			],
			ui: {
				defaultValue: "image-right", // Better for RTL
			},
		},
		{
			type: "boolean",
			name: "sticky",
			label: "Sticky Image",
			ui: {
				description: "Make image stick while scrolling through content",
			},
		},
	],
};
