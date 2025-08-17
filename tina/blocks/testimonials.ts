
interface TestimonialItem {
	quote: string;
	name: string;
	title?: string;
	avatar?: string; // todo: whatever type image field uses
}

export const testimonialsBlockSchema = {
	name: "testimonials",
	label: "Testimonials",
	ui: {
		previewSrc: "/blocks/testimonials.png",
	},
	fields: [
		{
			type: "string",
			name: "heading",
			label: "Section Heading",
		},
		{
			type: "object",
			list: true,
			name: "testimonials",
			label: "Testimonials",
			ui: {
				itemProps: (item: TestimonialItem) => {
					return { label: item?.name || "Testimonial" };
				},
			},
			fields: [
				{
					type: "string",
					name: "quote",
					label: "Quote",
					ui: {
						component: "textarea",
					},
					required: true,
				},
				{
					type: "string",
					name: "name",
					label: "Name",
					required: true,
				},
				{
					type: "string",
					name: "title",
					label: "Title/Position",
				},
				{
					type: "image",
					name: "avatar",
					label: "Avatar Image",
				},
			],
		},
		{
			type: "string",
			name: "layout",
			label: "Layout",
			options: [
				{ value: "grid", label: "Grid" },
				{ value: "carousel", label: "Carousel" },
				{ value: "single", label: "Single Featured" },
			],
			ui: {
				defaultValue: "grid",
			},
		},
	],
};
