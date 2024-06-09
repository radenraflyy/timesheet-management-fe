"use client"
import React from "react"
import { Table } from "antd"
import { columnsT } from "@/utils/columns_table"
import FooterT from "./footer"
import { useActivityContext } from "@/context/ActivityContext"

const TableTM = () => {
  const { filteredActivity } = useActivityContext()
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra)
  }

  return (
    <>
      <Table
        columns={columnsT}
        onChange={onChange}
        dataSource={filteredActivity}
        footer={() => <FooterT />}
      />
    </>
  )
}
export default TableTM
