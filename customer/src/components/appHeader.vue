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
    <v-snackbar
      v-model="showSnackbar"
      color="rgba(255, 98, 0, 1)"
      right
      top
      timeout="2000"
    >
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-app-bar dense flat color="white" height="70px">
      <v-layout wrap justify-center>
        <v-flex xs12 sm11 md10>
          <v-layout wrap justify-center>
            <v-flex
              xs6
              sm2
              md2
              lg2
              align-self-center
              text-center
              @click="$router.push('/')"
              style="cursor: pointer"
            >
              <v-img
                height="60%"
                width="60%"
                src="./../assets/logoblack.png"
              ></v-img>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs6 sm10 md10 lg10 align-self-center>
              <v-layout wrap justify-end>
                <v-flex
                  xs2
                  sm3
                  md3
                  lg2
                  align-self-center
                  text-left
                  text-lg-right
                  class="hidden-sm-and-down"
                >
                  <span style="font-family: LexendMedium"
                    >Customer Support</span
                  >
                </v-flex>
                <v-flex
                  xs2
                  sm3
                  md3
                  lg3
                  mx-4
                  align-self-center
                  text-left
                  text-lg-right
                  class="hidden-sm-and-down"
                >
                  <v-layout wrap fill-height>
                    <!-- <v-flex xs2 align-self-center pt-6 text-right> -->
                      <!-- <v-img
                        height="18px"
                        contain
                        src="./../assets/icons/whatsapp.png"
                      ></v-img> -->
                  <!-- </v-flex> -->
                    <v-flex xs12 align-self-center pt-6
                      ><span style="font-family: LexendMedium; color: #f17343">
                        +91 7994111694 , 9539920001

                      </span></v-flex
                    >
                  </v-layout>

                  &nbsp;
                </v-flex>
                <v-flex
                  xs2
                  lg1
                  ml-2  v-if="!appLogin"
                  align-self-center
                  text-left
                  text-lg-right
                  class="hidden-sm-and-down"
                  style="cursor: pointer"
                >
                  <span
                    @click="registerDialog = true"
                    style="
                      font-family: LexendFont;
                      font-weight: 500;
                      font-size: 16px;
                    "
                  >
                    Register
                  </span>

                  &nbsp;
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  md2
                  lg2
                  text-right
                  v-if="!appLogin"
                  align-self-center
                >
                  <v-btn
                    color="#F17343"
                    dark
                    height="40"
                    width="140"
                    @click="loginDialog = true"
                  >
                    <span
                      style="
                        font-family: LexendMedium;
                        text-transform: none;
                        font-size: 18px;
                      "
                      >Login
                    </span>
                  </v-btn>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  md2
                  lg2
                  text-right
                  v-if="appLogin"
                  align-self-center
                >
                <!-- <v-layout wrap>
                  <v-flex xs2 align-self-center>
                    <span style="font-family:LexendFont;font-weight: 400;font-size: 15px;">
                  <v-icon @click="$router.push('/myBookings')">mdi-account</v-icon></span>
                  </v-flex>
                  <v-flex xs10 align-self-center text-left>
                    <span style="font-family:LexendFont;font-weight: 400;font-size: 15px;">{{ appUser }}
</span>
                    <v-btn
                    color="#F17343"
                    dark small
                    height="40"
                    width="140"
                    :to="'/'"
                    @click="appLogout()"
                  >
                    <span
                      style="
                        font-family: LexendMedium;
                        text-transform: none;
                        font-size: 18px;
                      "
                      >Logout
                    </span>
                  </v-btn>
                  </v-flex>
                </v-layout> -->
              
                <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#F17343"
          dark small block
          v-bind="attrs"
          v-on="on"
        >
        <span style="font-family:LexendFont;font-weight: 400;font-size: 15px;">
                  <v-icon small class="pb-1">mdi-account</v-icon></span>{{ appUser }}
        </v-btn>
      </template>
     <v-card elevation="0" class="pa-2" width="200px">
      <v-layout wrap justify-center>
        <v-flex xs10 pt-2 text-center>
          <span style="font-family:LexendFont;font-weight: 400;font-size: 18px;">Welcome</span></v-flex>
        <v-flex xs12 pt-2 text-center>
          <span style="font-family:LexendFont;font-weight: 500;font-size: 15px;">{{ appUser }}</span>
        </v-flex>
        <!-- <v-flex xs10 pt-2 text-center>
          <v-btn
          color="#F17343"
          dark small block
          v-bind="attrs"
          v-on="on" 
          @click="$router.push('/myProfile')"
        >Profile</v-btn>
