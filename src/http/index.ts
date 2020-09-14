import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import {Result} from "@/types"

const service:AxiosInstance = axios.create({
  timeout: 10000,
  baseURL: '/api'
})

service.interceptors.response.use((res: AxiosResponse) => {
  return res.data
}, (err: AxiosError) => {
  if (err.response && err.response.status) {
    let status = err.response.status
    if (status === 404) {
      alert('接口路径出错')
    }
    return Promise.reject(err)
  }
})

export default service
