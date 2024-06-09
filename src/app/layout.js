"use client"
import { Nunito } from "next/font/google"
import { ConfigProvider, Spin } from "antd"
import Navbar from "@/components/ui/Navbar"
import LoadingSpinner from "@/components/ui/Loading"

import "./globals.css"
import "boxicons/css/boxicons.min.css"
import { useEffect, useState } from "react"

const nunito = Nunito({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(false)
  }, [])
  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  }
  const content = <div style={contentStyle} />
  return (
    <html lang="en">
      <body className={(nunito.className, "bg-[#F7F8FB]")}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: nunito,
            },
          }}
        >
          <Navbar />
          {isLoading ? <LoadingSpinner /> : children}
        </ConfigProvider>
      </body>
    </html>
  )
}
