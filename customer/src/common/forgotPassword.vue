<template>
    <div>
         <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="rgba(0, 38, 53, 1)"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar
      v-model="showSnackBar"
      color="rgba(0, 38, 53, 1)"
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
            <v-icon style="color: #000">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
        <v-img
        src="./../assets/images/layout2.png"
      >
      <v-layout wrap fill-height justify-center>
        <v-flex xs11 sm6 md4 lg3  align-self-center>
            <v-card
            elevation="0"
            style="border-radius: 10px"
            class="pb-4 pt-8 px-8 my-4"
          >
          
            <v-layout justify-center wrap v-if="isSend=='true'">
              <v-flex xs12 class="pb-4 text-center">
                <span class="font1">Reset Password</span>
              </v-flex>
              <v-flex xs12 sm10 class="pb-4 pt-0 text-center" style="line-height: 18px">
                <span style="font-family: RobotoMedium;font-weight: 400;font-size: 14px;"
                  >Welcome back! Please enter your credentials to access your
                  account</span
                >
              </v-flex>
              <v-flex xs11 class="py-4 text-left">
                <span class="font2">OTP</span>
              
                <v-text-field
                    placeholder="OTP"
                    dense type="number"
                    outlined
                    v-model="otp"
                    hide-details="auto"
                    color="grey"
                    style="background-color: white"
                  >
                  </v-text-field>

              </v-flex>
            
              <v-flex xs11 class="pt-0 pb-0 text-left">
                <span class="font2">New Password</span>
                <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    dense
                    v-model="password"
                    placeholder="Password"
                    color="grey"
                    style="background-color: white"
                    outlined 
                    @click:append-inner="visible = !visible"
                    hide-details="auto"
                    @enter="login2()"
                  >
                  </v-text-field>
              </v-flex>
              <v-flex xs11 class="pb-4 pt-4">
                <v-btn
                  block
                  class="text-none"
                  color="rgba(241, 115, 67, 1)"
                  size="x-large"
                  variant="flat"
                  @click="login2()"
                >
                 <span style="font-family:RobotoRegular;font-size: 16px;font-weight: 700;color: white;">Login</span>
                </v-btn>
              </v-flex>
              <v-flex xs11 class="text-center">
                <span style="font-family: RobotoRegular;font-weight: 400;font-size: 14px;">Not an agent ? </span>
                <span @click="$router.push('/')" style="font-family: RobotoRegular;font-weight: 700;font-size: 14px;text-transform: uppercase;color: rgba(241, 115, 67, 1);"> SIGN UP</span>
              </v-flex>
              <v-flex xs11 class="text-center pt-8" align-self-end>
                <span style="font-family: RobotoRegular;font-weight: 400;font-size: 12px;">Access Rooms Hospitality Consulting Services</span>
              </v-flex>
            </v-layout>
            <v-layout justify-center wrap v-else>
              <v-flex xs12 class="pb-4 text-center">
                <span class="font1">Reset Password</span>
              </v-flex>
              <v-flex xs12 sm10 class="pb-4 pt-0 text-center" style="line-height: 18px">
                <span style="font-family: RobotoMedium;font-weight: 400;font-size: 14px;"
                  >Welcome back! Please enter your credentials to access your
                  account</span
                >
              </v-flex>
              <v-flex xs11 class="py-4 text-left">
                <span class="font2">Phone number</span>
              
                <v-text-field
                    placeholder="Phone number"
                    dense type="number"
                    outlined
                    :rules="phoneRules"
                    v-model="phoneNumber"
                    hide-details="auto"
                    color="grey"
                    style="background-color: white"
                  >
                  </v-text-field>

              </v-flex>
              <v-flex align-self-center xs5 class="pt-0 pb-0 text-center">
                <v-divider></v-divider>
            </v-flex>
              <v-flex align-self-center xs1 class="pt-0 pb-0 text-center"><span class="font2">Or</span>
              </v-flex>
              <v-flex align-self-center xs5 class="pt-0 pb-0 text-center"><v-divider></v-divider>
            </v-flex>
              <v-flex xs11 class="pt-0 pb-0 text-left">
                <span class="font2">Email</span>
                <v-text-field
                    dense
                    v-model="email"
                    placeholder="Email"
                    color="grey"
                    :rules="[rules.email]"
                    style="background-color: white"
                    outlined 
                    hide-details="auto"
                    @enter="login()"
                  >
                  </v-text-field>
              </v-flex>
              <v-flex xs11 class="pb-4 pt-4">
                <v-btn
                  block
                  class="text-none"
                  color="rgba(241, 115, 67, 1)"
                  size="x-large"
                  variant="flat"
                  @click="login()"
                >
                 <span style="font-family:RobotoRegular;font-size: 16px;font-weight: 700;color: white;">Send OTP</span>
                </v-btn>
              </v-flex>
              <v-flex xs11 class="text-center">
                <span style="font-family: RobotoRegular;font-weight: 400;font-size: 14px;">Not an agent ? </span>
                <span @click="$router.push('/')" style="font-family: RobotoRegular;font-weight: 700;font-size: 14px;text-transform: uppercase;color: rgba(241, 115, 67, 1);"> SIGN UP</span>
              </v-flex>
              <v-flex xs11 class="text-center pt-8" align-self-end>
                <span style="font-family: RobotoRegular;font-weight: 400;font-size: 12px;">Access Rooms Hospitality Consulting Services</span>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
        </v-img>
    </div>
</template>
<script>
import axios from "axios";
import store from "./../store";
export default {
  data() {
    return {
      appLoading:false,
      showSnackBar: false,
      ServerError:false,
      timeout: 5000,
      msg: null,
      show1: false,
      show2: false,
      visible: false,
      email: "",
      phoneNumber: "",
      otp: "",
      password: "",
      flag:true,
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
    return pattern.test(value) || "Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long.";
  },
},
phoneRules: [
  // Allow empty value or check the phone number rules
  (v) => (!v || v.length === 0 || /^\d{10}$/.test(v)) || "Invalid phone number",
],

    };
  },
  computed: {
    isSend(){
        return localStorage.getItem("isSend")
    },
  },
  mounted() {
  
  },
  watch: {
    isSend(){
        console.log("qwerty=",this.isSend)
    }
  },
  methods: {
    login() {
        this.flag=false;
      var userData = {};
      userData["phoneNumber"] = this.phoneNumber;
      userData["email"] = this.email;
      store.commit("appLoading", true);
      axios({
        method: "POST",
        url: "/forgot/password",
        data: userData,
      })
        .then((response) => {
          store.commit("appLoading", false);
          if (response.data.status==true) {
          localStorage.setItem("isSend",true)
          location.reload();
        //   this.flag=true;
          } else {
          localStorage.setItem("isSend",false)
        //   this.flag=true;
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
          if (response.data.status) {
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
  },
};
</script>
 
 