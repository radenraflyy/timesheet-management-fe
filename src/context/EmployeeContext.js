"use client"
import { createContext, useContext, useState } from "react"
import employeeService from "@/services/employee/http"
import { message } from "antd"

const EmployeeContext = createContext(null)

const Employee = ({ children }) => {
  let dataSetting = localStorage.getItem("data")
  const dataSettingParse = JSON.parse(dataSetting)
  const [data, setData] = useState({
    name_employe: dataSettingParse?.name_employe_ || "",
    rate: dataSettingParse?.rate__ || 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const saveData = async () => {
    setIsLoading(true)
    try {
      if (dataSettingParse === null) {
        if (data.name_employe !== "" || data.rate !== 0) {
          const res = await employeeService.insertEmployee(data)
          if (res.status === 200) {
            setIsLoading(false)
            message.success(res.data.messages)
            localStorage.setItem("data", JSON.stringify(res.data.data[0]))
          } else {
            setIsLoading(false)
            message.error(res.data.messages)
          }
          return res
        } else {
          message.error("Please input data")
        }
      } else if (dataSettingParse !== null) {
        const res = await employeeService.updateEmployee(
          data,
          dataSettingParse.id_employee_
        )
        if (res.status === 200) {
          setIsLoading(false)
          message.success(res.data.messages)
          localStorage.setItem("data", JSON.stringify(res.data.data[0]))
        } else {
          setIsLoading(false)
          message.error(res.data.messages)
        }
        return res
      }
    } catch (error) {
      message.error(error.message)
      console.log(error.message)
      setIsLoading(false)
    }
  }

  const value = { data, setData, isLoading, setIsLoading, saveData }

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext)

  if (context === undefined) {
    throw new Error(`useEmployee must be use within a Global Context`)
  } else {
    return context
  }
}

export default Employee
