"use client"
import React, { createElement } from "react"
import CTimesheet from "../container/CTimesheet"
import { Button, Card, message } from "antd"
import { useActivityContext } from "@/context/ActivityContext"
import activityService from "@/services/activity/http"
import moment from "moment"
import ImportModal from "../ui/Modal/importActivity"

const TimesheetTable = () => {
  const {
    setOpenImport,
    openImport,
    setFileList,
    fileList,
    isLoading,
    setIsLoading,
    file,
    setFile,
    getListActivity,
  } = useActivityContext()
  const storage = localStorage.getItem("data")
  const data = {
    nameEmployee: JSON.parse(storage)?.name_employe_,
    rate: JSON.parse(storage)?.rate__,
  }

  const props = {
    name: "file_csv",
    onChange(info) {
      setFileList(info.fileList)
      console.log(info.file.type === "text/csv")
      if (info.file.type === "text/csv") {
        if (info.file.status === "done" && info.file.type === "text/csv") {
          message.success(`Uploaded successfully`)
          setFile(info.file.originFileObj)
        } else if (info.file.status === "error") {
          message.error(`Upload failed`)
        }
      } else {
        message.error("Only type csv files are allowed")
      }
    },
  }

  const handleExport = async () => {
    try {
      const res = await activityService.exportActivity()
      const csvData = res.data
      const dateTime = moment().utcOffset("+07:00").toObject()
      const name = `list_activity_${dateTime.hours}${dateTime.minutes}${dateTime.seconds}.csv`

      const csvBlob = new Blob([csvData], { type: "text/csv" })
      const csvUrl = window.URL.createObjectURL(csvBlob)

      const link = document.createElement("a")
      link.href = csvUrl
      link.setAttribute("download", name)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(csvUrl)

      message.success("Export Success")
    } catch (error) {
      message.error("Export failed")
      console.error(error)
    }
  }

  const handleImport = async () => {
    setIsLoading(true)
    try {
      if (file !== null) {
        const res = await activityService.importActivity(file)
        if (res.status === 200) {
          getListActivity()
          setIsLoading(false)
          setOpenImport(false)
          setFileList([])
          setFile(null)
          message.success(res.data.messages)
        } else {
          setIsLoading(false)
          setOpenImport(false)
          setFileList([])
          setFile(null)
          message.error(res.data.messages)
        }
      } else {
        setIsLoading(false)
        setFileList([])
        setFile(null)
        message.error("Only type csv files are allowed")
      }
    } catch (error) {
      setIsLoading(false)
      setFileList([])
      setFile(null)
      console.log(error)
    }
  }

  return (
    <div className="p-3 lg:p-7">
      <Card
        title={
          <div className="flex max-md:flex-wrap items-start lg:gap-14 mb-3">
            <div>
              <p className="text-sm text-[#6a6a6a]">Nama Karyawan</p>
              <p className="text-[15px] text-[#7d7d7d]">
                {data?.nameEmployee || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#6a6a6a]">Rate</p>
              <p className="text-[15px] text-[#7d7d7d]">
                RP. {data?.rate || "-"}
              </p>
            </div>
          </div>
        }
        extra={
          <div className="flex gap-2 items-center">
            <Button
              type="dashed"
              className="px-5 text-white bg-[#2775EC]"
              onClick={handleExport}
            >
              Export
            </Button>
            <Button
              type="dashed"
              className="px-5 text-white bg-[#F15858]"
              onClick={() => setOpenImport(true)}
            >
              Import
            </Button>
          </div>
        }
        bordered={false}
        className="px-0 py-0 lg:px-3 lg:py-5 overflow-auto"
      >
        <CTimesheet />
      </Card>
      <ImportModal
        open={openImport}
        handleCancel={setOpenImport}
        props={props}
        fileList={fileList}
        loading={isLoading}
        handleImport={handleImport}
      />
    </div>
  )
}

export default TimesheetTable
