<template>
  <v-app>
    <header2 v-if="$route.meta.isagent == true" />
    <AppHeader v-if="$route.meta.isagent == false" />
    <!-- <v-divider v-if="$route.name != 'Login'"></v-divider> -->
    <router-view :key="$route.fullPath" />
    <AppFooter v-if="$route.meta.isagent == false" />
    <footer2 v-if="$route.meta.isagent == true" />
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import axios from "axios";
import store from "./store";
import AppHeader from "./components/Common/appHeader";
import header2 from "./components/Common/AppHeader2";
import AppFooter from "./components/Common/appFooter";

import footer2 from "./components/Common/appFooter2";
import "./assets/font.css";
import "./assets/style.css";
export default {
  name: "App",

  components: {
    // HelloWorld,
    AppHeader,
    header2,
    footer2,
    AppFooter,
  },

  data: () => ({
    //
    verificationStatus: "",
    sideNav: false,
    level: "",
  }),
  beforeMount() {
    if (typeof localStorage.getItem("token") == "string") {
      this.getProfile();
    }
  },
  methods: {
    getProfile() {
      axios({
        method: "GET",
        url: "/profile",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.level = response.data.data.level;
            store.commit("loginUser", response.data.status);

            const nameValue = response.data.data.name;
            localStorage.setItem("profiledata", JSON.stringify(response.data));

            localStorage.setItem("name", nameValue);
            this.verificationStatus = response.data.data.verificationStatus;
            console.log("dewde", response.data.data.verificationStatus);

            // store.commit("changeCart", response.data.cartcount);
            // store.commit("changeWishlist", response.data.wishlistcount);
            store.commit("userData", response.data.data);
            store.commit("level", response.data.data.level);
            store.commit("userType", response.data.data.type);
            if (this.verificationStatus == "Pending" && this.level == 0) {
              console.log("one");
              this.$router.push("/StepOne");
            } else if (
              this.verificationStatus == "Pending" &&
              this.level == 1
            ) {
              this.$router.push("/StepTwo");
            } else if (
              this.verificationStatus == "Pending" &&
              this.level == 2
            ) {
              this.$router.push("/StepThree");
            } else if (
              this.verificationStatus == "Pending" &&
              this.level == 3
            ) {
              this.$router.push("/StepFour");
            } else if (
              this.verificationStatus == "Pending" &&
              this.level == 4
            ) {
              this.$router.push("/finalPage");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // getLink() {
    //   axios({
    //     method: "GET",
    //     url: "/generate/referal/link",
    //     headers: {
    //       "x-auth-token": localStorage.getItem("token"),
    //     },
    //   })
    //     .then((response) => {
    //       if (response.data.status) {
    //         this.$store.commit("link", response.data.link);
    //         this.$store.commit("code", response.data.code);
    //       } else {
    //         this.showSnackBar = true;
    //         this.msg = response.data.msg;
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // getGuestId() {
    //   axios({
    //     method: "GET",
    //     url: "/user/newguest",
    //   })
    //     .then((response) => {
    //       if (response.data.status) {
    //         localStorage.setItem("guestId", response.data.id);
    //         this.$store.commit("guestIdUpdation", response.data.id);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // winStepper(windowData) {
    //   this.sideNav = windowData.sideNav;
    // },
  },
};
</script>
