<template>
    <div>
      <v-app-bar dense flat color="white" height="80px">
        <v-layout wrap justify-center>
          <v-flex xs12 sm11 md10 >
            <v-layout wrap justify-center>
              <v-flex xs6 sm2 md2 lg2 align-self-start texte-center @click="$router.push('/')" style="cursor: pointer;">
                <v-img height="auto" width="80%" src="./../../assets/accessroomslogo.png"></v-img>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6 sm10 md10 lg10 align-self-center>
                <v-layout wrap justify-end>
                  <v-flex xs10 sm10>
                    <v-layout wrap justify-end>
                      <v-flex xs2 sm3 md3 lg2 align-self-center text-right  class="hidden-sm-and-down">
                <span style="font-family: LexendRegular;">Customer Care</span>
              </v-flex>
              <v-flex xs2 sm3 md3 lg3 align-self-center text-right  class="hidden-sm-and-down">
                <v-icon size="20">mdi-whatsapp</v-icon> &nbsp;
                <span style="font-family: LexendRegular; color: #F17343;"> +91 7994111694 </span>
              </v-flex>
              <v-flex xs2 sm3 md3 lg3 xl2 align-self-center text-center  class="hidden-sm-and-down">
                <v-icon size="20">mdi-phone</v-icon> &nbsp;
                <span style="font-family: LexendRegular; color: #F17343;"> +91 9539920001 </span>
              </v-flex>
              <v-flex xs12 sm3 md3 lg2 text-right v-if="!appLogin">
                <v-btn color="#F17343" dark height="40" width="140" :to="'/login'" >
                  <span style="font-family: LexendRegular; text-transform: none; font-size:18px">Login </span>
                </v-btn>
              </v-flex>
                    </v-layout>
                  </v-flex>
                  
              <v-flex xs12 sm3 md3 lg2 text-right v-if="appLogin">
                <v-btn color="#F17343" dark height="40" width="140" :to="'/'" @click="appLogout()">
                  <span style="font-family: LexendRegular; text-transform: none; font-size:18px">Logout </span>
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