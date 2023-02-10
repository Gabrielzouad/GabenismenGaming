import Head from "next/head"
import Intro from "../components/intro"
import Layout from "../components/layout"
import { getAllPostsForHome } from "../lib/api"
import Container from "../components/container"
import MoreStories from "../components/more-stories"

export default function Index({ preview, allPosts }) {
  const morePosts = allPosts
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>GabenismenTV</title>
        </Head>

        <Container>
          <Intro />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allPosts },
  }
}
