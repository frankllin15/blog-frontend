import { useEffect, useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import { useRouter } from "next/router"
import {
  POST_MULTATION,
  SINGLE_UPLOAD_MUTAION,
  VerifySession,
} from "../../lib/graphql/multations"
// import { uploadFile } from "../../lib/fileServer"

import { withApollo } from "../../services/apollo"
import { NextPage, NextPageContext } from "next"
import { ApolloClient, NormalizedCacheObject } from "@apollo/client"
import { parseCookies } from "../../utils"
const CustomInput = ({ name, onChange }) => {
  return (
    <input
      type="text"
      name={name}
      required={true}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4 rounded-md shadow-sm outline-none pl-3"
    />
  )
}

interface IProps {
  userId: string
  children: React.ReactNode
}

const NewPost: NextPage = ({ userId }: IProps) => {
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)

  const [createPost, { data, loading, error }] = useMutation(POST_MULTATION)

  const [uploadImage] = useMutation(SINGLE_UPLOAD_MUTAION)
  const [uploadPost] = useMutation(SINGLE_UPLOAD_MUTAION)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  const router = useRouter()

  const handleSubmit = async () => {
    // console.log(title, desc)

    if (file && image) {
      const [{ data: imageResp }, { data: postResp }] = await Promise.all([
        uploadImage({ variables: { type: "image", file: image } }),
        uploadPost({ variables: { type: "post", file: file } }),
      ])

      const dataImage = imageResp.singleUpload
      const dataPost = postResp.singleUpload

      if (dataPost.success && dataImage.success) {
        const post_content = dataPost.file.file_url
        const post_image = dataImage.file.file_url
        try {
          createPost({
            variables: {
              authorId: userId,
              title: title,
              description: desc,
              post_content: post_content,
              post_image: post_image,
            },
          })
        } catch (e) {
          console.log(e)
        }

        console.log(data)

        // console.log(postResp, imageResp, post)
      } else {
      }
    } else {
      alert("Selecione o arquivo")
    }
  }

  if (data) {
    let seePost = confirm(
      "Post cirado com sucesso! \nDeseja vizualizar o post?"
    )

    if (seePost) router.replace("/admin/")

    router.reload()
  }

  return (
    // <ApolloProvider client={client}>
    <div className="w-screen h-screen flex items-start justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="mt-20 bg-gray-200 flex flex-col shadow-xl p-5 rounded-md"
      >
        <h1 className="text-center">Novo Post</h1>

        {loading ? (
          "Submitting..."
        ) : error ? (
          <div>
            <p>Um erro ocorreu :(</p>
          </div>
        ) : (
          <div className="flex flex-col ">
            <label htmlFor="title">Titulo do Post</label>
            <CustomInput onChange={setTitle} name="title" />
            <label htmlFor="desc">Breve descri????o do post</label>
            <CustomInput onChange={setDesc} name="desc" />
          </div>
        )}

        <label className="mb-2" htmlFor="file">
          Selecione o arquivo (.md ou .mdx)
        </label>

        <input
          onChange={(e) => {
            console.log(e.target.files[0])
            setFile(e.target.files[0])
          }}
          type="file"
          name="file"
          required={false}
          accept=".md,.mdx"
          className="mb-3"
        />

        <label className="" htmlFor="file">
          Escolha a imagem principal
        </label>
        <input
          onChange={(e) => {
            console.log(e.target.files[0])

            setImage(e.target.files[0])
          }}
          type="file"
          name="file"
          required={false}
          accept=".png,.jpg, .jpeg"
          placeholder="Selecione a imagem"
          className="mb-3"
        />
        <button
          type="submit"
          // onClick={() => {
          //   uploadFile(file, "post")
          // }}
          className="p-2 mt-12 w-36 block bg-black self-end text-white rounded-lg"
        >
          Publicar
        </button>
      </form>
    </div>
    // </ApolloProvider>
  )
}

interface IInitialProps extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

NewPost.getInitialProps = async ({
  req,
  res,
  apolloClient: client,
}: IInitialProps) => {
  const cookies = parseCookies(req)

  // const client = createApolloClient()
  const { token } = cookies

  // Verifica se existe um token e se ele ?? v??lido
  try {
    if (!token) throw new Error("Token not provider")

    const { success, userId } = await VerifySession(token, client)

    if (!success) throw new Error("Invalid token provider")

    // console.log(data)

    // const { userId } = data.session

    return {
      userId,
    }
  } catch (e) {
    res.writeHead(307, { Location: "/admin/login" })
    res.end()

    return {
      props: {},
    }
  }
}

export default withApollo({ ssr: true })(NewPost)
