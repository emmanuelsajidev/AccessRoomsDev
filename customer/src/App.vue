<template>
  <v-app>
    <AppHeader/>
    <v-dialog
        v-model="queryPopUpDialog"
        persistent
        height="100%"
        :width="
          $vuetify.breakpoint.name == 'xs'
            ? '100vw'
            : $vuetify.breakpoint.name == 'sm'
            ? '100vw'
            : $vuetify.breakpoint.name == 'md'
            ? '100vw'
            : $vuetify.breakpoint.name == 'lg'
            ? '100vw'
            : '100vw'
        "
      >
        <v-card tile color="#FFFFFF">
          <v-layout wrap justify-center pa-2>
            <v-flex xs12>
              <QueryPopUp @stepper="winStepper2" />
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    <router-view :key="$route.fullPath" />
    <AppFooter />
  </v-app>
</template>

<script>
import axios from "axios";
import store from "./store";
import AppHeader from "./components/appHeader";
import AppFooter from "./components/appFooter";
import QueryPopUp from "./common/queryPopUp";
import "./assets/font.css";
import "./assets/style.css";

export default {
  components: {
    AppHeader,
    AppFooter,
    QueryPopUp,
  },

  data() {
    return {
      showsnackbar: false,
      timeout: 2000,
      msg: null,
      check:false,
      sideNav: false,
      level:"",
      queryPopUpDialog: false,
      isvendorLogin:localStorage.getItem('isvendorLogin')
    };
  },
  computed: {
    isLoggedIn(){
      return this.$store.state.isLoggedIn; 
    },
  },
  mounted() {
    var curGuestId = localStorage.getItem("guestId")
    if(curGuestId){
      console.log("already guestid present")
    }
    else{
    this.getGuestId();
    }
    if (typeof localStorage.getItem("token") == "string") {
      this.getProfile();
   
  }
  setTimeout(() => {
          this.queryPopUpDialog = true;
        }, 20000);
  },
  watch: {
    isLoggedIn(){
      if(this.isLoggedIn==false){
        this.getGuestId();
      }
      else{
        console.log("no guest")
      }
    }
  },
  methods: {
    getProfile() {
      axios({
        method: "GET",
        url: "/profile",
        headers: {
        token : localStorage.getItem("token"),
        }, 
      })
        .then((response) => {
          if (response.data.status) {
            if (response.data.status) {
          const customerId=response.data.data._id;
          localStorage.setItem("customerId",customerId);
          }
            else{
              console("no customer id")
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGuestId(){
      axios({
          method: "POST",
          url: "/generate/guestid",
        })
          .then((response) => {
            if (response.data.status == true) {
              localStorage.setItem("guestId", response.data.id);
            } else {
              this.msg = response.data.msg;
              this.showSnackbar = true;
            }
          })
          .catch((err) => {
            store.commit("appLoading", false);
            this.ServerError = true;
            console.log(err);
          });
    },
     winStepper2(windowData) {
      this.queryPopUpDialog = windowData.queryPopUpDialog;
      this.queryPopUpDialog = windowData.dialog;
      if (windowData.msg) {
        this.msg = windowData.msg;
        this.showSnackBar = true;
      }
    },
  },
};
</script>
<style>
  body {
    overflow-x: hidden;
}
</style>
