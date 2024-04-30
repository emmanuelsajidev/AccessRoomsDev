<template>
  <v-app>
    <AppHeader v-if="$route.meta.isvendor == false" />
    <AppHeader2 v-if="$route.meta.isvendor == true" />
    <router-view :key="$route.fullPath" />
    <AppFooter v-if="$route.meta.isvendor == false" />
    <AppFooter2 v-if="$route.meta.isvendor == true" />
  </v-app>
</template>

<script>
import axios from "axios";
import store from "./store";
import AppHeader from "./components/AppHeader";
import AppHeader2 from "./components/appHeader2";
import AppFooter from "./components/AppFooter";
import AppFooter2 from "./components/appFooter2";
import "./assets/font.css";
import "./assets/style.css";

export default {
  components: {
    AppHeader,
    AppHeader2,
    AppFooter,
    AppFooter2,
  },

  data() {
    return {
      showsnackbar: false,
      timeout: 2000,
      msg: null,
      check: false,
      sideNav: false,
      level: "",
      isvendorLogin: localStorage.getItem("isvendorLogin"),
    };
  },
  mounted() {
    if (typeof localStorage.getItem("token") == "string") {
      this.getProfile();
    }
  },
  watch: {},
  methods: {
    getProfile() {
      axios({
        method: "GET",
        url: "vendor/profile",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            store.commit("loginUser", response.data.status);
            store.commit("userData", response.data.data);
            store.commit("userName", response.data.data.name);
            store.commit("userType", response.data.data.role);
            const boatTypes = response.data.data.vendorCategory.map(
              (item) => item.categoryType
            );
            store.commit("boatType", boatTypes);

            this.level = response.data.data.level;
            store.commit("level", response.data.data.level);
            localStorage.setItem("level", response.data.data.level);
            if (response.data.vendordata.bankDetails) {
              if (response.data.vendordata.bankDetails.passBook) {
                var passbook = response.data.vendordata.bankDetails.passBook;
                store.commit("passbook", passbook);
              }
              if (response.data.vendordata.bankDetails.qrCode) {
                var qrCode = response.data.vendordata.bankDetails.qrCode;
                store.commit("qrCode", qrCode);
              }
            }
            if (response.data.vendordata.voteridProof) {
              var voteridProof = response.data.vendordata.voteridProof;
              store.commit("voteridProof", voteridProof);
            }
            if (response.data.vendordata.licenseProof) {
              var licenseProof = response.data.vendordata.licenseProof;
              store.commit("licenseProof", licenseProof);
            }
            if (response.data.data.verificationStatus) {
              var isverified = response.data.data.verificationStatus;
              store.commit("isverified", isverified);
              localStorage.setItem(
                "isverified",
                response.data.data.verificationStatus
              );
            }
            if (response.data.data.isPassword) {
              var isPassword = response.data.data.isPassword;
              localStorage.setItem("isPassword", isPassword);
            }
            if (response.data.data.is_phone_verified) {
              var is_phone_verified = response.data.data.is_phone_verified;
              localStorage.setItem("is_phone_verified", is_phone_verified);
            }
            this.verificationStatus = response.data.data.verificationStatus;
            // console.log('verificationStatus=',this.verificationStatus)
            // console.log('level=',this.level)
            if (this.verificationStatus == "Verified" && this.level == 4) {
              localStorage.setItem("isvendorLogin", true);
            }
            if (this.verificationStatus == "Pending" && this.level == 0) {
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
              this.$router.push("/Approval");
            }
            // else if(this.verificationStatus=='Verified' && this.level==4 && this.isvendorLogin==false)
            // {
            //     store.commit("logoutUser", true);
            //     this.$router.push("/Login");

            // }
            // else if(this.verificationStatus=='Verified' && this.level==4)
            // {
            //     console.log("REDIRECTED")
            //     this.$router.push("/dashboard");

            // }
            else {
              // this.$router.push("/");
              console("else");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
