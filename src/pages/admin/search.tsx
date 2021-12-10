import { useRouter } from "next/router"
import React, { ReactElement, useEffect, useState } from "react"
import Layout from "../../components/Admin/Layout"
import { getAllPosts, getPostBySlug, IPost } from "../../lib/graphql/query"
import { toCabedCase } from "../../utils/index"
import Posts from "../../components/Admin/Posts"
import { IFullPost } from "../../lib/graphql/query"
import { gql } from "@apollo/client"
import { GetServerSideProps } from "next"

interface Props {
  resp: [IPost]
}

interface IQuery {
  q: string
}

function search({ resp }: Props): ReactElement {
  const router = useRouter()
  const [posts, setPosts] = useState<Array<IPost>>([])
  // const { q } = router.query

  useEffect(() => {
    ;(async () => {
      // setPosts(resp)
    })()
  }, [])

  return (
    <Layout>
      <div className="h-screen">
        {posts.length > 0 ? <Posts posts={resp} /> : "Nenhum posts encontrado"}
      </div>
    </Layout>
  )
}

export default search

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q: query } = context.query

  console.log(query)

  const q = gql`
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
  const resp = [await getPostBySlug(toCabedCase(query.toString()))]

  return {
    props: {
      resp,
    },
  }
}
