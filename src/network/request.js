import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/m3',
    timeout: 50000
  })

  //2.1 request请求拦截器
  instance.interceptors.request.use(config => {
    //拦截完要把config  return回去
    return config
  },err => {
    console.log(err);
  })
  //2.2响应拦截器
  instance.interceptors.response.use(res => {
    //拦截完要把res  return回去
    return res.data
  },err => {
    console.log(err);
  })


  //3.发送真正的网络请求
  return instance(config)
}
