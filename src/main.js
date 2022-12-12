import Vue from 'vue'
import App from './App.vue'
import Antd, { Modal } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import 'swiper/css/swiper.css'

import router from "./router/index";
// import store from "./store/index"
import axios from 'axios'
import { VueAxios } from './utils/request';
import * as service from '@/utils/axios.base'
import req from './api/index'
import moment from 'moment';



if (process.env.NODE_ENV === 'mock') {
  require('./mock')
}

Vue.config.productionTip = false
Vue.prototype.$service=service;
Vue.prototype.$Modal = Modal
Vue.prototype.$req=req;
Vue.prototype.$moment=moment;

Vue.use(Antd)
// Vue.use(swiper)
Vue.use(VueAxios,axios)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
