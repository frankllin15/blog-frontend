import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { useCookies, CookiesProvider } from "react-cookie"

import { Resource, Star, File, Inbox } from "../icons"

const CustomLink = ({ href, children, Icon }) => {
  const router = useRouter()

  const path = router.pathname.replace("[slug]", `${router.query.slug}`)

  return (
    <Link href={href}>
      <a className={`flex flex-row pb-4 justify-between`}>
        <p
          className={`${
            path == href
              ? "text-gray-900 font-semibold"
              : "text-gray-300 font-semibold"
          }`}
        >
          {children}
        </p>
        <Icon />
      </a>
    </Link>
  )
}

const Aside = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token", "user"])

  const router = useRouter()

  const handleLogout = () => {
    removeCookie("token", { path: "/admin" })
    removeCookie("user", { path: "/admin" })
    router.reload()
  }

  return (
    <aside className="  p-3 min-w-12 border-r border-opacity-50 shadow-md">
      <h2 className="text-center">Blog</h2>
      {/* <hr className="h-1 w-full" /> */}
      <ul className="mt-4">
        <li>
          <CustomLink href="/admin" Icon={Resource}>
            Posts
          </CustomLink>
        </li>
        <li>
          <CustomLink href="/" Icon={Star}>
            Starred
          </CustomLink>
        </li>
        <li>
          <CustomLink href="/" Icon={File}>
            Saved
          </CustomLink>
        </li>
        <li>
          <CustomLink href="/" Icon={Inbox}>
            Messages
          </CustomLink>
        </li>
        <li>
          <button onClick={handleLogout}>Sair</button>
        </li>
      </ul>
    </aside>
  )
}

export default Aside
