import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  FaPhoneAlt as FaPhone,
  FaYoutube,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaTiktok,
} from "react-icons/fa";
import classNames from "classnames";

import layoutData from "../../content/global/index.json";

export enum SocialTypes {
  phone = "phone",
  youtube = "youtube",
  linkedin = "linkedin",
  facebook = "facebook",
  instagram = "instagram",
  twitter = "twitter",
  tiktok = "tiktok",
  github = "github",
}

const socialStyles = new Map<
  SocialTypes,
  { icon: IconType; bgClassName: string }
>([
  [
    SocialTypes.phone,
    {
      icon: FaPhone,
      bgClassName: "bg-social-phone",
    },
  ],
  [
    SocialTypes.youtube,
    {
      icon: FaYoutube,
      bgClassName: "bg-social-youtube",
    },
  ],
  [
    SocialTypes.linkedin,
    {
      icon: FaLinkedinIn,
      bgClassName: "bg-social-linkedin",
    },
  ],
  [
    SocialTypes.facebook,
    {
      icon: FaFacebookF,
      bgClassName: "bg-social-facebook",
    },
  ],
  [
    SocialTypes.instagram,
    {
      icon: FaInstagram,
      bgClassName: "bg-gradient-tr-social-instagram",
    },
  ],
  [
    SocialTypes.twitter,
    {
      icon: FaTwitter,
      bgClassName: "bg-social-twitter",
    },
  ],
  [
    SocialTypes.tiktok,
    {
      icon: FaTiktok,
      bgClassName: "bg-social-tiktok",
    },
  ],
  [
    SocialTypes.github,
    {
      icon: FaGithub,
      bgClassName: "bg-social-github",
    },
  ],
]);

export interface SocialIconsParams {
  className?: string;
  excludeDesktop?: SocialTypes[];
  excludeMobile?: SocialTypes[];
}

export const SocialIcons = (data?: SocialIconsParams) => {
  return (
    <div
      className={classNames(
        "flex flex-grow gap-2 sm:flex-grow-0",
        data?.className
      )}
    >
      {layoutData.socials.filter(s => s.showOnHeader).map((social) => {
        const hideOnDesktop =
          data.excludeDesktop?.length &&
          data.excludeDesktop.includes(SocialTypes[social.type]);
        const hideOnMobile =
          data.excludeMobile?.length &&
          data.excludeMobile.includes(SocialTypes[social.type]);

        if (hideOnDesktop && hideOnMobile) {
          return null;
        }

        const styling = socialStyles.get(SocialTypes[social.type]);
        const growOnMobile =
          !hideOnMobile &&
          Object.values(SocialTypes).length - data.excludeMobile?.length === 1;

        return (
          <Link
            key={social.type}
            href={social.url}
            className={classNames(
              "unstyled flex h-11 cursor-pointer items-center justify-center text-base hover:bg-gray-900 hover:bg-none",
              styling.bgClassName,
              social.linkText ? "w-fit shrink-0" : "w-11",
              { "px-6": social.linkText },
              { "flex sm:hidden": hideOnDesktop },
              { "hidden sm:flex": hideOnMobile },
              { "flex-grow sm:flex-grow-0": growOnMobile }
            )}
            title={social.title}
            target="_blank"
            rel="noreferrer nofollow"
          >
            <styling.icon
              className={classNames({ "text-3xl": !social.linkText })}
              color="white"
            />
            {social.linkText && (
              <span className="ml-2 inline text-base font-bold text-white">
                {social.linkText}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
};
