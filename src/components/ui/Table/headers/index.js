import { Button, Space, Typography } from "antd"
import Search from "antd/es/transfer/search"
import React from "react"

export default function HeadersT({ setOpen, setOpenFilter, onSearch }) {
  return (
    <Space
      style={{
        padding: "10px",
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="flex gap-4 items-center">
        <Typography className="text-md lg:text-lg font-bold">Daftar Kegiatan</Typography>
        <Button
          className="bg-[#F0F6FF] text-[#2775EC]"
          onClick={() => setOpen(true)}
        >
          <i className="bx bxs-plus-circle text-[#2775EC]"></i>Add Activity
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <Search
          placeholder="input search text"
          allowClear
          size="large"
          onChange={(event) => onSearch(event.target.value)}
          style={{
            width: 200,
          }}
        />
        <Button
          type="default"
          className="text-[#F15858] h-10"
          onClick={() => setOpenFilter(true)}
        >
          <i className="bx bx-filter text-3xl"></i>
        </Button>
      </div>
    </Space>
  )
}
