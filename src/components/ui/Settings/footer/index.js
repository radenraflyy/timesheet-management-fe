import { Button } from "antd"
import React from "react"
import { useEmployeeContext } from "@/context/EmployeeContext"
import Link from "next/link"

export default function CTXSettings() {
  const { saveData } = useEmployeeContext()

  return (
    <div className="flex gap-2 justify-between items-center">
      <Button
        type="text"
        className="text-[#2775EC] w-full bg-[#F7F8FB]"
        htmlType="submit"
      >
        <Link href={"/"}>Cancel</Link>
      </Button>
      <Button
        type="primary"
        className="w-full"
        htmlType="submit"
        onClick={saveData}
      >
        Save
      </Button>
    </div>
  )
}
