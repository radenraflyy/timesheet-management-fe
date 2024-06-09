import {
  Button,
  Col,
  DatePicker,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  TimePicker,
  Typography,
} from "antd"
import React from "react"
import moment from 'moment';

export default function ModalAct({
  open,
  setOpen,
  onChange,
  inputRef,
  name,
  onNameChange,
  addItem,
  items,
  onSubmit,
  data,
  isLoad
}) {
  return (
    <Modal
      title="Add New Activity"
      centered
      open={open}
      okText={`${isLoad ? "Loading..." : "Save"}`}
      onOk={onSubmit}
      onCancel={() => setOpen(false)}
      width={800}
    >
      <div className="w-full border mb-5"></div>
      <Row gutter={[16, 16]}>
        <Col span={6} xs={12} md={6}>
          <Typography className="text-[#9c9c9c] mb-1">Start Date</Typography>
          <DatePicker
            size="large"
            name="start_date"
            className="w-full"
            value={data?.start_date && moment(data.start_date)}
            onChange={(date, dateString) =>
              onChange({ target: { name: "start_date", value: dateString } })
            }
          />
        </Col>
        <Col span={6} xs={12} md={6}>
          <Typography className="text-[#9c9c9c] mb-1">End Date</Typography>
          <DatePicker
            size="large"
            name="end_date"
            className="w-full"
            value={data?.end_date && moment(data.end_date)}
            onChange={(date, dateString) =>
              onChange({ target: { name: "end_date", value: dateString } })
            }
          />
        </Col>
        <Col span={6} xs={12} md={6}>
          <Typography className="text-[#9c9c9c] mb-1">Start Time</Typography>
          <TimePicker
            size="large"
            name="start_time"
            className="w-full"
            value={data?.start_time && moment(data.start_time, 'HH:mm:ss')}
            onChange={(date, dateString) =>
              onChange({ target: { name: "start_time", value: dateString } })
            }
          />
        </Col>
        <Col span={6} xs={12} md={6}>
          <Typography className="text-[#9c9c9c] mb-1">End Time</Typography>
          <TimePicker
            size="large"
            name="end_time"
            className="w-full"
            value={data?.end_time && moment(data.end_time, 'HH:mm:ss')}
            onChange={(date, dateString) =>
              onChange({ target: { name: "end_time", value: dateString } })
            }
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col span={24}>
          <Typography className="text-[#9c9c9c] mb-1">
            Title Activity
          </Typography>
          <Input
            size="large"
            name="title_activity"
            className="w-full"
            value={data?.title_activity}
            onChange={onChange}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col span={24}>
          <Typography className="text-[#9c9c9c] mb-1">Name Project</Typography>
          <Select
            className="w-full"
            size="large"
            name="id_project"
            placement="bottomLeft"
            value={data?.id_project}
            onChange={(value) =>
              onChange({ target: { name: "id_project", value } })
            }
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  style={{
                    padding: "0 8px 4px",
                  }}
                >
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button
                    type="text"
                    icon={<box-icon name="plus"></box-icon>}
                    onClick={addItem}
                  >
                    Add item
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({
              label: item.name_dropdown,
              value: item.id_dropdown,
            }))}
          />
        </Col>
      </Row>

      <div className="w-full border mt-3"></div>
    </Modal>
  )
}
