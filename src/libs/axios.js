import axios from 'axios'

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*',
  "Cache-Control": "no-cache",
  Expires: 0,
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers
})

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default instance