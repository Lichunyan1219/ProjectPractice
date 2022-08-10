// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeToken } from '@/utils/auth'
import store from '@/store'
import router from '@/router'
// 定义token过期时间
function isTimeout() {
  const currentTime = Date.now()
  const tokenTime = getTimeToken()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use(async(config) => {
  const token = store.state.user.token
  if (token) {
    if (isTimeout()) {
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('用户信息过期，请重新登录'))
    } else {
      config.headers.Authorization = store.state.user.token
    }
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    if (res.config.responseType === 'blob') {
      return res
    }
    if (res.data.success !== undefined) {
      const { success, msg } = res.data
      if (success) {
        return res.data
      }
      Message.error(msg)
      return Promise.reject(new Error(message))
    }
    return res
  },
  function(error) {
    // 前端被动token过期
    if (error?.response?.status === 401) {
      Message.error('用户信息过期，请重新登录')
      store.dispatch('user/logout')
      router.push('/login')
    } else if (error?.response?.status === 500) {
      Message.error(error.response.data)
      return Promise.reject(new Error(msg))
    } else if (error?.config?.url.startsWith('/api/vm-service/policy')) {
      Message.error(error?.response?.data)
      return Promise.reject(new Error(massage))
    } else {
      Message.error(error.massage)
    }
    // else if (error?.response?.status === 500) {
    // Message.error(error.massage)
    // }
  }
) // 响应拦截器
export default service // 导出axios实例
