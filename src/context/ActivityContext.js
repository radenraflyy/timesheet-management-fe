"use client"
import activityService from "@/services/activity/http"
import projectService from "@/services/project/http"
import { convertToSeconds, formatCurrency, formatDuration } from "@/utils"
import { message } from "antd"
import { useContext, createContext, useState, useEffect } from "react"

const AcitvityContext = createContext(null)

const Activity = ({ children }) => {
  const [data, setData] = useState({
    title_activity: "",
    id_project: null,
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
  })
  const [nameProject, setNameProject] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [idActivities, setIdActivities] = useState(null)
  const [lisActivity, setLisActivity] = useState([])
  const [lisProject, setLisProject] = useState([])
  const [fileList, setFileList] = useState([])
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openImport, setOpenImport] = useState(false)
  const [open, setOpen] = useState(false)
  const [filteredActivity, setFilteredActivity] = useState(lisActivity)

  const storage = localStorage.getItem("data")
  const rate = JSON.parse(storage)?.rate__

  let getListActivityById
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getListActivityById = lisActivity.filter(
      (item) => item.id_activities === idActivities
    )
    if (getListActivityById.length > 0) {
      setData({
        ...data,
        title_activity: getListActivityById[0]?.title,
        id_project: getListActivityById[0]?.id_project_,
        start_date: getListActivityById[0]?.start_date_,
        end_date: getListActivityById[0]?.end_date_,
        start_time: getListActivityById[0]?.start_time_,
        end_time: getListActivityById[0]?.end_time_,
      })
    }
  }, [idActivities !== null, openUpdate === true])

  useEffect(() => {
    setFilteredActivity(
      lisActivity?.filter((activity) =>
        activity?.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, lisActivity])

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const getListActivity = async () => {
    try {
      const result = await activityService.getListActivity()
      setLisActivity(result.data.data)
    } catch (error) {
      message.error(error.data.messages)
      console.log(error)
    }
  }

  const getListProject = async () => {
    try {
      const result = await projectService.getListProject()
      setLisProject(result.data.data)
    } catch (error) {
      message.error(error.data.messages)
      console.log(error)
    }
  }

  const addProject = async () => {
    setIsLoading(true)
    try {
      const result = await projectService.insertProject(nameProject)
      if (result.status === 200) {
        setIsLoading(false)
        message.success(result.data.messages)
        setNameProject("")
        getListProject()
      } else {
        setIsLoading(false)
        message.error(result.data.messages)
      }
    } catch (error) {
      message.error(error.data.messages)
      console.log(error)
      setIsLoading(false)
    }
  }

  const addActivity = async () => {
    setIsLoading(true)
    try {
      if (
        data.title_activity !== "" &&
        data.id_project !== null &&
        data.start_date !== null &&
        data.end_date !== null &&
        data.start_time !== null &&
        data.end_time !== null
      ) {
        const result = await activityService.insertActivity(data)
        if (result.status === 200) {
          setIsLoading(false)
          setOpen(false)
          message.success(result.data.messages)
          setData({
            title_activity: "",
            id_project: null,
            start_date: null,
            end_date: null,
            start_time: null,
            end_time: null,
          })
          getListActivity()
        } else {
          setIsLoading(false)
          message.error(result.data.messages)
        }
      } else {
        setIsLoading(false)
        message.error("Please input data")
      }
    } catch (error) {
      message.error(error.data.messages)
      console.log(error)
      setIsLoading(false)
    }
  }

  const updateActivity = async () => {
    setIsLoading(true)
    try {
      const result = await activityService.updateActivity(data, idActivities)
      if (result.status === 200) {
        setIsLoading(false)
        setOpenUpdate(false)
        setData({
          title_activity: "",
          id_project: null,
          start_date: null,
          end_date: null,
          start_time: null,
          end_time: null,
        })
        getListActivity()
        message.success(result.data.messages)
      } else {
        setIsLoading(false)
        message.error(result.data.messages)
      }
    } catch (error) {
      setIsLoading(false)
      message.error(error.data.messages)
      console.log(error)
    }
  }

  const deleteActivity = async (id) => {
    try {
      const result = await activityService.deleteActivity(id)
      if (result.status === 200) {
        message.success(result.data.messages)
        getListActivity()
      } else {
        message.error(result.data.messages)
      }
    } catch (error) {
      message.error(error.data.messages)
      console.log(error)
    }
  }

  const filterActivity = async (id) => {
    try {
      const res = await activityService.filterActivity(id)
      if (res.status === 200) {
        setLisActivity(res.data.data)
        message.success(res?.data?.messages)
      } else {
        message.error(res?.data?.messages)
      }
    } catch (error) {
      console.log(error)
      message.error(error?.data?.message)
    }
  }

  const convertToDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`
  }

  const calculateDuration = () => {
    let totalSeconds = 0
    lisActivity?.forEach((item) => {
      totalSeconds += convertToSeconds(item.duration_)
    })
    const res = convertToDuration(totalSeconds)
    return formatDuration(res)
  }

  const calculateIncome = () => {
    let totalSeconds = 0
    lisActivity?.forEach((item) => {
      totalSeconds += convertToSeconds(item.duration_)
    })
    const totalHours = totalSeconds / 3600
    const earnings = totalHours * rate
    return formatCurrency(earnings)
  }

  useEffect(() => {
    getListActivity()
    getListProject()
  }, [])

  const value = {
    data,
    setData,
    lisActivity,
    setLisActivity,
    nameProject,
    setNameProject,
    lisProject,
    setLisProject,
    isLoading,
    setIsLoading,
    addProject,
    addActivity,
    openUpdate,
    setOpenUpdate,
    idActivities,
    setIdActivities,
    getListActivityById,
    updateActivity,
    deleteActivity,
    open,
    setOpen,
    filterActivity,
    getListActivity,
    calculateDuration,
    calculateIncome,
    setOpenImport,
    openImport,
    setFileList,
    fileList,
    file,
    setFile,
    handleSearch,
    filteredActivity,
  }

  return (
    <AcitvityContext.Provider value={value}>
      {children}
    </AcitvityContext.Provider>
  )
}

export const useActivityContext = () => {
  const context = useContext(AcitvityContext)
  if (context === undefined) {
    throw new Error("useActivity must be use within a Global Context")
  } else {
    return context
  }
}

export default Activity
