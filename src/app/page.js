import React from "react"
import TableTM from "@/components/ui/Table"
import { Button, Card } from "antd"
import TimesheetTable from "@/components/pages/TimesheetTable"
import ActivityProvider from "@/context/ActivityContext"

export default function Home() {
  return (
    <React.Fragment>
      <ActivityProvider>
        <TimesheetTable />
      </ActivityProvider>
    </React.Fragment>
  )
}
