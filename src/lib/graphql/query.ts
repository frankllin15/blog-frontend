import {
  gql,
  ApolloQueryResult,
  ApolloError,
  DocumentNode,
} from "@apollo/client"
import createApolloClient from "../../services/apolloClient"

const client = createApolloClient()

export interface IPost {
  slug: string
  title: string
  description: string
  post_image: string
}

export type IFullPost = IPost & {
  id: string
  author: {
    name: string
  }
  post_content: string
  likes_count: string
  created_at: string
}

export const getAllPosts = async (
  query: DocumentNode
): Promise<Array<IPost>> => {
  const { data, errors } = await client.query({
    query: query,
  })

  return data.getPosts.posts
}

export const getPostBySlug = async (
  slug: string | string[]
): Promise<IFullPost> => {
  let id = slug.toString().match(/[a-z0-9]+$/)[0] || ""

  console.log(id)
  try {
    const { data } = await client.query({
      query: gql`
        query GetPost($id: String!) {
          getPost(id: $id) {
            post {
              post_content
              title
              description
              author {
                name
              }
              created_at
            }
          }
        }
      `,

      variables: {
        id,
      },
    })

    console.log("data: ", await data.getPost.post)
    return data.getPost.post
  } catch (e) {
    console.log("Errorrrr")
    console.log(e)

    console.log("Fim Error")
  }
}
