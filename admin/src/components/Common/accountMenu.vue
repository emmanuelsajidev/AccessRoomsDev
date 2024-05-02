<template>
  <div>
    <v-layout wrap justify-end>
      <v-flex xs12>
        <v-menu offset-y left>
          <template v-slot:activator="{ attrs, on }">
            <v-layout wrap justify-center v-bind="attrs" v-on="on">
              <v-flex xs12 text-center align-self-center>
                <v-icon color="white" size="25">
                  mdi-account-circle-outline
                </v-icon>
              </v-flex>
              <v-flex
                xs12
                text-center
                align-self-center
                style="line-height: 0.5"
                pt-1
              >
                <span
                  style="
                    font-family: poppinsregular;
                    font-size: 12px;
                    color: white;
                  "
                >
                  Account
                </span>
              </v-flex>
            </v-layout>
          </template>
          <v-card tile flat :elevation="0" max-width="250px">
            <v-layout wrap justify-center py-4>
              <v-flex pt-4 xs12 text-center>
                <span
                  style="
                    font-family: poppinssemibold;
                    font-size: 16px;
                    color: #000000;
                  "
                >
                  Welcome
                </span>
              </v-flex>
              <v-flex pt-2 xs12 text-center>
                <v-icon color="#CCB4B4" size="30">
                  mdi-account-circle-outline
                </v-icon>
              </v-flex>
              <v-flex xs12 text-center>
                  <span
                    v-if="appLogin"
                    style="
                      font-family: poppinsmedium;
                      font-size: 13px;
                      color: #1e1b1b;
                    "
                  >
                   <span>
                      {{ appUser }}
                    </span>
                    <!-- <span v-if="appUser.guest">
                      {{ appUser.guest.name }}
                    </span>
                    <span v-else>
                      {{ appUser }}
                    </span> -->
                  </span>
              </v-flex>
              <v-flex xs12 pt-4 text-center>
                <v-btn
                  v-if="!appLogin"
                  color="#0000001f"
                  outlined
                  tile
                  small
                  :ripple="false"
                  to="/login"
                >
                  <span
                    style="
                      font-family: poppinssemibold;
                      font-size: 14px;
                      color: #000000;
                    "
                  >
                    LOGIN
                  </span>
                </v-btn>
                <v-btn
                  v-if="appLogin"
                  color="#0000001f"
                  outlined
                  tile
                  small
                  :ripple="false"
                  @click="appLogout"
                >
                  <span
                    style="
                      font-family: poppinssemibold;
                      font-size: 14px;
                      color: black;
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
export default {
  data() {
    return {
      user: {},
    };
  },
  computed: {
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
    appUser() {
      return this.$store.state.email;
    },
  },
  methods: {
    appLogout() {
      this.$store.commit("logoutUser", true);
    },
  },
};
</script>