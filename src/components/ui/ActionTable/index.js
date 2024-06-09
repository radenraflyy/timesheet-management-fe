import { useActivityContext } from "@/context/ActivityContext"
import { Button } from "antd"
import React from "react"

const ActionTM = ({ id }) => {
  const { setOpenUpdate, setIdActivities, deleteActivity, idActivities } =
    useActivityContext()
  const handleUpdate = async (id_activities) => {
    await setOpenUpdate(true)
    await setIdActivities(id_activities)
  }
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => handleUpdate(id)}
        type="default"
        className="bg-[#F7F8FB]"
      >
        <i className="bx bx-edit-alt bx-xs text-[#F15858]"></i>
      </Button>
      <Button
        type="default"
        className="bg-[#F7F8FB]"
        onClick={() => deleteActivity(id)}
      >
        <i className="bx bx-trash-alt bx-xs text-[#F15858]"></i>
      </Button>
    </div>
  )
}

export default ActionTM
