<template>
  <div>
    <v-layout wrap justify-end>
      <v-flex xs12 md12>
        <v-menu offset-y right>
          <template v-slot:activator="{ attrs, on }">
            <v-layout wrap justify-center v-bind="attrs" v-on="on"  class="hidden-md-and-down">
              <v-flex xs2 text-center align-self-center>
                <v-icon large color="grey">mdi-account-circle-outline</v-icon>
              </v-flex>
              <v-flex xs10 text-center pl-4>
               <v-layout wrap>
                <v-flex xs12>
                  <span style="font-family:DmSansMedium;font-size:16px;color:black;">
                  {{ userData.name }}
                </span>
                  </v-flex>
                  <v-flex xs12>
                <span
                  style="
                    font-family: DmSansRegular;
                    font-size: 14px;
                    color: grey;
                  "
                >
                  {{ userData.mainRole }}</span
                >
                </v-flex>
               </v-layout>
              </v-flex>
            </v-layout>
            <v-layout wrap justify-center v-bind="attrs" v-on="on"  class="hidden-lg-and-up">
              <v-flex xs12 sm6 text-center text-sm-right pr-0 pr-sm-2 pr-md-0 align-self-center>
                <v-icon color="grey" medium>mdi-account-circle-outline</v-icon>
              </v-flex>
              <v-flex  xs12 sm6 class="hidden-xs-only" pl-3> 
                <span 
                style="
                  font-family: LexendFont;
                  font-weight: 300;
                  font-size: 18px;
                "
                > {{ userData.name }}</span>
              </v-flex>
            </v-layout>
          </template>
          <v-card tile flat :elevation="0" max-width="250px">
            <v-layout wrap justify-center py-4>
              <v-flex text-center pt-4 xs12>
                <span
                  style="
                    font-family: LexendFont;
                    font-weight: 500;
                    font-size: 16px;
                    color: #000000;
                  " 
                >
                  Welcome<br /> 
                  {{ userName }} <br />
                </span>
                </v-flex>
              <v-flex text-center pt-2 xs12>
                <v-icon  color="grey" size="30">
                  mdi-account-circle-outline
                </v-icon>
              </v-flex>
              <v-flex xs12 pt-2 text-center>
                <v-btn
                  color="#0000001f"
                  outlined
                  tile
                  small
                  :ripple="false"
                  @click="$router.push('/profile')"
                >
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 500;
                      font-size: 14px;
                      color: orange;
                    "
                  >
                    Profile
                  </span>
                </v-btn>
              </v-flex>
              <v-flex xs12 pt-2 text-center>
                <v-btn
                  color="#0000001f"
                  outlined
                  tile
                  small
                  :ripple="false"
                  @click="appLogout"
                >
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 500;
                      font-size: 14px;
                      color: orange;
                    "
                  >
                    LOGOUT
                  </span>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-menu>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import store from "./../store";
// import axios from "axios";
export default {
  data() {
    return {
      user: {},
    };
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    },
    userName() {
      return this.$store.state.userName;
    },
  },
// mounted(){
//   console.log("userData",this.userData.name)
// },
  methods: {
    // appLogout() {
    //   axios({
    //     method: "get",
    //     url: "/user/logout",
    //     headers: {
    //       "x-auth-token": localStorage.getItem("token"),
    //     },
    //   })
    //     .then((response) => {
    //       if (response.data.status==true) {
    //         this.$store.commit("logoutUser", true);
    //         localStorage.removeItem("id");
    //         // store.commit("menu", response.data.menus);
    //       } else {
    //         this.msg = response.data.msg;
    //         this.showSnackBar = true;
    //       }
    //     })
    //     .catch((err) => {
    //       store.commit("appLoading", false);
    //       this.ServerError = true;
    //       console.log(err);
    //     });
    // },
    appLogout(){
      store.commit("logoutUser", true);
    },
  },
};
</script> 
