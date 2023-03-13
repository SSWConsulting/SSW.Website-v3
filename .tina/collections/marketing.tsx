export const marketingSchema = {
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
};
