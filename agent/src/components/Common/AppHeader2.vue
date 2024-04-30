<template>
  <div>
    <v-app-bar
      dense
      flat
      color="white"
      height="80px"
      class="hidden-md-and-down"
    >
      <v-layout wrap justify-center>
        <v-flex xs12 sm11 md11 lg11>
          <v-layout wrap justify-center>
            <v-flex xs7 lg7>
              <v-layout wrap>
                <v-flex
                  xs6
                  sm2
                  md2
                  lg2
                  xl1
                  align-self-start
                  texte-center
                  @click="$router.push('/')"
                  style="cursor: pointer"
                >
                  <v-img
                    contain
                    src="./../../assets/accessroomslogo.png"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex
              xs5
              lg4
              text-right
              align-self-center
              style="cursor: pointer"
            >
              <v-layout wrap justify-end>
                <v-flex
                  xs7
                  md9
                  lg7
                  pa-1
                  style="background-color: #f4f4f4; border-radius: 11px"
                >
                  <v-menu
                    :open="isDropdownVisible"
                    offset-y
                    @click="toggleDropdown"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-layout wrap justify-end>
                        <v-flex
                          xs12
                          text-right
                          align-self-center
                          v-on="on"
                          v-bind="attrs"
                        >
                          <v-layout wrap justify-end>
                            <v-flex
                              xs12
                              pa-1
                              style="
                                background-color: #f4f4f4;
                                border-radius: 11px;
                              "
                            >
                              <v-layout wrap justify-end>
                                <v-flex xs2 pt-1>
                                  <v-avatar v-if="img">
                                    <v-img :src="mediaUURL + img"></v-img>
                                  </v-avatar>
                                  <v-avatar v-else>
                                    <v-img
                                      src="../../assets/headerimg.png"
                                    ></v-img>
                                  </v-avatar>
                                </v-flex>
                                <v-flex
                                  x6
                                  align-self-center
                                  text-left
                                  pl-6
                                  pa-1
                                >
                                  <span
                                    style="
                                      font-weight: 400;
                                      font-size: 15px;
                                      font-family: LexendRegular;
                                    "
                                  >
                                    {{ list.name }}
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
                                    {{ list.userType }}
                                  </span>
                                  <v-icon>{{
                                    isDropdownVisible
                                      ? "mdi-chevron-up"
                                      : "mdi-chevron-down"
                                  }}</v-icon>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </template>

                    <v-list>
                      <v-list-item @click="$router.push('/ViewProfile')">
                        <v-list-item-title>
                          <v-layout wrap justify-center>
                            <v-flex pa-2 xs12 class="LexendRegular">
                              <v-btn block color="#FF681F">
                                <span style="text-transform: none; color: white"
                                  >View </span
                                >
                                &nbsp;
                                <v-icon class="pt-1" color="white" size="120%"
                                  >mdi-eye</v-icon
                                >
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
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
import axios from "axios";

export default {
  data() {
    return {
      isDropdownVisible: false,

      showsnackbar: false,
      timeout: 5000,
      list: {},
      msg: null,
      name: localStorage.getItem("name"),
      userRole: localStorage.getItem("userRole"),
      appLoading: false,
      categoryList: [],
    };
  },
  computed: {
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
  mounted() {
    this.getProfile();
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },

    getProfile() {
      axios
        .get("/profile", {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          this.appLoading = false;
          this.list = response.data.data;
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
    // }
    appLogout() {
      this.$store.commit("logoutUser", true);
      // if (this.sideNav2 == true) {
      //   this.sideNav2 = false;
      // }
    },
  },
};
</script>