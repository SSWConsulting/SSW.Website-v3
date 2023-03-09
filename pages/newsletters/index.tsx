import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { BuiltOnAzure } from "../../components/blocks";
import cs from "classnames";
import styles from "./index.module.css";
import { NewsTable } from "../../components/blocks/tables/newsTable";
import { SubButton } from "../../components/blocks/subButton";

export default function NewslettersPage(
	props: AsyncReturnType<typeof getStaticProps>["props"]
) {
	const { data } = useTina({
		data: props.data,
		query: props.query,
		variables: props.variables,
	});

	return (
		<>
			<SEO seo={data.newsletters.seo} />
			<Layout>
				<Section className="mx-auto w-full max-w-9xl py-5 px-8">
					<Breadcrumbs
						path={props.variables.relativePath}
						suffix={""}
						title={data.newsletters.title}
					/>
				</Section>
				<Container className={cs("flex-1 pt-4 pb-0", styles.newsletters)}>
					<TinaMarkdown
						components={componentRenderer}
						content={data.newsletters._body}
					/>
				</Container>
				<Section className="mx-auto mb-20 !block w-full max-w-9xl py-5 px-8">
					<SubButton />
					<NewsTable />
				</Section>
				<Section>
					<BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
				</Section>
			</Layout>
		</>
	);
}

export const getStaticProps = async () => {
	const tinaProps = await client.queries.newsletters({
		relativePath: "newsletters.mdx",
	});

	return {
		props: {
			data: tinaProps.data,
			query: tinaProps.query,
			variables: tinaProps.variables,
		},
	};
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
	T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
