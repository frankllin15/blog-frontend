import React, { ReactElement } from "react"
import Editor from "../../components/Admin/Editor"

interface Props {}

function write({}: Props): ReactElement {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen">
      <Editor />
    </div>
  )
}

export default write
