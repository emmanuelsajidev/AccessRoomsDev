<template>
  <div>
    <v-snackbar v-model="showSnackBar" color="black" right :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>

    <v-layout wrap justify-center fill-height>
      <v-flex xs12>
        <v-img
          height="100vh"
          width="100%"
          src="../../assets/Images/layout2.png"
        >
          <v-layout wrap justify-center fill-height>
            <v-flex xs12 align-self-center>
              <v-layout wrap justify-center>
                <v-flex xs11 lg11>
                  <v-layout wrap justify-center>
                    <v-flex xs11 sm5 md4 lg3 xl2>
                      <v-card>
                        <v-layout wrap justify-center fill-height>
                          <v-flex xs11 pt-2 text-center>
                            <span
                              class="mainfont"
                              style="font-size: 17px; font-weight: bold"
                              >ADMIN PANEL
                            </span>
                          </v-flex>
                          <v-flex xs3>
                            <v-img
                              height="60px"
                              contain
                              src="../../assets/Images/Logo.png"
                            ></v-img>
                          </v-flex>
                          <v-flex xs10 pt-6>
                            <v-text-field
                              color="orange"
                              placeholder="Phone Number"
                              outlined
                              dense
                              v-model="phoneNumber"
                              :rules="phoneNumberRules"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs10>
                            <v-text-field
                              v-model="password"
                              :type="showPassword ? 'text' : 'password'"
                              color="orange"
                              placeholder="Password"
                              outlined
                              dense
                              :append-icon="
                                showPassword ? 'mdi-eye' : 'mdi-eye-off'
                              "
                              @click:append="togglePasswordVisibility"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs10 pt-5 pb-16>
                            <v-btn
                              @click="validateInput()"
                              block
                              class="custombackground mainfont"
                            >
                              <span style="color: aliceblue">LOGIN</span>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-img>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import store from "./../../store";
export default {
  data() {
    return {
      ServerError: false,
      itemArray2: ["Student", "Non-vegetarian"],
      showSnackBar: false,
      timeout: 5000,
      officeName: null,
      msg: null,
      emailId: null,
      mobNumber: null,
      otp: null,
      phoneNumber: null,
      phone: null,
      showPassword: false,
      showPassword2: false,
      passwordsMatch: true,
      username: null,

      password: null,
      confirmpassword: null,
    };
  },
  mounted() {
    this.phone = this.$route.query.phone;
  },

  watch: {
    confirmpassword(newConfirmPassword) {
      if (newConfirmPassword !== this.password) {
        this.passwordsMatch = false;
      } else {
        this.passwordsMatch = true;
      }
    },
  },
  computed: {
    phoneNumberRules() {
      const rules = [];

      if (!this.isValidPhoneNumber(this.phoneNumber)) {
        rules.push("Invalid phone number");
      }

      return rules;
    },
    guestPhoneRules() {
      return [
        (v) => !!v || "Phone number is required",
        (v) => /^[0-9]{10}$/.test(v) || "Phone number must be 10 digits",
      ];
    },
    emailIdRules() {
      return [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ];
    },
  },
  methods: {
    isValidPhoneNumber(value) {
      // Implement your phone number validation logic here
      // You can use regular expressions or other methods
      // For example, a simple validation for a 10-digit US phone number:
      const phoneNumberRegex = /^\d{10}$/;
      return phoneNumberRegex.test(value);
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    validateInput() {
      if (!this.phoneNumber) {
        this.msg = "Please Provide phoneNumber";
        this.showSnackBar = true;
        return;
      } else if (!this.password) {
        this.msg = "Please Provide password";
        this.showSnackBar = true;
        return;
      } else {
        this.login();
      }
    },

    login() {
      axios({
        method: "post",
        url: "/admin/login",
        data: {
          phoneNumber: this.phoneNumber,
          password: this.password,
        },
      })
        .then((response) => {
          if (response.data.status) {
            store.commit("loginUser", response.data.token);
            this.$router.push({ path: "/DashboardPage" });
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
  },
};
</script>
   
<style>
.custombackground {
  background: var(--orange, linear-gradient(180deg, #ff8b5f 0%, #ff4600 100%));
}
</style>