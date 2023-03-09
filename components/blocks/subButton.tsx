import React from "react";
import Image from "next/image";
import { Template } from "tinacms";

export const SubButton = ({ subButtonText = undefined }) => {
	const handleSubscribe = () => {
		console.log("subscribe");
	};

	return (
		<button
			className="box-border flex w-auto cursor-pointer items-center justify-center gap-1 bg-sswRed py-2 pl-4 pr-2 font-sans uppercase text-white hover:text-gray-100 hover:opacity-95"
			onClick={handleSubscribe}
		>
			{subButtonText ?? "join"}
			<Image
				className="inline-block align-middle leading-8"
				src={"/images/circle-tick.png"}
				alt="circle-tick"
				height={24}
				width={24}
			/>
		</button>
	);
};

export const subButtonSchema: Template = {
	label: "Subscribe button",
	name: "subButton",
	ui: {
		itemProps: (item) => {
			return { label: item?.header };
		},
	},
	fields: [
		{
			type: "string",
			label: "subscribe button text",
			name: "subButtonText",
		},
	],
};
