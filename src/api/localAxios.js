import axios from 'axios'

//该axios实例用于请求本地json
export default axios.create({
  timeout:3000,
  baseURL:'/mock/'
})