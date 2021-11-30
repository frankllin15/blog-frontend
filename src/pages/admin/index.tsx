import React from "react"
import Header from "../../components/Admin/Header"
import Aside from "../../components/Admin/Aside"
import Posts from "../../components/Admin/Posts"
import { getAllPosts } from "../../lib/graphql/query"
import { gql } from "@apollo/client"
import { IPost } from "../../lib/graphql/query"
import Layout from "../../components/Admin/Layout"

interface Props {
  posts: [IPost]
}

const index = ({ posts }: Props) => {
  return (
    <Layout>
      <Posts posts={posts} />
    </Layout>
  )
}

export default index

export const getServerSideProps = async () => {
  const query = gql`
    query {
      listPosts {
        posts {
          slug
          title
          description
        }
      }
    }
  `

  const posts = await getAllPosts(query)

  return {
    props: {
      posts,
    },
  }
}
