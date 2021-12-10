import React from "react"

export default function Input({
  name,
  placeholder,
  onChange,
  children,
  type = "text",
}) {
  return (
    <>
      <label htmlFor="password">{children}</label>
      <input
        className="rounded-sm border-b border-gray-400 outline-none p-2 "
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        type={type}
      />
    </>
  )
}
