import { defineStaticConfig, TinaCMS, wrapFieldsWithMeta } from "tinacms";
import { consultingSchema } from "./collections/consulting";
import { globalSchema } from "./collections/global";
import { marketingSchema } from "./collections/marketing";
import { officeSchema } from "./collections/offices";
import { pagesSchema } from "./collections/pages";
import { technologiesSchema } from "./collections/technologies";
import { testimonialSchema } from "./collections/testimonials";

const config = defineStaticConfig({
	clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
	branch:
		process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
		process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
		process.env.HEAD!, // Netlify branch env
	token: process.env.TINA_TOKEN!,
	media: {
		// If you wanted cloudinary do this
		// loadCustomStore: async () => {
		//   const pack = await import("next-tinacms-cloudinary");
		//   return pack.TinaCloudCloudinaryMediaStore;
		// },
		// this is the config for the tina cloud media store
		tina: {
			publicFolder: "public",
			mediaRoot: "images",
		},
	},
	build: {
		publicFolder: "public", // The public asset folder for your framework
		outputFolder: "admin", // within the public folder
	},
	cmsCallback: (cms: TinaCMS) => {
		cms.flags.set("branch-switcher", true);
		return cms;
	},
	schema: {
		collections: [
			// @ts-ignore
			marketingSchema,
			// @ts-ignore
			globalSchema,
			// @ts-ignore
			pagesSchema,
			// @ts-ignore
			consultingSchema,
			// @ts-ignore
			testimonialSchema,
			// @ts-ignore
			technologiesSchema,
			// @ts-ignore
			officeSchema,
		],
	},
});

export default config;
