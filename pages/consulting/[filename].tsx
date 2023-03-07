import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { client } from "../../.tina/__generated__/client";
import { Booking, BuiltOnAzure, ClientLogos } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import BookingButton from "../../components/bookingButton/bookingButton";
import { Layout } from "../../components/layout";
import { Marketing } from "../../components/marketing/Marketing";
import { MediaCardProps } from "../../components/consulting/mediaCard/mediaCard";
import MediaCards from "../../components/consulting/mediaCard/mediaCards";
import TechnologyCards from "../../components/technologyCard/technologyCards";
import { TestimonialRow } from "../../components/testimonials/TestimonialRow";
import { Benefits } from "../../components/util/consulting/benefits";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";

export default function ConsultingPage(
	props: AsyncReturnType<typeof getStaticProps>["props"]
) {
	const { data } = useTina({
		data: props.data,
		query: props.query,
		variables: props.variables,
	});

	const removeExtension = (file: string) => {
		return file.split(".")[0];
	};

	const technologyCardDocs =
		props.technologyCards.data.technologiesConnection.edges.map((n) => n.node);
	const techCards =
		data.consulting.technologies?.technologyCards?.map((c) => ({
			...technologyCardDocs.find(
				(n) => !!n.name && n.name === c.technologyCard?.name
			),
		})) || [];

	const mediaCardProps =
		data.consulting.medias?.mediaCards?.map<MediaCardProps>((m) => ({
			type: m.type as MediaCardProps["type"],
			content: m.content,
		})) || [];

	const bookingButtonProps = {
		buttonText: data.global.bookingButtonText,
		recaptchaKey: props.env["GOOGLE_RECAPTCHA_KEY"],
	};

	return (
		<>
			<SEO seo={data.consulting.seo} />
			<Layout>
				<Section className="mx-auto w-full max-w-9xl py-5 px-8">
					<Breadcrumbs
						path={removeExtension(props.variables.relativePath)}
						suffix={data.global.breadcrumbSuffix}
						title={data.consulting.seo?.title}
					/>
				</Section>
				<Section
					className="w-full items-center !bg-black/75 bg-video-mask text-center font-light"
					color="black"
				>
					<Booking {...data.consulting.booking}>
						<BookingButton {...bookingButtonProps} />
					</Booking>
				</Section>
				<Section
					color="black"
					className={`
          prose-consulting
          border-y-4 border-y-sswRed
          text-center`}
				>
					<a id="more" />
					<div className="w-full bg-benefits bg-cover bg-fixed bg-center bg-no-repeat py-12">
						<div className="mx-auto max-w-9xl px-4">
							<TinaMarkdown
								components={componentRenderer}
								content={data.consulting._body}
							/>
							<Benefits data={data.consulting.benefits} />
						</div>
					</div>
				</Section>
				<Section className="mb-16">
					<Container padding="px-4" className="flex w-full flex-wrap">
						<TestimonialRow testimonialsQueryResult={props.testimonialResult} />
						<BookingButton {...bookingButtonProps} containerClass="mt-20" />
					</Container>
				</Section>
				<Marketing content={props.marketingData} />
				<Section className="!bg-gray-75 pb-40">
					<Container size="custom">
						<h1 className="text-center">Companies we have worked with</h1>
						<ClientLogos />
					</Container>
				</Section>
				{!!techCards.length && (
					<Section className="pb-16 text-center">
						<Container padding="px-4">
							<TechnologyCards
								techHeader={data.consulting.technologies.header}
								techCards={techCards}
							/>
						</Container>
					</Section>
				)}
				{!!mediaCardProps.length && (
					<Section className="pb-40 pt-8 text-center">
						<Container size="custom">
							<MediaCards
								header={data.consulting.medias?.header}
								cardProps={mediaCardProps}
							/>
						</Container>
					</Section>
				)}
				<Section className="!bg-gray-75 pb-25 text-center">
					<Container size="custom" className="w-full">
						<h1
							dangerouslySetInnerHTML={{
								__html: parseCallToAction(
									data.consulting.callToAction,
									data.consulting.solution.project
								),
							}}
						></h1>
						<p className="text-lg">
							Jump on a call with one of our Account Managers to discuss how we
							can help you.
						</p>
						<BookingButton {...bookingButtonProps} />
					</Container>
				</Section>
				<Section>
					<BuiltOnAzure data={{ backgroundColor: "default" }} />
				</Section>
			</Layout>
		</>
	);
}

const parseCallToAction = (content: string, project: string) => {
	const replacement = `<span class="text-sswRed">${project}</span>`;

	return content?.replace("{{TITLE}}", replacement);
};

export const getStaticProps = async ({ params }) => {
	const tinaProps = await client.queries.consultingContentQuery({
		relativePath: `${params.filename}.mdx`,
	});

	const testimonials = await client.queries.allTestimonialsQuery();

	const technologyCardNames =
		tinaProps.data.consulting.technologies?.technologyCards?.reduce<string[]>(
			(pre, cur) => {
				!!cur.technologyCard?.name && pre.push(cur.technologyCard.name);
				return pre;
			},
			[]
		) || [];
	const technologyCardsProps = await client.queries.technologyCardContentQuery({
		cardNames: technologyCardNames,
	});

	const marketingSection = await client.queries.marketing({
		relativePath: "/why-choose-ssw.mdx",
	});

	return {
		props: {
			data: tinaProps.data,
			query: tinaProps.query,
			variables: tinaProps.variables,
			testimonialResult: testimonials,
			technologyCards: technologyCardsProps,
			marketingData: marketingSection.data,
			env: {
				GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY || null,
			},
		},
	};
};

export const getStaticPaths = async () => {
	const pagesListData = await client.queries.consultingConnection();
	return {
		paths: pagesListData.data.consultingConnection.edges.map((page) => ({
			params: { filename: page.node._sys.filename },
		})),
		fallback: false,
	};
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
	T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