</v-flex> -->
<v-flex xs10 pt-2 text-center>
          <v-btn
          color="#F17343"
          dark small block
          v-bind="attrs"
          v-on="on"
          @click="$router.push('/myBookings')"
        >My Bookings</v-btn>
</v-flex>

<v-flex xs10 pt-2 pb-1 text-center>
          <v-btn
          color="#F17343"
          dark small block
          v-bind="attrs"
          v-on="on"
          @click="$router.push('/profile')"
        >Profile</v-btn>
</v-flex>
    <v-flex xs10 pt-1 pb-2 text-center>
          <v-btn
          color="#F17343"
          dark small block
          v-bind="attrs"
          v-on="on"
          :to="'/'"
                    @click="appLogout()"
        >Logout</v-btn>
</v-flex>
      </v-layout>
     </v-card>
    </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-app-bar>
    <v-dialog width="400px" v-model="loginDialog">
      <v-form v-model="addcat1" ref="addcat1" @submit.prevent>
        <v-card width="400px" class="pa-4" style="border-radius: 10px">
          <v-layout justify-center wrap>
            <v-flex xs12 class="pt-6 pb-2 text-center">
              <span style="font-family: LexendFont; font-size: 30px"
                >Welcome Back</span
              >
            </v-flex>
            <v-flex
              xs12
              sm10
              md7
              class="pb-4 pt-0 text-center"
              style="line-height: 18px"
            >
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 14px;
                "
                >Please Enter your account details to get started.</span
              >
            </v-flex>
            <v-flex xs11 class="py-4 text-left">
              <span class="font2">Phone number</span>

              <v-text-field
                class="font2a"
                placeholder="phone-number"
                dense
                type="number"
                hide-spin-buttons
                outlined
                :rules="phoneRules"
                v-model="loginphone"
                hide-details="auto"
                color="grey"
                style="background-color: white"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs11 class="pt-0 pb-0 text-left">
              <span class="font2">Password</span>
              <v-text-field
                class="font2a"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                dense
                v-model="loginpass"
                placeholder="-password-"
                color="grey"
                style="background-color: white"
                outlined
                @click:append-inner="visible = !visible"
                hide-details="auto"
                @enter="login()"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs11 class="pb-4 pt-0 text-right">
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 12px;
                  text-transform: uppercase;
                  cursor: pointer;
                "
                @click="forgot()"
                >Forgot Password</span
              >
            </v-flex>
            <v-flex xs11 class="pb-4 pt-4">
              <v-btn
                block
                :disabled="!addcat1"
                class="text-none"
                color="rgba(255, 98, 0, 1)"
                size="x-large"
                variant="flat"
                @click="login()"
              >
                <span
                  style="
                    font-family: LexendFont;
                    font-size: 16px;
                    font-weight: 700;
                    color: white;
                  "
                  >Login</span
                >
              </v-btn>
            </v-flex>
            <v-flex xs11 class="text-center">
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 14px;
                "
                >Create an account ?
              </span>
              <span
                @click="(registerDialog = true), (loginDialog = false)"
                style="
                  font-family: LexendFont;
                  font-weight: 700;
                  font-size: 14px;
                  text-transform: uppercase;
                  color: rgba(255, 98, 0, 1);
                  cursor: pointer;
                "
              >
                SIGN UP</span
              >
            </v-flex>
            <v-flex xs11 class="text-center pt-8" align-self-end>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 12px;
                "
                >Access Rooms Hospitality Consulting Services</span
              >
            </v-flex>
          </v-layout>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog width="400px" v-model="registerDialog">
      <v-form v-model="addcat2" ref="addcat2" @submit.prevent>
        <v-card width="400px" class="pa-4" style="border-radius: 10px">
          <v-layout justify-center wrap>
            <v-flex xs12 class="pt-6 pb-2 text-center">
              <span
                style="
                  font-family: LexendFont;
                  font-size: 30px;
                  font-weight: 500;
                "
                >Create an account</span
              >
            </v-flex>
            <v-flex
              xs12
              sm10
              md7
              class="pb-4 pt-0 text-center"
              style="line-height: 18px"
            >
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 14px;
                "
                >Please sign up to create your new account.</span
              >
            </v-flex>
            <v-flex xs11 class="pt-4 pb-0 text-left">
              <span class="font2">Full Name</span>

              <v-text-field
                placeholder="Enter Name"
                dense
                type="text"
                outlined
                class="font2a"
                v-model="regname"
                hide-details="auto"
                color="grey"
                style="background-color: white"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs11 class="py-4 pb-0 text-left">
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
                    class="font2a"
                    color="#717171"
                    hide-details="auto"
                    placeholder="Mobile number"
                    outlined
                    dense
                    :rules="phoneRules"
                    type="number"
                    hide-spin-buttons
                    v-model="regphone"
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
            <v-flex xs11 class="pt-4 pb-0 text-left">
              <span class="font2">Email</span>
              <v-text-field
                dense
                class="font2a"
                v-model="regemail"
                placeholder="Email"
                color="grey"
                :rules="[rules.email]"
                style="background-color: white"
                outlined
                hide-details="auto"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs11 class="pt-4 pb-0 text-left">
              <span class="font2">Password</span>
              <v-text-field
                class="font2a"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                dense
                v-model="regpass"
                placeholder="-password-"
                color="grey"
                style="background-color: white"
                outlined
                @click:append-inner="visible = !visible"
                hide-details="auto"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs11 class="pb-4 pt-8">
              <v-btn
                :disabled="!addcat2"
                block
                class="text-none"
                color="rgba(255, 98, 0, 1)"
                size="x-large"
                variant="flat"
                @click="regvalidate2()"
              >
                <span
                  style="font-family: LexendFont; font-size: 16px; color: white"
                  >Register</span
                >
              </v-btn>
            </v-flex>
            <v-flex xs11 class="text-center pt-8" align-self-end>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 12px;
                "
                >Access Rooms Hospitality Consulting Services</span
              >
            </v-flex>
          </v-layout>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog width="400px" v-model="senotpDialog">
      <v-form v-model="addcat" ref="addcat" @submit.prevent>
        <v-card width="400px" class="pa-4" style="border-radius: 10px">
          <v-layout justify-center wrap>
            <v-flex xs12 class="pt-6 pb-2 text-center">
              <span
                style="
                  font-family: LexendFont;
                  font-size: 30px;
                  font-weight: 500;
                "
                >Reset Password</span
              >
            </v-flex>
            <v-flex
              xs12
              sm10
              md7
              class="pb-4 pt-0 text-center"
              style="line-height: 18px"
            >
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 14px;
                "
                >Enter your registered email or phone number to rest password
              </span>
            </v-flex>
            <v-flex xs11 class="py-4 text-left">
              <span class="font2">Phone number</span>

              <v-text-field
                class="font2a"
                placeholder="phone-number"
                dense
                type="number"
                hide-spin-buttons
                outlined
                :rules="phoneRules"
                v-model="resetphone"
                hide-details="auto"
                color="grey"
                style="background-color: white"
              >
              </v-text-field>
            </v-flex>
            <v-flex align-self-center xs5>
              <v-divider></v-divider>
            </v-flex>
            <v-flex align-self-center text-center xs2 sm1 px-1>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 200;
                  font-size: 14px;
                "
                >OR</span
              >
            </v-flex>
            <v-flex align-self-center xs5>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs11 class="py-4 text-left">
              <span class="font2">Email</span>
              <v-text-field
                dense
                class="font2a"
                v-model="resetemail"
                placeholder="Email"
                color="grey"
                :rules="[rules.email]"
                style="background-color: white"
                outlined
                hide-details="auto"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs11 class="pb-4 pt-4">
              <v-btn
                block
                class="text-none"
                color="rgba(255, 98, 0, 1)"
                size="x-large"
                variant="flat"
                @click="sendOTP()"
              >
                <span
                  style="
                    font-family: LexendFont;
                    font-size: 16px;
                    font-weight: 500;
                    color: white;
                    text-transform: uppercase;
                  "
                  >Send OTP</span
                >
              </v-btn>
            </v-flex>
            <v-flex xs11 class="text-center">
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 14px;
                "
                >Create an account ?
              </span>
              <span
                @click="(registerDialog = true), (senotpDialog = false)"
                style="
                  font-family: LexendFont;
                  font-weight: 700;
                  font-size: 14px;
                  text-transform: uppercase;
                  cursor: pointer;
                  color: rgba(255, 98, 0, 1);
                "
              >
                SIGN UP</span
              >
            </v-flex>
            <v-flex xs11 class="text-center pt-8" align-self-end>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 12px;
                "
                >Access Rooms Hospitality Consulting Services</span
              >
            </v-flex>
          </v-layout>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog width="400px" v-model="resetDialog">
      <v-form v-model="addcat" ref="addcat" @submit.prevent>
        <v-card width="400px" class="pa-4" style="border-radius: 10px">
          <v-layout justify-center wrap>
            <v-flex xs12 class="pt-6 pb-2 text-center">
              <span
                style="
                  font-family: LexendFont;
                  font-size: 30px;
                  font-weight: 500;
                "
                >Reset Password</span
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
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 14px;
                "
                >Please enter the OTP received on registered email/phone to
                reset your account</span
              >
            </v-flex>
            <v-flex xs11 class="pt-4 pb-0 text-left">
              <span class="font2">OTP</span>

              <v-text-field
                class="font2a"
                placeholder="OTP"
                dense
                type="number"
                hide-spin-buttons
                outlined
                v-model="resetotp"
                hide-details="auto"
                color="grey"
                style="background-color: white"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs11 class="pt-4 pb-0 text-left">
              <span class="font2">New Password</span>
              <v-text-field
                class="font2a"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                dense
                v-model="regnewpass"
                placeholder="New password"
                color="grey"
                style="background-color: white"
                outlined
                @click:append-inner="visible2 = !visible2"
                hide-details="auto"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs11 class="pt-4 pb-0 text-left">
              <span class="font2">Confirm Password</span>
              <v-text-field
                class="font2a"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show3 ? 'text' : 'password'"
                @click:append="show3 = !show3"
                dense
                v-model="regconfirmpass"
                placeholder="Confirm password"
                color="grey"
                style="background-color: white"
                outlined
                @click:append-inner="visible3 = !visible3"
                hide-details="auto"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs11 class="pb-4 pt-8">
              <v-btn
                block
                class="text-none"
                color="rgba(255, 98, 0, 1)"
                size="x-large"
                variant="flat"
                @click="validation()"
              >
                <span
                  style="
                    font-family: LexendFont;
                    font-size: 16px;
                    font-weight: 500;
                    color: white;
                    text-transform: uppercase;
                  "
                  >Reset password</span
                >
              </v-btn>
            </v-flex>

            <v-flex xs11 class="text-center pt-8" align-self-end>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 12px;
                "
                >Access Rooms Hospitality Consulting Services</span
              >
            </v-flex>
          </v-layout>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>
  <script>
