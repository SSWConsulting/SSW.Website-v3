/* eslint-disable tailwindcss/no-custom-classname */
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { TechnologyCardProps } from "./technologyCardTypes";

const TechnologyCard: FC<TechnologyCardProps> = ({
	name,
	readMoreSlug,
	thumbnail,
	body,
	className,
}) => {
	return (
		<div className={className}>
			<article
				className="mx-3.5 mb-15 mt-5 flex h-full flex-col border-b-2 border-solid border-sswRed bg-gray-75 py-11 px-16"
				data-aos="flip-left"
			>
				{thumbnail ? (
					<figure className="relative h-24">
						<Image
							src={thumbnail || "/images/ssw-logo.svg"}
							alt={thumbnail ? name : "SSW Consulting"}
							fill
							className="object-contain"
						></Image>
					</figure>
				) : (
					<h2>{name}</h2>
				)}
				<div className="tech-widget prose-ul-li:grid-6 prose max-w-full grow prose-p:text-justify prose-strong:text-sswRed prose-ul:grid prose-ul:grid-flow-col prose-ul:grid-rows-12 prose-ul:text-left">
					<TinaMarkdown content={body} />
				</div>
				{readMoreSlug && (
					<Link className="text-md" href={readMoreSlug}>
						Read More
					</Link>
				)}
			</article>
		</div>
	);
};

export default TechnologyCard;
