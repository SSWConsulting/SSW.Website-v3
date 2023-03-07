import { Components } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";
import { ColumnLayout } from "./columnLayout";
import { TableLayout } from "./tableLayout";
import { AgreementForm } from "../consulting/agreementForm";

export const componentRenderer: Components<{
	ClientLogos: Record<string, never>;
	CustomImage: {
		src: string;
		alt: string;
		height: number;
		width: number;
	};
	VideoEmbed: {
		url: string;
	};
	UpcomingEvents: {
		title: string;
		numberOfEvents: number;
	};
	ColumnLayout: {
		src: string;
		message: string;
	};
	TableLayout: {
		mdxTable: string;
	};
	AgreementForm: Record<string, never>;
}> = {
	AgreementForm: () => <AgreementForm />,
	ClientLogos: () => <ClientLogos />,
	ColumnLayout: (props) => <ColumnLayout data={props} />,
	CustomImage: (props) => <CustomImage data={props} />,
	UpcomingEvents: (props) => <UpcomingEvents data={props} />,
	TableLayout: (props) => <TableLayout data={props} />,
	VideoEmbed: (props) => <VideoEmbed data={props} />,
};
