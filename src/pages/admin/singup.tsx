import { useMutation } from "@apollo/react-hooks"
import { NextPage, NextPageContext } from "next"
import { string } from "prop-types"
import React, { useEffect, useState } from "react"
import FormWrapper from "../../components/Admin/FormWrapper"
import Input from "../../components/Admin/Input"
import { SINGUP_MUTATION, VerifySession } from "../../lib/graphql/multations"
import { withApollo } from "../../services/apollo"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import { ApolloClient, NormalizedCacheObject } from "@apollo/client"
import { parseCookies } from "../../utils"

const Singup: NextPage = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const [createUser, { data, error }] = useMutation(SINGUP_MUTATION)

  const router = useRouter()
  const [cookies, setCookies] = useCookies(["token", "user"])

  const handleChange = (e) => {
    setUser((prev) => {
      prev[e.target.name] = e.target.value

      return prev
    })
  }

  const handleSubmit = async () => {
    // console.log(user)
    try {
      createUser({ variables: { ...user } })

      // console.log(await data)
    } catch (e) {
      console.log(e)
    }
  }
  // console.log(user)

  useEffect(() => {
    console.log(data)
    console.log(error)

    if (data) {
      if (data.createUser.success) {
        const { token, user } = data.createUser

        setCookies("token", token, { path: "/", maxAge: 60 * 60 * 1 })
        setCookies("user", JSON.stringify(user), {
          path: "/",
          maxAge: 60 * 60 * 1,
        })
        router.replace("/admin")
      }
    }
  }, [data, error])

  return (
    <FormWrapper>
      <Input
        placeholder="Primeiro e segundo nome"
        name="name"
        onChange={handleChange}
      >
        Nome
      </Input>

      <Input placeholder="seu@email.com" name="email" onChange={handleChange}>
        Email
      </Input>
      {!data?.createUser.success &&
      data?.createUser.error.some((e) => e.code == "P2002") ? (
        <span className="text-red-500">Email já cadastrado</span>
      ) : (
        ""
      )}
      <Input
        placeholder="Sua Senha"
        name="password"
        type="password"
        onChange={handleChange}
      >
        Senha
      </Input>

      <button
        onClick={handleSubmit}
        type="button"
        className="w-28 h-10 text-center bg-black text-white rounded-md  mt-9"
      >
        Login
      </button>
    </FormWrapper>
  )
}

interface IInitialProps extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

Singup.getInitialProps = async ({
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

export default withApollo({ ssr: false })(Singup)
