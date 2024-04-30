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
      <v-img
        height="100vh"
        width="100%"
        cover
        src="./../../assets/images/layout2.png"
        alt="logo"
      >
        <v-row justify="center" class="fill-height">
          <v-col cols="11" sm="6" md="4" align-self="center" class="text-center py-5">
            <v-card
              elevation="0"
              style="border-radius: 10px"
              class="px-8 pt-8 pb-3"
            >
              <v-row justify="center">
                <v-col cols="12" class="pb-4 text-center">
                  <span style="font-family: LexendRegular; font-size: 25px"
                    >Agent Login</span
                  >
                </v-col>
                <v-col
                  cols="12"
                  sm="10"
                  class="pb-4 pt-0 text-center"
                  style="line-height: 18px"
                >
                  <span style="font-family: LexendRegular; font-size: 14px"
                    >Welcome back! Please enter your credentials to access your
                    account</span
                  >
                </v-col>
                <v-col
                  cols="11"
                  class="py-4 text-left"
                  style="font-family: LexendRegular; font-size: 14px"
                >
                  <span>Phone Number</span>
                  <v-text-field
                    placeholder="-phone-number-"
                    dense
                    color="orange"
                    outlined
                    v-model="phoneNumber"
                    hide-details="auto"
                 
                    style="background-color: white"
                  >
                  </v-text-field>
                </v-col>
                <v-col
                  cols="11"
                  class="pt-0 pb-0 text-left"
                  style="font-family: LexendRegular; font-size: 14px;"
                >
                  <span>Password</span>
                  <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    dense
                    color="orange"

                    v-model="password"
                    placeholder="-password-"
                    style="background-color: white"
                    outlined
                    @click:append-inner="visible = !visible"
                    hide-details="auto"
                  >
                  </v-text-field>
                </v-col>
                <v-col 
                @click="$router.push('/forgotPassword')"
                style="cursor: pointer;"
                cols="11" class="pb-2 pt-4 pt-0 text-right">
                  <span style="font-family: LexendRegular; font-size: 14px"
                    >FORGOT PASSWORD</span
                  >
                </v-col>
                <v-col cols="11" class="pt-4" style="font-family: LexendRegular">
                  <v-btn
                    block
                    class="mb-4"
                    color="rgba(241, 115, 67, 1)"
                    size="large"
                    dark
                    @click="login()"
                  >
                    Login
                  </v-btn>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <span style="font-family: LexendRegular"
                    >Not an agent ?
                    <span style="color: #f17343; cursor: pointer;" @click="$router.push('/')">SIGN UP</span></span
                  >
                </v-col>
                <v-col cols="12" class="pt-8"
                  ><span style="font-family: LexendRegular; font-size: 13px"
                    >Access Rooms Hospitality Consulting Services</span
                  ></v-col
                >
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-img>
    </div>
  </template>
     <script>
   import axios from "axios";
  import store from "../../store";
  export default {
    data() {
      return {
        appLoading: false,
        ServerError: false,
        snackbar: false,
        timeout: 5000,
        msg: null,
        verificationStatus:"",
        show1: false,
        show2: true,
        visible: false,
        password: "",
        phoneNumber: "",
        level:"",
        rules: {
          required: (value) => !!value || "Required.",
          min: (v) => v.length >= 8 || "Min 8 characters",
        },
        // blogId:this.$route.query.name,
      };
    },
    computed: {},
    mounted() {},
    watch: {},
    methods: {
        login() {
    //   if (this.$refs.form.validate()) {
        axios({
          method: "POST",
          url: "/agent/login",
          data: {
            phoneNumber: this.phoneNumber,
            password: this.password,
            // guestId: localStorage.getItem("userId")
          },
        }).then((response) => {
          if (response.data.status) {
            localStorage.setItem("role",response.data.data.role)
            store.commit("userType", response.data.data.role);
            store.commit("userData", response.data.data);
            store.commit("userName", response.data.data.name);
            const boatTypes = response.data.data.vendorCategory.map(item => item.categoryType);
      store.commit("boatType", boatTypes);
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
            localStorage.setItem("isagentLogin", true);
            this.msg = response.data.msg;
            this.showSnackBar = true;
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
                console.log("app")


            }
            else if(this.verificationStatus=='Verified' && this.level==4)
            {
                this.$router.push("/dashboard");
                console.log("dash")

            }
            else{
              this.$router.push("/");
            }
          } else {
            this.snackbar = true;
            this.msg = response.data.msg;
          }
        });
      }
    // },
    },
  };
  </script>
     
     