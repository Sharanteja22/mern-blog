import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'

export default function CreatePost() {
  const [content, setContent] = useState('')

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput id="title" type="text" placeholder="Title Required" required className="flex-1" />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">Java Script</option>
            <option value="reactjs">React Js</option>
            <option value="nextjs">Next JS</option>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button className="bg-white-500" type="button" size="sm" outline>
            Upload image
          </Button>
        </div>

        <div className="my-4">
          <textarea
            value={content}
            onChange={handleContentChange}
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Write your content here..."
          />
        </div>

        <Button type="submit" className="bg-teal-500 text-white">
          Publish
        </Button>
      </form>
    </div>
  )
}
