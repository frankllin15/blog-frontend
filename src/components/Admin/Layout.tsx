import React, { ReactElement, useState } from "react"
import Header from "./Header"
import Aside from "./Aside"
import Posts from "./Posts"
import { useRouter } from "next/router"

interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props): ReactElement {
  const router = useRouter()
  const [searchKey, setSearchKey] = useState("")

  const handleSearch = () => {
    router.push(`/admin/search?q=${searchKey}`)
  }

  return (
    <div className="flex flex-row h-full min-h-screen  bg-gray-50">
      <Aside />
      <div className="flex flex-col align-top  self-start w-full  p-5">
        <Header handleSearch={handleSearch} setSearchKey={setSearchKey} />
        <div className="w-full  flex items-center shadow-md rounded-md justify-center mt-24">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
