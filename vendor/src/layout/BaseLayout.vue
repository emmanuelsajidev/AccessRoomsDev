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
          height="50px"
          class="hidden-lg-and-up"
        >
          <v-layout wrap justify-start>
            <v-flex xs2 md1 lg2 align-self-center>
              <v-app-bar-nav-icon @click.native="sideNavxs = !sideNavxs">
                <v-icon color="#002635">mdi-menu</v-icon>
              </v-app-bar-nav-icon>
            </v-flex>
            <v-flex xs8 align-self-start align-self-md-center text-left pl-2>
              <router-link to="/dashboard">
                <v-img
                  :style="{
                    height:
                      $vuetify.breakpoint.name == 'xs'
                        ? '50%'
                        : $vuetify.breakpoint.name == 'sm'
                        ? '20%'
                        : $vuetify.breakpoint.name == 'md'
                        ? '15%'
                        : $vuetify.breakpoint.name == 'lg'
                        ? '60%'
                        : '60%',
                    width:
                      $vuetify.breakpoint.name == 'xs'
                        ? '50%'
                        : $vuetify.breakpoint.name == 'sm'
                        ? '20%'
                        : $vuetify.breakpoint.name == 'md'
                        ? '15%'
                        : $vuetify.breakpoint.name == 'lg'
                        ? '60%'
                        : '60%',
                  }"
                  src="./../assets/logoblack.png"
                ></v-img>
              </router-link>
            </v-flex>
            <v-flex xs2 md3 lg2 align-self-center>
              <AccountMenu />
            </v-flex>
          </v-layout>
        </v-app-bar>
      </v-flex>
      <v-navigation-drawer
        v-model="sideNavxs"
        fixed
        temporary
        overlay-color="white"
        color="#002635"
      >
        <v-layout wrap>
          <v-flex
            xs12
            text-left
            text-uppercase
            align-self-center
            v-if="navItems"
          >
            <v-list dense v-for="(main, i) in navItems" :key="i" class="subhed">
              <v-layout wrap>
                <v-flex
                  xs12
                  py-1
                  px-2
                  @click="$router.push({ path: main.menu.route })"
                >
                  <v-list-group
                    no-action
                    :value="false"
                    active-class="activated"
                    :style="
                      $route.path == main.menu.route ? 'background:#f17343' : ''
                    "
                  >
                    <template v-slot:activator>
                      <v-list-item-icon>
                        <v-img
                          height="20px"
                          contain
                          :src="main.menu.src"
                        ></v-img>
                      </v-list-item-icon>
                      <!-- <router-link :to="main.menu.route"> -->
                      <!-- <span
                        class="text-none subhed"
                        style="
                          color: #ffffff !important;
                          cursor: pointer;
                          text-decoration: none !important;
                          font-weight: 500;
                          font-size: 20px;
                          font-family: LexendRegular;
                        "
                      > -->
                      <span
                        class="text-none px-0 mx-0"
                        style="
                          color: #ffffff !important;
                          text-decoration: none !important;
                          font-weight: 300;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                      >
                        {{ main.menu.name }}
                      </span>
                      <!-- </router-link> -->
                    </template>
                  </v-list-group>
                </v-flex>
              </v-layout>
            </v-list>
            <v-layout wrap class="px-4 pt-8">
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
                    font-family: LexendFont;
                    font-weight: 500;
                    font-size: 20px;
                  "
                  >&nbsp;&nbsp;&nbsp;Logout</span
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
          style="z-index: 2000; background-color: #002635"
          class="fixedSidebar"
          v-model="sideNav"
          clipped
          dark
          overlay-color="white"
          width="100%"
          height="100vh"
          permanent
          color="#002635"
        >
          <v-layout wrap pt-6 px-3>
            <v-flex
              xs12
              text-left
              text-uppercase
              align-self-center
              v-if="navItems && this.appType == 'Vendor'"
            >
              <v-list
                dense
                v-for="(main, i) in navItems"
                :key="i"
                class="subhed pt-0 pb-2"
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
                          ? 'background:#f17343'
                          : ''
                      "
                      style="border-radius: 10px"
                    >
                      <!-- <v-layout wrap>
                      <v-flex xs2><v-img
                            height="20px"
                            contain
                            :src="main.menu.src"
                          ></v-img></v-flex>
                          <v-flex xs10>
                             <span
                            class="text-none px-0 mx-0"
                            style="
                              color: #ffffff !important;
                              text-decoration: none !important;
                              font-weight: 300;
                              font-size: 15px;
                              font-family: LexendRegular;
                            "
                          >
                            {{ main.menu.name }}
                          </span>
                          </v-flex>
                    </v-layout> -->
                      <template v-slot:activator style="padding-left: 0">
                        <v-list-item-icon
                          class="px-1 mx-0"
                          @click="$router.push({ path: main.menu.route })"
                        >
                          <v-img
                            height="20px"
                            contain
                            :src="main.menu.src"
                          ></v-img>
                        </v-list-item-icon>
                        <v-list-item-title
                          class="px-0 mx-0"
                          style="
                            letter-spacing: 2px;
                            color: black;
                            cursor: pointer;
                            text-decoration: none;
                          "
                          @click="$router.push({ path: main.menu.route })"
                        >
                          <span
                            class="text-none px-0 mx-0"
                            style="
                              color: #ffffff !important;
                              text-decoration: none !important;
                              font-weight: 300;
                              font-size: 15px;
                              font-family: LexendRegular;
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
              <v-layout wrap class="px-4 pt-8">
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
                      font-weight: 300;
                      font-size: 15px;
                      font-family: LexendRegular;
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
          <v-flex xs12 pa-1 pa-md-6>
            <router-view :key="$route.fullPath"></router-view>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import AccountMenu from "./../components/accountMenu";
