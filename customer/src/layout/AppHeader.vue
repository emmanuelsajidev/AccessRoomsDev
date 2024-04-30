<template>
  <div id="appNavbar">
   <v-layout wrap justify-end class="hidden-sm-and-down">
      <v-flex lg12 align-self-center>
        <v-app-bar
        color="transparent"
          elevation="0"
          height="60px"
          class="hidden-sm-and-down"
        >
          <v-layout wrap justify-center fill-height>
            <v-spacer></v-spacer>
            <v-flex xs6 lg2 xl1 pl-4 text-right align-self-center style="cursor:pointer">
              <AccountMenu />
            </v-flex>
          </v-layout>
        </v-app-bar>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {

  data() {
    return {
      sideNav: false,
      admin: [{ name: "ADMINS", route: "/Admins" }],
      menu2: [],
      
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
 
};
</script>

<style>
input::-webkit-input-placeholder {
  color: #c5c5c5 !important;
  font-size: 14px !important;
  font-family: kumbhRegular !important;
}
input::-moz-placeholder {
  color: #c5c5c5 !important;
  font-size: 14px !important;
  font-family: kumbhRegular !important;
}
.searchBox .v-input__control {
  min-height: 10px !important;
}
.searchBox .v-input__control .v-input__slot {
  padding: 0px !important;
}
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
</style>
