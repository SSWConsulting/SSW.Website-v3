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
          "mx-3.5 mt-5 mb-15 min-h-1025 border-b-2 border-solid border-b-sswRed bg-gray-75 p-10",
        ])}
        data-aos="flip-left"
        data-aos-once="false"
      >
        <figure>
          <Image
            src={thumbnail || "/images/ssw-logo.svg"}
            alt={thumbnail ? name : "SSW Consulting"}
            width={295}
            height={100}
          ></Image>
        </figure>
        <TinaMarkdown content={body} />
        {readMoreSlug && <Link href={BASE_URL + readMoreSlug}>Read More</Link>}
      </article>
    </div>
  );
};

export default TechnologyCard;
