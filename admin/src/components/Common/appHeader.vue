<template>
  <div id="app-header">
    <v-layout wrap class="mainfont">
      <v-flex xs12>
        <v-navigation-drawer v-model="sideNav" fixed temporary color="#fffcf5">
          <v-layout wrap justify-center>
            <v-flex
              xs12
              v-for="(item, i) in navItemsOne"
              :key="i"
              text-center
              pa-2
              pl-0
              text-none
              align-self-center
            >
              <v-layout wrap justify-center>
                <v-flex xs12  align-self-center text-left>
                  <v-layout wrap justify-start>
                    <v-flex xs4>
                      <v-img height="20px" contain :src="item.src"></v-img>
                    </v-flex>
                    <v-flex xs8>
                      <span
                        :style="{
                          'font-family': 'mainfont',
                          'font-size': '15px',
                          color: $route.path == item.route ? 'blue' : 'black',
                          'letter-spacing': '1px',
                          cursor: 'pointer',
                        }"
                        @click="handleItemClick(item)"
                      >
                        {{ item.name }}
                      </span>
                      <v-icon color="black" v-if="item.subItems && item.subItems.length > 0">
                        {{
                          item.open ? "mdi-chevron-up" : "mdi-chevron-down"
                        }}
                      </v-icon>
                    </v-flex>
                  </v-layout>

                  <v-list
                    v-if="
                      item.subItems && item.subItems.length > 0 && item.open
                    "
                    dense
                    nav
                    class="mt-3"
                  >
                    <v-list-item
                      v-for="(subItem, j) in item.subItems"
                      :key="j"
                      link
                      @click="handleSubItemClick(subItem)"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          style="text-transform: none;color: black; text-decoration: none"
                        >
                        <v-layout wrap>
                          <v-flex text-center>
                          {{ subItem.name }}

                          </v-flex>
                        </v-layout>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout wrap justify-center>
                <v-flex xs9 pb-5 pt-2>

                  <v-btn
                
                block
                color="#FF681F"
                class="mainfont"
                small
                @click="appLogout()"
              >
                <v-icon color="white" size="19">
                  mdi-account-circle-outline
                </v-icon>
                <span
                  style="font-family: mainfont; color: white; font-size: 12px"
                  >Logout</span
                >
              </v-btn>
                </v-flex>
              
              </v-layout>

            </v-flex>
          </v-layout>
        </v-navigation-drawer>

        <v-app-bar
          app
          dark
          bgcustom
          dense
          flat
          height="50px"
          class="hidden-lg-and-up custombackground"
        >
          <v-app-bar-nav-icon @click.native="sideNav = !sideNav">
            <v-icon color="white">mdi-menu</v-icon>
          </v-app-bar-nav-icon>
          <v-toolbar-title>
            <router-link style="text-decoration: none" to="/">
              <v-layout wrap justify-center>
                <v-flex xs12>
                  <span
                    style="
                      font-family: mainfont;
                      font-size: 14px;
                      cursor: pointer;
                      color: #ffffff;
                    "
                  >
                    ADMIN MANAGEMENT PORTAL
                  </span>
                </v-flex>
              </v-layout>
            </router-link>
          </v-toolbar-title>
        </v-app-bar>

        <v-app-bar
          fixed
          app
          sticky
          elevation="0"
          height="90px"
          grad
          class="hidden-sm-and-down custombackground transparent"
        >
          <v-layout pl-9 wrap justify-center text-center>
            <v-flex
              xs1
              pl-2
              style="background-color: #ffffff"
              align-self-center
            >
              <v-img
                height="60px"
                contain
                src="../../assets/Images/Logo.png"
              ></v-img>
            </v-flex>

            <v-flex xs5 pl-2 text-left align-self-center @click="gotoHome">
              <span class="mainfont" style="font-size: larger; color: white"
                >ACCESS ROOMS - ADMIN MANAGEMENT PORTAL
              </span>
            </v-flex>

            <v-flex xs6  sm5 lg6 pr-16 pt-4  text-right>
              <v-btn
                outlined
                color="white"
                class="mainfont"
                small
                @click="appLogout()"
              >
                <v-icon color="white" size="19">
                  mdi-account-circle-outline
                </v-icon>
                <span
                  style="font-family: mainfont; color: white; font-size: 12px"
                  >Logout</span
                >
              </v-btn>
            </v-flex>
          </v-layout>
        </v-app-bar>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
