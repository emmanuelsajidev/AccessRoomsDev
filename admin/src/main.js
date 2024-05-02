import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import store from './store'
import PageLoader from './components/Common/PageLoader'
import ServerError from './components/Common/500'
import ImageLoader from './components/Common/imageLoader'

Vue.component("VueElementLoading", VueElementLoading);
import VueElementLoading from 'vue-element-loading'

import { VueEditor } from "vue2-editor";
Vue.component('VueEditor', VueEditor)
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
Vue.component(VueCropper);
import OtpInput from "@bachdgvn/vue-otp-input";
Vue.component("v-otp-input", OtpInput);
Vue.component('PageLoader', PageLoader)
Vue.component('ImageLoader', ImageLoader)
Vue.component('PageLoader', PageLoader)
Vue.component('VueElementLoading', VueElementLoading)
Vue.component('ServerError', ServerError)
Vue.config.productionTip = false

// window.axios = require('axios')
// axios.defaults.baseURL = 'http://192.168.53.134:2222';
// Vue.prototype.baseURL = "http://192.168.53.134:2222"
// // Vue.prototype.mediaURLnewx = "http://192.168.51.171:2222/u/"
// Vue.prototype.mediaURLnewx = "http://192.168.53.134:2222/wp?key="
// Vue.prototype.mediaURLnews = "http://192.168.53.134:2222/file/get/"


window.axios = require('axios')
axios.defaults.baseURL = 'https://api.accessrooms.com/';
Vue.prototype.baseURL = "https://api.accessrooms.com/"
Vue.prototype.mediaURL = "https://api.accessrooms.com/wp?key="
Vue.prototype.mediaURLnewx = "https://api.accessrooms.com/u/"







new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')