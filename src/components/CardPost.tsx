import React from "react"
import Image from "next/image"
import Link from "next/link"
import { toCabedCase } from "../lib/index."

interface IData {
  title: string
  description: string
  slug: string
  //   poster_path: string
}

interface IProps {
  data: IData
}

const CardPost: React.FC<IProps> = ({ data }) => {
  return (
    <Link href={`/posts/${data.slug}`}>
      <div className="flex flex-col w-52 max-w-sm mobile:w-full justify-start hover:cursor-pointer group">
        <Image
          onError={() => console.log("Erro na imagem")}
          src="/images/post.jpg"
          width={200}
          height={200}
          alt="Poster"
          className="transform duration-700 group-hover:scale-105 rounded-md"
        />
        <h2 className="text-black text-xl font-bold">{data.title}</h2>
        <p className="text-gray-800">{data.description}</p>
      </div>
    </Link>
  )
}

export default CardPost
