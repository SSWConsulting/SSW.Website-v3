export type TechnologyCardProps = {
	name: string;
	readMoreSlug?: string | null;
	thumbnail?: string | null;
	body?: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
	className?: string;
};

export type TechnologyCardsProps = {
	techHeader: string;
	techSubheading?: string;
	techCards: {
		name: string;
		readMoreSlug?: string | null;
		thumbnail?: string | null;
		body?: any | null; // eslint-disable-line @typescript-eslint/no-explicit-any
	}[];
};
