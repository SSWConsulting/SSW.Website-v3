import { defineStaticConfig, TinaCMS, wrapFieldsWithMeta } from "tinacms";
import * as Schemas from "../components/blocks";
import { ratingSchema } from "../components/util/consulting/rating";
import { seoSchema } from "../components/util/seo";

import { sswCountries } from "../components/util/constants/country";

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
			{
				label: "Marketing",
				name: "marketing",
				path: "content/marketing",
				format: "mdx",
				ui: {
					router: ({ document }) => {
						return `/marketing/${document._sys.filename}`;
					},
				},
				fields: [
					{
						type: "string",
						label: "Title",
						name: "title",
						required: true,
					},
					{
						type: "image",
						label: "Background image",
						name: "backgroundImage",
						required: true,
					},
					{
						type: "string",
						label: "Marketing video URL",
						name: "videoUrl",
						required: true,
					},
					{
						type: "rich-text",
						label: "Body",
						name: "body",
						isBody: true,
					},
				],
			},
			{
				label: "Global",
				name: "global",
				path: "content/global",
				format: "json",
				ui: {
					global: true,
				},
				fields: [
					{
						type: "object",
						label: "Header",
						name: "header",
						fields: [
							{
								type: "string",
								label: "Name",
								name: "name",
							},
							{
								type: "string",
								label: "Title",
								name: "title",
							},
							{
								type: "string",
								label: "Description",
								name: "description",
							},
							{
								type: "string",
								label: "URL",
								name: "url",
							},
							{
								type: "string",
								label: "Site Name",
								name: "site_name",
							},
							{
								type: "string",
								label: "Alternate Site Name",
								name: "alternate_site_name",
							},
						],
					},
					{
						type: "string",
						label: "Youtube channel link",
						name: "youtubeChannelLink",
					},
					{
						type: "string",
						label: "Breadcrumb Suffix",
						name: "breadcrumbSuffix",
					},
					{
						type: "string",
						label: "Booking Button Text",
						name: "bookingButtonText",
					},
					{
						type: "string",
						label: "Booking Phone No.",
						name: "bookingPhone",
					},
					{
						type: "object",
						label: "Offices",
						name: "offices",
						list: true,
						ui: {
							itemProps: (item) => {
								return { label: item?.addressLocality };
							},
						},
						fields: [
							{
								type: "string",
								name: "url",
								label: "Url",
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
								name: "streetAddress",
								label: "Street Address",
								required: true,
							},
							{
								type: "string",
								name: "suburb",
								label: "Suburb",
							},
							{
								type: "string",
								name: "addressLocality",
								label: "Address Locality",
								required: true,
							},
							{
								type: "string",
								name: "addressRegion",
								label: "Address Region",
								required: true,
							},
							{
								type: "string",
								name: "addressCountry",
								label: "Address Country",
								required: true,
							},
							{
								type: "number",
								name: "postalCode",
								label: "Post Code",
								required: true,
							},
							{
								type: "string",
								name: "phone",
								label: "Phone",
								required: true,
							},
							{
								type: "string",
								name: "hours",
								label: "Hours",
								required: true,
							},
							{
								type: "string",
								name: "days",
								label: "Days",
								required: true,
							},
						],
					},
					{
						type: "object",
						label: "Socials",
						name: "socials",
						list: true,
						ui: {
							itemProps: (item) => {
								return { label: item?.type };
							},
						},
						fields: [
							{
								type: "string",
								label: "Type",
								name: "type",
								options: [
									{ label: "Phone", value: "phone" },
									{ label: "Facebook", value: "facebook" },
									{ label: "Twitter", value: "twitter" },
									{ label: "Instagram", value: "instagram" },
									{ label: "LinkedIn", value: "linkedin" },
									{ label: "Github", value: "github" },
									{ label: "YouTube", value: "youtube" },
									{ label: "TikTok", value: "tiktok" },
								],
							},
							{
								type: "string",
								label: "Title",
								name: "title",
							},
							{
								type: "string",
								label: "URL",
								name: "url",
							},
							{
								type: "string",
								label: "Username",
								name: "username",
							},
							{
								type: "string",
								label: "Text",
								name: "linkText",
							},
						],
					},
				],
			},
			{
				label: "Pages",
				name: "page",
				format: "mdx",
				path: "content/pages",
				ui: {
					router: ({ document }) => {
						if (document._sys.filename === "home") {
							return `/`;
						}
						return undefined;
					},
				},
				fields: [
					{
						type: "string",
						label: "Title",
						name: "title",
						isTitle: true,
						required: true,
					},
					// @ts-ignore
					seoSchema,
					{
						type: "object",
						list: true,
						name: "beforeBody",
						label: "Before body",
						ui: {
							visualSelector: true,
						},
						templates: [...Schemas.pageBlocks],
					},
					{
						type: "rich-text",
						label: "Body",
						name: "_body",
						templates: [...Schemas.pageBlocks],
						isBody: true,
					},
					{
						type: "object",
						list: true,
						name: "sideBar",
						label: "Side Bar",
						ui: {
							visualSelector: true,
						},
						templates: [...Schemas.pageBlocks],
					},
					{
						type: "object",
						list: true,
						name: "afterBody",
						label: "After body",
						ui: {
							visualSelector: true,
						},
						templates: [...Schemas.pageBlocks],
					},
				],
			},
			{
				label: "Consulting Pages",
				name: "consulting",
				format: "mdx",
				path: "content/consulting",
				ui: {
					router: ({ document }) => {
						return `/consulting/${document._sys.filename}`;
					},
				},
				fields: [
					// @ts-ignore
					seoSchema,
					{
						type: "object",
						label: "Booking",
						name: "booking",
						fields: [
							{
								type: "string",
								label: "Title",
								name: "title",
							},
							{
								type: "string",
								label: "Subtitle",
								name: "subTitle",
							},
							{
								type: "string",
								label: "Button Text",
								name: "buttonText",
							},
							{
								type: "image",
								label: "Video Background",
								name: "videoBackground",
							},
						],
					},
					{
						type: "object",
						label: "Solution",
						name: "solution",
						fields: [
							{
								type: "string",
								label: "Project",
								name: "project",
							},
						],
					},
					{
						type: "string",
						label: "Call to Action",
						description:
							'Technology title inserted via {{TITLE}}. E.g. "Talk to us about your {{TITLE}} project"',
						name: "callToAction",
						required: false,
					},
					{
						type: "rich-text",
						label: "Body",
						name: "_body",
						templates: [...Schemas.pageBlocks],
						isBody: true,
					},
					{
						type: "object",
						label: "Benefits",
						name: "benefits",
						fields: [
							{
								type: "object",
								list: true,
								label: "benefit list",
								name: "benefitList",
								ui: {
									itemProps: (item) => {
										return { label: item?.title };
									},
								},
								fields: [
									{
										type: "image",
										label: "Image URL",
										name: "image",
									},
									{
										type: "string",
										label: "Title",
										name: "title",
									},
									{
										type: "rich-text",
										label: "Description",
										name: "description",
									},
									{
										type: "string",
										required: false,
										label: "linkName",
										name: "linkName",
									},
									{
										type: "string",
										required: false,
										label: "linkURL",
										name: "linkURL",
									},
								],
							},
							{
								type: "object",
								label: "Rule",
								name: "rule",
								list: true,
								ui: {
									itemProps: (item) => {
										return { label: item?.name };
									},
								},
								fields: [
									{
										type: "string",
										label: "Name",
										name: "name",
									},
									{
										type: "string",
										label: "URL",
										name: "url",
									},
								],
							},
						],
					},
					{
						type: "object",
						label: "Technologies",
						name: "technologies",
						fields: [
							{
								type: "string",
								label: "Header",
								name: "header",
							},
							{
								type: "object",
								label: "Technology Cards",
								name: "technologyCards",
								ui: {
									itemProps: (item) => ({
										label: item?.technologyCard,
									}),
								},
								list: true,
								fields: [
									{
										type: "reference",
										label: "Technology Card",
										name: "technologyCard",
										collections: ["technologies"],
									},
								],
							},
						],
					},
					{
						type: "object",
						label: "Media cards",
						name: "medias",
						fields: [
							{
								type: "string",
								label: "Header",
								name: "header",
							},
							{
								type: "object",
								label: "Media Cards",
								name: "mediaCards",
								list: true,
								fields: [
									{
										type: "string",
										label: "Type",
										name: "type",
										options: [
											{
												value: "video",
												label: "Video",
											},
											{
												value: "blog",
												label: "Blog",
											},
										],
									},
									{
										type: "rich-text",
										label: "Content",
										name: "content",
									},
								],
							},
						],
					},
				],
			},
			{
				label: "Testimonials",
				name: "testimonials",
				format: "mdx",
				path: "content/testimonials",
				ui: {
					router: ({ document }) => {
						return `/testimonials/${document._sys.filename}`;
					},
				},
				fields: [
					{
						type: "string",
						label: "Name",
						name: "name",
						required: true,
					},
					{
						type: "image",
						label: "Avatar",
						name: "avatar",
						required: true,
					},
					{
						type: "string",
						label: "Company",
						name: "company",
						required: true,
					},
					{
						...ratingSchema,
						required: true,
					},
					{
						type: "rich-text",
						label: "Body",
						name: "body",
						isBody: true,
					},
				],
			},
			{
				label: "Technology Cards",
				name: "technologies",
				format: "mdx",
				path: "content/technologies",
				ui: {
					router: ({ document }) => {
						return `/technologies/${document._sys.filename}`;
					},
				},
				fields: [
					{
						type: "string",
						label: "Name",
						name: "name",
						isTitle: true,
						required: true,
					},
					{
						type: "string",
						label: "Read More Slug",
						name: "readMoreSlug",
					},
					{
						type: "image",
						label: "Thumbnail",
						name: "thumbnail",
					},
					{
						type: "rich-text",
						label: "Body",
						name: "body",
						isBody: true,
					},
				],
			},
			{
				label: "Office Pages",
				name: "offices",
				format: "mdx",
				path: "content/offices",
				ui: {
					router: ({ document }) => {
						return `/offices/${document._sys.filename}`;
					},
				},
				fields: [
					// @ts-ignore
					seoSchema,
					{
						type: "image",
						label: "Cover Image",
						name: "coverImg",
					},
					{
						type: "image",
						label: "Thumbnail",
						name: "thumbnail",
					},
					{
						type: "image",
						label: "Sidebar Image",
						name: "sideImg",
					},
					{
						type: "string",
						name: "url",
						label: "Url",
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
						name: "streetAddress",
						label: "Street Address",
						required: true,
					},
					{
						type: "string",
						name: "suburb",
						label: "Suburb",
						required: true,
					},
					{
						type: "string",
						name: "addressLocality",
						label: "Address Locality",
						required: true,
					},
					{
						type: "string",
						name: "addressRegion",
						label: "Address Region",
						required: true,
					},
					{
						type: "string",
						name: "addressCountry",
						label: "Address Country",
						options: sswCountries.map((country) => country.label),
						required: true,
					},
					{
						type: "number",
						name: "postalCode",
						label: "Post Code",
						required: true,
					},
					{
						type: "string",
						name: "phone",
						label: "Phone",
						required: true,
					},
					{
						type: "string",
						name: "hours",
						label: "Hours",
					},
					{
						type: "string",
						name: "days",
						label: "Days",
					},
					{
						type: "object",
						name: "sidebarSecondaryPlace",
						label: "Sidebar secondary place URL",
						fields: [
							{
								type: "string",
								name: "name",
								label: "Name",
							},
							{
								type: "string",
								name: "url",
								label: "URL",
							},
						],
					},
					{
						type: "rich-text",
						label: "About Us",
						name: "aboutUs",
						templates: [...Schemas.pageBlocks],
					},
					{
						type: "image",
						label: "Map Image",
						name: "map",
						templates: [...Schemas.pageBlocks],
					},
					{
						type: "rich-text",
						label: "Directions",
						name: "directions",
						templates: [...Schemas.pageBlocks],
					},
					{
						type: "rich-text",
						label: "Parking",
						name: "parking",
						templates: [...Schemas.pageBlocks],
					},
					{
						type: "rich-text",
						label: "Public Transport",
						name: "publicTransport",
						templates: [...Schemas.pageBlocks],
					},
					{
						type: "rich-text",
						label: "Team",
						name: "team",
						templates: [...Schemas.pageBlocks],
					},
					{
						type: "rich-text",
						label: "Photos",
						name: "photos",
						templates: [...Schemas.pageBlocks],
					},
					{
						type: "rich-text",
						label: "Body",
						name: "_body",
						templates: [...Schemas.pageBlocks],
						isBody: true,
					},
				],
			},
		],
	},
});

export default config;
