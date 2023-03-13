import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";

import { client } from "../../.tina/__generated__/client";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";

import Image from "next/image";
import { BuiltOnAzure } from "../../components/blocks";
import { Section } from "../../components/util/section";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { SEO } from "../../components/util/seo";
import MicrosoftPanel from "../../components/offices/microsoftPanel";
import TestimonialPanel from "../../components/offices/testimonialPanel";
import ContactPanel from "../../components/offices/contactPanel";

export default function OfficePage(
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

	return (
		<>
			<SEO seo={data.offices.seo} />
			<Layout>
				{data.offices.coverImg ? (
					<div className="mx-auto max-w-9xl px-6 sm:px-8">
						<div className="h-auto w-auto">
							<Image
								width={1320}
								height={485}
								src={data.offices.coverImg}
								alt="Cover image"
								priority={true}
							/>
						</div>
					</div>
				) : (
					<></>
				)}

				<Container className="flex-1 pt-2">
					<Breadcrumbs
						path={removeExtension(props.variables.relativePath)}
						suffix={data.global.breadcrumbSuffix}
						title={data.offices.seo.title}
					/>
					<div className="mt-8 gap-8 md:grid md:grid-cols-7">
						<div className="prose max-w-full prose-h2:mt-5 prose-h2:text-3xl prose-h2:font-light prose-h2:text-sswRed prose-h4:text-lg prose-img:my-0 md:col-span-5">
							<h2>About Us</h2>
							<TinaMarkdown
								components={componentRenderer}
								content={data.offices.aboutUs}
							/>
							{data.offices.map ? (
								<>
									<h2>SSW {data.offices.addressLocality} Map</h2>
									<Image
										src={data.offices.map}
										width={1920}
										height={1080}
										alt={`SSW ${data.offices.addressLocality} Map`}
									/>
								</>
							) : (
								<></>
							)}
							<h2 id="Directions">
								SSW {data.offices.addressLocality} Directions
							</h2>
							<TinaMarkdown
								components={componentRenderer}
								content={data.offices.directions}
							/>
							<h2>Parking</h2>
							<TinaMarkdown
								components={componentRenderer}
								content={data.offices.parking}
							/>
							<h2>Public Transport</h2>
							<TinaMarkdown
								components={componentRenderer}
								content={data.offices.publicTransport}
							/>
							{data.offices.team.children.length > 0 ? (
								<>
									<h2>The SSW {data.offices.addressLocality} Team</h2>
									<TinaMarkdown
										components={componentRenderer}
										content={data.offices.team}
									/>
								</>
							) : (
								<></>
							)}
							<h2>SSW {data.offices.addressLocality} Photos</h2>
							<TinaMarkdown
								components={componentRenderer}
								content={data.offices.photos}
							/>
							<hr />
							<TinaMarkdown
								components={componentRenderer}
								content={data.offices._body}
							/>
						</div>
						<div className="prose prose-h3:text-sswRed md:col-span-2">
							<ContactPanel
								phone={data.offices.phone}
								streetAddress={data.offices.streetAddress}
								suburb={data.offices.suburb}
								addressLocality={data.offices.addressLocality}
								addressRegion={data.offices.addressRegion}
								postalCode={data.offices.postalCode}
								addressCountry={data.offices.addressCountry}
								sideImg={data.offices.sideImg}
                sidebarSecondaryPlace={data.offices.sidebarSecondaryPlace}
							/>

							<MicrosoftPanel />
							<TestimonialPanel testimonial={props.testimonial} />
						</div>
					</div>
				</Container>
				<Section>
					<BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
				</Section>
			</Layout>
		</>
	);
}

export const getStaticProps = async ({ params }) => {
	const tinaProps = await client.queries.officeContentQuery({
		relativePath: `${params.filename}.mdx`,
	});

	const testimonialResult = await client.queries.allTestimonialsQuery();
	const testimonials =
		testimonialResult.data.testimonialsConnection.Testimonials;
	const testimonial =
		testimonials[Math.floor(Math.random() * testimonials.length)].Testimonial;

	return {
		props: {
			data: tinaProps.data,
			query: tinaProps.query,
			variables: tinaProps.variables,
			testimonial: testimonial,
		},
	};
};

export const getStaticPaths = async () => {
	const pagesListData = await client.queries.officesConnection();
	return {
		paths: pagesListData.data.officesConnection.edges.map((page) => ({
			params: { filename: page.node._sys.filename },
		})),
		fallback: false,
	};
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
	T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
