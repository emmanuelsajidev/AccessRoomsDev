<template>
  <div>
      <v-layout wrap justify-center >
        <v-flex xs12>
          <v-img contain src="../../assets/Images/mainlogo.png">
            <v-layout wrap>
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
            <v-flex xs12 xl0>
              <v-card outlined color class="rounded-xl">
                <v-layout wrap justify-center>
                  <v-flex px-8 py-6>
                    <v-layout wrap justify-center>
                      <v-flex xs10 pt-3 style="cursor: pointer" text-center>
                        <v-img contain src="../../assets/Images/mainlogo.png">
                        </v-img>
                      </v-flex>
                      <v-flex xs12 text-center>
                        <span
                          style="
                            font-family: opensanssemibold;
                            font-size: 20px;
                            cursor: pointer;
                            color: black;
                          "
                        >
                          ADMIN PANEL
                        </span>
                      </v-flex>

                      <v-flex xs12>
                        <v-layout wrap justify-center>
                          <v-flex xs6 lg4 text-center>
                            <span
                              style="
                                font-family: opensanssemibold;
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
                          <v-flex xs12 pb-2>
                            <span
                              style="
                                font-family: mainfont;
                                font-size: 12px;
                                color: black;
                              "
                              ><strong> Phone number</strong>
                            </span>
                          </v-flex>
                          <v-flex xs12>
                            <v-form @submit.prevent="validateInput">
                              <v-text-field
                                color="#717171"
                                placeholder="Phone number"
                                outlined
                                dense
                                style="font-family: robotoregular"
                                v-model="phone"
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
                      <v-flex xs12 py-6>
                        <v-btn
                          block
                          tile
                          color="black"
                          light
                          :ripple="false"
                          depressed
                          dark
                          @click="validateInput"
                          class="opensansregular"
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
      showSnackBar: false,
      timeout: 5000,
      msg: null,
      phone: null,
      password: null,
    };
  },
  methods: {
    validateInput() {
      if (!this.phone) {
        this.msg = "Please Provide phone";
        this.showSnackBar = true;
        return;
      }
       else {
        this.login();
      }
    },
    login() {
      // userData["password"] = this.password;
      axios({
        method: "GET",
        url: "/user/signup/signin/send/otp",
        params: {
          phone: this.phone,
          accessType: "signin",
        },
      })
        .then((response) => {
          store.commit("appLoading", false);
          if (response.data.status) {
            // store.commit("loginUser", response.data.token);
            this.$router.push({
          path: "/OtpPage",
          query: { phone: this.phone }, 
        });
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