<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackBar" color="#ff6200" right :timeout="3000">
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <div>
      <v-img
        src="./../../assets/images/layout6.png"
        :height="
          $vuetify.breakpoint.name == 'xs'
            ? '180px'
            : $vuetify.breakpoint.name == 'sm'
            ? '200px'
            : $vuetify.breakpoint.name == 'md'
            ? '290px'
            : $vuetify.breakpoint.name == 'lg'
            ? '420px'
            : '690px'
        "
      >
        <v-row justify="center" class="pt-10">
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="text-center pt-xs-0 pt-sm-10 pt-lg-15 pt-md-10 pt-xl-15"
          >
            <v-row justify="center">
              <v-col cols="12" class="pa-0">
                <span
                  style="font-family: LexendFont; font-weight: 500"
                  :style="{
                    'font-size':
                      $vuetify.breakpoint.name == 'xs'
                        ? '20px'
                        : $vuetify.breakpoint.name == 'sm'
                        ? '20px'
                        : $vuetify.breakpoint.name == 'md'
                        ? '20px'
                        : $vuetify.breakpoint.name == 'lg'
                        ? '25px'
                        : '35px',
                  }"
                  >Vendor Registration Process</span
                >
              </v-col>
              <v-col cols="12">
                <span
                  style="font-family: RobotoLight; font-weight: 400"
                  :style="{
                    'font-size':
                      $vuetify.breakpoint.name == 'xs'
                        ? '15px'
                        : $vuetify.breakpoint.name == 'sm'
                        ? '15px'
                        : $vuetify.breakpoint.name == 'md'
                        ? '15px'
                        : $vuetify.breakpoint.name == 'lg'
                        ? '18px'
                        : '30px',
                  }"
                  >Please provide us with the necessary details to enhance your
                  experience and ensure everything runs smoothly.</span
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-img>
    </div>
    <div>
      <v-row justify="center" class="pb-10 bg">
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
                    <span style="font-family: LexendMedium"
                      >Submit your request
                    </span>
                  </v-col>
                  <v-col cols="12" class="pa-0 pb-5">
                    <span
                      style="
                        font-family: RobotoRegular;
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
                      rounded
                      @click="setpFour()"
                      color="#f17343"
                      style="cursor: pointer"
                      ><span
                        style="
                          font-family: LexendFont;
                          text-transform: none;
                          color: white;
                        "
                        >Submit</span
                      ></v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <v-row justify="space-between" class="pt-10">
            <v-col cols="12" sm="6" md="3" class="text-left">
              <v-btn block rounded color="white" to="/StepTwo"
                ><span style="font-family: LexendRegular; text-transform: none"
                  >Edit</span
                ></v-btn
              >
            </v-col>

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
      <v-dialog width="450px" v-model="confirmDialog">
        <v-card width="450px" class="pa-2" style="border-radius: 10px">
          <v-card-text class="pa-4">
            <v-layout wrap justify-center>
              <v-flex xs11 py-6 text-center>
                <span
                  style="
                    font-family: LexendFont;
                    font-weight: 600;
                    font-size: 20px;
                    color: black;
                  "
                  >Are you sure you want <br />to leave?</span
                >
              </v-flex>
              <v-flex xs5 ml-4 py-4 text-center>
                <v-img src="./../../assets/images/img1.png" contain></v-img>
              </v-flex>
              <v-flex xs11 text-center pb-6>
                <span
                  style="
                    font-family: RobotoLight;
                    font-weight: 400;
                    font-size: 18px;
                    color: black;
                  "
                >
                  Profile verification will commence only <br />after you have
                  completed all the<br />
                  required details.</span
                >
              </v-flex>
              <v-flex xs11 sm5 text-left pb-6>
                <v-btn color="#f17343" outlined @click="handleCancel">
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                      color: #f17343;
                    "
                    >Leave</span
                  >
                </v-btn>
              </v-flex>
              <v-flex xs11 sm5 text-right pb-6>
                <v-btn color="#f17343" dark @click="handleConfirm">
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                      color: white;
                    "
                    >Continue</span
                  >
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
   <script>
import axios from "axios";
import store from "../../store";
export default {
  //     beforeRouteLeave(to, from, next) {
  //   if (from.name === "stepFour" && to.name === "stepThree") {
  //     this.confirmDialog = true;
  //     this.navigationCallback = next;
  //   } else {
  //     next();
  //   }
  // },
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackBar: false,
      timeout: 5000,
      msg: null,
      value: "",
      phone: "",
      confirmDialog: false,
    };
  },
  computed: {
    appUser() {
      return this.$store.state.userData;
    },
  },
  methods: {
    handleConfirm() {
      this.confirmDialog = false;
      location.reload();
      // this.$router.push('/stepOne');
    },
    handleCancel() {
      this.confirmDialog = false;
    },
    setpFour() {
      this.appLoading = true;
      // if (this.$refs.form.validate()) {
      axios({
        method: "POST",
        url: "/vendor/registration/level4",
        //  data: {
        //   agentid:this.appUser._id
        //  },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = "Successfully Registered";
          this.showSnackBar = true;
          // store.commit("loginUser", response.data.data);
          store.commit("userData", response.data.data);
          store.commit("level", response.data.data.level);
          this.level = response.data.data.level;
          this.verificationStatus = response.data.data.verificationStatus;
          if (this.verificationStatus == "Pending" && this.level == 0) {
            this.$router.push("/StepOne");
          } else if (this.verificationStatus == "Pending" && this.level == 1) {
            this.$router.push("/StepTwo");
          } else if (this.verificationStatus == "Pending" && this.level == 2) {
            this.$router.push("/StepThree");
          } else if (this.verificationStatus == "Pending" && this.level == 3) {
            this.$router.push("/StepFour");
          } else if (this.verificationStatus == "Pending" && this.level == 4) {
            this.$router.push("/Approval");
          } else if (this.verificationStatus == "Verified" && this.level == 4) {
            store.commit("logoutUser");
            this.$router.push("/Login");
          } else {
            this.$router.push("/");
          }
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
      // }
    },
  },
};
</script>
  <style>
.bg {
  background: url("./../../assets/images/background.png") no-repeat center
    center;
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