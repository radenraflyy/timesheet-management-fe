"use client"
import React, { useRef, useState } from "react"
import HeadersT from "../ui/Table/headers"
import ModalAct from "../ui/Modal/addActivity"
import ModalFilter from "../ui/Modal/filterActivity"
import TableTM from "../ui/Table"
import { useActivityContext } from "@/context/ActivityContext"
import ModalActUpdate from "../ui/Modal/updateActivity"

const CTimesheet = () => {
  const {
    lisProject,
    addProject,
    setNameProject,
    nameProject,
    setData,
    data,
    addActivity,
    openUpdate,
    setOpenUpdate,
    getListActivityById,
    updateActivity,
    setIdActivities,
    isLoading,
    open,
    setOpen,
    filterActivity,
    getListActivity,
    handleSearch,
  } = useActivityContext()
  const [openFilter, setOpenFilter] = useState(false)
  const inputRef = useRef(null)
  const onChange = (event, dateString, value) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const onNameChange = (event) => {
    setNameProject(event.target.value)
  }

  const handleFilter = (value) => {
    if (value.length > 0) {
      filterActivity(value)
    } else {
      getListActivity()
    }
  }

  let index = 0
  const addItem = async (e) => {
    e.preventDefault()
    await addProject()
    setNameProject("")
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleAddActivity = async () => {
    await addActivity()
  }

  const handleUpdateActivity = async () => {
    await updateActivity()
  }
  return (
    <>
      {/* Header table */}
      <HeadersT
        setOpen={setOpen}
        setOpenFilter={setOpenFilter}
        onSearch={handleSearch}
      />

      {/* Table yang berisi list list activity yang ada di database */}
      <TableTM />

      {/* Modal untuk meng-insert sebuah data activity */}
      <ModalAct
        open={open}
        setOpen={setOpen}
        onChange={onChange}
        inputRef={inputRef}
        name={nameProject}
        onNameChange={onNameChange}
        addItem={addItem}
        items={lisProject}
        onSubmit={handleAddActivity}
        data={data}
        isLoad={isLoading}
      />

      {/* Modal untuk meng-update sebuah data activity */}
      <ModalActUpdate
        open={openUpdate}
        setOpen={setOpenUpdate}
        onChange={onChange}
        inputRef={inputRef}
        name={nameProject}
        onNameChange={onNameChange}
        addItem={addItem}
        items={lisProject}
        onSubmit={handleUpdateActivity}
        data={data}
        dataById={getListActivityById}
        setData={setData}
        idAct={setIdActivities}
        isLoad={isLoading}
      />

      {/* Modal untuk melakukan filter pada table timesheet dengan berdasarkan project */}
      <ModalFilter
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        options={lisProject}
        handleFilter={handleFilter}
      />
    </>
  )
}
export default CTimesheet
