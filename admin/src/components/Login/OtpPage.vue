<template>
  <div>
    <v-app id="inspire">
      <v-layout wrap justify-center class="bg8">
        <v-flex xs12 sm6 md4 lg3 px-2 align-self-center>
          <v-snackbar
            v-model="showSnackBar"
            color="black"
            right
            :timeout="timeout"
          >
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
          <v-layout wrap justify-center>
            <v-flex xs11 xl0>
              <v-card outlined color class="pa-4">
                <v-layout wrap justify-center>
                  <v-flex>
                    <v-layout wrap justify-center>
                     
                      <v-flex xs12 text-center>
                        <span
                          style="
                            font-family: mainfont;
                            font-size: 20px;
                            cursor: pointer;
                            color: black;
                          "
                        >
                          IB BOOKING
                        </span>
                      </v-flex>

                      <v-flex xs12>
                        <v-layout wrap justify-center>
                          <v-flex xs6 lg4 text-center>
                            <span
                              style="
                                font-family: mainfont;
                                font-size: 15px;
                                color: #000;
                              "
                            >
                              Log In
                            </span>
                            <v-progress-linear
                              height="4"
                              value="100"
                              color="#29807C"
                            ></v-progress-linear>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex pt-8 xs12 text-left>
                        <v-layout wrap justify-center>
                          
                          <v-flex xs12>
                            <v-form @submit.prevent="validateInput">
                              <v-text-field
                                color="#717171"
                                placeholder="User Name"
                                outlined
                                dense
                                style="font-family: mainfont"
                                v-model="username"
                                hide-details
                              >
                              </v-text-field>
                            </v-form>
                          </v-flex>
                          <v-flex xs12 >
                            <v-form @submit.prevent="validateInput">
                              <v-text-field
                                color="#717171"
                                placeholder="Password "
                                outlined
                                dense
                                style="font-family: mainfont"
                                v-model="password"
                                hide-details
                              >
                              </v-text-field>
                            </v-form>
                          </v-flex>
                        </v-layout>
                        <!-- <v-layout wrap justify-center pt-2>
                            <v-flex xs12 pb-2>
                              <span
                                style="
                                  font-family: robotoregular;
                                  font-size: 12px;
                                  color: black;
                                "
                                ><strong> Password</strong>
                              </span>
                            </v-flex>
                            <v-flex xs12>
                              <v-form @submit.prevent="validateInput">
                                <v-text-field
                                  color="#717171"
                                  style="font-family: robotoregular"
                                  placeholder="Password"
                                  type="password"
                                  outlined
                                  v-model="password"
                                  dense
                                  hide-details
                                >
                                </v-text-field>
                              </v-form>
                            </v-flex>
                          </v-layout> -->
                      </v-flex>
                      <!-- <v-flex pt-2 xs12 text-left>
                            <router-link to="/ForgotPassword">
                              <span
                                style="
                                  font-family: poppinssemibold;
                                  font-size: 12px;
                                  text-transform: none;
                                "
                              >
                                Forgot Password ?
                              </span>
                            </router-link>
                          </v-flex> -->
                      <v-flex xs11 pt-5 pb-8 >
                        <v-btn
                          class="no-uppercase mainfont"
                          dark
                         block
                          color="#13736f"
                          @click="validateInput"
                        >
                          Continue
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-app>
  </div>
</template>

    <script>
import axios from "axios";
import store from "./../../store";
export default {
  data() {
    return {
      ServerError: false,
      showSnackBar: false,
      timeout: 5000,
      msg: null,
      otp: null,
      phone: null,
      username: null,
      password: null,
    };
  },
  mounted() {
    this.phone = this.$route.query.phone;
  },
  methods: {
    validateInput() {
      if (!this.username) {
        this.msg = "Please Provide OTP";
        this.showSnackBar = true;
        return;
      } else {
        this.login();
      }
    },
    login() {
      axios({
        method: "post",
  url: "/login/",
        data: {
          username: this.username,
    password: this.password,
        },
      })
        .then((response) => {
          store.commit("appLoading", false);
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
.mainbg {
  background-image: linear-gradient(269.6deg, #29807c -31.66%, #29807c);
}
</style>