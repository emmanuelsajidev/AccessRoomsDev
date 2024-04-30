<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#182444"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="#ff6200" right top timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start py-2>
          <v-flex xs12 sm6 align-self-center>
            <span
              class="title1"
              :style="{
                'font-size':
                  $vuetify.breakpoint.name == 'xs'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'sm'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'md'
                    ? '25px'
                    : $vuetify.breakpoint.name == 'lg'
                    ? '25px'
                    : '30px',
              }"
              >{{ $route.query.name }}</span
            ></v-flex
          >
        </v-layout>
        <v-layout wrap justify-space-around pt-2>
          <v-flex xs12>
            <v-card tile class="pa-8" elevation="0">
              <v-layout wrap justify-start>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <v-flex xs10 text-left pb-2>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 600;
                          font-size: 20px;
                        "
                        >OFF-SEASONAL RATE</span
                      >
                    </v-flex>
                    <v-flex xs12 sm10 text-left>
                      <span class="title2">Start Date</span>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="offseason.startDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="offseason.startDate"
                            outlined
                            readonly
                            dense
                            hide-details="auto"
                            clearable
                            class="rounded-0"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="offseason.startDate"
                          no-title
                          :min="nowDate"
                          scrollable
                          @change="$refs.menu.save(offseason.startDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">End Date</span>
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="offseason.endDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="offseason.endDate"
                            outlined
                            readonly
                            dense
                            hide-details="auto"
                            clearable
                            class="rounded-0"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="offseason.endDate"
                          no-title
                          :min="nowDate"
                          scrollable
                          @change="$refs.menu2.save(offseason.endDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2 pr-2">Customer Rate</span>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 15px;
                          font-weight: 300;
                        "
                        >(rate per hour)</span
                      >
                      <v-text-field
                        dense
                        outlined
                        type="number"
                        hide-spin-buttons
                        v-model="offseason.customerRate"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                      <span
                        v-if="offseason.customerRate"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 500;
                        "
                        >Net rate: ₹{{ tenpercent1 }}</span
                      >
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2 pr-2">Agent rate</span>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 15px;
                          font-weight: 300;
                        "
                        >(rate per hour)</span
                      >
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="offseason.agentRate"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                      <span
                        v-if="offseason.agentRate"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 500;
                        "
                        >Net rate: ₹{{ tenpercent3 }}</span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <v-flex xs10 text-left pb-2>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 600;
                          font-size: 20px;
                        "
                        >SEASONAL RATE</span
                      >
                    </v-flex>
                    <v-flex xs12 sm10 text-left>
                      <span class="title2">Start Date</span>
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="season.startDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="season.startDate"
                            outlined
                            readonly
                            dense
                            hide-details="auto"
                            clearable
                            class="rounded-0"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="season.startDate"
                          no-title
                          :min="nowDate"
                          scrollable
                          @change="$refs.menu3.save(season.startDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">End Date</span>
                      <v-menu
                        ref="menu4"
                        v-model="menu4"
                        :close-on-content-click="false"
                        :return-value.sync="season.endDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="season.endDate"
                            outlined
                            readonly
                            dense
                            hide-details="auto"
                            clearable
                            class="rounded-0"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="season.endDate"
                          no-title
                          :min="nowDate"
                          scrollable
                          @change="$refs.menu4.save(season.endDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2 pr-2">Customer Rate</span>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 15px;
                          font-weight: 300;
                        "
                        >(rate per hour)</span
                      >
                      <v-text-field
                        dense
                        outlined
                        type="number"
                        hide-spin-buttons
                        v-model="season.customerRate"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                      <span
                        v-if="season.customerRate"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 500;
                        "
                        >Net rate: ₹{{ tenpercent11 }}</span
                      >
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2 pr-2">Agent rate</span>
                      <span
                        style="
                          font-family: LexendFont;
                          font-size: 15px;
                          font-weight: 300;
                        "
                        >(rate per hour)</span
                      >
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="season.agentRate"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                      <span
                        v-if="season.agentRate"
                        style="
                          font-family: LexendFont;
                          font-size: 12px;
                          font-weight: 500;
                        "
                        >Net rate: ₹{{ tenpercent33 }}</span
                      >
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-center pt-4>
                    <v-flex xs12 sm7 xl7 align-self-center text-left>
                      <span
                        style="font-family: LexendFont; font-weight: 600"
                        :style="{
                          'font-size':
                            $vuetify.breakpoint.name == 'xs'
                              ? '14px'
                              : $vuetify.breakpoint.name == 'sm'
                              ? '14px'
                              : $vuetify.breakpoint.name == 'md'
                              ? '14px'
                              : $vuetify.breakpoint.name == 'lg'
                              ? '14px'
                              : '15px',
                        }"
                        >Mentioned rate Access Rooms * 25% commission included
                        <!-- *Please enter the amount you wish to received <br/>The
                        customer will be show in amount with commission. -->
                      </span>
                    </v-flex>
                    <v-flex xs12 sm3 xl3 align-self-center text-right>
                      <v-btn
                        @click="add()"
                        block
                        class="btnstly"
                        style="cursor: pointer"
                        ><span
                          style="font-family: LexendFont; text-transform: none"
                          >Next</span
                        ></v-btn
                      >
                    </v-flex>
                  </v-layout>
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
import axios from "axios";
export default {
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      data: [],
      msg: null,
      page: 1,
      limit: 20,
      tenpercent1: 0,
      tenpercent3: 0,
      tenpercent11: 0,
      tenpercent33: 0,
      nowDate: new Date().toISOString().slice(0, 10),
      season: {
        packageType: "Seasonal",
        startDate: "",
        endDate: "",
        customerRate: "",
        agentRate: "",
      },
      offseason: {
        packageType: "OffSeasonal",
        startDate: "",
        endDate: "",
        customerRate: "",
        agentRate: "",
      },
      menu2: false,
      menu3: false,
      menu4: false,
      menu: false,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      pinRules: [
        (v) => !!v || "PIN is required",
        (v) => (v && v.length === 6) || "PIN must be 6 digits",
      ],
    };
  },
  // mounted() {
  //   this.getData();
  // },
  watch: {
    "offseason.customerRate": function (newRate) {
      this.tenpercent1 = (newRate * (100 / 125)).toFixed(2); // Assuming 10% reduction, adjust as needed
    },
    "offseason.agentRate": function (newRate) {
      console.log("asdfghj");
      this.tenpercent3 = (newRate * (100 / 125)).toFixed(2);
      console.log("tenpercent3=", this.tenpercent3); // Assuming 10% reduction, adjust as needed
    },
    "season.customerRate": function (newRate) {
      this.tenpercent11 = (newRate * (100 / 125)).toFixed(2); // Assuming 10% reduction, adjust as needed
    },
    "season.agentRate": function (newRate) {
      console.log("asdfghj");
      this.tenpercent33 = (newRate * (100 / 125)).toFixed(2);
      console.log("tenpercent3=", this.tenpercent3); // Assuming 10% reduction, adjust as needed
    },
  },
  methods: {
    validation() {
      if (!this.category) {
        this.msg = "Please choose boat category";
        this.snackbar = true;
        return;
      } else if (!this.houseBoatName) {
        this.msg = "Please enter house boat name";
        this.snackbar = true;
        return;
      } else if (!this.totalRooms) {
        this.msg = "Please enter total rooms";
        this.snackbar = true;
        return;
      } else if (!this.expiryType) {
        this.msg = "Please choose expiry type";
        this.snackbar = true;
        return;
      } else if (!this.expiryDate) {
        this.msg = "Please enter expiry date";
        this.snackbar = true;
        return;
      } else {
        this.addBoat();
      }
    },
    add() {
      this.offseason.customerRateCommission = this.tenpercent1;
      this.offseason.agentRateCommission = this.tenpercent3;
      this.season.customerRateCommission = this.tenpercent11;
      this.season.agentRateCommission = this.tenpercent33;
      this.appLoading = true;
      console.log("season=", this.season);
      console.log("offseason=", this.offseason);
      var Newarr = [this.season, this.offseason];
      axios({
        method: "POST",
        url: "/shikara/trip/package/add",
        data: {
          tripTypeId: this.$route.query.id,
          packageDetails: Newarr,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.snackbar = true;
          this.$router.push("/Shikara");
        } else {
          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },
  },
};
</script>
    <style scoped>
.btnstly {
  background: linear-gradient(
    to bottom,
    rgba(255, 133, 86, 1),
    rgba(247, 75, 9, 1),
    rgba(255, 70, 0, 1)
  );
  color: white;
}
</style>