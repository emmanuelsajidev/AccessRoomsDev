<template>
    <div>
      <v-app-bar dense flat color="white" height="70px">
        <v-layout wrap justify-center>
          <v-flex xs12 sm11 md10 >
            <v-layout wrap justify-center>
              <v-flex xs6 sm2 md2 lg2 align-self-center text-center @click="$router.push('/')" style="cursor: pointer;">
                <v-img height="60%" width="60%" src="./../assets/logoblack.png"></v-img>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6 sm10 md10 lg10 align-self-center>
                <v-layout wrap justify-end>
              <v-flex xs2 sm3 md3 lg2 align-self-center text-left text-lg-right  class="hidden-sm-and-down">
                <span style="font-family: LexendMedium;">Customer Care</span>
              </v-flex>
              <!-- <v-flex xs2 sm3 md3 lg2 ml-2 align-self-center text-left text-lg-right  class="hidden-sm-and-down">
                <v-icon size="20">mdi-whatsapp</v-icon> &nbsp;
                <span style="font-family: LexendMedium; color: #F17343;"> +91 7994111694 </span>
              </v-flex> -->
              <v-flex xs2 sm3 md3 lg2 ml-2 align-self-center text-left text-lg-right  class="hidden-sm-and-down">
                <!-- <v-icon size="20">mdi-whatsapp</v-icon> -->
              <v-layout wrap fill-height>
                <v-flex xs2 align-self-center pt-6> <v-img height="18px" contain src="./../assets/icons/whatsapp.png"></v-img></v-flex>
                <v-flex xs8 align-self-center pt-6><span style="font-family: LexendMedium; color: #F17343;"> +919539920001 </span></v-flex>
              </v-layout>
               
                &nbsp;
                
              </v-flex>
              <v-flex xs2 sm3 md3 lg2 ml-2 align-self-center text-left text-lg-right  class="hidden-sm-and-down">
                <!-- <v-icon size="20">mdi-whatsapp</v-icon> -->
              <v-layout wrap fill-height>
                <v-flex xs2 align-self-center pt-6> <v-img height="18px" contain src="./../assets/icons/phone.png"></v-img></v-flex>
                <v-flex xs8 align-self-center pt-6><span style="font-family: LexendMedium; color: #F17343;"> +919539920001 </span></v-flex>
              </v-layout>
               
                &nbsp;
                
              </v-flex>
              <v-flex xs12 sm3 md2 lg2 text-right v-if="!appLogin" align-self-center>
                <v-btn color="#F17343" dark height="40" width="140" :to="'/login'" >
                  <span style="font-family: LexendMedium; text-transform: none; font-size:18px">Login </span>
                </v-btn>
              </v-flex>
              <v-flex xs12 sm3 md2 lg2 text-right v-if="appLogin" align-self-center>
                <v-btn color="#F17343" dark height="40" width="140" :to="'/'" @click="appLogout()">
                  <span style="font-family: LexendMedium; text-transform: none; font-size:18px">Logout </span>
                </v-btn>
              </v-flex>
            </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
    </v-app-bar>
      <!-- <div>
          <v-row justify="center">
            <v-col cols="10">
              <slot />
            </v-col>
          </v-row>
        </div> -->
    </div>
  </template>
  <script>
  // import axios from "axios";
  export default {
    data() {
      return {
        showsnackbar: false,
        timeout: 5000,
        msg: null,
        appLoading: false,
        categoryList: [],
  
      };
    },
    computed: {
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
    appUser() {
      return this.$store.state.userData.name;
    },
  },
    mounted() {
      // this.getCat();
    },
    methods: {
      appLogout() {
      this.$store.commit("logoutUser", true);
      // if (this.sideNav2 == true) {
      //   this.sideNav2 = false;
      // }
    },
    },
  };
  </script>