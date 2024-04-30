<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#002635"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackbar" color="#f54c0c" right :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: #000">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center>
      <v-flex xs12>
        <v-layout wrap justify-center>
          <v-flex xs12 text-left>
            <span
              style="
                font-weight: 400;
                font-size: 30px;
                font-family: LexendFont;
                text-transform: none;
              "
              >Reservations</span
            >
          </v-flex>
        </v-layout>

        <v-layout wrap>
          <v-flex xs12 pt-6 pb-4>
            <v-card color="white" elevation="0" class="pa-6">
              <v-layout wrap>
                <v-flex xs12 sm8 pr-0 pr-md-2>
                  <DatePicker />
                </v-flex>
                <v-flex xs12 sm4 pl-0 pl-md-2>
                  <v-card
                    tile
                    outlined
                    color="rgba(225, 225, 225, 1)"
                    class="pa-4"
                  >
                    <v-layout wrap>
                      <v-flex xs12>
                        <span
                          style="
                            font-weight: 500;
                            font-size: 18px;
                            font-family: LexendFont;
                            text-transform: none;
                          "
                          >BOOKING SUMMARY</span
                        >
                      </v-flex>
                      <v-flex xs12>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 16px;
                            font-family: LexendFont;
                            text-transform: none;
                            color: #787777;
                          "
                          >SELECTED DATE</span
                        >
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 16px;
                            font-family: LexendFont;
                            text-transform: none;
                            color: #787777;
                          "
                          >Check-In</span
                        ><br />
                        <span
                          style="
                            font-weight: 400;
                            font-size: 16px;
                            font-family: LexendFont;
                            text-transform: none;
                            color: rgba(249, 94, 35, 1);
                          "
                          >18 May</span
                        >
                      </v-flex>
                      <v-flex xs12 sm6>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 16px;
                            font-family: LexendFont;
                            text-transform: none;
                            color: #787777;
                          "
                          >Check-Out</span
                        ><br />
                        <span
                          style="
                            font-weight: 400;
                            font-size: 16px;
                            font-family: LexendFont;
                            text-transform: none;
                            color: rgba(249, 94, 35, 1);
                          "
                          >20 May</span
                        >
                      </v-flex>
                      <v-flex xs12>
                        <span
                          style="
                            font-weight: 400;
                            font-size: 14px;
                            font-family: LexendFont;
                            text-transform: none;
                            color: #787777;
                          "
                          >RESERVATION NO : 221182</span
                        >
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import DatePicker from "./datePicker";
export default {
  components: {
    DatePicker,
  },
};
</script>