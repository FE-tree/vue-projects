import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);

import Toast from 'muse-ui-toast';
Vue.use(Toast);
import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';
Vue.use(Message);

// import axios from './utils/request';
// Vue.$axios = Vue.prototype.$axios = axios;
import api from './utils/api';
Vue.$api = Vue.prototype.$api = api;

import bus from './utils/bus'
Vue.$bus = Vue.prototype.$bus = bus

// 自定义指令
import durFormat from './directives/durationFormat'
Vue.directive('durFormat', durFormat)
import singerFormat from './directives/singerformat'
Vue.directive('singerFormat', singerFormat)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
