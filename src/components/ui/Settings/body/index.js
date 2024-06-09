"use client"
import { useEmployeeContext } from "@/context/EmployeeContext"
import { Form, Input } from "antd"
import React from "react"

export default function MyFormItemBody() {
  const { setData, data } = useEmployeeContext()
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  let dataSetting = localStorage.getItem("data")
  const dataSettingParse = JSON.parse(dataSetting)

  return (
    <>
      <Form.Item label="Name Employee" name="name_employe">
        <Input
          name="name_employe"
          type="text"
          defaultValue={data.name_employe || dataSettingParse?.name_employe_}
          value={dataSettingParse?.name_employe_}
          placeholder="Input Your Name"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="Rate" name="rate">
        <Input
          name="rate"
          prefix="Rp"
          suffix="/Jam"
          type="number"
          defaultValue={data.rate || dataSettingParse?.rate__}
          value={dataSettingParse?.rate__}
          onChange={handleChange}
        />
      </Form.Item>
    </>
  )
}
