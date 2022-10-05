// 创建一个axios实例
// 请求拦截器，如果有token，头部携带token
// 响应拦截器，剥离无效数据，处理token失效
// 导出一个函数，调用当前的axios实例发请求，返回值promise
import axios from 'axios'
import store from '@/store'
import router from '@/router'
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // 对axios进行配置，baseurl，timeout
  baseURL,
  timeout: 5000
})
instance.interceptors.request.use(
  (config) => {
    const { profile } = store.state.user
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
instance.interceptors.response.use(res => { return res.data }, err => {
  if (err.response && err.response.state === 401) {
    // 清除本地无用的用户信息
    // 跳转到登录页
    // 跳转需要传参(当前的地址)给登录页
    store.commit('user/setUser', {})
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  // 请求的参数：请求地址，请求方式，请求携带的数据
  return instance({
    url,
    method,
    // 如果是get请求，需要使用params来传递submitData
    // 如果不是get请求，需要使用data来传递submitData
    // []设置一个动态的key，可以写js表达式，js表达式的执行结果会当作key
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
