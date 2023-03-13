import { FC } from "react";
import TechnologyCard from "./technologyCard";
import { TechnologyCardsProps } from "./technologyCardTypes";

const TechnologyCards: FC<TechnologyCardsProps> = ({
	techHeader,
	techSubheading,
	techCards,
}) => {
	return (
		<article className="bg-white text-black">
			<h1 className="mt-0">{techHeader}</h1>
			{techSubheading ? <h4>{techSubheading}</h4> : <></>}
			<div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
				{techCards.map((card) => (
					<TechnologyCard
						key={card.name}
						className={
							techCards.length % 2 == 0 ? "" : "last-of-type:col-span-full"
						}
						{...card}
					/>
				))}
			</div>
		</article>
	);
};

export default TechnologyCards;
