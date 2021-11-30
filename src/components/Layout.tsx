import React, { ReactElement, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
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
    <div className="flex flex-col  min-h-screen  bg-gray-50">
      <Header />
      <div className="w-full h-full flex items-center shadow-md rounded-md justify-center mt-24">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
