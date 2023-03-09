import React from "react";
import { Template } from "tinacms";

export const Citation = ({ article, author }) => {
	return (
		<blockquote className="my-3 border-l-4 border-l-gray-400 bg-gray-125 p-7 pb-5 text-sm italic">
			{article}
			<span className="block px-5 pt-3 text-right text-xs uppercase">
				{author}
			</span>
		</blockquote>
	);
};

export const citationBlockSchema: Template = {
	name: "Citation",
	label: "Citation",
	fields: [
		{
			type: "string",
			label: "author",
			name: "author",
		},
		{
			type: "string",
			label: "article",
			name: "article",
			required: true,
		},
	],
};
