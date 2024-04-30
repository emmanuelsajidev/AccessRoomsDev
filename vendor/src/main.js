import Vue from 'vue'
import App from './App.vue'
// import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router'
import axios from 'axios'
import store from './store'
import VueElementLoading from 'vue-element-loading'
import ServerError from './common/500'
import ImageLoader from './common/imageLoader'
import PageLoader from './common/pageLoader'
// import * as VueGoogleMaps from 'vue2-google-maps'
import VueCountryCode from "vue-country-code";
import ConfirmDialog from '@/components/ConfirmDialog.vue';
Vue.component('confirm-dialog', ConfirmDialog);
Vue.use(Vuetify);

const vuetify = new Vuetify();
Vue.use(VueCountryCode);

Vue.component('ServerError', ServerError)
Vue.component('ImageLoader', ImageLoader)
Vue.component('PageLoader', PageLoader)
Vue.component('VueElementLoading', VueElementLoading)
import Viewer from "v-viewer";
Vue.use(Viewer);
// Vue.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyCaccNxbzwR9tMvkppT7bT7zNKjChc_yAw',
//         libraries: 'places',
//     },
// })
Vue.config.productionTip = false

window.axios = require('axios')
// axios.defaults.baseURL = 'http://192.168.48.198:3300';

// Vue.prototype.baseURL = "http://192.168.53.52:2222"
// axios.defaults.baseURL = "http://192.168.53.52:2222";
// Vue.prototype.mediaUURL = "http://192.168.53.52:2222/u/";
// Vue.prototype.mediaURLs = "http://192.168.53.52:2222/wp/";
// Vue.prototype.ipURL = "http://192.168.53.52:2222";

// Vue.prototype.baseURL = "http://192.168.53.134:2222"
// axios.defaults.baseURL = "http://192.168.53.134:2222";
// Vue.prototype.mediaUURL = "http://192.168.53.134:2222/u/";
// Vue.prototype.mediaURLs = "http://192.168.53.134:2222/wp/";
//  Vue.prototype.ipURL = "http://192.168.53.134:2222";

Vue.prototype.baseURL = "https://api.accessrooms.com"
axios.defaults.baseURL = "https://api.accessrooms.com";
Vue.prototype.mediaUURL = "https://api.accessrooms.com/wp?key=";
Vue.prototype.ipURL = "https://api.accessrooms.com";

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')