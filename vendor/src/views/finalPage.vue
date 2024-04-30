<template>
  <div>
    <v-img src="./../assets/images/final.png">
      <v-layout wrap justify-center fill-height>
        <v-flex xs11 sm10 md6 style="position: relative; margin-top: 10%">
          <v-card elevation="0" style="border-radius: 10px">
            <v-layout wrap justify-space-between>
              <v-flex
                xs12
                style="
                  background-color: #f17343;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                "
                pa-4
              >
                <span
                  style="
                    font-family: LexendFont;
                    font-weight: 500;
                    font-size: 20px;
                    color: white;
                  "
                  >Waiting for Appproval</span
                >
              </v-flex>
              <v-flex
                xs9
                pt-8
                pb-16
                px-8
                style="
                  background-color: rgba(255, 255, 255, 1);
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                "
              >
                <span
                  style="
                    font-family: RobotoRegular;
                    font-weight: 400;
                    font-size: 15px;
                  "
                  >Your account is waiting for our administrator approval.<br />
                  Please check back later.</span
                >
              </v-flex>
              <v-flex xs2 mt-6>
                <v-img
                  contain
                  height="80%"
                  width="80%"
                  src="./../assets/images/clock.png"
                ></v-img>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>
<script>
import axios from "axios";
import store from "../store";
export default {
  data() {
    return {
      showsnackbar: false,
      timeout: 5000,
      msg: null,

      level: "",
      verificationStatus: "",
    };
  },
  mounted() {
    this.getProfile();
    this.intervalId = setInterval(this.getProfile, 10000);
  },

  destroyed() {
    clearInterval(this.intervalId);
  },
  // mounted() {
  //   this.getProfile();
  // },
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
            this.level = response.data.data.level;
            store.commit("loginUser", response.data.status);
            store.commit("userData", response.data.data);
            store.commit("level", response.data.data.level);
            // store.commit("userType", response.data.data.type);
            this.level = response.data.data.level;
            this.verificationStatus = response.data.data.verificationStatus;
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
            } else if (
              this.verificationStatus == "Verified" &&
              this.level == 4
            ) {
              // store.commit("logoutUser", true);
              this.$router.push("/dashboard");
            } else {
              this.$router.push("/");
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