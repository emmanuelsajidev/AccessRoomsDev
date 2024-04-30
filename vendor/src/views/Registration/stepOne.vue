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
    <div>
      <v-img
        src="./../../assets/images/reg1.png"
        cover
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
              <v-col cols="12" pb-4>
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
      <!-- <v-img src="./../../assets/images/reg1Back.png"> -->
      <v-row justify="center" class="pb-10 bg pt-0">
        <v-col cols="11" sm="8" md="5" class="changeStyle">
          <!-- style="position: relative; margin-top: -18%" -->
          <v-form v-model="reg" ref="profileForm" lazy-validation>
            <v-card rounded="xl">
              <v-row justify="center" class="px-5 px-md-10 py-10">
                <v-col cols="12" sm="10">
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
                      <span
                        style="font-family: LexendFont; font-weight: 400"
                        :style="{
                          'font-size':
                            $vuetify.breakpoint.name == 'xs'
                              ? '15px'
                              : $vuetify.breakpoint.name == 'sm'
                              ? '15px'
                              : $vuetify.breakpoint.name == 'md'
                              ? '20px'
                              : $vuetify.breakpoint.name == 'lg'
                              ? '22px'
                              : '32px',
                        }"
                        >Basic Details
                      </span>
                    </v-col>
                    <v-col cols="12" class="pa-0 pt-3 font3">
                      <span>Vendor category </span>
                      <v-select
                        v-model="vendorCategory"
                        hide-details="auto"
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
                    </v-col>
                    <v-col cols="12" class="pa-0 pt-4 font3">
                      <span>Name (owner/manager) </span>
                      <v-text-field
                        hide-details="auto"
                        dense
                        outlined
                        v-model="name"
                        type="text"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pa-0 pt-4 font3">
                      <span>Email address </span>
                      <v-text-field
                        dense
                        outlined
                        hide-details="auto"
                        v-model="email"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pa-0 pt-4 font3">
                      <span>Create password </span>
                      <v-text-field
                        dense
                        v-model="password"
                        hide-details="auto"
                        :rules="[rules.password]"
                        type="password"
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pa-0 pt-4 font3">
                      <span>Confirm password </span>
                      <v-text-field
                        dense
                        v-model="confirmPassword"
                        hide-details="auto"
                        type="password"
                        :rules="[rules.password]"
                        outlined
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="pa-0 pt-4 font3">
                      <span>Phone number (whatsapp){{ ccode }} </span>
                      <!-- <v-text-field dense outlined v-model="whatsappNumber" 
                    :rules="phoneRules"
                    >
                      <template v-slot:append>
                        <v-btn text color="#F17343">
                          <span @click="otp()"
                            style="
                              font-family: LexendFont;
                              text-transform: none;
                              color: #f17343;
                            "
                            >Verify</span
                          >
                        </v-btn>
                      </template>
                    </v-text-field> -->
                      <v-layout wrap>
                        <v-flex xs2 sm2>
                          <vue-country-code
                            @onSelect="onSelect"
                            :preferredCountries="['vn', 'us', 'gb']"
                            style="height: 44px"
                          >
                          </vue-country-code
                        ></v-flex>
                        <v-flex xs10 sm10>
                          <v-text-field
                            ref="phone"
                            color="#717171"
                            hide-details="auto"
                            placeholder="Whatsapp number"
                            outlined
                            dense
                            class="py-0 my-0"
                            :rules="phoneRules"
                            type="number"
                            hide-spin-buttons
                            v-model="whatsappNumber"
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
                            <template v-slot:append>
                              <v-btn text color="#F17343" class="pb-2 my-0">
                                <span
                                  @click="otp()"
                                  class="py-0 my-0"
                                  style="
                                    font-family: LexendFont;
                                    text-transform: none;
                                    color: #f17343;
                                  "
                                  >Verify</span
                                >
                              </v-btn>
                            </template>
                          </v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-col>
                    <v-col cols="12" class="pa-0 pt-4 font3">
                      <span>OTP </span>
                      <v-text-field
                        v-model="otpnum"
                        dense
                        outlined
                        hide-details
                        type="number"
                        hide-spin-buttons
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <v-row justify="end" class="pt-10">
              <v-col cols="12" sm="6" md="3" class="text-right">
                <!--  -->
                <v-btn
                  :disabled="!reg"
                  @click="validation()"
                  block
                  rounded
                  color="#f17343"
                  style="cursor: pointer"
                  ><span
                    style="
                      font-family: LexendFont;
                      text-transform: none;
                      color: white;
                    "
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
      ccode: "",
      reg: false,
      userType: "",
      value: "",
      phoneNumber: "",
      countryCode: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      whatsappNumber: "",
      otpnum: "",
      vendorCategory: "",
      appLoading: false,
      ServerError: false,
      showsnackbar: false,
      flag1: false,
      vendorCatList: [],
      timeout: 5000,
      msg: null,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        password: (value) => {
          const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
          return (
            pattern.test(value) ||
            "Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long."
          );
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
      is_phone_verified: false,
      isPassword: false,
      countryCodeArray: ["+91", "+1", "+93", "+355", "+213", "+376", "+244"],
      verificationStatus: "",
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
  mounted() {
    if (this.appUser) {
      console.log("qqqqqqqqqqqqqq");
      this.whatsappNumber = this.appUser.phoneNumber;
      this.vendorCategory = this.appUser.vendorCategory;
      console.log("venddor cat==", this.appUser.vendorCategory);
      this.email = this.appUser.email;
      this.name = this.appUser.name;
      if (this.appUser.level) {
        console.log("appUser.level=", this.appUser.level);

        this.flag1 = true;
        console.log("flag=", this.flag1);
      }
      this.getData();
    }
    this.isPassword = localStorage.getItem("isPassword");
    this.is_phone_verified = localStorage.getItem("is_phone_verified");
  },
  methods: {
    onSelect({ name, iso2, dialCode }) {
      console.log(name, iso2, dialCode);
      this.value = dialCode;
    },
    validation() {
      console.log("ghfhgfg");
      console.log(
        this.password.toString(),
        this.confirmPassword.toString(),
        this.isPassword
      );
      if (!this.vendorCategory.length > 0) {
        this.msg = "Please choose vendor category";
        this.showsnackbar = true;
        return;
      } else if (!this.name) {
        this.msg = "Please enter name";
        this.showsnackbar = true;
        return;
      } else if (!this.email) {
        this.msg = "Please enter email";
        this.showsnackbar = true;
        return;
      } else if (!this.password && this.isPassword == false) {
        this.msg = "Please enter password";
        this.showsnackbar = true;
        return;
      } else if (!this.confirmPassword && this.isPassword == false) {
        this.msg = "Please confirm password";
        this.showsnackbar = true;
        return;
      } else if (
        this.password.toString() !== this.confirmPassword.toString() &&
        (this.isPassword === false || this.isPassword === "false")
      ) {
        this.msg = "Password mismatch";
        this.showsnackbar = true;
        return;
      } else if (!this.whatsappNumber) {
        this.msg = "Please enter whatsappNumber";
        this.showsnackbar = true;
        return;
      } else if (!this.otpnum && this.is_phone_verified == false) {
        this.msg = "Please enter OTP";
        this.showsnackbar = true;
        return;
      } else {
        this.setpOne();
        // console.log("pass=",this.password);
        // console.log("isPassword=",this.isPassword);
        // console.log("confirmPassword=",this.confirmPassword);
      }
    },
    setpOne() {
      if (!this.whatsappNumber) {
        this.msg = "please provide number";
        this.showsnackbar = true;
      } else if (!this.email) {
        this.msg = "please provide email";
        this.showsnackbar = true;
      } else if (!this.isValidEmail(this.email)) {
        this.msg = "Invalid email format";
        this.showsnackbar = true;
      } else {
        this.appLoading = true;
        // if (this.$refs.form.validate()) {
        axios({
          method: "POST",
          url: "/vendor/registration/level1",
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            whatsappNumber: this.whatsappNumber,
            vendorCategory: this.vendorCategory,
            whatsappCountryCode: this.formattedValue,
            otp: this.otpnum,
          },
          headers: {
            token: localStorage.getItem("token"),
          },
        }).then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showsnackbar = true;
            console.log("");
            store.commit("loginUser", response.data.data);
            store.commit("userData", response.data.data);
            store.commit("level", response.data.data.level);
            localStorage.setItem("isPassword", response.data.data.isPassword);
            localStorage.setItem(
              "is_phone_verified",
              response.data.data.is_phone_verified
            );
            this.$router.push("/StepTwo");
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        });
      }
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
    otp() {
      if (!this.whatsappNumber) {
        this.msg = "please provide number";
        this.showsnackbar = true;
      } else if (!this.email) {
        this.msg = "please provide email";
        this.showsnackbar = true;
      } else if (!this.isValidEmail(this.email)) {
        this.msg = "Invalid email format";
        this.showsnackbar = true;
      } else {
        this.appLoading = true;
        axios({
          method: "Post",
          url: "/user/sendotp",
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            name: this.name,
            email: this.email,
            phoneNumber: this.whatsappNumber,
            countrycode: this.formattedValue,
          },
        })
          .then((response) => {
            this.appLoading = false;
            if (response.data.status == true) {
              this.msg = "An OTP is sent to your email and whatsApp number";
              this.showsnackbar = true;
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
      }
    },
    isValidEmail(value) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value);
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