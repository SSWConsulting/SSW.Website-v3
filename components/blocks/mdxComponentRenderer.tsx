import { Components } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";
import { ColumnLayout } from "./columnLayout";
import { TableLayout } from "./tableLayout";
import { SSWTable } from "./tables/sswTable";
import { Citation } from "./citation";

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
	SSWTable: {
		title: string;
		classNames: {
			head: string;
			body: string;
			title: string;
			container: string;
		};
		columns: Record<
			number,
			{
				label: string;
				key: string;
				className: string;
				align: string;
			}
		>;
		data: Record<
			number,
			{
				key: string;
				value: string;
				rowIndex: number;
				type: string;
				url: string;
			}
		>;
	};
	Citation: {
		article: string;
		author: string;
	};
}> = {
	VideoEmbed: (props) => <VideoEmbed data={props} />,
	ClientLogos: () => <ClientLogos />,
	CustomImage: (props) => <CustomImage data={props} />,
	UpcomingEvents: (props) => <UpcomingEvents data={props} />,
	ColumnLayout: (props) => <ColumnLayout data={props} />,
	TableLayout: (props) => <TableLayout data={props} />,
	SSWTable: (props) => <SSWTable {...props} />,
	Citation: (props) => <Citation {...props} />,
};
