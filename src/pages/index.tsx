import Head from "next/head"

import { GetStaticProps } from "next"
import { getAllPosts } from "../lib/graphql/query"

import { gql } from "@apollo/client"
import CardPost from "../components/CardPost"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Layout from "../components/Layout"

interface IPostData {
  title: string
  description: string
  //   poster_path: string
  slug: string
}

interface IProps {
  posts: Array<IPostData>
}

const Home: React.FC<IProps> = ({ posts }) => {
  // console.log(posts)
  const router = useRouter()
  return (
    <>
      <Head>
        <title></title>
      </Head>
      {/* <Header /> */}

      <Layout>
        <main className="pl-11 pr-11 w-full min-h-screen mobile:pl-2 mobile:pr-2">
          <h1>Posts</h1>
          <ul className="flex flex-row mobile:flex-col mobile:items-center justify-between">
            {posts[0] &&
              posts.map((post, id) => (
                <li key={id} className="mr-2  mb-3">
                  <CardPost data={post}>{post.title}</CardPost>
                </li>
              ))}
          </ul>
        </main>
      </Layout>
      {/* <Footer /> */}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = gql`
    query {
      getPosts {
        success
        posts {
          title
          description
          id
          slug
        }
      }
    }
  `

  console.log(process.env.NEXT_PUBLIC_FILES_SERVER_URL)
  const posts = await getAllPosts(query)

  return {
    props: {
      posts,
    },
  }
}

export default Home
