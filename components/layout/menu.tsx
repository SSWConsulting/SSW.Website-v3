import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  HiChevronDown as ChevronDownIcon,
  HiOutlineCursorClick,
  HiShieldCheck,
  HiOutlineViewGrid,
  HiRefresh,
  HiOutlineInformationCircle,
  HiOutlineUsers,
  HiOutlineLocationMarker,
  HiOutlineVideoCamera,
  HiOutlineUserAdd,
} from "react-icons/hi";
import {
  HiBars3 as Bars3Icon,
  HiOutlineXMark as XMarkIcon,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { classNames } from "tinacms";

const menuHeaders = [
  {
    name: "Services",
    children: [
      {
        name: "Development",
        icon: HiOutlineChartBar,
        href: "/services/development",
      },
      {
        name: "Cloud and Infrastructure",
        icon: HiOutlineCursorClick,
        href: "/services/development",
      },
      {
        name: "Platform Development",
        icon: HiShieldCheck,
        href: "/services/development",
      },
      {
        name: "UI/UX Design",
        icon: HiOutlineViewGrid,
        href: "/services/development",
      },
      {
        name: "Automations",
        icon: HiRefresh,
        href: "/services/development",
      },
    ],
    featured: {
      title: "FEATURED SERVICES",
      items: [
        {
          name: ".NET",
          href: "https://www.ssw.com.au/consulting/react",
          image: "/images/thumbs/thumb-net-icon.png",
          description:
            "React is a JavaScript library that combines the speed of JavaScript with new ways of rendering web pages, making them highly dynamic and responsive to user input.",
        },
        {
          name: "Angular",
          href: "https://www.ssw.com.au/consulting/angular",
          image: "/images/thumbs/thumb-angular-icon.png",
          description:
            "Our enterprise clients love Angular, be it government or large insurance firms, Angular enables you to get systems into production in record time and allows you to be more ambitious with what you want to achieve.",
        },
        {
          name: "React",
          href: "https://www.ssw.com.au/consulting/react",
          image: "/images/thumbs/thumb-react-banner.png",
          description:
            "React is a JavaScript library that combines the speed of JavaScript with new ways of rendering web pages, making them highly dynamic and responsive to user input.",
        },
      ],
    },
  },
  {
    name: "Events and Training",
    children: [],
    featured: {
      title: "FEATURED EVENTS",
      items: [],
    },
  },
  {
    name: "About Us",
    children: [
      {
        name: "About SSW",
        icon: HiOutlineInformationCircle,
        href: "",
      },
      {
        name: "SSW People",
        icon: HiOutlineUsers,
        href: "",
      },
      {
        name: "Our Offices",
        icon: HiOutlineLocationMarker,
        href: "",
      },
      {
        name: "SSW TV",
        icon: HiOutlineVideoCamera,
        href: "",
      },
      {
        name: "Join Us",
        icon: HiOutlineUserAdd,
        href: "",
      },
    ],
    featured: {
      title: "FEATURED SSW PEOPLE",
      items: [
        {
          name: "Matt Wicks",
          href: "https://ssw.com.au/people/matt-wicks",
          image:
            "https://github.com/SSWConsulting/SSW.People.Profiles/raw/main/Matt-Wicks/Images/Matt-Wicks-Profile.jpg",
          description:
            "I didn't want to pay DynDNS - so I wrote an Azure function to replace them",
        },
        {
          name: "Tylah Kapa",
          href: "https://ssw.com.au/people/tylah-kapa",
          image:
            "https://github.com/SSWConsulting/SSW.People.Profiles/raw/main/Tylah-Kapa/Images/Tylah-Kapa-Profile.jpg",
          description:
            "Every great developer you know got there by solving problems they were unqualified to solve until...",
        },
        {
          name: "Adam Cogan",
          href: "https://ssw.com.au/people/adam-cogan",
          image:
            "https://github.com/SSWConsulting/SSW.People.Profiles/raw/main/Adam-Cogan/Images/Adam-Cogan-Profile.jpg",
          description:
            "Talent can fix tricky bugs, but teamwork and brains build great software.",
        },
      ],
    },
  },
  {
    name: "SSW Rules",
    href: "https://ssw.com.au/rules",
  },
  {
    name: "Contact Us",
    href: "https://www.ssw.com.au/ssw/Company/ContactUs.aspx",
  },
];

const Logo = (props) => {
  // show the xmas logo for 1-25 December
  const date = new Date();
  const isXmas = date.getMonth() === 11 && date.getDate() <= 25;
  const logoPath = isXmas
    ? "/images/ssw-logo-xmas.svg"
    : "/images/ssw-logo.svg";

  return (
    <h4 className="flex items-center justify-center">
      <Link
        href="/"
        passHref
        className="flex items-center gap-1 whitespace-nowrap"
      >
        <Image
          src={logoPath}
          alt="SSW - Enterprise Software Development"
          height={100}
          width={100}
        />
      </Link>
      <div className="ml-4 w-24 text-sm font-semibold uppercase leading-4 text-gray-700">
        Enterprise Software Development
      </div>
      {props.children}
    </h4>
  );
};

export const Menu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        className="relative mx-auto flex max-w-9xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Logo />
        <div className="grow"></div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="z-50 hidden lg:flex lg:gap-x-4">
          {menuHeaders.map((item) => (
            <DesktopMenuItem key={item.name} item={item} />
          ))}
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 flex w-full flex-col overflow-y-auto bg-white sm:ring-1 sm:ring-gray-900/10">
          <div className="p-6">
            <Logo>
              <div className="grow"></div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </Logo>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 p-6">
                {menuHeaders.map((item) => (
                  <MobileMenuItem key={item.name} menuItem={item} />
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

const DesktopMenuItem = ({ item }) => {
  const itemPadding = "py-3 px-4";
  if (!item.children) {
    return (
      <div
        className={classNames(
          itemPadding,
          item.isPrimary ? "bg-sswRed text-white" : "bg-transparent",
          "rounded-md"
        )}
      >
        <Link
          href={item.href}
          className="unstyled text-sm font-semibold leading-6 !no-underline"
        >
          {item.name}
        </Link>
      </div>
    );
  }

  return (
    <Popover className="">
      <Popover.Button
        className={classNames(
          itemPadding,
          "flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus-visible:outline-none"
        )}
      >
        {item.name}
        <ChevronDownIcon
          className="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className={classNames(
            "absolute left-0 mt-7 w-screen max-w-9xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-900/5"
          )}
        >
          <div className="mx-auto max-w-7xl py-10 px-6">
            <h3 className="text-sm font-medium leading-6 text-gray-500">
              {item.featured.title}
            </h3>
            <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-4">
              <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:col-span-3 lg:grid-cols-3">
                {item.featured.items.map((item) => (
                  <article
                    key={item.name}
                    className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                  >
                    <div className="relative flex-none">
                      <Image
                        className="max-h-64 w-full rounded-lg object-cover"
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div>
                      <h4 className="mt-2 text-sm font-bold leading-6 text-gray-900">
                        <Link className="unstyled" href={item.href}>
                          <span className="absolute inset-0" />
                          {item.name}
                        </Link>
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              <ul>
                {item.children.map((item) => (
                  <li key={item.name} className="first:pb-1 not-first:py-1">
                    <Link
                      href={item.href}
                      className="unstyled flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                    >
                      <item.icon
                        className="h-6 w-6 flex-none text-sswRed"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

const MobileMenuItem = ({ menuItem }) => {
  if (!menuItem.children) {
    return (
      <a
        href={menuItem.href}
        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
      >
        {menuItem.name}
      </a>
    );
  }

  return (
    <Disclosure as="div" className="-mx-3">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
            {menuItem.name}
            <ChevronDownIcon
              className={classNames(
                open ? "rotate-180" : "",
                "h-5 w-5 flex-none"
              )}
              aria-hidden="true"
            />
          </Disclosure.Button>
          <Disclosure.Panel className="mt-2 space-y-2">
            {menuItem.children.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
