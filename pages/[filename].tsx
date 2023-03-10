import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../.tina/__generated__/client";
import { Blocks } from "../components/blocks-renderer";
import { componentRenderer } from "../components/blocks/mdxComponentRenderer";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";
import { SEO } from "../components/util/seo";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });
  return (
    <>
      <SEO seo={data.page.seo} />
      <Layout>
        <Blocks prefix="PageBeforeBody" blocks={data.page.beforeBody} />
        <Container className={"flex-1 pt-4"}>
          <div className="gap-4 md:grid md:grid-cols-5 lg:grid-cols-5">
            <div className="max-w-full md:col-span-3 lg:col-span-3">
              <TinaMarkdown
                components={componentRenderer}
                content={data.page._body}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
              <Blocks prefix="PageSideBar" blocks={data.page.sideBar} />
            </div>
          </div>
        </Container>
        <Blocks prefix="PageAfterBody" blocks={data.page.afterBody} />
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
