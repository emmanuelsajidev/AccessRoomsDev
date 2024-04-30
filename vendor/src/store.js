import Vue from "vue";
import Vuex from "vuex";
import router from "./router";

Vue.use(Vuex);
export default new Vuex.Store({

  state: {
    isLoggedIn: !!localStorage.getItem("token"),
    userType: localStorage.getItem("role"),
    userData: {},
    appLoading: false,
    queryPopUpDialog: false,
    isverified:"",
    level:"",
    userName:"",
    voteridProof:"",
    licenseProof:"",
    passbook:"",
    qrCode:"",
    boatType:[],
    loginType:localStorage.getItem("loginType"),
  },
  mutations: {
    appLoading(state, payload) {
      state.appLoading = payload;
    },
    boatType(state, payload) {
      state.boatType = payload;
      console.log("boatType in store=", state.boatType);
      localStorage.setItem("boatType", JSON.stringify(state.boatType));
    },
    voteridProof(state, payload) {
      state.voteridProof = payload 
      // console.log("voteridProof=",state.voteridProof)
    },
    licenseProof(state, payload) {
      state.licenseProof = payload 
      // console.log("licenseProof=",state.licenseProof)
    },
    qrCode(state, payload) {
      state.qrCode = payload 
      // console.log("qrCode=",state.qrCode)
    },
    passbook(state, payload) {
      state.passbook = payload 
      // console.log("passbook=",state.passbook)
    },
    userType(state, payload) {
      state.userType = payload 
      // console.log("userType=",state.userType)
    },
    userName(state, payload) {
      state.userName = payload 
     // console.log("userName=",state.userName)
    },
    userData(state, payload) {
      state.userData = payload 
     // console.log("userData=",state.userData)
    },
    loginType(state, payload) {
      state.loginType = payload 
     // console.log("loginType=",state.loginType)
    },
    loginUser(state, payload) {
      state.isLoggedIn = true;
      state.userData = payload
     // console.log("isloggedin=",state.isLoggedIn)
      // if (state.isLoggedIn == true && state.userType == 'Vendor') {
      //   router.push("/StepOne") 
      // }
    },
    level(state,payload){
      state.level = payload 
     // console.log("state.level=",state.level)
//      
    },
    isverified(state, payload) {
      state.isverified = payload 
     // console.log("isverified=",state.isverified)
    },
    logoutUser(state) {
      // state.userType = null;
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
