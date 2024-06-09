import instance from "@/libs/axios"

const activityService = {
  getListActivity: () => instance.get("/timesheets-activity/get"),
  insertActivity: (data) => instance.post("/timesheets-activity/insert", data),
  updateActivity: (data, id) =>
    instance.patch(`/timesheets-activity/update/${id}`, data),
  deleteActivity: (id) => instance.delete(`/timesheets-activity/delete/${id}`),
  filterActivity: (id) => instance.get(`/timesheets-activity/filter/${id}`),
  exportActivity: () => instance.get("/timesheets-activity/export"),
  importActivity: (file) => {
    const formData = new FormData()
    formData.append("file_csv", file)

    return instance.post("/timesheets-activity/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
}

export default activityService
