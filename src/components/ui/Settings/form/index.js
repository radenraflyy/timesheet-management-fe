"use client"
import { Form } from "antd"
import React from "react"

export default function SettingForm({ children }) {  
  return (
    <>
      <main className="flex justify-center items-center min-h-[89vh] p-4">
        <Form
          className="rounded-xl shadow-sm bg-white w-full lg:w-1/3 p-10"
          name="form_item_path"
          layout="vertical"
          onFinish={""}
        >
          {children}
        </Form>
      </main>
    </>
  )
}
