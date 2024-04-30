<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar  v-model="snackbar" color="#ff6200" right top :timeout="3000">
  <v-layout wrap >
    <v-flex text-center class="align-self-center">{{ msg }}</v-flex>
    <v-flex text-right>
      <v-btn small :ripple="false" text @click="snackbar = false">
        <v-icon style="color: white">mdi-close</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</v-snackbar>

    <div>
      <v-img src="./../../assets/images/reg1.png" cover>
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
      <!-- <v-img src="./../../assets/images/reg1Back.png"> -->
      <v-row justify="center" class="pb-10 bg">
        <v-col cols="11" sm="8" md="5" class="changeStyle pt-8">
          <!-- style="position: relative; margin-top: -18%" -->
          <v-form v-model="reg" ref="profileForm" lazy-validation>
            <v-card rounded="xl">
              <v-row justify="center" class="px-5 py-5 ">
                <v-col cols="11" sm="10" >
                  <v-row justify="center">
                    <v-col cols="12" class="pb-8">
                      <v-img
                        contain
                        src="./../../assets/images/reg1Bar.png"
                      ></v-img>
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12" class="pa-0 pb-2 pt-5">
                      <span style="font-family: LexendRegular"
                        >Basic Details
                      </span>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pa-0 pt-3"
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>User type </span>
                      <v-text-field
                        color="orange"
                        dense
                        outlined
                        v-model="appUser.userType"
                        hide-details
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pa-0 pt-5"
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Agent name </span>
                      <v-text-field
                        color="orange"
                        dense
                        outlined
                        v-model="name"
                        :rules="Rules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pa-0"
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Email address </span>
                      <v-text-field
                        color="orange"
                        dense
                        outlined
                        v-model="email"
                        :rules="emailRules"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pa-0"
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Create password </span>
                      <v-text-field
                        color="orange"
                        dense
                        v-model="password"
                        :rules="[rules.password]"
                        type="password"
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pa-0"
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Confirm password </span>
                      <v-text-field
                        color="orange"
                        dense
                        v-model="confirmPassword"
                        type="password"
                        :rules="[rules.password]"
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pa-0"
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>Phone number (whatsapp) </span>
                      <v-layout wrap>
                        <v-flex  xs1 sm2 >
                          <vue-country-code
                            @onSelect="onSelect"
                            :preferredCountries="['in', 'us', 'gb']"
                            style="height: 44px"
                        >
                          </vue-country-code
                        ></v-flex>
                        <v-flex class="pl-10 pl-lg-0"   xs11 sm10 >
                          <v-text-field
                            ref="phone"
                            color="orange"
                            
                            hide-details="auto"
                            outlined
                            hide-spin-buttons
                            dense
                            class="py-0 my-0"
                            :rules="Rules"
                            type="number"
                            v-model="whatsappNumber"
                          >
                            <template v-slot:prepend-inner>
                              <v-layout justify-center>
                                <v-flex pt-1 class="align-self-center">
                                  <span
                                    style="
                                      font-family: LexendRegular;
                                      font-size: 12px;
                                      
                                      color: #000;
                                    "
                                    >{{ formattedValue }}</span
                                  >
                                </v-flex>
                                <v-flex pt-1 pl-lg-2 xs1>
                                  <v-divider vertical></v-divider>
                                </v-flex>
                              </v-layout>
                            </template>
                            <template v-slot:append>
                              <v-btn block  text color="#F17343" class="pa-0">
                                <span
                                  @click="otp()"
                                  class="pa-0"
                                  style="
                                    font-family: LexendRegular;
                                    text-transform: none;
                                    color: #f17343;
                                    font-size: 10px;
                                  "

                                  
                                  >Verify</span
                                >
                              </v-btn>
                            </template>
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pa-0 pt-4"
                      style="font-family: LexendRegular; font-size: 13px"
                    >
                      <span>OTP </span>
                      <v-text-field
                        hide-spin-buttons
                        v-model="otpnum"
                        dense
                        outlined
                        hide-details
                        type="number"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-row justify="end" class="pt-10">
              <v-col cols="12" sm="6" md="3" class="text-right">
                <v-btn
                  :disabled="!reg"
                  @click="validation()"
                  block
                  rounded
                  color="#F17343"
                  style="
                    background: linear-gradient(to bottom, orange);
                    color: white;
                  "
                  ><span
                    style="font-family: LexendRegular; text-transform: none"
                    >Next</span
                  ></v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <!-- </v-img> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "../../store";
