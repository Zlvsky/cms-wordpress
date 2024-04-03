import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import HeroPost from "../../components/hero-post";
import Intro from "../../components/intro";
import Layout from "../../components/layout";
import { getAllPages } from "../../lib/api";

export default function Index({ allPages: { edges } }) {
    console.log(edges)

  return (
    <Layout>
      <Head>
        <title>{`Next.js Pages from wordpress`}</title>
      </Head>
      <Container>
        <Intro />
        
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPages = await getAllPages();

  return {
    props: { allPages },
    revalidate: 10,
  };
};
