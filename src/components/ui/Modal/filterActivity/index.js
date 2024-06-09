import { Modal, Select, Typography } from "antd"
import React from "react"

export default function ModalFilter({
  openFilter,
  setOpenFilter,
  options,
  handleFilter,
}) {
  return (
    <Modal
      title="Filter"
      centered
      open={openFilter}
      okText="Filtered"
      onOk={() => setOpenFilter(false)}
      onCancel={() => setOpenFilter(false)}
      width={800}
    >
      <div className="w-full border mb-5"></div>
      <Typography className="text-[#9c9c9c] mb-1">Project</Typography>
      <Select
        mode="multiple"
        size={"large"}
        placeholder="Please select"
        // defaultValue={['a10', 'c12']}
        onChange={handleFilter}
        style={{
          width: "100%",
        }}
        options={options.map((item) => ({
          label: item.name_dropdown,
          value: item.id_dropdown,
        }))}
      />
      <div className="w-full border mt-3"></div>
    </Modal>
  )
}
