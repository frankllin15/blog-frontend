import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import navBarStyles from "../styles/NavBar.module.css"
import buttonMenuStyles from "../styles/ButtonMenu.module.css"
import ToogleButtomMenu from "./ToogleButtomMenu"

const CustomLink = ({ children, href }) => {
  const router = useRouter()

  const path = router.pathname.replace("[slug]", `${router.query.slug}`)

  console.log(href)
  return (
    <a
      className={`mobile:text-white mobile:mb-5 mobile:text-3xl ${
        navBarStyles.underscore
      } ${path == href ? navBarStyles.active : ""}`}
      href={href}
    >
      {children}
    </a>
  )
}

const Header: React.FC = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", () => {
      const width = window.innerWidth

      if (open && width > 720) {
        const navBar = document.getElementsByClassName(navBarStyles.navbar)[0]
        const buttom = document.getElementsByClassName(
          buttonMenuStyles.nav_icon
        )[0]
        navBar?.classList.remove(navBarStyles.open)
        buttom?.classList.remove(buttonMenuStyles.open)
      }
    })
  }, [])

  const handleTootleClick = () => {
    const navBar = document.getElementsByClassName(navBarStyles.navbar)[0]
    const buttom = document.getElementsByClassName(buttonMenuStyles.nav_icon)[0]
    if (open) {
      navBar.classList.remove(navBarStyles.open)
      buttom.classList.remove(buttonMenuStyles.open)
    } else {
      navBar.classList.add(navBarStyles.open)
      buttom.classList.add(buttonMenuStyles.open)
    }

    setOpen(!open)
  }

  const router = useRouter()

  const path = router.pathname

  if (path === "/admin") return null

  return (
    <header className="w-screen  h-16 bg-white-trasparent backdrop-filter backdrop-blur-lg saturate-150 fixed top-0 shadow-sm z-50">
      <div className="w-full group flex h-full  flex-row items-center justify- pl-4 p-4">
        <div className="flex flex-1 md:justify-center z-30 h-full items-center">
          <a href="/">
            <p>Logo Bonito</p>
          </a>
        </div>
        <nav
          className={
            "navbar flex h-full w-full  mobile:fixed mobile:h-0 mobile:opacity-0  mobile:text-white mobile:left-0 mobile:transition  mobile:flex-col mobile:items-start mobile:pl-7 mobile:justify-start mobile:pt-11  overflow-hidden top-0 flex-row justify-around flex-3 items-center " +
            navBarStyles.navbar
          }
        >
          <CustomLink href="/posts/outro-post">Services</CustomLink>
          <CustomLink href="">Case Studies</CustomLink>
          <CustomLink href="">Work</CustomLink>
          <CustomLink href="">Blog</CustomLink>
          <CustomLink href="">About</CustomLink>
        </nav>

        <ToogleButtomMenu handleClick={handleTootleClick} />
      </div>
    </header>
  )
}

export default Header
