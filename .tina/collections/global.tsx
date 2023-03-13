export const globalSchema = {
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
};
