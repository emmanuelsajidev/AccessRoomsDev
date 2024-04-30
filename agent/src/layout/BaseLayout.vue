<template>
  <div>
    <v-layout wrap justify-center fill-height>
      <!-----------------------------------xs HEADER&NAV BAR------------------------------------------->
      <!-- <v-layout wrap > -->
      <v-flex xs12 class="hidden-lg-and-up">
        <v-app-bar
          app
          color="white"
          dense
          flat
          height="70px"
          class="hidden-lg-and-up"
        >
          <v-layout wrap justify-center>
            <v-flex xs1 sm7 md2 align-self-center>
              <v-layout wrap>
                <v-flex xs12 md3>
                  <v-app-bar-nav-icon @click.native="sideNavxs = !sideNavxs">
                <v-icon color="rgba(0, 38, 53, 1)">mdi-menu</v-icon>
              </v-app-bar-nav-icon>

                </v-flex>
                <v-flex md6 class="d-none d-md-flex d-lg-none">
                  <v-img
                    contain
                    src="./../assets/accessroomslogo.png"
                  ></v-img>
                </v-flex>
              </v-layout>
            
            </v-flex>
           
            <v-flex pl-8 xs10 sm4  md9 @click="toggleDropdown">
              <v-layout wrap justify-end>
                <v-flex
                  xs12
                  sm12
                  md4
                  pa-1
                  style="background-color: #f4f4f4; border-radius: 11px"
                >
                  <v-layout wrap justify-end>
                    <v-flex xs1 sm1 pa-1>
                      
                      <v-avatar v-if="img">
                        <v-img contain :src="mediaUURL + img"></v-img>
                      </v-avatar>
                      

                      <v-avatar v-else>
                        <v-img contain src="./../assets/headerimg.png"></v-img>
                      </v-avatar>
                    </v-flex>
                    <v-flex x6 sm10 align-self-center text-left pl-10 >
                      <span
                        style="
                          font-weight: 400;
                          font-size: 11px;
                          font-family: LexendRegular;
                        "
                      >
                        {{ name }}
                      </span>
                      <br />
                      <span
                        style="
                          font-weight: 400;
                          font-size: 12px;
                          font-family: LexendRegular;
                          color: #81807f;
                        "
                      >
                        {{ utype }}
                      </span>
                      <v-icon v-if="!isDropdownVisible"
                        >mdi-chevron-down</v-icon
                      >
                      <v-icon v-else>mdi-chevron-up</v-icon>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>

              <!-- Dropdown content -->
              <v-slide-y-transition>
                <v-card
                  v-if="isDropdownVisible"
                  style="
                    position: absolute;
                    top: 100%;
                    right: 6%;
                    width: 150px;
                    z-index: 3000; /* Adjusted z-index value */
                    overflow: visible; /* Adjusted overflow property */
                  "
                >
                  <v-layout wrap justify-center>
                    <v-flex xs8 pt-5 pl-2 pb-6>
                      <v-btn
                        @click="$router.push('/ViewProfile')"
                        block
                        color="#F17343"
                      >
                        <span
                          style="
                            font-family: LexendRegular;
                            color: white;
                            font-size: 11px;
                            text-transform: none;
                          "
                        >
                          View 
                        </span>
                        <v-icon size="120%" color="white">
                          &nbsp;mdi-eye</v-icon
                        >
                      </v-btn>
                    </v-flex>
                  </v-layout>
                  <!-- Dropdown content, e.g., Edit Profile button -->
                </v-card>
              </v-slide-y-transition>
            </v-flex>
          </v-layout>
        </v-app-bar>
      </v-flex>
      <v-navigation-drawer
        v-model="sideNavxs"
        fixed
        temporary
        overlay-color="white"
        color="rgba(0, 38, 53, 1)"
      >
        <v-layout wrap>
          <v-flex xs12 text-left text-uppercase align-self-center>
            <v-list
              dense
              v-for="(main, i) in userNavItemsSuperAdmin"
              :key="i"
              class="LexendRegular"
            >
              <v-layout wrap>
                <v-flex
                  pt-3
                  xs12
                  sm3
                  py-1
                  @click="$router.push({ path: main.menu.route })"
                >
                  <v-list-group
                    no-action
                    :value="false"
                    active-class="activated"
                  >
                    <template v-slot:activator>
                      <v-list-item-icon>
                        <v-img
                          height="20px"
                          contain
                          :src="main.menu.src"
                        ></v-img>
                      </v-list-item-icon>
                      <span
                        class="text-none LexendRegular"
                        style="color: #ffffff !important; cursor: pointer"
                      >
                        {{ main.menu.name }}
                      </span>
                    </template>
                  </v-list-group>
                </v-flex>
              </v-layout>
            </v-list>
            <v-layout wrap class="pl-6 pt-8">
              <v-flex
                xs12
                style="cursor: pointer"
                @click="appLogout()"
                class="white-outline"
              >
                <v-icon size="120%" color="white">mdi-logout</v-icon>
                <span
                  style="
                    color: #ffffff !important;
                    text-transform: none;
                    text-decoration: none;
                    font-family: LexendRegular;
                    font-weight: 500;
                    font-size: 16px;
                  "
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout</span
                >
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-navigation-drawer>
      <!-- </v-layout> -->
      <!------------------------------------------------------------------------------>
      <!------------------------------------NORMAL HEADER&NAV BAR------------------------------------------>
      <v-flex xs12 sm12 md12 lg2 class="hidden-md-and-down">
        <v-navigation-drawer
          style="z-index: 2000; background-color: rgba(0, 38, 53, 1)"
          class="fixedSidebar"
          v-model="sideNav"
          clipped
          dark
          overlay-color="white"
          width="100%"
          height="100vh"
          permanent
          color="rgba(0, 38, 53, 1)"
        >
          <v-layout wrap pt-6 px-3>
            <v-flex xs12 text-left text-uppercase align-self-center>
              <v-list
                dense
                v-for="(main, i) in userNavItemsSuperAdmin"
                :key="i"
                class="LexendRegular"
              >
                <!-- :style="
                        $route.path == main.menu.route
                          ? 'background:rgba(255, 255, 255, 0.1)'
                          : ''
                      " -->
                <v-layout wrap @click="$router.push({ path: main.menu.route })">
                  <v-flex xs12 py-1>
                    <v-list-group
                      class="px-0 mx-0"
                      no-action
                      :value="false"
                      active-class="activated"
                      :style="
                        $route.path == main.menu.route
                          ? 'background:rgba(241, 115, 67, 1)'
                          : ''
                      "
                      style="border-radius: 10px"
                    >
                      <template v-slot:activator>
                        <v-layout wrap>
                          <v-flex xs12> </v-flex>
                        </v-layout>
                        <v-list-item-icon class="px-1 mx-0">
                          <v-img
                            height="20px"
                            contain
                            :src="main.menu.src"
                          ></v-img> </v-list-item-icon
                        >&nbsp;&nbsp;
                        <v-list-item-title
                          class="px-1 mx-0"
                          style="
                            letter-spacing: 2px;
                            color: black;
                            cursor: pointer;
                            text-decoration: none;
                          "
                        >
                          <span
                            class="text-none"
                            style="
                              color: #ffffff !important;
                              text-transform: none;
                              text-decoration: none;
                              font-family: LexendRegular;
                              font-weight: 500;
                              font-size: 14px;
                            "
                          >
                            {{ main.menu.name }}
                          </span>
                        </v-list-item-title>
                      </template>
                      <!-------------->
                    </v-list-group>
                  </v-flex>
                </v-layout>
              </v-list>
              <v-layout wrap justify-start class="pl-5 pt-7 mt-auto">
                <v-flex
                  align-self-start
                  xs7
                  style="cursor: pointer"
                  @click="appLogout()"
                  class="white-outline"
                >
                  <v-icon size="160%" color="white">mdi-logout</v-icon>
                  <span
                    pt-4
                    style="
                      color: #ffffff !important;
                      text-transform: none;
                      text-decoration: none;
                      font-family: LexendRegular;
                      font-weight: 500;
                      font-size: 16px;
                    "
                    >&nbsp;&nbsp;&nbsp;Logout</span
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-navigation-drawer>
      </v-flex>
      <v-flex xs12 sm12 md12 lg10>
        <!-- <AppHeader /> -->
        <v-layout
          wrap
          justify-center
          style="background-color: #f5f2f0; min-height: 100vh"
        >
          <v-flex xs12 pa-1 px-md-6 pb-1 pb-md-6 pt-16 pt-md-16>
            <router-view :key="$route.fullPath"></router-view>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sideNav: true,
      isDropdownVisible: false,
      name: localStorage.getItem("name"),
      userRole: localStorage.getItem("userRole"),
      userType: localStorage.getItem("userType"),

      sideNavxs: false,
      admin: [{ name: "ADMINS", route: "/Admins" }],
      menu2: [],
      userNavItemsSuperAdmin: [
        {
          menu: {
            name: "Dashboard ",
            src: require("../assets/icons/img1.png"),
            route: "/dashboard",
          },
        },
        {
          menu: {
            name: "Book HouseBoat",
            src: require("../assets/icons/img3.png"),
            route: "/Houseboatmainpage",
          },
        },
        {
          menu: {
            name: "Book Shikara",
            src: require("../assets/icons/img4.png"),
            route: "/mainpage",
          },
        },
        {
          menu: {
            name: "HB Bookings",
            src: require("../assets/icons/img2.png"),
            route: "/houseboatbookings",
          },
        },
        {
          menu: {
            name: "Shikara Bookings",
            src: require("../assets/icons/img6.png"),
            route: "/shikarabookings",
          },
        },
      ],
    };
  },
  computed: {
    utype(){
        return this.$store.state.userData.userType
    },
    img() {
      return this.$store.state.profileImg;
    },
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
    appUser() {
      return this.$store.state.userData.name;
    },
  },

  methods: {
    toggleDropdown() {
      // Toggle the visibility of the dropdown
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    appLogout() {
      this.$store.commit("logoutUser", true);
    },
  },
};
</script>
<style>
.v-list-group__header__append-icon {
  display: none !important;
}

@media only screen and (min-device-width: 767px) {
  .fixedSidebar {
    /* position: fixed; */

    position: -webkit-sticky;
    /* Safari */
    position: sticky;
    top: 50;
  }
}

@media only screen and (min-device-width: 360px) and (max-device-width: 640px) {
  .fixedSidebar {
    display: none !important;
  }
}

/* .activated { */
.activated {
  color: rgba(63, 3, 59, 0.9) !important;
}

.deactivated {
  color: rgba(63, 3, 59, 0.9) !important;
}

/* } */
</style>
