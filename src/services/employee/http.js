import instance from '@/libs/axios'

const employeeService = {
  insertEmployee: (data) => instance.post('/employees/insert', data),
  updateEmployee: (data, id) => instance.put(`/employees/update/${id}`, data)
}

export default employeeService