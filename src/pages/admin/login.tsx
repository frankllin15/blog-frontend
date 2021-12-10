import { useMutation } from "@apollo/react-hooks"
import React, { useState } from "react"
import { GetServerSideProps, NextPage, NextPageContext } from "next"
import { useCookies } from "react-cookie"
import { LOGIN_MUTATION, VerifySession } from "../../lib/graphql/multations"
import { withApollo } from "../../services/apollo"
import { useRouter } from "next/router"
import { parseCookies } from "../../utils"
import { ApolloClient, NormalizedCacheObject, gql } from "@apollo/client"
import createApolloClient from "../../services/apolloClient"
import Input from "../../components/Admin/Input"
import { Token } from "graphql"

interface IProps {}

const Login: NextPage<IProps> = ({}) => {
  const [user, setUser] = useState({ email: null, password: null })
  const [login, { data, loading }] = useMutation(LOGIN_MUTATION)
  const [cookie, setCookie] = useCookies(["token", "user"])
  const router = useRouter()

  const handleChange = (e) => {
    let aux = user

    aux[e.target.name] = e.target.value

    setUser({ ...aux })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (user.email && user.password) {
      const { data } = await login({ variables: { ...user } })

      if (data?.login.success) {
        const { token, user } = data.login

        setCookie("token", token, { maxAge: 60 * 60 * 1, path: "/" })
        setCookie("user", JSON.stringify(user), {
          maxAge: 60 * 60 * 1,
          path: "/",
        })

        router.replace("/admin")
      } else {
        router.reload()
      }
    }
  }

  return (
    <div className="font-normal bg-gray-50 w-screen h-screen flex justify-center items-center">
      <form
        className="flex flex-col bg-white w-80 p-5 rounded-md shadow-md"
        action=""
      >
        <h1 className="font-semibold mb-4 text-gray-800">
          Login Area Administrativa
        </h1>
        <hr className="mb-6" />
        <Input placeholder="seu@email.com" name="email" onChange={handleChange}>
          Email
        </Input>
        <Input placeholder="Sua Senha" name="password" onChange={handleChange}>
          Senha
        </Input>
        {data?.login.success == false ? (
          <p className="text-red-700">{data?.login.error[0].message}</p>
        ) : (
          ""
        )}
        {loading && "Loading..."}
        <button
          onClick={handleSubmit}
          type="button"
          className="w-28 h-10 text-center bg-black text-white rounded-md  mt-9"
        >
          Login
        </button>
        <a className="text-center text-gray-400 mt-4" href="/admin/singup">
          Criar conta
        </a>
      </form>
    </div>
  )
}

interface IInitialProps extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   try {
//     const cookies = parseCookies(req)

//     const { token } = cookies
//     const client = createApolloClient()

//     const { success, userId } = await VerifySession(token, client)
//     console.log(success)

//     // se o usuario ja estiver logado
//     if (success) throw new Error("User already loged")

//     return {
//       props: {},
//     }
//   } catch {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//     }
//   }
// }

Login.getInitialProps = async ({
  req,
  res,
  apolloClient: client,
}: IInitialProps) => {
  const cookies = parseCookies(req)

  // const client = createApolloClient()
  const { token } = cookies

  // Verifica se existe um token e se ele é válido
  if (token) {
    const { success } = await VerifySession(token, client)
    console.log("suc:", success)

    if (res) {
      if (success) {
        res.writeHead(307, { Location: "/admin" })
        res.end()
      }
    }
  }

  return {
    props: {},
  }
}

export default withApollo({ ssr: true })(Login)
