import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        isLoggedIn: !!localStorage.getItem("token"),
        userType: localStorage.getItem('userType'),
        userData: {},
        utype: null,


        menus: [],
        initial: "",
        appLoading: false
    },
    mutations: {
        setUtype(state, utype) {
            state.utype = utype;
        },
        userData(state, item) {
            state.userData = item
        },

        sessionOut(state) {
            localStorage.removeItem("token");
            state.isLoggedIn = false;
            router.push("/");
        },
        logoutUser(state) {
            axios({
                method: "GET",
                url: "/logout/",
                headers: {
                    "token": localStorage.getItem("token")
                }
            }).then(response => {
                if (response.data) {
                    state.isLoggedIn = false
                    state.userData = {}
                    state.initial = "";
                    localStorage.removeItem("token");
                    router.push('/')
                }
            })
        },
        role(state, item) {
            state.role = item
        },
        loginUser(state, payload) {
            localStorage.setItem("token", payload);
            state.isLoggedIn = true
        },

    },

})