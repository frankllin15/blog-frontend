import Head from "next/head"
import { GetStaticProps } from "next"
import { gql } from "@apollo/client"
import { getAllPosts, getPostBySlug, IFullPost } from "../../lib/graphql/query"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import Layout from "../../components/Layout"
import Date from "../../components/Date"

interface IProps {
  post: IFullPost & {
    markdown: string
  }
}

const Post: React.FC<IProps> = ({ post }) => {
  if (post)
    return (
      <>
        <Layout>
          <div className="flex flex-col lg:flex-row w-full bg-gray-100 pt-5 pb-5">
            <aside className="flex flex-1 items-center   mobile:flex-row  h-full pl-2 pt-3 pb-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gray-600 mr-4"></div>
              <div>
                <h3>{post.author.name}</h3>

                <Date dateString={post.created_at} />
              </div>
            </aside>
            <main className="flex-3 flex justify-start">
              <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.description} />
              </Head>

              <article id="" className="pl-4 pr-4 w-full content-post">
                <h1 className="text-3xl text-center font-semibold ">
                  {post.title}
                </h1>
                <p className="text-center mb-3 ">{post.description}</p>
                <hr />
                <section className="mt-9 ">
                  <ReactMarkdown
                    children={post.markdown}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ className, children }) {
                        // Removing "language-" because React-Markdown already added "language-"
                        const language = className?.replace("language-", "")
                        return (
                          <SyntaxHighlighter
                            style={darcula}
                            language={language}
                            children={children[0]}
                          />
                        )
                      },
                    }}
                  />
                </section>
              </article>
            </main>
            <aside className="flex-1 mobile:w-full"></aside>
          </div>
        </Layout>
      </>
    )
}

export async function getStaticPaths() {
  const query = gql`
    query {
      getPosts {
        posts {
          slug
        }
      }
    }
  `
  const posts = await getAllPosts(query)

  const paths = posts.map((post) => ({ params: { slug: post.slug } }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const post = await getPostBySlug(slug)

  const base_url = "localhost:4000"
  const url = "storage/post/8ab1895b-8fd2-4cac-8114-aa9f3fedf76e.md"

  // console.log(new URL(url, base_url))

  const resp = await fetch(
    "https://localhost:4000/storage/post/8ab1895b-8fd2-4cac-8114-aa9f3fedf76e.md"
  )

  const md = await resp.text()

  return {
    props: {
      post: { ...post, markdown: md },
    },
  }
}

export default Post
