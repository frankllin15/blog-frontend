import client from "../../services/apollo-client"
import { gql, useMutation } from "@apollo/client"

interface IPost {
  title: string
  description: string
}

export const POST_MULTATION = gql`
  mutation CreatePost(
    $title: String!
    $description: String!
    $post_content: String
    $post_image: String
    $authorId: String!
  ) {
    createPost(
      title: $title
      description: $description
      authorId: $authorId
      post_content: $post_content
      post_image: $post_image
    ) {
      success
      post {
        title
        description
        created_at
      }
    }
  }
`

export const SINGLE_UPLOAD_MUTAION = gql`
  mutation ($file: Upload!, $type: String!) {
    singleUpload(file: $file, type: $type) {
      success
      error {
        message
      }
      file {
        file_url
      }
    }
  }
`
