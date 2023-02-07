import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import type { Template } from "tinacms";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import classNames from "classnames";

import { BiChevronRightCircle } from "react-icons/bi";

import { Container } from "../util/container";
import { Section } from "../util/section";
import layoutData from "../../content/global/index.json";

dayjs.extend(timezone);
dayjs.extend(utc);

const DAY_KEYS = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const WORKING_TIME = {
  Open: 9,
  Close: 18,
};

const States = {
  QLD: {
    timeZone: "Australia/Queensland",
    selected: {
      hovered: "/blocks/aboutUs/map-qld-selected-hovered.png",
      notHovered: "/blocks/aboutUs/map-qld-selected-nothovered.png",
    },
    notSelected: {
      hovered: "/blocks/aboutUs/map-qld-notselected-hovered.png",
      notHovered: "/blocks/aboutUs/map-qld-notselected-nothovered.png",
    },
  },
  NSW: {
    timeZone: "Australia/NSW",
    selected: {
      hovered: "/blocks/aboutUs/map-nsw-selected-hovered.png",
      notHovered: "/blocks/aboutUs/map-nsw-selected-nothovered.png",
    },
    notSelected: {
      hovered: "/blocks/aboutUs/map-nsw-notselected-hovered.png",
      notHovered: "/blocks/aboutUs/map-nsw-notselected-nothovered.png",
    },
  },
  VIC: {
    timeZone: "Australia/Victoria",
    selected: {
      hovered: "/blocks/aboutUs/map-vic-selected-hovered.png",
      notHovered: "/blocks/aboutUs/map-vic-selected-nothovered.png",
    },
    notSelected: {
      hovered: "/blocks/aboutUs/map-vic-notselected-hovered.png",
      notHovered: "/blocks/aboutUs/map-vic-notselected-nothovered.png",
    },
  },
};

export const AboutUs = ({ data }) => {
  const offices = layoutData.offices;
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [stateBeingHovered, setStateBeingHovered] = useState(null);

  useEffect(() => {
    const defaultOffice = offices.find(o => o.addressLocality === "Sydney");
    setSelectedOffice(defaultOffice);
    setStateBeingHovered(defaultOffice.addressRegion);
  }, []);

  return (
    <Section color={data.backgroundColor}>
      <Container className="w-full">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TV
            className={"hidden sm:block"}
          />
          <ContactUs
            className={""}
            offices={offices}
            selectedOffice={selectedOffice}
            setSelectedOffice={setSelectedOffice}
            setStateBeingHovered={setStateBeingHovered}
          />
          <Map
            className={"hidden sm:block"}
            selectedOffice={selectedOffice}
            stateBeingHovered={stateBeingHovered}
          />
        </div>
      </Container>
    </Section>
  );
};

const TV = ({
  className
}) => {
  const [videoClicked, setVideoClicked] = useState(false);
  return (
    <div className={className}>
      <h2 className="mt-0">tv.ssw.com</h2>

      {videoClicked ? (
        <iframe
          src={layoutData.aboutUs.video.url}
          width="100%"
          allowFullScreen
        ></iframe>
      ) : (
        <>
          {/* TODO: refactor with next/image */}
          <Image
            src={layoutData.aboutUs.video.thumbnailUrl}
            alt="SSW TV"
            width={340}
            height={190}
            onClick={() => setVideoClicked(true)}
          />
        </>
      )}
    </div>
  );
};

const ContactUs = ({
  className,
  offices,
  selectedOffice,
  setSelectedOffice,
  setStateBeingHovered,
}) => {
  return (
    <div className={className}>
      <h2 className="mt-0">Contact Us</h2>
      <ul className="flex flex-col">
        {offices.map((o, i) => (
            <AccordionItem
              key={i}
              office={o}
              selectedOffice={selectedOffice}
              setSelectedOffice={setSelectedOffice}
              setStateBeingHovered={setStateBeingHovered}
            >
              <OfficeInfo office={o} />
            </AccordionItem>
        ))}
      </ul>
    </div>
  );
};

