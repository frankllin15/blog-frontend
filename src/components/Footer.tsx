import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const Footer = () => {
  const router = useRouter()

  const path = router.pathname

  if (path === "/admin") return null

  return (
    <footer className="h-footer bg-gray-900 mt-10 flex flex-col justify-center items-center pl-10 pr-10">
      <div className="flex flex-col text-center items-center ">
        <h3 className="text-white font-semibold text-5xl mb-8 mobile:text-3xl">
          Tem um projeto em mente? Vamos construir juntos.
        </h3>
        <Link href="/contato">
          <button className="h-9 w-40 p-4 flex items-center rounded-md shadow-md transform duration-300 hover:scale-105  bg-white text-left mb-8">
            <p className="font-semibold">Entre em contato</p>
          </button>
        </Link>
      </div>
      <hr className="w-full" />
      <div></div>
    </footer>
  )
}

export default Footer
