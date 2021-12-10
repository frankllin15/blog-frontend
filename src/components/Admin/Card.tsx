import React, { ReactElement } from "react"
import { Pencil } from "../icons"
import { IPost } from "../../lib/graphql/query"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

interface Props {
  post: IPost & {
    post_image: string
  }
}

// --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//   box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

const Button = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -1.25rem;
  right: -1.25rem;
  border-radius: 50%;
  background-color: white;
  width: 2.5rem;
  height: 2.5rem;
  z-index: 100;

  :hover {
    span {
      opacity: 100;
    }
  }
`

function Card({ post }: Props): ReactElement {
  return (
    <div>
      <div className="w-44 h-44 relative rounded-md  shadow-md mr-4">
        <div className="group ">
          <div className="w-full flex items-center justify-center duration-300  opacity-0 h-full z-10 absolute bg-gray-400 blur-2xl group-hover:opacity-60">
            <Link href={`posts/${post.slug}`}>
              <a className="pl-2 pr-2 pt-1 pb-1 z-50 rounded-md opacity-100 bg-black text-white">
                Ir para o post
              </a>
            </Link>
          </div>
          <Image
            onError={() => console.log("Erro na imagem")}
            src={"https://" + post.post_image}
            layout="fill"
            alt="Poster"
            className="transform duration-700 group-hover:scale-105 rounded-md"
          />
        </div>
        <Button className="shadow-md">
          <Pencil />
          <span className="bg-black duration-200 ease-in-out text-white rounded-md p-1 z-10 font-semibold absolute -bottom-10 opacity-0 ">
            Editar
          </span>
        </Button>
      </div>

      <h3 className="mt-4">{post.title}</h3>
    </div>
  )
}

export default Card