const AccordionItem = ({
  office,
  selectedOffice,
  setSelectedOffice,
  setStateBeingHovered,
  children,
}) => {
  const currentlySelected =
    office.addressLocality === selectedOffice?.addressLocality;
  const handleSetIndex = () => {
    if (office.addressLocality === selectedOffice?.addressLocality) {
      setSelectedOffice(null);
    } else if (!currentlySelected) {
      setSelectedOffice(office);
    }
  };

  return (
    <li>
      <div
        className={classNames(
          "group mb-2 flex cursor-pointer items-center justify-between p-2 transition-all duration-500",
          currentlySelected ? "bg-sswRed" : "bg-gray-400 hover:bg-gray-600"
        )}
        onMouseEnter={() => setStateBeingHovered(office.addressRegion)}
        onMouseLeave={() => setStateBeingHovered(null)}
        onClick={() => handleSetIndex()}
      >
        <div className="group flex cursor-pointer pl-2">
          <div className="font-sans uppercase text-white">{office.addressLocality}</div>
        </div>
        <div className="flex items-center justify-center text-white">
          <BiChevronRightCircle />
        </div>
      </div>

      <div 
        className={classNames(
          "overflow-hidden transition-all duration-500",
          currentlySelected ? "max-h-52" : "max-h-0",
        )}>
        {children}
      </div>
    </li>
  );
};

const OfficeInfo = ({ office }) => {
  return (
    <div className="p-4 text-sm text-black">
      <p className="pb-2">
        <Link href={office.url} legacyBehavior>
          {office.name}
        </Link>
      </p>
      <p itemProp="address" itemType="http://schema.org/PostalAddress">
        <span itemProp="streetAddress">{office.streetAddress}</span>
        <br />
        {office.suburb && <span>{office.suburb}, </span>}
        <span itemProp="addressLocality">{office.addressLocality}</span>,{" "}
        <span itemProp="addressRegion">{office.addressRegion}</span>{" "}
        <span itemProp="postalCode">{office.postalCode}</span>,{" "}
        <span itemProp="addressCountry">{office.addressCountry}</span>
      </p>
      <p className="py-2">
        Phone: <span className="text-sswRed">{office.phone}</span>
      </p>
      <p className="pb-2">
        Hours: <span className="text-sswRed">{office.hours}</span>{" "}
        <OpenStatus state={office.addressRegion} />
        <br />
        <span className="text-sswRed">{office.days}</span>
      </p>
    </div>
  );
};

const OpenStatus = ({ state }) => {
  const stateInfo = States[state];
  const now = dayjs().tz(stateInfo?.timeZone);
  const isWeekend = [DAY_KEYS.Saturday, DAY_KEYS.Sunday].some(
    (x) => x === now.day()
  );
  const currentHour = now.hour();

  let status, statusClass;
  if (
    isWeekend ||
    currentHour < WORKING_TIME.Open ||
    WORKING_TIME.Close < currentHour
  ) {
    statusClass = "bg-sswRed";
    status = "Closed";
  } else {
    statusClass = "bg-green-400";
    status = "Open";
  }

  return (
    <span
      className={classNames(
        statusClass,
        "ml-2 p-1 text-xxs font-bold uppercase text-white"
      )}
    >
      {status}
    </span>
  );
};

const Map = ({
  className,
  selectedOffice,
  stateBeingHovered,
}) => {
  return (
    <div className={className}>
      <h2 className="mt-0">&nbsp;</h2>
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value*/}
      <div className="h-[300px] w-[350px]">
        <div className="relative">
          <div className="absolute top-0">          
            <Image
              src="/blocks/aboutUs/map-bg.png"
              alt="Placeholder"
              height={350}
              width={402}
            />
          </div>
          {Object.keys(States).map((stateKey) => {
            const state = States[stateKey];
            const stateSelection = selectedOffice?.addressRegion === stateKey ? state.selected : state.notSelected;
            const hoverSelection = stateBeingHovered === stateKey ? stateSelection.hovered : stateSelection.notHovered;
            return (
              <div key={stateKey} className="absolute top-0">
                <Image
                  src={hoverSelection}
                  alt="Placeholder"
                  height={350}
                  width={402}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const aboutUsBlockSchema: Template = {
  name: "AboutUs",
  label: "About Us",
  fields: [
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
