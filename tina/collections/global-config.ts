import type { Collection } from "tinacms";
//import IconComponent from "../components/IconComponent"; todo: resolve

export const GlobalConfigCollection: Collection = {
	name: "config",
	label: "Site Configuration",
	path: "src/content/config",
	format: "json",
	ui: {
		global: true,
		router: () => "/admin/config",
	},
	fields: [
		{
			name: "seo",
			label: "SEO Settings",
			type: "object",
			fields: [
				{
					name: "title",
					label: "Default Site Title",
					type: "string",
					required: true,
					ui: {
						description: "Used as fallback for pages without titles",
					},
				},
				{
					name: "description",
					label: "Default Site Description",
					type: "string",
					required: true,
					ui: {
						component: "textarea",
						description: "Used as fallback for pages without descriptions",
					},
				},
				{
					name: "siteOwner",
					label: "Site Owner",
					type: "string",
					required: true,
				},
				{
					name: "siteUrl",
					label: "Site URL",
					type: "string",
					ui: {
						description: "Full URL of your site (e.g., https://example.com)",
					},
				},
				{
					name: "defaultOgImage",
					label: "Default Social Media Image",
					type: "image",
					ui: {
						description: "Default image for social media sharing",
					},
				},
			],
		},
		{
			name: "nav",
			label: "Navigation Menu",
			type: "object",
			list: true,
			ui: {
				itemProps: (item) => ({
					label: item.title || "Navigation Item",
				}),
				description: "Main site navigation items",
			},
			fields: [
				{
					name: "title",
					label: "Menu Title",
					type: "string",
					required: true,
				},
				{
					name: "link",
					label: "Link",
					type: "string",
					required: true,
					ui: {
						description: "Internal link (e.g., /about) or external URL",
					},
				},
				{
					name: "external",
					label: "External Link",
					type: "boolean",
					ui: {
						description: "Check if this links to an external site",
					},
				},
			],
		},
		{
			name: "contactLinks",
			label: "Social Media Links",
			type: "object",
			list: true,
			ui: {
				itemProps: (item) => ({
					label: item.title || "Social Link",
				}),
			},
			fields: [
				{
					name: "title",
					label: "Platform Name",
					type: "string",
					required: true,
				},
				{
					name: "link",
					label: "Profile URL",
					type: "string",
					required: true,
				},
				{
					name: "icon",
					label: "Icon",
					type: "string",
					required: true,
					ui: {
						//@ts-ignore
						//component: IconComponent, todo: what is this?
					},
				},
			],
		},
		{
			name: "theme",
			label: "Theme Settings",
			type: "object",
			fields: [
				{
					name: "primaryColor",
					label: "Primary Color",
					type: "string",
					ui: {
						component: "color",
						description: "Main brand color",
					},
				},
				{
					name: "secondaryColor",
					label: "Secondary Color",
					type: "string",
					ui: {
						component: "color",
					},
				},
				{
					name: "fontFamily",
					label: "Font Family",
					type: "string",
					options: [
						{ value: "system", label: "System Font" },
						{ value: "serif", label: "Serif" },
						{ value: "sans", label: "Sans Serif" },
						{ value: "mono", label: "Monospace" },
					],
				},
			],
		},
	],
};
