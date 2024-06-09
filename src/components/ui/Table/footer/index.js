import { useActivityContext } from "@/context/ActivityContext"
import { Typography } from "antd"
import React from "react"

export default function FooterT() {
  const { calculateDuration, calculateIncome } = useActivityContext()
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Typography className="text-[#2775EC] mb-3 text-[15px] font-medium">Total Durasi</Typography>
        <Typography className="text-[#2775EC] mb-3 text-[15px] font-medium">
          {calculateDuration()}
        </Typography>
      </div>
      <div className="flex justify-between items-center">
        <Typography className="text-[#2775EC] font-bold text-lg">
          Total Pendapatan
        </Typography>
        <Typography className="text-[#2775EC] font-bold text-lg">
          {calculateIncome()}
        </Typography>
      </div>
    </div>
  )
}
