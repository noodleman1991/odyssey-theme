import { defineConfig } from "tinacms";
import { BlogCollection } from "../collections/blog";
import { PageCollection } from "./collections/page";
import { GlobalConfigCollection } from "./collections/global-config";
import { ComponentsCollection } from "./collections/components";

const branch =
	process.env.GITHUB_BRANCH ||
	process.env.VERCEL_GIT_COMMIT_REF ||
	process.env.HEAD ||
	"main";

export default defineConfig({
	branch,
	clientId: process.env.PUBLIC_TINA_CLIENT_ID,
	token: process.env.TINA_TOKEN,

	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},

	media: {
		tina: {
			mediaRoot: "uploads",
			publicFolder: "public",
		},
	},

	// Enhanced search configuration
	search: {
		tina: {
			indexerToken: process.env.TINA_SEARCH_TOKEN,
			stopwordLanguages: ['heb'], // Hebrew stopwords
		},
	},

	schema: {
		collections: [
			PageCollection,
			BlogCollection,
			ComponentsCollection,
			GlobalConfigCollection,
		],
	},

	// Visual editing configuration
	cmsCallback: (cms) => {
		// Custom field plugins
		cms.plugins.add({
			__type: 'field',
			name: 'rtl-text',
			Component: ({ input, meta, field }) => {
				return (
					<div dir="rtl" style={{ textAlign: 'right' }}>
				<textarea
					{...input}
				style={{
					direction: 'rtl',
						textAlign: 'right',
						fontFamily: 'Arial, sans-serif'
				}}
				/>
				</div>
			);
			},
		});
	},
});
