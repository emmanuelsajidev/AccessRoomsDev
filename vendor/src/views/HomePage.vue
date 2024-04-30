<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#182444"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showsnackbar" color="#ff6200" right top timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showsnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-img src="./../assets/images/layout3.png" width="100%">
      <v-layout wrap fill-height justify-center>
        <v-flex xs11 sm6 md7 lg7 class="ml-0 px-2 ml-md-9" align-self-center>
          <v-layout wrap>
            <v-flex xs12 pt-8 pt-md-0>
              <span
                style="
                  font-family: RobotoBold;
                  font-weight: 500;
                  color: #ff6200;
                  text-transform: uppercase;
                "
                :style="{
                  'font-size':
                    $vuetify.breakpoint.name == 'xs'
                      ? '20px'
                      : $vuetify.breakpoint.name == 'sm'
                      ? '25px'
                      : $vuetify.breakpoint.name == 'md'
                      ? '30px'
                      : $vuetify.breakpoint.name == 'lg'
                      ? '35px'
                      : '45px',
                }"
                >Welcome To </span
              ><br />
              <span
                style="font-family: playfair; font-weight: 600; color: white"
                :style="{
                  'font-size':
                    $vuetify.breakpoint.name == 'xs'
                      ? '35px'
                      : $vuetify.breakpoint.name == 'sm'
                      ? '35px'
                      : $vuetify.breakpoint.name == 'md'
                      ? '45px'
                      : $vuetify.breakpoint.name == 'lg'
                      ? '50px'
                      : '60px',
                }"
                >Access Rooms <br />Vendor Registration Page</span
              >
            </v-flex>
            <v-flex xs12>
              <span
                style="
                  font-family: RobotoRegular;
                  font-weight: 200;
                  color: white;
                "
                :style="{
                  'font-size':
                    $vuetify.breakpoint.name == 'xs'
                      ? '20px'
                      : $vuetify.breakpoint.name == 'sm'
                      ? '20px'
                      : $vuetify.breakpoint.name == 'md'
                      ? '25px'
                      : $vuetify.breakpoint.name == 'lg'
                      ? '25px'
                      : '30px',
                }"
                >Your path to becoming a hospitality expert and elevating
                service excellence in the industry.</span
              >
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6 md4 lg4 align-self-center class="text-center">
          <v-card
            :width="
              $vuetify.breakpoint.name == 'xs'
                ? '90%'
                : $vuetify.breakpoint.name == 'sm'
                ? '90%'
                : $vuetify.breakpoint.name == 'md'
                ? '95%'
                : $vuetify.breakpoint.name == 'lg'
                ? '80%'
                : '100%'
            "
            elevation="0"
            style="border-radius: 10px"
            class="pb-4 pt-8 px-4 my-4 ml-3 ml-md-0"
          >
            <v-form v-model="addcat" ref="addcat">
              <v-layout justify-center wrap>
                <v-flex xs12 class="pb-4 text-center">
                  <span
                    style="font-family: LexendFont; font-weight: 600"
                    :style="{
                      'font-size':
                        $vuetify.breakpoint.name == 'xs'
                          ? '20px'
                          : $vuetify.breakpoint.name == 'sm'
                          ? '23px'
                          : $vuetify.breakpoint.name == 'md'
                          ? '23px'
                          : $vuetify.breakpoint.name == 'lg'
                          ? '25px'
                          : '35px',
                    }"
                    >New Vendor Registration</span
                  >
                </v-flex>
                <v-flex
                  xs12
                  sm10
                  class="pb-4 pt-0 text-center"
                  style="line-height: 18px"
                >
                  <span
                    style="
                      font-family: RobotoMedium;
                      font-weight: 400;
                      font-size: 14px;
                    "
                    >Join our community and get started<br />
                    in a few easy steps</span
                  >
                </v-flex>

                <v-flex xs11 class="pt-0 pb-0 text-left">
                  <span class="font2">Vendor category</span>
                  <v-select
                    v-model="category"
                    hide-details
                    :items="vendorCatList"
                    :menu-props="{ maxHeight: '400' }"
                    Placeholder="Select"
                    item-text="categoryType"
                    item-value="_id"
                    multiple
                    outlined
                    persistent-hint
                    dense
                  ></v-select>
                </v-flex>
                <v-flex xs11 class="py-4 text-left">
                  <span class="font2">Phone number{{ ccode }}</span>
                  <v-layout wrap>
                    <v-flex xs2 sm2>
                      <vue-country-code
                        @onSelect="onSelect"
                        :preferredCountries="['vn', 'us', 'gb']"
                        style="height: 39px"
                      >
                      </vue-country-code
                    ></v-flex>
                    <v-flex xs10 sm10 pl-5>
                      <v-text-field
                        ref="phone"
                        color="#717171"
                        hide-details="auto"
                        placeholder="Mobile number"
                        outlined
                        dense
                        :rules="phoneRules"
                        type="number"
                        hide-spin-buttons
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
                </v-flex>
                <!-- <v-flex xs11 class="pb-4 pt-0 text-right">
                <span style="font-family: LexendFont;font-weight: 400;font-size: 12px;text-transform: uppercase;">Forgot Password</span>
              </v-flex> -->

                <v-flex xs10>
                  <v-layout wrap>
                    <v-flex xs1 class="text-center" align-self-center
                      ><v-checkbox v-model="check1"></v-checkbox>
                    </v-flex>
                    <v-flex
                      xs11
                      pl-2
                      class="text-left"
                      align-self-center
                      style="line-height: 13px"
                    >
                      <span
                        style="
                          font-family: RobotoRegular;
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
                          font-family: RobotoRegular;
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
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 12px;
                        "
                      >
                        of service's and</span
                      >
                      <a
                        style="
                          color: blue;
                          font-family: RobotoRegular;
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
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs11>
                  <v-btn
                    block
                    v-if="!addcat"
                    class="text-none"
                    color="#f17343"
                    size="x-large"
                    variant="flat"
                  >
                    <span
                      style="
                        font-family: RobotoRegular;
                        font-size: 16px;
                        font-weight: 700;
                        color: white;
                        text-transform: uppercase;
                      "
                      >Register</span
                    >
                  </v-btn>
                  <v-btn
                    block
                    v-else
                    class="text-none"
                    color="#f17343"
                    size="x-large"
                    variant="flat"
                    @click="validation()"
                  >
                    <span
                      style="
                        font-family: RobotoRegular;
                        font-size: 16px;
                        font-weight: 700;
                        color: white;
                        text-transform: uppercase;
                      "
                      >Register</span
                    >
                  </v-btn>
                </v-flex>

                <!-- <v-flex xs11 class="text-center">
                <span style="font-family: RobotoRegular;font-weight: 400;font-size: 14px;">Not an agent ? </span>
                <span style="font-family: RobotoRegular;font-weight: 700;font-size: 14px;text-transform: uppercase;color: #f17343;"> SIGN UP</span>
              </v-flex> -->
                <v-flex xs11 class="text-center pt-8" align-self-end>
                  <span
                    style="
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 12px;
                    "
                    >Access Rooms Hospitality Consulting Services</span
                  >
                </v-flex>
              </v-layout>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-img>
    <HomeSection2 />
  </div>
