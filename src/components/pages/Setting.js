import React from "react"
import CSettings from "../container/CSettings"
import EmployeeProvider from "@/context/EmployeeContext"

export default function SettingP() {
  return (
    <EmployeeProvider>
      <CSettings />
    </EmployeeProvider>
  )
}
