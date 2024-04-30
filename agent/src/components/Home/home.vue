<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="#ff6200" right :timeout="3000">
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-img src="./../../assets/images/home.png">
      <v-row
        justify="center"
        class="fill-height px-xs-0 px-sm-0 px-md-10 px-lg-10 px-xl-10 pa-5"
      >
        <v-col cols="12" sm="10" class="pa-0" align-self="center">
          <v-row justify="space-between">
            <v-col cols="11" sm="6" md="7" lg="5" align-self="center">
              <span
                class="hidden-sm-and-down"
                style="color: #ff6200; font-family: LexendRegular; font-size: 35px"
                >Welcome To</span
              >
              <span
                class="hidden-md-and-up"
                style="color: #ff6200; font-family: LexendRegular; font-size: 25px"
                >Welcome To</span
              >
              <br />
              <span
                class="hidden-sm-and-down"
                style="
                  font-family: LexendRegular;
                  color: #ffffff;
                  font-size: 40px;
                "
              >
                Access Rooms
                <br />
                Agent Registration Page
              </span>
              <span
                class="hidden-md-and-up"
                style="
                  font-family: LexendRegular;
                  color: #ffffff;
                  font-size: 30px;
                "
              >
                Access Rooms
                <br />
                Agent Registration Page
              </span>
              <br />
              <span
                style="
                  font-family: LexendRegular;
                  color: #ffffff;
                  font-size: 17px;
                "
                >Your path to becoming a hospitality expert and elevating
                service excellence in the industry.</span
              >
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="5"
              lg="5"
              class="py-8"
              align-self="center"
            >
              <v-card rounded="lg">
                <v-row justify="end">
                  <v-col cols="12" class="px-13 pb-6 pt-15 text-center">
                    <v-row justify="center">
                      <v-col cols="12" class="pa-0">
                        <span style="font-family: LexendRegular; font-size: 20px"
                          >New Agent Registration </span
                        >
                      </v-col>
                      <v-col cols="12" sm="9" style="line-height: 18px">
                        <span style="font-family: LexendRegular; font-size: 15px"
                          >Join our community and get started in a few easy
                          steps</span
                        >
                      </v-col>
                      <v-col
                        style="font-family: LexendRegular; font-size: 14px"
                        cols="12"
                        sm="12"
                        class="text-left pt-10 pa-0"
                      >
                        <span>Select Usertype </span>
                        <v-select
                          v-model="userType"
                          :items="states"
                          dense
                          color="orange"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col
                        style="font-family: LexendRegular; font-size: 14px"
                        cols="12"
                        sm="12"
                        class="text-left pa-0"
                      >
                        <span>Phone Number </span>
                        <v-layout wrap>
                          <v-flex xs2 sm2>
                            <vue-country-code
                              @onSelect="onSelect"
                              :preferredCountries="['in', 'us', 'gb']"
                              style="height: 39px"
                            >
                            </vue-country-code
                          ></v-flex>
                          <v-flex xs10 sm10 pl-5>
                            <v-text-field
                              ref="phone"
                              hide-spin-buttons
                              :rules="phoneRules"
                              color="orange"
                              placeholder="Mobile number"
                              outlined
                              dense
                              type="number"
                              v-model="phoneNumber"
                            >
                              <template v-slot:prepend-inner>
                                <v-layout justify-center>
                                  <v-flex pt-1 class="align-self-center">
                                    <span
                                      style="
                                        font-family: poppinsregular;
                                        font-size: 15px;
                                        color: #000;
                                      "
                                      >{{ formattedValue }}</span
                                    >
                                  </v-flex>
                                  <v-flex pt-1 pl-2 xs1>
                                    <v-divider vertical></v-divider>
                                  </v-flex>
                                </v-layout>
                              </template>
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-col>

                      <v-col cols="12" class="pb-5 pt-1 pa-0">
                        <v-row>
                          <v-col cols="1">
                            <v-checkbox v-model="check1"></v-checkbox>
                          </v-col>
                          <v-col cols="11" class="pt-7">
                            <span
                              style="
                                font-family: LexendRegular;
                                font-weight: 400;
                                font-size: 12px;
                              "
                              >By signing up you agree to our</span
                            >
                            <a
                              href="/TermsandConditions"
                              target="_blank"
                              style="
                                color: blue;
                                font-family: LexendRegular;
                                font-weight: 400;
                                font-size: 12px;
                                text-decoration: underline;
                                cursor: pointer;
                              "
                            >
                              Terms and Conditions
                            </a>
                            <span
                              style="
                                font-family: LexendRegular;
                                font-weight: 400;
                                font-size: 12px;
                              "
                            >
                              of service's and</span
                            >
                            <a
                              style="
                                color: blue;
                                font-family: LexendRegular;
                                font-weight: 400;
                                text-decoration: underline;
                                cursor: pointer;
                                font-size: 12px;
                              "
                              href="/PrivacyPolicy"
                              target="_blank"
                            >
                              Privacy Policy</a
                            >
                          </v-col>
                        </v-row>
                      </v-col>

                      <v-col cols="12" class="pb-5 pt-5 pa-0">
                        <v-btn color="#F17343" dark block @click="validation()"
                          ><span
                            style="font-family: LexendRegular; font-size: 14px"
                            >continue
                          </span></v-btn
                        >
                      </v-col>
                      <v-col cols="12" class="pt-8 pb-4"
                        ><span
                          style="font-family: LexendRegular; font-size: 13px"
                          >Access Rooms Hospitality Consulting Services</span
                        ></v-col
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-img>
    <HomeSection2 />
  </div>
