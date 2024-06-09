import { Button } from "antd"
import { formatDate, convertToSeconds, formatDuration } from "../index"
import ActionTM from "@/components/ui/ActionTable"
export const columnsT = [
  {
    title: "Title Activites",
    dataIndex: "title",
    sorter: {
      compare: (a, b) => a.title - b.title,
      multiple: 3,
    },
  },
  {
    title: "Name Project",
    dataIndex: "project_name",
    sorter: {
      compare: (a, b) => a.project_name - b.project_name,
      multiple: 3,
    },
  },
  {
    title: "Start Date",
    dataIndex: "start_date_",
    sorter: {
      compare: (a, b) => a.start_date_ - b.start_date_,
      multiple: 2,
    },
    render: (date) => formatDate(date),
  },
  {
    title: "End Date",
    dataIndex: "end_date_",
    sorter: {
      compare: (a, b) => a.end_date_ - b.end_date_,
      multiple: 1,
    },
    render: (date) => formatDate(date),
  },
  {
    title: "Start Time",
    dataIndex: "start_time_",
    sorter: {
      compare: (a, b) => a.start_time_ - b.start_time_,
      multiple: 1,
    },
  },
  {
    title: "End Time",
    dataIndex: "end_time_",
    sorter: {
      compare: (a, b) => a.end_time_ - b.end_time_,
      multiple: 1,
    },
  },
  {
    title: "Duration",
    dataIndex: "duration_",
    sorter: {
      compare: (a, b) => {
        const aSeconds = convertToSeconds(a.duration_)
        const bSeconds = convertToSeconds(b.duration_)
        return aSeconds - bSeconds
      },
      multiple: 1,
    },
    render: (text) => formatDuration(text),
  },
  {
    title: "Action",
    dataIndex: "id_activities",
    render: (id_activities) => <ActionTM id={id_activities} />,
    width: 50,
  },
]
