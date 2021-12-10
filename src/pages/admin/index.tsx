import React from "react"

import Posts from "../../components/Admin/Posts"
import { getAllPosts } from "../../lib/graphql/query"
import { gql } from "@apollo/client"
import { IPost } from "../../lib/graphql/query"
import Layout from "../../components/Admin/Layout"
import { parseCookies } from "../../utils"
import createApolloClient from "../../services/apolloClient"

interface IUser {
  id: string
  name: string
  email: string
}

interface Props {
  posts: [IPost]

  userId: IUser
}

const Index = ({ posts }: Props) => {
  return (
    <Layout>
      <Posts posts={posts} />
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const { req, apolloClient } = ctx

  const { token } = parseCookies(req)
  console.log(token)

  // let data
  try {
    if (!token) throw new Error("Token not provided")

    const client = createApolloClient()

    const mutation = gql`
      mutation Session($token: String!) {
        session(token: $token) {
          success
          userId
          error {
            message
          }
        }
      }
    `

    const { data } = await client.mutate({
      mutation: mutation,
      variables: { token },
    })

    if (!data.session.success) {
      throw new Error("Invalud token")
    }

    const query = gql`
      query {
        getPosts {
          posts {
            slug
            title
            description
            post_image
          }
        }
      }
    `

    const posts = await getAllPosts(query)

    return {
      props: {
        posts,
        // userId: data.session.userId,
      },
    }
  } catch (e) {
    console.log(e.message)
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
      props: {},
    }
  }
}

export default Index
