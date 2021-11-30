// Import React dependencies.
import React, { useMemo, useState } from "react"
// Import the Slate editor factory.
import { createEditor } from "slate"

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react"
import { BaseEditor, Descendant } from "slate"
import { ReactEditor } from "slate-react"

type CustomElement = { type: "paragraph"; children: CustomText[] }
type CustomText = { text: string }

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [
        { text: "This is editable plain text, just like a <textarea>!" },
      ],
    },
  ]

  const [value, setValue] = useState<Descendant[]>(initialValue)
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable />
    </Slate>
  )
}

export default Editor
