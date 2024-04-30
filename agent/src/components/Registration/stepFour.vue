<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="#ff6200" right top :timeout="3000">
      <v-layout wrap>
        <v-flex text-center class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <div>
      <v-img src="./../../assets/images/reg4.png">
        <v-row justify="center" class="pt-10">
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="text-center pt-xs-0 pt-sm-10 pt-lg-15 pt-md-10 pt-xl-15"
          >
            <v-row justify="center">
              <v-col cols="12" class="pa-0">
                <span style="font-family: LexendRegular"
                  >Agent Registration Process</span
                >
              </v-col>
              <v-col cols="12">
                <span style="font-family: LexendRegular; font-size: 14px"
                  >Complete all required fields with accurate information to
                  ensure a smooth and personalized experience</span
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-img>
    </div>
    <div>
      <v-row justify="center" class="pb-10 bg pt-6">
        <v-col cols="11" sm="8" md="5" class="changeStyle">
          <v-card rounded="xl">
            <v-row justify="center" class="px-10 py-10">
              <v-col cols="11" sm="10">
                <v-row justify="center">
                  <v-col cols="12" class="pb-8">
                    <v-img
                      contain
                      src="./../../assets/images/reg4Bar.png"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col cols="12" class="pa-0 pb-5 pt-5">
                    <span style="font-family: LexendRegular"
                      >Submit your request
                    </span>
                  </v-col>
                  <v-col cols="12" class="pa-0 pb-5">
                    <span
                      style="
                        font-family: LexendRegular;
                        font-size: 14px;
                        color: #656565;
                      "
                      >Please review all the information you previously typed in
                      the past steps ,and all the details provided are valid and
                      genuine
                    </span>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    class="text-center"
                    align-self="center"
                  >
                    <v-img
                      src="./../../assets/images/reg4Submit.png"
                      height="90%"
                      width="90%"
                    ></v-img>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" sm="6" md="4">
                    <v-btn
                      block
                      color="#F17343"
                      rounded
                      @click="setpFour()"
                      style="
                        background: linear-gradient(to bottom, orange);
                        color: white;
                      "
                      ><span
                        style="font-family: LexendRegular; text-transform: none"
                        >Submit</span
                      ></v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <v-row justify="start" class="pt-10">
            <v-col cols="12" sm="6" md="3" class="text-left">
              <v-btn block rounded color="white" to="/StepThree"
                ><span style="font-family: LexendRegular; text-transform: none"
                  >Previous</span
                ></v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
   <script>
import axios from "axios";
import store from "../../store";
export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      snackbar: false,
      timeout: 5000,
      msg: null,
      value: "",
      phone: "",
    };
  },
  computed: {
    appUser() {
      return this.$store.state.userData;
    },
  },
  methods: {
    setpFour() {
      // if (this.$refs.form.validate()) {
      axios({
        method: "POST",
        url: "/agent/registration/level4",
        data: {
          agentid: this.appUser._id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.status) {
          this.msg = "Successfully Registered";
          this.snackbar = true;
          // store.commit("loginUser", response.data.data);
          store.commit("userData", response.data.data);
          store.commit("level", response.data.data.level);
          this.$router.push("/finalPage");
          // localStorage.setItem("token", response.data.signingData.token);
          // localStorage.removeItem("userId");
        } else {
          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },
  },
};
</script>
  <style>
.bg {
  background: url("./../../assets/images/reg1Back.png") no-repeat center center;
}
.changeStyle {
  position: relative;
  margin-top: -15%;
  @media (max-width: 960px) {
    position: relative;
    margin-top: 0%;
  }
}
@media only screen and (min-width: 960px) and (max-width: 1100px) {
  .changeStyle {
    position: relative;
    margin-top: -10%;
  }
}
</style>