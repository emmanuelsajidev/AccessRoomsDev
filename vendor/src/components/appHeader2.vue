<template>
  <div>
    <v-app-bar
      dense
      flat
      color="white"
      :height="
        $vuetify.breakpoint.name == 'xs'
          ? '50px'
          : $vuetify.breakpoint.name == 'sm'
          ? '50px'
          : $vuetify.breakpoint.name == 'md'
          ? '60px'
          : $vuetify.breakpoint.name == 'lg'
          ? '60px'
          : '90px'
      "
    >
      <v-layout wrap justify-center class="hidden-md-and-down">
        <v-flex xs12>
          <v-layout wrap justify-center px-6>
            <v-flex
              xs6
              sm2
              md2
              lg2
              xl1
              align-self-center
              text-center
              @click="$router.push('/')"
              style="cursor: pointer"
            >
              <v-img
                class="hidden-xl-only"
                height="60px"
                contain
                src="./../assets/logoblack.png"
              ></v-img>
              <v-img
                class="hidden-lg-and-down"
                height="90px"
                contain
                src="./../assets/logoblack.png"
              ></v-img>
            </v-flex>
            <v-spacer></v-spacer>

            <v-flex
              xs6
              sm2
              md3
              lg2
              align-self-center
              text-center
              v-if="appLogin == true || appLogin == 'true'"
            >
              <v-card
                class="mx-3 pa-1"
                elevation="0"
                height="100%"
                color="rgba(248, 248, 248, 1)"
                style="border-radius: 10px"
              >
                <!-- <v-layout wrap fill-height @click="toggleDropdown"> -->
                <v-layout wrap fill-height @click="$router.push('/profile')" style="cursor: pointer;">
                  <v-flex xs4 align-self-center
                    ><v-icon color="grey" large
                      >mdi-account-circle</v-icon
                    ></v-flex
                  >
                  <v-flex
                    xs8
                    align-self-center
                    text-left
                    style="line-height: 15px"
                    ><span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 16px;
                      "
                      v-if="userName"
                      >{{ userName }}</span
                    >
                    <br /><span
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 12px;
                        color: rgba(129, 128, 127, 1);
                      "
                      v-if="userType"
                      >{{ userType }}</span
                    >
                    <!-- <v-icon style="cursor: pointer;" v-if="!isDropdownVisible">mdi-chevron-down</v-icon>
                    <v-icon v-else>mdi-chevron-up</v-icon> -->
                  </v-flex>
                </v-layout>
                <v-slide-y-transition>
                  <v-card
                    v-if="isDropdownVisible"
                    style="
                      position: absolute;
                      top: 100%;
                      right: 6%;
                      width: 200px;
                      z-index: 3000; /* Adjusted z-index value */
                      overflow: visible; /* Adjusted overflow property */
                    "
                  >
                    <v-layout wrap justify-center>
                      <v-flex xs8 pt-5 pl-2 pb-6  @click="($router.push('/profile')),(isDropdownVisible=false)">
                        <v-btn
                          @click="($router.push('/profile')),(isDropdownVisible=false)"
                          block style="cursor: pointer;"
                          small
                          color="#F17343"
                        >
                          <span   @click="($router.push('/profile')),(isDropdownVisible=false)"
                            style="
                              font-family: LexendRegular;
                              color: white;
                              font-size: 11px;
                              text-transform: none;
                            ">
                          <v-icon size="120%" color="white" > mdi-eye</v-icon>
                          
                            View Profile
                          </span>
                          &nbsp;
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-slide-y-transition>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout wrap class="hidden-lg-and-up">
        <v-flex xs12>
          <v-app-bar
            app
            color="white"
            dense
            flat
            height="50px"
            class="hidden-lg-and-up"
          >
            <v-layout wrap>
              <v-flex xs2>
                <v-app-bar-nav-icon @click.native="sideNav = !sideNav">
                  <v-icon color="#3F033B">mdi-menu</v-icon>
                </v-app-bar-nav-icon>
              </v-flex>
              <!-- <v-flex xs8 sm2 md2 lg2 align-self-start texte-center @click="$router.push('/')" style="cursor: pointer;">
                <v-img height="60%" width="60%" src="./../assets/logoblack.png"></v-img>
              </v-flex> -->
              <!-- <v-flex xs2 xl1 pl-4 text-right align-self-center style="cursor:pointer">
              <AccountMenu />
            </v-flex> -->
            </v-layout>
          </v-app-bar>
        </v-flex>

        <!-- xs header -->
      </v-layout>
    </v-app-bar>
  </div>
</template>
  <script>
// import axios from "axios";
export default {
  data() {
    return {
      showsnackbar: false,
      isDropdownVisible: false,
      timeout: 5000,
      msg: null,
      appLoading: false,
      sideNav: true,
      navItems: [
        {
          menu: {
            name: "Dashboard",
            src: require("../assets/icons/img1.png"),
            route: "/dashboard",
          },
        },
        {
          menu: {
            name: "Bookings",
            src: require("../assets/icons/img2.png"),
            route: "/Bookings",
          },
        },
        {
          menu: {
            name: "Shikaras",
            src: require("../assets/icons/img3.png"),
            route: "/Bookings",
          },
        },
        {
          menu: {
            name: "Houseboats",
            src: require("../assets/icons/img4.png"),
            route: "/Houseboats",
          },
        },
        {
          menu: {
            name: "Settlements",
            src: require("../assets/icons/img5.png"),
            route: "/Bookings",
          },
        },
        {
          menu: {
            name: "Reports",
            src: require("../assets/icons/img6.png"),
            route: "/Bookings",
          },
        },
        {
          menu: {
            name: "About",
            src: require("../assets/icons/img7.png"),
            route: "/Bookings",
          },
        },
      ],
    };
  },
  computed: {
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
    userType() {
      return this.$store.state.userType;
    },
    userData() {
      return this.$store.state.userData;
    },
    userName() {
      return this.$store.state.userName;
    },
  },
  mounted() {
    // this.getCat();
  },
  // methods: {
  //   appLogout() {
  //   this.$store.commit("logoutUser", true);

  // },
  // },
  methods: {
    toggleDropdown() {
      // Toggle the visibility of the dropdown
      this.isDropdownVisible = !this.isDropdownVisible;
    },
  },
};
</script>