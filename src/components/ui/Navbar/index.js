"use client"
import Link from "next/link"
import React from "react"
import useStyles from "./style"

export default function Navbar() {
  const { styleItemNav, styleItemNavSettings } = useStyles()

  return (
    <>
      <div className="border bg-white">
        <div className="flex flex-wrap justify-around md:justify-normal items-center gap-2 lg:gap-10 px-10 py-3">
          <div className="flex items-center gap-2 w-44">
            <i className="bx bxl-squarespace bx-lg text-[#F15858]"></i>
            <h2 className="font-extrabold text-center text-[#F15858]">
              Timesheet Management
            </h2>
          </div>
          <div className="font-light">
            <Link href="/" className={styleItemNav}>
              Activity List
            </Link>
            <Link href="settings" className={styleItemNavSettings}>
              Setting
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
