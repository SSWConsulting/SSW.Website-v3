import type { Template } from "tinacms";

import { aboutUsBlockSchema } from "./aboutUs";
import { contentBlockSchema } from "./content";
import { carouselBlockSchema } from "./carousel";
import { heroBlockSchema } from "./hero";
import { serviceCardsBlockSchema } from "./serviceCards";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { builtOnAzureBlockSchema } from "./builtOnAzure";
import { customImageBlockSchema } from "./customImage";
import { clientLogosBlockSchema } from "./clientLogos";
import { videoEmbedBlockSchema } from "./videoEmbed";
import { columnLayoutBlockSchema } from "./columnLayout";
import { tableBlockSchema } from "./tableLayout";
import { agreementFormBlockSchema } from "../consulting/agreementForm";

export const pageBlocks: Template[] = [
	aboutUsBlockSchema,
	agreementFormBlockSchema,
	builtOnAzureBlockSchema,
	carouselBlockSchema,
	clientLogosBlockSchema,
	columnLayoutBlockSchema,
	contentBlockSchema,
	customImageBlockSchema,
	heroBlockSchema,
	serviceCardsBlockSchema,
	tableBlockSchema,
	upcomingEventsBlockSchema,
	videoEmbedBlockSchema,
];

export * from "./aboutUs";
export * from "./content";
export * from "./carousel";
export * from "./hero";
export * from "./serviceCards";
export * from "./upcomingEvents";
export * from "./builtOnAzure";
export * from "./customImage";
export * from "./clientLogos";
export * from "./booking";
export * from "./videoEmbed";
export * from "./columnLayout";
export * from "../consulting/agreementForm";