export default {
  components: {
    AccountMenu,
  },
  data() {
    return {
      sideNav: true,
      sideNavxs: false,
      admin: [{ name: "ADMINS", route: "/Admins" }],
      menu2: [],
      userNavItemsSuperAdmin: [
        {
          menu: {
            name: "Dashboard",
            src: require("../assets/icons/img1.png"),
            route: "/dashboard",
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
            name: "Bookings(HB)",
            src: require("../assets/icons/img2.png"),
            route: "/houseboatbookings",
          },
        },
        {
          menu: {
            name: "Reservation(HB)",
            src: require("../assets/icons/appointment.png"),
            route: "/houseboatReservationsList",
          },
        },
        {
          menu: {
            name: "Shikaras",
            src: require("../assets/icons/img3.png"),
            route: "/Shikara",
          },
        },
        {
          menu: {
            name: "Bookings(SK)",
            src: require("../assets/icons/img2.png"),
            route: "/shikarabookings",
          },
        },
        {
          menu: {
            name: "Reservation(SK)",
            src: require("../assets/icons/appointment.png"),
            route: "/shikaraReservationsList",
          },
        },
        // {
        //   menu: {
        //     name: "Report(HB)",
        //     src: require("../assets/icons/img6.png"),
        //     route: "/HouseboatReport",
        //   },
        // },
        {
          menu: {
            name: "Settlements",
            src: require("../assets/icons/img5.png"),
            route: "/settlement",
          },
        },
        // {
        //   menu: {
        //     name: "About",
        //     src: require("../assets/icons/img7.png"),
        //     route: "/Bookings",
        //   },
        // },
      ],
      NavItemsHouseboat: [
        {
          menu: {
            name: "Dashboard",
            src: require("../assets/icons/img1.png"),
            route: "/dashboard",
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
            name: "Bookings(HB)",
            src: require("../assets/icons/img2.png"),
            route: "/houseboatbookings",
          },
        },
        {
          menu: {
            name: "Reservation(HB)",
            src: require("../assets/icons/appointment.png"),
            route: "/houseboatReservationsList",
          },
        },
        {
          menu: {
            name: "Settlements",
            src: require("../assets/icons/img5.png"),
            route: "/HouseboatReport",
          },
        },
        // {
        //   menu: {
        //     name: "Report(HB)",
        //     src: require("../assets/icons/img6.png"),
        //     route: "/HouseboatReport",
        //   },
        // },
        // {
        //   menu: {
        //     name: "About",
        //     src: require("../assets/icons/img7.png"),
        //     route: "/Bookings",
        //   },
        // },
      ],
      NavItemsShikara: [
        {
          menu: {
            name: "Dashboard",
            src: require("../assets/icons/img1.png"),
            route: "/dashboard",
          },
        },
        {
          menu: {
            name: "Shikaras",
            src: require("../assets/icons/img3.png"),
            route: "/Shikara",
          },
        },
        {
          menu: {
            name: "Bookings(SK)",
            src: require("../assets/icons/img2.png"),
            route: "/shikarabookings",
          },
        },
        {
          menu: {
            name: "Reservation(SK)",
            src: require("../assets/icons/appointment.png"),
            route: "/shikaraReservationsList",
          },
        },
        {
          menu: {
            name: "Settlements",
            src: require("../assets/icons/img5.png"),
            route: "/ShikaraReport",
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
    userData() {
      return this.$store.state.userData;
    },
    appType() {
      return this.$store.state.userType;
    },
    boatType() {
      return this.$store.state.boatType;
    },
    navItems() {
      if (this.boatType.length == 1) {
        console.log("this.boatType in baselayout==", this.boatType);
        if (this.boatType[0] == "Houseboat") return this.NavItemsHouseboat;
        else return this.NavItemsShikara;
      } else return this.userNavItemsSuperAdmin;
    },
  },
  methods: {
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
.subhed {
  font-weight: 300;
  font-size: 14px;
  font-family: LexendRegular;
}
.v-list-item {
  padding: 0px;
}
/* } */
</style>
