import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import nprogress from 'nprogress'

const service: AxiosInstance = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
  timeout: 10000
})

service.interceptors.request.use((config:AxiosRequestConfig): AxiosRequestConfig => {
  nprogress.start()
  let token = localStorage.getItem('token')
  config.headers['Auth'] = token
  return config
}, (err: AxiosError) => {
  nprogress.done()
  console.log(err)
  return Promise.reject(err)
})


service.interceptors.response.use((res: AxiosResponse): AxiosResponse => {
  nprogress.done()
  return res.data
}, (err: AxiosError) => {
  nprogress.done()
   if (err.response && err.response.status) {
     let status = err.response.status
     if (status === 400) {
      Message.error('参数错误')
    }
    if (status === 401) {
      Message.error('登录过期,请重新登录')
    }
    if (status === 403) {
      Message.error('没有权限')
    }
    if (status === 404) {
      Message.error('接口路径错误')
    }
    if (status === 500) {
      Message.error('服务器出错')
    }
    if (status === 503) {
      Message.error('服务器在维护')
    }
   }
})

export default service