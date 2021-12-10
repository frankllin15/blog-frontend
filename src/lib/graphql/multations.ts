import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client"

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

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      error {
        message
      }
      token

      user {
        name
      }
      token
    }
  }
`

export const SINGUP_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      success
      token
      user {
        id
        email
        password
      }
      error {
        message
        code
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

interface ISession {
  userId: string | null
  success: boolean
  error?: [
    {
      message: string
      code?: string
    }
  ]
}

export const VerifySession = async (
  token: string,
  client: any
): Promise<ISession> => {
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

  return data?.session
}
