"use client"
import React from "react"
import SettingForm from "../ui/Settings/form"
import MyFormItemBody from "../ui/Settings/body"
import CTXSettings from "../ui/Settings/footer"

const CSettings = () => {
  return (
    <SettingForm>
      <MyFormItemBody />
      <CTXSettings />
    </SettingForm>
  )
}

export default CSettings
