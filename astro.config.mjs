import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import lit from "@astrojs/lit";
import react from "@astrojs/react";

export default defineConfig({
	site: 'https://boerengroep.nl/',
	sitemap: true,

	i18n: {
		defaultLocale: 'nl',
		locales: ['nl', 'en', 'ar'],
		routing: {
			prefixDefaultLocale: false,
			redirectToDefaultLocale: true,
		},
		fallback: {
			en: 'nl',
			ar: 'en',
		},
	},

	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'nl',
				locales: {
					nl: 'nl-NL',
					en: 'en-US',
					ar: 'ar-SA',
				},
			},
		}),
		mdx(),
		lit(),
		icon(),
		react(),
	],

	vite: {
		define: {
			'process.env.TINA_PUBLIC_CLIENT_ID': JSON.stringify(process.env.TINA_PUBLIC_CLIENT_ID),
			'process.env.TINA_TOKEN': JSON.stringify(process.env.TINA_TOKEN),
		},
		ssr: {
			external: ['tinacms'],
		},
		server: {
			fs: {
				allow: ['..'],
			},
		},
	},
});
