<template>
  <div>
    <v-snackbar v-model="snackbar" color="#F17343" right :timeout="3000">
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap>
      <v-flex>
        <v-card elevation="0">
          <v-layout wrap justify-center>
            <v-flex
              xs12
              px-4
              pt-4
              text-left
              style="
                font-weight: 400;
                font-size: 20px;
                font-family: LexendRegular;
              "
            >
              <v-layout wrap justify-start>
                <v-flex
                  pt-3
                  pb-3
                  xs12
                  sm6
                  md2
                  style="line-height: 10px"
                  pl-3
                  pr-3
                >
                  <v-autocomplete
                    flat
                    class="font2a"
                    dense
                    color="orange"
                    :items="['Luxury', 'Premium', 'Deluxe']"
                    v-model="Hcategory"
                    label="Category"
                    item-text="name"
                    item-color="#FF1313"
                    hide-details="true"
                  ></v-autocomplete>
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md2
                  style="line-height: 10px"
                  pt-3
                  pb-3
                  pl-3
                  pr-3
                >
                  <v-autocomplete
                    flat
                    class="font2a"
                    dense
                    :items="['Private', 'Sharing']"
                    v-model="Htype"
                    item-text="name"
                    label="Type"
                    color="orange"
                    item-color="#FF1313"
                    hide-details="auto"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pl-0 pl-md-1 pr-1>
                  <v-autocomplete
                    outlined
                    class="font2a"
                    dense
                    color="orange"
                    :items="locations"
                    v-model="Hlocation"
                    label="Location"
                    item-text="name"
                    style="border-radius: 0%"
                    item-value="_id"
                    item-color="#FF1313"
                    hide-details="true"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 md1 lg2 xl2 pt-2 pr-1>
                  <v-text-field
                    class="font2a"
                    v-model="Hroom"
                    type="number"
                    hide-spin-buttons
                    label="Rooms"
                    style="border-radius: 0%"
                    color="orange"
                    hide-details
                    outlined
                    flat
                    dense
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3 lg2 xl2 pt-2 pr-1 @click="Hguest = true">
                  <v-card
                    v-if="Hadult"
                    outlined
                    style="border-color: #626262; border-radius: 0%"
                    class="py-1"
                  >
                    <span
                      class="pr-1 pl-2"
                      v-if="Hadult"
                      style="
                        font-family: LexendRegular;
                        color: #474646;
                        font-size: 16px;
                        font-weight: 400;
                      "
                      >Guests :</span
                    >
                    <span
                      class="pr-1 pl-2"
                      v-if="Hadult"
                      style="
                        font-family: LexendRegular;
                        color: #474646;
                        font-size: 16px;
                        font-weight: 400;
                      "
                      >{{ Hadult }}<v-icon>mdi-human-male</v-icon></span
                    >
                    <span
                      class="pl-1"
                      v-if="Hchildren"
                      style="
                        font-family: LexendRegular;
                        color: #474646;
                        font-size: 16px;
                        font-weight: 400;
                      "
                      >{{ Hchildren }}<v-icon>mdi-car-child-seat</v-icon></span
                    >
                  </v-card>
                  <v-card
                    v-else
                    outlined
                    style="
                      border-color: #626262;
                      border-radius: 0%;
                      cursor: pointer;
                    "
                    class="py-1"
                  >
                    <span
                      style="
                        font-family: LexendRegular;
                        color: #474646;
                        font-size: 16px;
                        font-weight: 400;
                      "
                      class="py-2 pl-2"
                      >No of guest</span
                    >
                  </v-card>
                </v-flex>
                <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pr-1 align-self-center>
                  <v-autocomplete
                    flat
                    outlined
                    dense
                    label="Trip Type"
                    color="orange"
                    style="border-color: rgba(255, 98, 0, 1); border-radius: 0%"
                    :items="[
                      { name: 'OverNight', timing: 'OverNight 12 pm - 9 am' },
                      { name: 'DayCruise', timing: 'DayCruise 11 am - 5 pm' },
                      { name: 'NightStay', timing: 'NightStay 5:30 pm - 9 am' },
                    ]"
                    v-model="Htriptype"
                    item-text="timing"
                    item-value="name"
                    item-color="rgba(255, 98, 0, 1)"
                    hide-details="true"
                    class="font2a"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pr-1>
                  <v-menu
                    ref="HmenuCheckInVisible"
                    v-model="HmenuCheckInVisible"
                    :close-on-content-click="false"
                    :return-value.sync="HcheckInDate"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="HcheckInDate"
                        outlined
                        readonly
                        label="Check in Date"
                        color="orange"
                        dense
                        hide-details="auto"
                        clearable
                        class="rounded-0"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="HcheckInDate"
                      no-title
                      :min="nowDate"
                      scrollable
                      @change="$refs.HmenuCheckInVisible.save(HcheckInDate)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>

                <!-- Check Out Date -->
                <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pr-1>
                  <v-menu
                    ref="HmenuCheckOutVisible"
                    v-model="HmenuCheckOutVisible"
                    :close-on-content-click="false"
                    :return-value.sync="HcheckOutDate"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="HcheckOutDate"
                        outlined
                        readonly
                        label="Check Out Date"
                        color="orange"
                        dense
                        hide-details="auto"
                        clearable
                        class="rounded-0"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="HcheckOutDate"
                      no-title
                      :min="HcheckInDate"
                      @change="$refs.HmenuCheckOutVisible.save(HcheckOutDate)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs11 pa-4>
              <v-layout wrap justify-center>
                <v-flex xs12 sm3 lg2 @click="search()">
                  <v-btn block color="rgba(255, 98, 0, 1)">
                    <span
                      style="
                        font-weight: 500;
                        color: white;
                        font-size: 18px;
                        font-family: LexendRegular;
                        text-transform: none;
                      "
                      >Search</span
                    >
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-dialog width="550px" v-model="Hguest">
            <v-card class="pa-2">
              <v-layout wrap justify-center pt-5>
                <v-flex xs6 text-left pt-3>
                  <span
                    style="
                      font-family: LexendRegular;
                      color: black;
                      font-size: 18px;
                      font-weight: 400;
                    "
                    >No of Adults</span
                  >
                  <span style="color: red">*</span>

                  <br />
                  <span class="LexendRegular">
                    <span
                    style="
                  color: #626262;
                  font-size: 10px;
                  font-family: LexendRegular;
                  text-transform: none;
                "
                    >
                      Children above 5 year old are considered as adults
                    </span>
                  </span>
                </v-flex>
                <v-flex xs5>
                  <span>
                    <v-text-field
                      hide-spin-buttons
                      type="number"
                      class="font2a"
                      color="orange"
                      v-model="Hadult"
                      label="Adults"
                      hide-details
                      style="border-radius: 0%"
                      outlined
                      flat
                      dense
                    ></v-text-field>
                  </span>
                </v-flex>
                <v-flex xs6 text-left pt-11>
                  <span
                    style="
                      font-family: LexendRegular;
                      color: black;
                      font-size: 18px;
                      font-weight: 400;
                    "
                    >No of Children</span
                  >
                  <span class="LexendRegular">
                    <span style="color: red">*</span>
                    <br />
                    <span
                    style="
                  color: #626262;
                  font-size: 10px;
                  font-family: LexendRegular;
                  text-transform: none;
                "
                    >
                      Age below 5 years
                    </span>
                  </span>
                </v-flex>
                <v-flex xs5 pt-9>
                  <span>
                    <v-text-field
                      hide-spin-buttons
                      type="number"
                      class="font2a"
                      color="orange"
                      v-model="Hchildren"
                      style="border-radius: 0%"
                      label="Children"
                      hide-details
                      outlined
                      flat
                      dense
                    ></v-text-field>
                  </span>
                </v-flex>
                <v-flex xs10 pt-5 pb-3>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs10 pt-1 pb-3>
                  <v-layout wrap justify-end>
                    <v-flex xs7 lg3 text-right>
                      <v-btn color="#FF6200" @click="apply1()">
                        <span
                          style="
                            font-family: LexendRegular;
                            color: white;
                            font-size: 16px;
                            font-weight: 400;
                          "
                        >
                          APPLY
                        </span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-dialog>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      appLoading: false,
      memberCount: "",
      menuCheckIn2: false,
      checkInDate2: null,
      checkInMenuVisible2: false,
      checkOutMenuVisible2: false,
      checkInTime: "",
      checkInDate: null,
      minDate: new Date().toISOString().substr(0, 10),

      checkOutTime: "",
      menuCheckInVisible: false,
      menuCheckOutVisible: false,
      checkInMenuVisible: false,
      checkOutMenuVisible: false,
      category: "",
      type: "",
      ServerError: false,
      location: "",
      snackbar: false,
      timeout: 5000,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      room: null,
      Hcategory: "",
      Htype: "",
      Hlocation: "",
      Hroom: "",
      Hadult: "",
      Hchildren: "",
      Htriptype: "",
      HcheckInDate: "",
      HcheckOutDate: "",
      HmenuCheckInVisible: false,
      HmenuCheckOutVisible: false,
      HmenuCheckIn: false,
      HmenuCheckOut: false,
      Hguest: false,

      limit: 10,
      triptype: "",
      fromDate: null,
      toDate: null,
      childrenCount: "",
      nowDate: new Date().toISOString().slice(0, 10),
      fromDate2: null,
      toDate2: null,
      checkOutDate: null,
      menuCheckIn: false,
      menuCheckOut: false,
      adult: null,
      children: "",
      date: null,
      menuCheckInVisiblem: false,
      checkInMenuVisiblem: false,
      checkInTimem: "",
      checkOutMenuVisiblem: false,
      checkOutTimem: "",
      guestSectionVisible: true,
      guest: false,
      msg: null,
      value: "",
      locations: [],
      phone: "",
    };
  },
  watch: {
    HcheckInDate(newCheckInDate) {
      if (this.HcheckOutDate && !isNaN(new Date(this.HcheckOutDate))) {
        const checkOutDate = new Date(this.HcheckOutDate);
        const checkInDate = new Date(newCheckInDate);
        if (checkOutDate.getTime() < checkInDate.getTime()) {
          this.HcheckOutDate = null;
        }
      }
    },
  },
  mounted() {
    this.getLocation();
    // this.Hcategory = this.searchFilters2.Hcategory;
    // this.Htype = this.searchFilters2.Htype;
    // this.Hroom = this.searchFilters2.Hroom;
    // this.Hadult = this.searchFilters2.Hadult;
    // this.Hchildren = this.searchFilters2.Hchildren;
    // this.HcheckInDate = this.searchFilters2.HcheckInDate;
    // this.HcheckOutDate = this.searchFilters2.HcheckOutDate;
    // this.Hlocation = this.searchFilters2.Hlocation;
    // this.Htriptype = this.searchFilters2.Htriptype;
  },
  // computed: {
  //     searchFilters2() {
  //         return this.$store.state.searchFilters2;
  //     },
  // },
  created() {
    // Retrieve saved search filters from localStorage
    const savedFilters = localStorage.getItem("houseboatSearchFilters");

    if (savedFilters) {
      // Parse the saved filters
      const parsedFilters = JSON.parse(savedFilters);

      // Set component data properties based on parsed filters
      this.Hcategory = parsedFilters.Hcategory || "";
      this.Htype = parsedFilters.Htype || "";
      this.Hlocation = parsedFilters.Hlocation || "";
      this.Hroom = parsedFilters.Hroom || "";
      this.Hadult = parsedFilters.Hadult || "";
      this.Hchildren = parsedFilters.Hchildren || "";
      this.Htriptype = parsedFilters.Htriptype || "";
      this.HcheckInDate = parsedFilters.HcheckInDate || "";
      this.HcheckOutDate = parsedFilters.HcheckOutDate || "";
    }
  },

  methods: {
    validateSearch() {
      if (!this.Hcategory) {
        this.msg = "Please enter Category";
        this.snackbar = true;
        return;
      } else if (!this.Htype) {
        this.msg = "Please enter Type";
        this.snackbar = true;
        return;
      } else if (!this.Hlocation) {
        this.msg = "Please enter Location";
        this.snackbar = true;
        return;
      } else if (!this.Hroom) {
        this.msg = "Please enter Room";
        this.snackbar = true;
        return;
      } else if (!this.Hadult) {
        this.msg = "Please enter Number of Adults";
        this.snackbar = true;
        return;
      } else if (!this.Htriptype) {
        this.msg = "Please enter Trip Type";
        this.snackbar = true;
        return;
      } else if (!this.HcheckInDate) {
        this.msg = "Please enter Check-In Date";
        this.snackbar = true;
        return;
      } else if (!this.HcheckOutDate) {
        this.msg = "Please enter Check-Out Date";
        this.snackbar = true;
        return;
      } else {
        this.search();
      }
    },

    getLocation() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/location/list",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.locations = response.data.data;

          this.appLoading = false;
        })

        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    clearFilters() {
      this.$store.commit("clearFilters2");
    },
    search() {
      localStorage.setItem(
        "houseboatSearchFilters",
        JSON.stringify({
          Hcategory: this.Hcategory,
          Htype: this.Htype,
          Hlocation: this.Hlocation,
          Hroom: this.Hroom,
          Hadult: this.Hadult,
          Hchildren: this.Hchildren,
          Htriptype: this.Htriptype,
          HcheckInDate: this.HcheckInDate,
          HcheckOutDate: this.HcheckOutDate,
        })
      );
      this.$store.commit("setFilters2", {
        Hcategory: this.Hcategory,
        Htype: this.Htype,
        Hlocation: this.Hlocation,
        Hroom: this.Hroom,
        Hadult: this.Hadult,
        Hchildren: this.Hchildren,
        Htriptype: this.Htriptype,
        HcheckInDate: this.HcheckInDate,
        HcheckOutDate: this.HcheckOutDate,
      });

      this.$router.push({
        name: "Houseboatlist",
        query: {
          Hcategory: this.Hcategory,
          Htype: this.Htype,
          Hlocation: this.Hlocation,
          Hroom: this.Hroom,
          Hadult: this.Hadult,
          Hchildren: this.Hchildren,
          Htriptype: this.Htriptype,
          HcheckInDate: this.HcheckInDate,
          HcheckOutDate: this.HcheckOutDate,
        },
      });
    },
    apply1() {
      if (this.Hadult) {
        this.Hguest = false;
      } else {
        this.msg = "Please choose number of adults";
        this.snackbar = true;
      }
    },
  },
};
</script>
<style scoped>
.custom-autocomplete.v-autocomplete input {
  border: none !important;
  outline: none !important;
}

