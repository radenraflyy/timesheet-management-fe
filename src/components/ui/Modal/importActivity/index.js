"use client"
import { Button, Col, Divider, message, Modal, Row, Upload } from "antd"
import React, { useState } from "react"

const Import = ({
  open,
  handleCancel,
  props,
  fileList,
  loading,
  handleImport,
}) => {
  return (
    <Modal
      title="Import CSV Field"
      onCancel={() => handleCancel(false)}
      open={open}
      width={400}
      centered={true}
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={() => handleCancel(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          className="bg-[#F15858] text-white"
          loading={loading}
          onClick={handleImport}
        >
          Import
        </Button>,
      ]}
    >
      <Divider className="my-4" />
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <div
            style={{ paddingBottom: 10, fontWeight: "400", fontSize: "15px" }}
          >
            Upload File
          </div>
          <Upload
            {...props}
            fileList={fileList}
            accept=".csv"
            defaultFileList={false}
          >
            <Button className="w-[260px] sm:w-[350px] rounded-none">
              Import Taks with CSV
            </Button>
          </Upload>
        </Col>
      </Row>
      <Divider className="my-4" />
    </Modal>
  )
}

export default Import