</template>
  <script>
import axios from "axios";
import store from "../../store";
import HomeSection2 from "./homeSection2";
export default {
  components: {
    HomeSection2,
  },
  data() {
    return {
      userType: "",
      states: ["Travel Agent", "Travels", "Tour Guide"],
      value: "",
      phoneNumber: "",
      countryCode: "",
      appLoading: false,
      // phoneRules: [
      //   (v) => !!v || "phone is required",
      //   (v) => (v && v.length <= 10) || "invalid number",
      //   (v) => (v && v.length >= 10) || "invalid number",
      //   (v) => /^\d{10}$/.test(v) || "phone number must be a number",
      // ],
      phoneRules: [
    (v) => !!v || "Phone number is required",
    (v) => (v && v.length >= 7 && v.length <= 15) || "Invalid number length (between 7 and 15 digits)",
    (v) => /^\d{7,15}$/.test(v) || "Phone number must be a number with 7 to 15 digits",
],
      ServerError: false,
      snackbar: false,
      timeout: 5000,
      check1: false,

      msg: null,
      countryCodeArray: ["+91", "+1", "+93", "+355", "+213", "+376", "+244"],
      level: "",
    };
  },
  computed: {
    formattedValue() {
      return "+" + this.value;
    },
  },
  methods: {
    onSelect({ name, iso2, dialCode }) {
      console.log(name, iso2, dialCode);
      this.value = dialCode;
    },
    validation() {
      // var that = this;
      // var flag = false;
      var phoneformat = /^\d{7,15}$/;
      // var nameformat = /^[a-zA-Z0-9 .]{3,50}$/;
      // var mailformat =
      //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // Object.keys(this.user).forEach(function (key) {
      //   if (!that.user[key]) {
      //     flag = true;
      //   }
      // });
      if (!this.phoneNumber.match(phoneformat)) {
        this.msg = "Please Provide valid Phone Number";
        this.snackbar = true;
        return;
      } 
      else if (!this.userType) {
        this.msg = "Please choose User Type";
        this.snackbar = true;
        return;
      }
      else if (this.check1==false) {
        this.msg = "Please agree to our terms and conditions";
        this.snackbar = true;
        return;
      } else {
        this.signUp();
      }
    },
    // validation() {
    //   if (!this.phoneNumber) {
    //     this.msg = "Please enter phone number";
    //     this.snackbar = true;
    //     return;
    //   } else if (!this.userType) {
    //     this.msg = "Please choose User Type";
    //     this.snackbar = true;
    //     return;
    //   } else if (this.check1 == false) {
    //     this.msg = "Please agree to our terms and conditions";
    //     this.snackbar = true;
    //     return;
    //   } else {
    //     this.signUp();
    //   }
    // },
    signUp() {
      // if (this.$refs.form.validate()) {
      axios({
        method: "POST",
        // url: "/agent/registration/level0",
        url: "/agent/registration/start",
        data: {
          phoneNumber: this.phoneNumber,
          userType: this.userType,
          countryCode: this.formattedValue,
        },
      }).then((response) => {
        if (response.data.status) {
          this.level = response.data.data.level;
          this.msg = "Successfully Registered";
          this.snackbar = true;
          if(response.data.data){
          store.commit("loginUser", response.data.data);
          
          store.commit("userData", response.data.data);
          }
          if(response.data.data.level){
          store.commit("level", response.data.data.level);
          }
          if(response.data.data.userType){
          store.commit("userType", response.data.data.userType);
          }
          localStorage.setItem("token", response.data.token);
          if (this.level == 0) {
            console.log("1 level")
            this.$router.push("/StepOne");
          }
          if (this.level == 1) {
            this.$router.push("/StepTwo");
          }
          if (this.level == 2) {
            this.$router.push("/StepThree");
          }
          if (this.level == 3) {
            this.$router.push("/StepFour");
          }
          else{
            console.log("else")
          }
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
  