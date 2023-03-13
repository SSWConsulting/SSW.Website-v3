import { ratingSchema } from "../../components/util/consulting/rating";

export const testimonialSchema = {
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
};
