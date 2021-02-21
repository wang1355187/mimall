import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Message } from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css';
// import env from './env'

Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message = Message;

//axios默认配置
axios.defaults.timeout = 8000;
// axios.defaults.baseURL = env.baseURL;

//请求接口拦截
axios.interceptors.response.use((response)=>{
  let res = response.data;
  let path = location.hash;
  if(res.status==0){
    return res.data;
  }else if(res.status==10) {
    if(path!='#/index' && path!='#/register'){
      window.location.href = '/#/login';
    }
    return Promise.reject();
  }else {
    Message.warning(res.msg);
    return Promise.reject();
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
