import { IPost, IFullPost } from "../../lib/graphql/query"
import Card from "./Card"

interface Props {
  posts: Array<IPost>
}

const Post = ({ posts }: Props) => {
  return (
    <div className="flex justify-around w-full flex-wrap pb-4 pt-4">
      {posts
        ? posts.map((post, id) => <Card post={post} key={id} />)
        : "Nem um post ainda."}
    </div>
  )
}

export default Post