export default {
  data() {
    return {
      reg: false,
      userType: "",
      value: "",
      phoneNumber: "",
      countryCode: "",
      otpnum: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      whatsappNumber: "",
      countryCodeArray: ["+91", "+1", "+93", "+355", "+213", "+376", "+244"],
      appLoading: false,
      ServerError: false,
      is_phone_verified: false,
      snackbar: false,
      timeout: 5000,
      msg: null,
      Rules: [(v) => !!v || "Required"],
      rules: {
        required: (value) => !!value || "Required.",
        password: (value) => {
          const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
          return (
            pattern.test(value) ||
            "Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long."
          );
        },
        min: (value) => value.length >= 8 || "Min 8 characters",
        pincode: (value) => value.length == 6 || "Please provide valid pincode",
        otp: (value) => value.length == 4 || "Please provide valid otp",
        check: (confirmation) =>
          confirmation === this.password || "Passwords do not match",
      },
      emailRules: [
        (v) => !!v || "Email is Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },

  computed: {
    formattedValue() {
      return "+" + this.value;
    },
    appUser() {
      return this.$store.state.userData;
    },
    authUser() {
      return this.$store.state.authData;
    },
  },
  beforeMount() {
    this.whatsappNumber = this.appUser.phoneNumber;
    this.name = this.appUser.name;
    this.email = this.appUser.email;
  },

  methods: {
    onSelect({ name, iso2, dialCode }) {
      console.log(name, iso2, dialCode);
      this.value = dialCode;
    },
    validation() {
      if (!this.name) {
        this.msg = "Please enter name";
        this.snackbar = true;
        return;
      } else if (!this.email) {
        this.msg = "Please enter email";
        this.snackbar = true;
        return;
      } else if (!this.password && this.isPassword == false) {
        this.msg = "Please enter password";
        this.snackbar = true;
        return;
      } else if (!this.confirmPassword && this.password == false) {
        this.msg = "Please confirm password";
        this.snackbar = true;
        return;
      } else if (
        this.password.toString() !== this.confirmPassword.toString() &&
        (this.password === false || this.isPassword === "false")
      ) {
        this.msg = "Password mismatch";
        this.snackbar = true;
        return;
      } else if (!this.whatsappNumber) {
        this.msg = "Please enter whatsappNumber";
        this.snackbar = true;
        return;
      } else if (!this.otpnum) {
        this.msg = "Please enter OTP";
        this.snackbar = true;
        return;
      } else {
        this.setpOne();
      }
    },
    otp() {
      if (!this.whatsappNumber) {
        this.msg = "please provide number";
        this.snackbar = true;
      } else if (!this.email) {
        this.msg = "please provide email";
        this.snackbar = true;
      } else if (!this.name) {
        this.msg = "please provide name";
        this.snackbar = true;
      } else if (!this.isValidEmail(this.email)) {
        this.msg = "Invalid email format";
        this.snackbar = true;
      } else {
        this.appLoading = true;
        axios({
          method: "Post",
          url: "/agent/sendotp",
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            name: this.name,
            email: this.email,
            phoneNumber: this.whatsappNumber,
            countryCode: this.formattedValue,
          },
        })
          .then((response) => {
            this.appLoading = false;
            if (response.data.status == true) {
              this.msg = "An OTP is sent to your email and whatsApp number";
              this.snackbar = true;
            } else {
              this.msg = response.data.msg;
              this.snackbar = true;
            }
          })
          .catch((err) => {
            this.appLoading = false;
            console.log(err);
            this.ServerError = true;
          });
      }
    },
    isValidEmail(value) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value);
    },
    setpOne() {
      // if (this.$refs.form.validate()) {
      axios({
        method: "POST",
        url: "/agent/registration/level1",
        data: {
          name: this.name,
          email: this.email,
          countryCode: this.formattedValue,

          password: this.password,
          whatsappNumber: this.whatsappNumber,
          otp: this.otpnum,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.status) {
          this.msg = "Successfully Registered";
          this.snackbar = true;
          store.commit("loginUser", response.data.data);
          store.commit("userData", response.data.data);
          store.commit("level", response.data.data.level);
          this.$router.push("/StepTwo");
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
  margin-top: -18%;

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