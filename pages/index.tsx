import Head from "next/head";
import { GetStaticProps } from "next";
import Container from "../components/container";
import Layout from "../components/layout";
import { getMenuItems } from "../lib/api";
import { CMS_NAME } from "../lib/constants";

export default function Index({ preview, menuItems }) {


  return (
    <Layout menuItems={menuItems} preview={preview}>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <h1>Home Page</h1>
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  
  const menuItems = await getMenuItems();

  return {
    props: {  preview, menuItems: menuItems },
    revalidate: 10,
  };
};