// import AccountMenu from "@/components/Common/accountMenu";
export default {
  components: {
    // AccountMenu,
  },
  data() {
    return {
      sideNav: false,
      scrollPosition: 0,

      navItemsOne: [
        {
          name: " DASHBOARD",
          route: "/DashboardPage",
          src: require("../../assets/Images/sideicon1.png"),
          open: false,
          subItems: [],
        },

        {
          name: " CUSTOMER",
          route: "/customer",
          src: require("../../assets/Images/custo.png"),
          open: false,
          subItems: [],
        },
        {
          name: "AGENTS",
          src: require("../../assets/Images/users1.png"),
          subItems: [
            {
              name: "Approved",
              route: "/approvedagent",
            },
            {
              name: "Pending",
              route: "/agent",
            },
            {
              name: "Blocked",
              route: "/agentBlocked",
            },
          ],
          open: false,
        },
        {
          name: "VENDORS",
          src: require("../../assets/Images/vendor.png"),
          subItems: [
            {
              name: "Approved",
              route: "/approvedvendor",
            },
            {
              name: "Pending",
              route: "/vendor",
            },
            {
              name: "Blocked",
              route: "/vendorBlocked",
            },
          ],
          open: false,
        },
        {
          name: "HOUSEBOATS",
          src: require("../../assets/Images/houseboat.png"),
          subItems: [
            {
              name: "Approved",
              route: "/houseboatapproved",
            },
            {
              name: "Pending",
              route: "/houseboatpending",
            },
            {
              name: "Blocked",
              route: "/houseboatBlocked",
            },
          ],
          open: false,
        },
        {
          name: "SHIKARA",
          src: require("../../assets/Images/shikara.png"),
          subItems: [
            {
              name: "Approved",
              route: "/shikaraapproved",
            },
            {
              name: "Pending",
              route: "/shikarapending",
            },
            {
              name: "Blocked",
              route: "/ShikaraBlocked",
            },
          ],
          open: false,
        },
        {
          name: "BOOKINGS",
          src: require("../../assets/Images/overbooked.png"),
          subItems: [
            {
              name: "Shikara ",
              route: "/shikarabookings",
            },
            {
              name: "Houseboat ",
              route: "/houseboatbookings",
            },
          ],
          open: false,
        },
        {
          name: "RESERVATIONS",
          src: require("../../assets/Images/res.png"),
          subItems: [
            {
              name: "Shikara ",
              route: "/shikaraReservation",
            },
            {
              name: "Houseboat ",
              route: "/houseboatReservation",
            },
          ],
          open: false,
        },
        {
          name: "SETTLEMENTS",
          src: require("../../assets/Images/settle.png"),
          subItems: [
            {
              name: "Shikara ",
              route: "/SettlementsShikara",
            },
            {
              name: "Houseboat ",
              route: "/SettlementsHouseboat",
            },
          ],
          open: false,
        },
        {
          name: " GALLERY",
          route: "/GalleryPage",
          src: require("../../assets/Images/gallery.png"),

          subItems: [],
          open: false,
        },

        {
          name: " YOUTUBE",
          route: "/YoutubeLink",
          src: require("../../assets/Images/youtube.png"),

          subItems: [],
          open: false,
        },
        {
          name: " ADD LOCATION",
          route: "/location",
          src: require("../../assets/Images/map.png"),

          subItems: [],
          open: false,
        },
        {
          name: " TERMS AND CONDITIONS",
          route: "/termsandconditions",
          src: require("../../assets/Images/icon19.png"),
          subItems: [],
          open: false,
        },
        {
          name: "PRIVACY POLICY",
          route: "/privacypolicy",
          src: require("../../assets/Images/icon20.png"),
          subItems: [],
          open: false,
        },
        {
          name: "OUR SERVICES",
          route: "/ourservices",
          src: require("../../assets/Images/icon21.png"),
          subItems: [],
          open: false,
        },
        {
          name: "ABOUT US",
          route: "/AboutUs",
          src: require("../../assets/Images/aboutus.png"),
          subItems: [],
          open: false,
        },



        
      ],
    };
  },
  computed: {
    getUserType() {
      const utype = localStorage.getItem("utype");
      if (utype === "777") {
        return "admin";
      } else {
        return "division";
      }
    },
  },

  methods: {
    handleItemClick(item) {
      // If the item has no subItems, handle its click directly (e.g., navigate to item route)
      if (!item.subItems || item.subItems.length === 0) {
        this.$router.push({ path: item.route });
      } else {
        // Toggle the 'open' property to show/hide the sublist for items with subitems
        item.open = !item.open;
      }
    },
    handleSubItemClick(subItem) {
      // Handle subitem click (e.g., navigate to subitem route)
      this.$router.push({ path: subItem.route });
    },

    gotoHome() {
      this.$router.push({
        path: "/",
        query: { status: "Pending", fromDashboard2: true },
      });
    },
    appLogout() {
      this.$store.commit("logoutUser", true);
    },
  },
};
</script>
<style>
.mainbg {
  background-image: linear-gradient(269.6deg, #29807c -31.66%, #29807c);
}

input::-webkit-input-placeholder {
  color: #c5c5c5 !important;
  font-size: 14px !important;
  font-family: poppinsregular !important;
}

input::-moz-placeholder {
  color: #c5c5c5 !important;
  font-size: 14px !important;
  font-family: poppinsregular !important;
}

.custom-app-bar {
  z-index: 1000;
  /* Adjust the z-index value as needed */
}

.searchBox .v-input__control {
  min-height: 10px !important;
}

/* #app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
} */
.searchBox .v-input__control .v-input__slot {
  padding: 0px !important;
}

.custombackground {
  background: var(--orange, linear-gradient(180deg, #ff8b5f 0%, #ff4600 100%));
}
</style>