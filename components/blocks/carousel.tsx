import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import type { Template } from "tinacms";

import { Carousel as CarouselImplementation } from "react-responsive-carousel";

import { Container } from "../util/container";
import { Section } from "../util/section";

export const Carousel = ({ data }) => {
  const router = useRouter();

  const openItem = ({ link, openIn }) => {
    if (openIn === "newWindow") {
      window.open(link, "_blank");
      return;
    } else if (openIn === "sameWindow") {
      router.push(link);
      return;
    } else if (openIn === "modal") {
      window.open(link, "_blank");
      return;
    } else {
      console.log(`unknown openIn value '${openIn}'`);
    }
  };

  return (
    <Section className="hidden md:flex" color={data.backgroundColor}>
      <Container size="custom" className="w-full">
        <CarouselImplementation
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          stopOnHover={true}
          onClickItem={(x) => {
            if (data.items[x].link) {
              openItem(data.items[x]);
            }
          }}
          renderIndicator={createCarouselIndicator}
        >
          {data.items.map(createCarouselItemImage)}
        </CarouselImplementation>
      </Container>
    </Section>
  );
};

const createCarouselItemImage = ({ imgSrc, label }, index: React.Key) => {
  return (
    <div key={index}>
      <Image
        src={imgSrc}
        alt={label}
        height={388}
        width={1080}
        sizes="100vw"
      />
      {/* `legend` required so that the carousel works properly */}
      <p className="legend sr-only">{label}</p>
    </div>
  );
};

const createCarouselIndicator = (onClickHandler, isSelected, index, label) => {
  if (isSelected) {
    return (
      <li
        className="my-0 mx-1 inline-block h-7 w-7 bg-sswRed"
        aria-label={`Selected: ${label} ${index + 1}`}
        title={`Selected: ${label} ${index + 1}`}
      />
    );
  }
  return (
    <li
      className="my-0 mx-1 inline-block h-7 w-7 bg-gray-500"
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      value={index}
      key={index}
      role="button"
      tabIndex={0}
      title={`${label} ${index + 1}`}
      aria-label={`${label} ${index + 1}`}
    />
  );
};

export const carouselBlockSchema: Template = {
  name: "Carousel",
  label: "Carousel",
  ui: {
    previewSrc: "/blocks/hero.png",
  },
  fields: [
    {
      label: "Items",
      name: "items",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Item description",
          link: "/",
          openIn: "sameWindow",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "string",
          label: "URL",
          name: "link",
        },
        {
          type: "string",
          label: "Open in",
          name: "openIn",
          options: [
            { label: "Same window", value: "sameWindow" },
            { label: "Modal", value: "modal" },
            { label: "New window", value: "newWindow" },
          ],
        },
        {
          type: "image",
          label: "Image",
          name: "imgSrc",
        },
      ],
    },
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
  ],
};
