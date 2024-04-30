import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import store from './store'
import VueElementLoading from 'vue-element-loading'
import ServerError from './components/Common/500'
import ImageLoader from './components/Common/imageLoader'
import PageLoader from './components/Common/pageLoader'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCountryCode from "vue-country-code";
import VueCropper from 'vue-cropperjs';
import VueMeta from 'vue-meta';
import 'cropperjs/dist/cropper.css';

Vue.use(VueMeta)
Vue.use(VueCountryCode);
Vue.component('ServerError', ServerError)
Vue.component(VueCropper);

Vue.component('ServerError', ServerError)
Vue.component('ImageLoader', ImageLoader)
Vue.component('PageLoader', PageLoader)
Vue.component('VueElementLoading', VueElementLoading)

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCaccNxbzwR9tMvkppT7bT7zNKjChc_yAw',
        libraries: 'places', // This is required if you use the Autocomplete plugin
    },
})
Vue.config.productionTip = false

window.axios = require('axios')

window.axios = require('axios')

// Vue.prototype.baseURL = "http://192.168.49.40:2222"
// axios.defaults.baseURL = "http://192.168.49.40:2222";
// Vue.prototype.mediaUURL = "http://192.168.49.40:2222/u/";
// Vue.prototype.mediaURL = "http://192.168.49.40:2222/wp/";
// Vue.prototype.ipURL = "http://192.168.49.40:2222";

// Vue.prototype.baseURL = "http://192.168.53.134:2222"
// axios.defaults.baseURL = "http://192.168.53.134:2222";
// Vue.prototype.mediaUURL = "http://192.168.53.134:2222/u/";
// Vue.prototype.mediaURL = "http://192.168.53.134:2222/wp/";
// Vue.prototype.ipURL = "http://192.168.53.134:2222";

Vue.prototype.baseURL = "https://api.accessrooms.com"
axios.defaults.baseURL = "https://api.accessrooms.com";
Vue.prototype.mediaUURL = "https://api.accessrooms.com/u/";
Vue.prototype.mediaURL = "https://api.accessrooms.com/wp/";
Vue.prototype.ipURL = "https://api.accessrooms.com";

new Vue({
    router,
    store,

    vuetify,
    render: h => h(App)
}).$mount('#app')