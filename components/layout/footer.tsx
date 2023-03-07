import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import Link from "next/link";
import { Container } from "../util/container";
import { SocialIcons, SocialTypes } from "../util/socialIcons";

dayjs.extend(timezone);
dayjs.extend(utc);

export const Footer = () => {
	return (
		<footer className="w-full bg-gray-900 text-xxs text-gray-300">
			<Container size="xsmall">
				<div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
					<CopyrightInfo />
				</div>
				<hr className="my-4 border-gray-800 sm:hidden" />
				<SocialIcons
					className="my-6 justify-center sm:hidden"
					excludeDesktop={Object.values(SocialTypes)}
					excludeMobile={[SocialTypes.phone, SocialTypes.meetup]}
				/>
				<hr className="my-4 border-gray-800" />
				<div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
					<DeploymentInfo />
					<SiteInfo />
				</div>
			</Container>
		</footer>
	);
};

const Divider = () => <span className="px-2">|</span>;

const CopyrightInfo = () => (
	<>
		<div>
			&copy; Copyright SSW 1990-{new Date().getFullYear()}. All Rights Reserved.
		</div>
		<div>
			<Link
				href="https://github.com/SSWConsulting/SSW.Website-v3/issues/new/choose"
				target="_blank"
			>
				FEEDBACK TO SSW
			</Link>
			<Divider />
			<Link href="/consulting/terms-and-conditions">TERMS AND CONDITIONS</Link>
		</div>
	</>
);

const DeploymentInfo = () => {
	const deploymentDate = process.env.NEXT_PUBLIC_GITHUB_RUN_DATE
		? dayjs.utc(process.env.NEXT_PUBLIC_GITHUB_RUN_DATE).fromNow()
		: "XXX";
	const deploymentNumber = process.env.NEXT_PUBLIC_GITHUB_RUN_NUMBER || "XXX";

	const deploymentLinkInfo = {
		deploymentDate,
		repo: process.env.NEXT_PUBLIC_GITHUB_REPOSITORY,
		runId: process.env.NEXT_PUBLIC_GITHUB_RUN_ID,
		deploymentNumber,
	};

	const DynamicDeploymentLink = dynamic(() => import("./deploymentLink"), {
		ssr: false,
	});

	return (
		<div className="text-center sm:text-left">
			Our website is under{" "}
			<Link href="https://www.ssw.com.au/rules/rules-to-better-websites-deployment">
				CONSTANT CONTINUOUS DEPLOYMENT.&nbsp;
			</Link>
			<DynamicDeploymentLink {...deploymentLinkInfo} />
		</div>
	);
};

const SiteInfo = () => (
	<div>
		<Link
			// TODO: Implementation
			href="https://www.ssw.com.au/ssw/MenuMap.aspx"
		>
			SITEMAP
		</Link>
		<Divider />
		<Link
			// TODO: Implementation
			href="https://www.ssw.com.au/ssw/HealthCheck"
		>
			{/* TODO: refactor with next/image */}
			HEALTH CHECK
			<Image
				src="/images/health-check.png"
				alt="health check logo"
				height={14}
				width={40}
			/>
		</Link>
	</div>
);