</template>
<script>
import axios from "axios";
import store from "../store";
import HomeSection2 from "./HomeSection2";
export default {
  components: {
    HomeSection2,
  },
  data() {
    return {
      addcat: false,
      appLoading: false,
      ServerError: false,
      showsnackbar: false,
      timeout: 5000,
      ccode: "",
      msg: null,
      show1: false,
      show2: false,
      visible: false,
      category: "",
      phoneNumber: "",
      vendorCatList: [],
      check1: false,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      // phoneRules: [
      //   (v) => !!v || "phone is required",
      //   (v) => (v && v.length <= 10) || "invalid number",
      //   (v) => (v && v.length >= 10) || "invalid number",
      //   (v) => /^\d{10}$/.test(v) || "phone number must be a number",
      // ],
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) =>
          (v && v.length >= 7 && v.length <= 15) ||
          "Invalid number length (between 7 and 15 digits)",
        (v) =>
          /^\d{7,15}$/.test(v) ||
          "Phone number must be a number with 7 to 15 digits",
      ],

      pinRules: [
        (v) => !!v || "PIN is required",
        (v) => (v && v.length === 6) || "PIN must be 6 digits",
        // (v) => /^\d{4}$/.test(v) || "PIN must be a number",
      ],
      value: "",
      level: "",
      catList: ["Houseboat", "Shikara"],
      countryCodeArray: ["+91", "+1", "+93", "+355", "+213", "+376", "+244"],
      verificationStatus: "",
    };
  },
  computed: {
    formattedValue() {
      return "+" + this.value;
    },
  },
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    onSelect({ name, iso2, dialCode }) {
      console.log(name, iso2, dialCode);
      this.value = dialCode;
    },
    validation() {
      if (!this.phoneNumber) {
        this.msg = "Please enter phone number";
        this.showsnackbar = true;
        return;
      } else if (!this.category) {
        this.msg = "Please choose category";
        this.showsnackbar = true;
        return;
      } else if (this.check1 == false) {
        this.msg = "Please agree to our terms and conditions";
        this.showsnackbar = true;
        return;
      } else {
        this.signUp();
      }
    },
    signUp() {
      this.appLoading = true;
      // if (this.$refs.form.validate()) {
      axios({
        method: "POST",
        url: "/vendor/registration/level0",
        data: {
          phoneNumber: this.phoneNumber,
          vendorCategory: this.category,
          countryCode: this.formattedValue,
        },
      }).then((response) => {
        if (response.data.status == true) {
          this.appLoading = false;
          this.msg = "Successfully Registered";
          this.showsnackbar = true;
          localStorage.setItem("role", response.data.data.role);
          localStorage.setItem("token", response.data.token);
          store.commit("userData", response.data.data);
          var type1 = "RegLogin";
          store.commit("loginType", type1);
          localStorage.setItem("loginType", type1);
          localStorage.setItem("level", response.data.data.level);
          localStorage.setItem("isPassword", response.data.data.isPassword);
          localStorage.setItem(
            "is_phone_verified",
            response.data.data.is_phone_verified
          );
          localStorage.setItem("id", response.data.data._id);
          localStorage.setItem("isvendorLogin", false);
          store.commit("loginUser", response.data.data);
          store.commit("level", response.data.data.level);
          // this.userinfo();
          this.level = response.data.data.level;
          this.verificationStatus = response.data.data.verificationStatus;
          if (this.verificationStatus == "Pending" && this.level == 0) {
            console.log("one");
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
            store.commit("logoutUser", true);
            this.$router.push("/Login");
          } else {
            this.$router.push("/");
          }
        } else {
          this.appLoading = false;
          this.msg = response.data.msg;
          this.showsnackbar = true;
          // location.reload();
        }
      });
      // }
    },
    getData() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/vendor/category/getlist",
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.vendorCatList = response.data.data;
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
  },
};
</script>
 
 