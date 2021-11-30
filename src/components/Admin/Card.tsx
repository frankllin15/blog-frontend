import React, { ReactElement } from "react"
import { Pencil } from "../icons"
import { IPost } from "../../lib/graphql/query"
import Image from "next/image"

interface Props {
  post: IPost
}

function Card({ post }: Props): ReactElement {
  return (
    <div>
      <div className="w-44 h-44 relative shadow-md mr-4">
        <Image
          onError={() => console.log("Erro na imagem")}
          src="/images/post.jpg"
          layout="fill"
          alt="Poster"
          className="transform duration-700 group-hover:scale-105 rounded-md"
        />
        <button className="bg-white flex justify-center items-center absolute   -bottom-5 -right-5 w-8 h-8 rounded-full shadow-md m-2">
          <Pencil />
        </button>
      </div>
      <h3 className="mt-4">{post.title}</h3>
    </div>
  )
}

export default Card
