import React from "react"
import styles from "../styles/ButtonMenu.module.css"

const ToogleButtomMenu = ({ handleClick }) => {
  return (
    <div onClick={() => handleClick()} className={styles.nav_icon}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default ToogleButtomMenu
