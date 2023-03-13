import React from "react";
import type { Template } from "tinacms";
import { VideoModal } from "../videoModal";

export const VideoEmbed = ({ data }) => {
  return (
    <div className="relative m-8 mx-auto aspect-video w-3/4">
      <VideoModal
        url={data.url}
      />
    </div>
  );
};

export const videoEmbedBlockSchema: Template = {
	name: "VideoEmbed",
	label: "Video Embed",
	ui: {
		previewSrc: "/blocks/videoEmbedContent.png",
	},
	fields: [
		{
			type: "string",
			label: "Video URL",
			name: "url",
			required: true,
		},
	],
};
