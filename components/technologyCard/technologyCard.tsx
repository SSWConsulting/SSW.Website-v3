import Link from "next/link";
import { VFC } from "react";
import { BASE_URL } from "../util/constants";
import { TechnologyCardProps } from "./technologyCardTypes";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import styles from "./technologyCard.module.css";
import classnames from "classnames";

const TechnologyCard: VFC<TechnologyCardProps> = ({
  name,
  readMoreSlug,
  thumbnail,
  body,
}) => {
  return (
    <div className="col-span-12 md:col-span-6">
      <article
        className={classnames([
          styles["technology-card"],
          "card mx-3.5 mt-5 mb-15 h-full p-10",
        ])}
        data-aos="flip-left"
      >
        {
          thumbnail &&
          <figure className="relative h-24">
            <Image
              src={thumbnail || "/images/ssw-logo.svg"}
              alt={thumbnail ? name : "SSW Consulting"}
              fill
              objectFit="contain"
            ></Image>
          </figure>
        }
        <TinaMarkdown content={body} />
        {readMoreSlug && <Link href={BASE_URL + readMoreSlug}>Read More</Link>}
      </article>
    </div>
  );
};

export default TechnologyCard;
