<template>
  <div>
    <v-img height="100vh" src="./../../assets/images/final.png">
      <v-layout wrap justify-center fill-height>
        <v-flex xs11 sm10 md6 style="position: relative; margin-top: 10%">
          <v-card elevation="0" style="border-radius: 10px">
            <v-layout wrap justify-space-between>
              <v-flex
                xs12
                style="
                  background-color: rgba(241, 115, 67, 1);
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                "
                pa-4
              >
                <span
                  style="
                    font-family: LexendRegular;
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
                    font-family: LexendRegular;
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
                  src="./../../assets/images/clock.png"
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
import store from "../../store";

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
          if (response.data.status) {
            this.level = response.data.data.level;
            localStorage.setItem("name", response.data.data.name);
            localStorage.setItem("role", response.data.data.role);
            store.commit("userType", response.data.data.role);
            store.commit("userData", response.data.data);
            store.commit("userName", response.data.data.name);
            const boatTypes = response.data.data.vendorCategory.map(
              (item) => item.categoryType
            );
            store.commit("boatType", boatTypes);
            var type1 = "UserLogin";
            store.commit("loginType", type1);
            localStorage.setItem("loginType", type1);
            localStorage.setItem("id", response.data.data._id);
            // store.commit("id", response.data.data._id);

            localStorage.setItem("name", response.data.data.name);
            localStorage.setItem("role", response.data.data.role);

            localStorage.setItem(
              "isverified",
              response.data.data.verificationStatus
            );
            localStorage.setItem("level", response.data.data.level);
            store.commit("isverified", response.data.data.verificationStatus);
            store.commit("level", response.data.data.level);

            store.commit("loginUser", response.data.token);
            // localStorage.setItem("token", response.data.token);
            localStorage.setItem("isagentLogin", true);

            this.verificationStatus = response.data.data.verificationStatus;
            if (this.verificationStatus == "Verified" && this.level == 4) {
              this.$router.push("/dashboard");
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