.v-input__slot::before {
  border-style: none !important;
}

.custom-autocomplete.v-autocomplete input {
  border: none !important;
  outline: none !important;
}

.v-input__slot::before {
  border-style: none !important;
}

.text-field-transparent .v-input__slot {
  background: transparent !important;
}

.black-border {
  border: 1px solid #d3d3d3;
  padding: 20px;
}

.black-border2 {
  border: 1px solid #d3d3d3;
  padding-top: 20px;
  padding-left: 10px;

  border-radius: 8px 0px 0px 8px;
}

.black-borderz {
  border: 1px solid #d3d3d3;
  padding-top: 8px;
  padding-left: 16px;

  /* Add padding if desired */
  border-radius: 0px 8px 8px 0px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-borderm {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-left: 20px;
  padding-right: 13px;
  padding-top: 20px;
  padding-bottom: 20px;

  /* Add padding if desired */
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-borderu {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-top: 22px;
  padding-left: 16px;

  border-radius: 0px 0px 0px 0px;
}

.black-border3 {
  border: 1px solid #d3d3d3;
  padding: 20px;
  border-radius: 0px 8px 8px 0px;
}

.black-borderx {
  border: 1px solid #d3d3d3;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;

  border-radius: 0px 0px 0px 0px;
}

.black-borderv {
  border: 1px solid #d3d3d3;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  border-radius: 0px 0px 0px 0px;
}

.text-field-transparent .v-input__slot {
  background: transparent !important;
}

.black-border {
  border: 1px solid #d3d3d3;
  padding: 20px;
}

.v-text-field ::v-deep input {
  font-size: 0.8em;
  font-weight: 400;
  text-transform: capitalize;
}

.black-bordere {
  border: 1px solid #d3d3d3;

  padding-top: 19px;
  padding-left: 19px;

  border-radius: 0px 0px 0px 0px;
}

.black-borderv {
  border: 1px solid #d3d3d3;
  padding-left: 19px;

  padding-top: 19px;

  border-radius: 0px 8px 8px 0px;
}
</style>