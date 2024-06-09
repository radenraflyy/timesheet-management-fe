import instance from "@/libs/axios"

const projectService = {
  getListProject: () => instance.get("/projects/get"),
  insertProject: (data) => instance.post("/projects/insert", { name: data }),
}

export default projectService
