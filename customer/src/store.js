import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);
export default new Vuex.Store({

  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    userData: {},
    appLoading: false,
    queryPopUpDialog: false,
   guestId:"",
    loginType:localStorage.getItem("loginType"),
    HBsearchItems:{},
    SKsearchItems:{},
    myTab:"",
  },
  mutations: {
    appLoading(state, payload) {
      state.appLoading = payload;
    },
    myTab(state, payload) {
      state.myTab = payload;
    },
    HBsearchItems(state, payload) {
      state.HBsearchItems = payload;
    },
    SKsearchItems(state, payload) {
      state.SKsearchItems = payload;
    },
    role(state, payload) {
      state.role = payload 
      console.log("role=",state.role)
    },
    userName(state, payload) {
      state.userName = payload 
      console.log("userName=",state.userName)
    },
    userData(state, payload) {
      state.userData = payload 
      console.log("userData=",state.userData)
    },
    // loginType(state, payload) {
    //   state.loginType = payload 
    //   console.log("loginType=",state.loginType)
    // },
    loginUser(state, payload) {
      state.isLoggedIn = true;
      state.token = payload
      console.log("isloggedin=",state.isLoggedIn)
      // if (state.isLoggedIn == true && state.role == 'Vendor') {
      //   router.push("/StepOne") 
      // }
    },
   
    logoutUser(state) {
      // state.role = null;
      state.isLoggedIn = false;
      state.userData = {};
      state.initial = "";
      state.voteridProof="";
      state.licenseProof="";
      state.passbook="";
      state.qrCode="";
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.clear();
      console.log("store logiut")
      router.push("/");

    },
    
  },
  actions: {
 
}
});
