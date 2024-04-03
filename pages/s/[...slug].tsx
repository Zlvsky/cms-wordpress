import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import Tags from "../../components/tags";
import {
  getAllPages,
  getAllPostsWithSlug,
  getMenuItems,
  getPageContent,
  getPostAndMorePosts,
} from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";
import Link from "next/link";

export default function StaticPage({ post, menuItems }) {
  const router = useRouter();

  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }

  return (
    <Layout menuItems={menuItems}>
      <Container>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
          <Link href="/" className="hover:underline">
            Biblioteka
          </Link>
          .
        </h2>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <main>
              <Head>
                <title>
                  {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta
                  property="og:image"
                  content={post.featuredImage?.node.sourceUrl}
                />
              </Head>

              <PostBody content={post.content} />
            </main>

            <SectionSeparator />
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}) => {
  const data = await getPageContent(params?.slug[0]);
  const menuItems = await getMenuItems();

  return {
    props: {
      post: data,
      // posts: data.posts,
      menuItems: menuItems,
    },
    revalidate: 10,
  };
};

const findParentSlugById = (pages, id) => {
  const parentPage = pages.find((page) => page.node.id === id);
  return parentPage ? parentPage.node.slug : null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPages();

  const paths = pages.edges.map(({ node }) => {
    let slug = node.slug;
    if (node.parentId) {
      const parentSlug = findParentSlugById(pages.edges, node.parentId);
      if (parentSlug) {
        slug = `${parentSlug}/${slug}`;
      } else return;
    }
    // Split the slug into segments and return as an array
    return { params: { slug: slug.split("/") } };
  });

  // console.log(paths[0]);

  return {
    paths: paths || [],
    fallback: true,
  };
};