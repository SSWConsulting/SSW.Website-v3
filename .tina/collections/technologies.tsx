export const technologiesSchema = {
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
};