import axios from "axios";
import store from "./../store";
export default {
  data() {
    return {
      showSnackbar: false,
      ServerError: false,
      timeout: 5000,
      ccode: "",
      value: "",
      msg: null,
      addcat1: false,
      addcat2: false,
      addcat3: false,
      addcat4: false,
      show1: false,
      show2: false,
      show3: false,
      visible: false,
      visible2: false,
      visible3: false,
      appLoading: false,
      categoryList: [],
      loginphone: "",
      loginpass: "",
      regname: "",
      regphone: "",
      regemail: "",
      regpass: "",
      regnewpass: "",
      regconfirmpass: "",
      resetphone: "",
      resetotp: "",
      resetemail: "",
      addcat: false,
      loginDialog: false,
      registerDialog: false,
      senotpDialog: false,
      resetDialog: false,
      countryCodeArray: ["+91", "+1", "+93", "+355", "+213", "+376", "+244"],
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          // Allow empty value or check the email pattern
          if (!value || value.trim() === "") {
            return true;
          }

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
      phoneRules: [
        // Allow empty value or check the phone number rules
        (v) =>
          !v || v.length === 0 || /^\d{10}$/.test(v) || "Invalid phone number",
      ],
    };
  },
  computed: {
    formattedValue() {
      return "+" + this.value;
    },

    appLogin() {
      return this.$store.state.isLoggedIn;
    },
    appUser() {
      return localStorage.getItem("name");
    },
  },
  mounted() {
    // this.getCat();
    
  },
  methods: {
    onSelect({ name, iso2, dialCode }) {
      console.log(name, iso2, dialCode);
      this.value = dialCode;
    },
    forgot() {
      this.loginDialog = false;
      this.senotpDialog = true;
    },
    isValidEmail(value) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value);
    },
    isValidPhoneNumber(value) {
      const phoneRules = [
        (v) => !!v || "Phone number is required",
        (v) =>
          (v && v.length === 10) ||
          "Invalid number length (should be 10 digits)",
        (v) => /^\d+$/.test(v) || "Phone number must be a number",
      ];

      for (const rule of phoneRules) {
        const result = rule(value);
        if (typeof result === "string") {
          return result; // Return the error message if the rule is not satisfied
        }
      }

      return true; // All rules passed, phone number is valid
    },
    sendOTP() {
      if (this.resetemail && !this.isValidEmail(this.resetemail)) {
        this.msg = "Invalid email format";
        this.showSnackbar = true;
      } else if (this.resetphone && !this.isValidPhoneNumber(this.resetphone)) {
        this.msg = "Invalid phone number format";
        this.showSnackbar = true;
      } else {
        axios({
          method: "POST",
          url: "/customer/forgot/password",
          data: {
            email: this.resetemail,
            phoneNumber: this.resetphone,
          },
        })
          .then((response) => {
            if (response.data.status == true) {
              this.msg = response.data.msg;
              this.showSnackbar = true;
              this.senotpDialog = false;
              this.resetDialog = true;
            } else {
              this.msg = response.data.msg;
              this.showSnackbar = true;
            }
          })
          .catch((err) => {
            store.commit("appLoading", false);
            this.ServerError = true;
            console.log(err);
          });
      }
    },
    register() {
      if (this.resetemail && !this.isValidEmail(this.resetemail)) {
        this.msg = "Invalid email format";
        this.showSnackbar = true;
      } else if (this.resetphone && !this.isValidPhoneNumber(this.resetphone)) {
        this.msg = "Invalid phone number format";
        this.showSnackbar = true;
      } else {
        axios({
          method: "POST",
          url: "/customer/register",
          data: {
            phoneNumber: this.regphone,
            name: this.regname,
            password: this.regpass,
            email: this.regemail,
            whatsappCountryCode: this.formattedValue,
          },
        })
          .then((response) => {
            if (response.data.status == true) {
              this.msg = response.data.msg;
              this.showSnackbar = true;
              this.registerDialog = false;
              this.regphone="";
              this.regname="";
              this.regpass="";
              this.regemail="";
            } else {
              this.msg = response.data.msg;
              this.showSnackbar = true;
            }
          })
          .catch((err) => {
            store.commit("appLoading", false);
            this.ServerError = true;
            console.log(err);
          });
      }
    },
    validation() {
      console.log("ghfhgfg");
      console.log(this.regnewpass.toString(), this.regconfirmpass.toString());
      if (!this.resetotp) {
        this.msg = "Please enter otp";
        this.showSnackbar = true;
        return;
      } else if (!this.regnewpass) {
        this.msg = "Please enter password";
        this.showSnackbar = true;
        return;
      } else if (!this.regconfirmpass) {
        this.msg = "Please confirm password";
        this.showSnackbar = true;
        return;
      } else if (
        this.regnewpass.toString() !== this.regconfirmpass.toString()
      ) {
        this.msg = "Password mismatch";
        this.showSnackbar = true;
        return;
      } else {
        this.resetPassword();
      }
    },
    regvalidate2() {
      console.log("ghfhgfg");
      console.log(this.regnewpass.toString(), this.regconfirmpass.toString());
      if (!this.regname) {
        this.msg = "Please enter name";
        this.showSnackbar = true;
        return;
      } else if (!this.regphone) {
        this.msg = "Please enter phone";
        this.showSnackbar = true;
        return;
      } else if (!this.regemail) {
        this.msg = "Please enter email";
        this.showSnackbar = true;
        return;
      } else if (!this.regpass) {
        this.msg = "Please enter email";
        this.showSnackbar = true;
        return;
      } else {
        this.register();
      }
    },
    resetPassword() {
      axios({
        method: "POST",
        url: "/customer/reset/password",
        data: {
          password: this.regnewpass,
          otp: this.resetotp,
          phoneNumber: this.resetphone,
          email: this.resetemail,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackbar = true;
            // this.senotpDialog=false;
            console.log("qwertyhj")
            this.resetDialog = false;
            console.log("resetDialog=",this.resetDialog)

          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
          }
        })
        .catch((err) => {
          store.commit("appLoading", false);
          this.ServerError = true;
          console.log(err);
        });
    },
    login() {
      // var headers1 = {};
      // headers1 = {
      //     guestid: localStorage.getItem("guestId"),
      //   };
      axios({
        // headers: headers1,
        method: "POST",
        url: "/customer/login",
        data: {
          phoneNumber: this.loginphone,
          password: this.loginpass,
          guestid: localStorage.getItem("guestId"),
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackbar = true;
            this.loginDialog = false;
            this.loginphone="";
            this.loginpass="";
            console.log("data==",response.data.data)
            store.commit("userData", response.data.data);
            store.commit("role", response.data.data.role);
            store.commit("loginUser", response.data.token);
            store.commit("userName", response.data.data.name);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.data.role);
            localStorage.setItem("name", response.data.data.name);
            localStorage.removeItem("guestId");
            location.reload();

          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
          }
        })
        .catch((err) => {
          store.commit("appLoading", false);
          this.ServerError = true;
          console.log(err);
        });
    },
    login2() {
      var userData = {};
      userData["otp"] = this.otp;
      userData["password"] = this.password;
      store.commit("appLoading", true);
      axios({
        method: "POST",
        url: "/login/new",
        data: userData,
      })
        .then((response) => {
          store.commit("appLoading", false);
          if (response.data.status==true) {
            this.otp="";
            this.password="";
            localStorage.setItem("role",response.data.data.role)
            store.commit("userType", response.data.data.role);
            store.commit("userData", response.data.data);
            store.commit("userName", response.data.data.name);
            var type1 ="UserLogin"
            store.commit("loginType", type1);
            localStorage.setItem("loginType", type1);
            localStorage.setItem("id", response.data.data._id);
            // store.commit("id", response.data.data._id);

            localStorage.setItem("name", response.data.data.name);
            localStorage.setItem("role", response.data.data.role);


            localStorage.setItem("isverified", response.data.data.verificationStatus);
            localStorage.setItem("level", response.data.data.level);
            store.commit("isverified", response.data.data.verificationStatus);
            store.commit("level", response.data.data.level);

            store.commit("loginUser", response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isvendorLogin", true);
            this.msg = response.data.msg;
            this.showsnackbar = true;
            this.level=response.data.data.level
          this.verificationStatus=response.data.data.verificationStatus;
            if(this.verificationStatus=='Pending' && this.level==0)
            {
              console.log('one')
                this.$router.push("/StepOne");

            }
            else if(this.verificationStatus=='Pending' && this.level==1)
            {
                this.$router.push("/StepTwo");

            }
            else if(this.verificationStatus=='Pending' && this.level==2)
            {
                this.$router.push("/StepThree");

            }
            else if(this.verificationStatus=='Pending' && this.level==3)
            {
                this.$router.push("/StepFour");

            }
            else if(this.verificationStatus=='Pending' && this.level==4)
            {
                this.$router.push("/Approval");

            }
            else if(this.verificationStatus=='Verified' && this.level==4)
            {
                // store.commit("logoutUser", true);
                this.$router.push("/dashboard");

            }
            else{
              this.$router.push("/");
            }
//             setTimeout(() => {
//   this.$router.push("/dashboard");
// }, 2000); 
            // this.$router.push("/dashboard")
            // this.userinfo();
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          store.commit("appLoading", false);
          this.ServerError = true;
          console.log(err);
        });
    },
    appLogout() {
      axios({
        method: "get",
        url: "/customer/logout",
        headers: {
          "token": localStorage.getItem("token"),
        },
        params:{
          id:localStorage.getItem("customerId"),
        }
      })
        .then((response) => {
          if (response.data.status==true) {
            this.$store.commit("logoutUser", true);
        
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          store.commit("appLoading", false);
          this.ServerError = true;
          console.log(err);
        });
    },
    // appLogout() {
    //   this.$store.commit("logoutUser", true);
    // },
  },
};
</script>