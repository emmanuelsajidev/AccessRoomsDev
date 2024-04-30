<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      background-color="#FFFFFF"
      color="#F17343"
      spinner="spinner"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="#ff6200" right :timeout="3000">
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap class="hidden-sm-and-down" justify-center>
      <v-flex xs12>
        <v-layout wrap justify-center>
          <v-flex xs12 pb-2>
            <v-layout wrap pb-6>
              <v-flex>
                <v-layout wrap justify-center>
                  <v-flex xs12 pt-6>
                    <v-card elevation="0">
                      <v-layout wrap justify-center>
                        <v-flex xs11 pt-4>
                          <span
                            style="
                              font-weight: 400;
                              font-size: 20px;
                              font-family: LexendRegular;
                            "
                            >{{ totalData }} Total Results</span
                          >
                        </v-flex>
                        <v-flex xs11 pt-3 pb-3>
                          <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 pb-4>
                          <v-layout wrap justify-center>
                            <v-flex
                              xs11
                              v-for="(item, i) in list"
                              :key="i"
                              pt-5
                            >
                              <v-card elevation="2">
                                <v-layout wrap justify-start>
                                  <v-flex xs12>
                                    <v-layout wrap justify-start>
                                      <v-flex xs3>
                                        <v-layout wrap justify-start>
                                          <v-flex xs12>
                                            <v-img
                                              height="170px"
                                              width="250px"
                                              :src="
                                                mediaUURL +
                                                item.shikaraId.coverImage
                                              "
                                            >
                                            </v-img>
                                          </v-flex>
                                        </v-layout>
                                      </v-flex>
                                      <v-flex xs6 pt-6 pb-6>
                                        <v-layout wrap justify-center>
                                          <v-flex
                                            xs11
                                            text-left
                                            align-self-center
                                          >
                                            <v-layout wrap fill-height>
                                              <v-flex
                                                xs6
                                                pb-2
                                                text-left
                                                align-self-center
                                              >
                                                <span
                                                  style="
                                                    font-weight: 500;
                                                    font-size: 18px;
                                                    font-family: LexendRegular;
                                                  "
                                                >
                                                  {{
                                                    item.shikaraId.shikaraName
                                                  }}&nbsp;<br />
                                                  <span style="font-size: 14px">
                                                    &nbsp;{{
                                                      item.tripTypeId
                                                        .maxCapacityOfBoat
                                                    }}
                                                    peoples
                                                  </span>
                                                </span>
                                              </v-flex>
                                              <v-flex xs5 pt-1 pl-2 text-center>
                                                <span
                                                  style="
                                                    font-weight: 500;
                                                    font-size: 14px;
                                                    font-family: LexendRegular;
                                                  "
                                                >
                                                  Minimum Duration :
                                                  <span
                                                    style="
                                                      font-weight: 500;
                                                      font-size: 15px;
                                                      font-family: LexendRegular;
                                                    "
                                                  >
                                                    {{
                                                      item.tripTypeId
                                                        .minimumHours
                                                    }}
                                                    Hrs
                                                  </span>
                                                </span>
                                              </v-flex>
                                            </v-layout>
                                          </v-flex>
                                          <v-flex xs11>
                                            <v-layout
                                              wrap
                                              justify-start
                                              class="LexendRegular"
                                              style="font-size: 11px"
                                            >
                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.shikaraId.facilities
                                                    .airCondition === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs2 text-left pt-1>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/ac.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs9 pt-1>
                                                    <span>Air Condition</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>

                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.shikaraId.facilities
                                                    .lifeJacket === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs2>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/lifejacket.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs6 text-left pt-1>
                                                    <span>Lifejacket</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.shikaraId.facilities
                                                    .parking === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs2>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/parking.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs6 text-left pt-1>
                                                    <span>Parking</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.shikaraId.facilities
                                                    .restrooms === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs2>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/was.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs6 text-left pt-1>
                                                    <span>Restrooms </span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>

                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.shikaraId.facilities
                                                    .television === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs2 text-left pt-1>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/tv.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs6>
                                                    <span>Television</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.shikaraId.facilities
                                                    .toilet === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs2>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/restroom.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs6 text-left pt-1>
                                                    <span>Toilet</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>

                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.shikaraId.facilities
                                                    .towels === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs2 text-left>
                                                    <v-img
                                                      color="black"
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/towel.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs6>
                                                    <span>Towels</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>

                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.shikaraId.facilities
                                                    .wifi === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs2>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/wifi.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs6 text-left pt-1>
                                                    <span>Wifi</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                            </v-layout>
                                          </v-flex>
                                        </v-layout>
                                      </v-flex>

                                      <v-flex xs3 pt-10>
                                        <v-layout wrap justify-start>
                                          <v-flex xs12 text-left>
                                            <v-layout wrap>
                                              <v-flex xs12 text-center>
                                                <span
                                                  style="
                                                    font-family: LexendRegular;
                                                    color: black;
                                                    font-size: 18px;
                                                    font-weight: 600;
                                                  "
                                                >
                                                  ₹
                                                  {{ item.totalAgentRate }} <span style="font-size: 11px;">
                                               (   Excluding GST   )
                                                  </span>
                                                </span>
                                                <br />
                                              </v-flex>
                                              <!-- <v-flex xs12 pt-1 style="font-family:LexendRegular">
                                                <span style="color:		#50C878;font-weight:bolder">
                                                  You will get

                                                </span>

                                                <span
                                                  style="font-family: LexendRegular;color:black;font-size: 14px;font-weight:600">
                                                  &nbsp;₹
                                                  {{ item.agentSaved }}

                                                </span>
                                              </v-flex> -->
                                              <v-flex xs12 pt-4 pl-6 pr-6>
                                                <v-btn
                                                  @click="
                                                    gotoView(
                                                      item.shikaraId._id,
                                                      item.totalAgentRate
                                                    )
                                                  "
                                                  color="#F17343"
                                                  block
                                                >
                                                  <span
                                                    style="
                                                      font-family: LexendRegular;
                                                      color: white;
                                                      font-size: 14px;
                                                      font-weight: 400;
                                                      text-transform: none;
                                                    "
                                                    >Book Now
                                                  </span>
                                                </v-btn>
                                              </v-flex>
                                            </v-layout>
                                          </v-flex>
                                        </v-layout>
                                      </v-flex>
                                    </v-layout>
                                  </v-flex>
                                </v-layout>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout wrap class="hidden-md-and-up" justify-center>
      <v-flex xs11 pb-3 pt-6 text-center>
        <span
          style="font-weight: 400; font-size: 20px; font-family: LexendRegular"
          >{{ totalData }} Total Results</span
        >
      </v-flex>
      <v-flex xs11 v-for="(item, i) in list" :key="i" pt-5>
        <v-card elevation="2">
          <v-layout wrap justify-start>
            <v-flex xs12>
              <v-layout wrap justify-start>
                <v-flex xs12>
                  <v-layout wrap justify-start>
                    <v-flex xs12>
                      <v-img
                        height="100%"
                        width="100%"
                        :src="mediaUURL + item.shikaraId.coverImage"
                      >
                      </v-img>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 pt-1>
                  <v-layout wrap justify-center>
                    <v-flex xs11 text-left align-self-center>
                      <v-layout wrap fill-height>
                        <v-flex xs12 pb-2 text-left align-self-center>
                          <span
                            style="
                              font-weight: 500;
                              font-size: 20px;
                              font-family: LexendRegular;
                            "
                          >
                            {{ item.shikaraId.shikaraName }}&nbsp;<br />
                            <span style="font-size: 16px">
                              &nbsp;{{
                                item.tripTypeId.maxCapacityOfBoat
                              }}
                              peoples
                            </span>
                          </span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs11 pt-1 text-left>
                      <span
                        style="
                          font-weight: 500;
                          font-size: 14px;
                          font-family: LexendRegular;
                        "
                      >
                        Minimum Duration :
                        <span
                          style="
                            font-weight: 500;
                            font-size: 15px;
                            font-family: LexendRegular;
                          "
                        >
                          {{ item.tripTypeId.minimumHours }} Hrs
                        </span>
                      </span>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout
                        wrap
                        justify-center
                        class="LexendRegular"
                        style="font-size: 11px"
                      >
                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.shikaraId.facilities.airCondition === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2 text-left pt-1>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/ac.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10 pt-1>
                              <span>Air Condition</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.shikaraId.facilities.lifeJacket === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/lifejacket.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10 text-left pt-1>
                              <span>Lifejacket</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.shikaraId.facilities.parking === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/parking.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10 text-left>
                              <span>Parking</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.shikaraId.facilities.restrooms === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/was.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10 text-left pt-1>
                              <span>Restrooms </span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.shikaraId.facilities.television === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2 text-left>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/tv.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10>
                              <span>Television</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.shikaraId.facilities.toilet === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/restroom.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10 text-left>
                              <span>Toilet</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.shikaraId.facilities.towels === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2 text-left>
                              <v-img
                                color="black"
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/towel.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10>
                              <span>Towels</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.shikaraId.facilities.wifi === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/wifi.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10 text-left>
                              <span>Wifi</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 pt-3>
                  <v-layout wrap justify-start>
                    <v-flex xs12 text-left>
                      <v-layout wrap justify-center>
                        <v-flex xs11 text-left>
                          <span
                            style="
                              font-family: LexendRegular;
                              color: black;
                              font-size: 18px;
                              font-weight: 600;
                            "
                          >
                            ₹
                            {{ item.totalAgentRate }} <span style="font-size: 11px;">
                                               (   Excluding GST   )
                                                  </span>
                          </span>
                          <br />
                          <!-- <span
                                                  style="font-weight: 400;font-size: 12px;font-family: LexendRegular;">
                                                  per head rate

                                                </span> -->
                        </v-flex>
                        <v-flex xs11 pt-4 pb-2>
                          <v-btn
                            @click="
                              gotoView(item.shikaraId._id, item.totalAgentRate)
                            "
                            color="#F17343"
                            block
                          >
                            <span
                              style="
                                font-family: LexendRegular;
                                color: white;
                                font-size: 14px;
                                font-weight: 400;
                                text-transform: none;
                              "
                              >Book Now
                            </span>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap justify-center v-if="list.length > 0">
      <v-flex xs11 pt-4 pt-lg-0 pb-3>
        <v-layout wrap>
          <v-flex xs12 id="specific-section">
            <v-pagination
              rounded="circle"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              :length="pages"
              :total-visible="7"
              v-model="currentPage"
              color="#F17343"
            ></v-pagination>
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
      appLoading: false,

      menuCheckInVisible: false,
      menuCheckOutVisible: false,

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

      limit: 10,
      triptype: "",
      fromDate: null,
      toDate: null,
      totalData: "",
      fromDate2: null,
      toDate2: null,
      menuCheckIn: false,
      menuCheckOut: false,
      adult: null,
      children: "",
      pages: 0,
      currentPage: 1,

      checkInDate: null,
      currentpage: 1,

      checkOutDate: null,
      guest: false,
      msg: null,
      value: "",
      phone: "",
      list: [],
    };
  },
  watch: {
    currentPage() {
      this.getList();
    },
  },
  created() {
    const {
      checkInDate,
      checkInTime,
      checkOutTime,
      location,
      memberCount,
      childrenCount,
    } = this.$route.query;
    this.checkInDate = checkInDate || this.checkInDate;
    this.checkInTime = checkInTime || this.checkInTime;
    this.checkOutTime = checkOutTime || this.checkOutTime;
    this.location = location || this.location;
    this.memberCount = memberCount || this.memberCount;
    this.childrenCount = childrenCount || this.childrenCount;
  },

  mounted() {
    this.getList();
  },
  methods: {
    convertToTimestamp(dateString) {
      const date = new Date(dateString);
      return date.getTime();
    },
    combineDateTime(dateString, timeString) {
      const formattedDate = `${dateString}T${timeString}:00`;
      return formattedDate;
    },
    getList() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/filter/available/shikaras",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          page: this.currentPage,
          limit: 10,
          selectedDate: this.checkInDate,
          startTime: this.combineDateTime(this.checkInDate, this.checkInTime),
          endTime: this.combineDateTime(this.checkInDate, this.checkOutTime),
          location: this.location,
          memberCount: this.memberCount,

          childrenCount: this.childrenCount,
        },
      }).then((response) => {
        if (response.data.status) {
          this.list = response.data.data;
          this.totalData = response.data.totalLength;
          this.pages = Math.ceil(this.totalData / response.data.limit);
          this.appLoading = false;
        } else {
          this.appLoading = false;

          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },

    gotoView(id, totrate) {
      this.$router.push({
        name: "view",
        query: {
          totrate: totrate,
          id: id,
          checkInDate: this.checkInDate,
          checkInTime: this.checkInTime,
          checkOutTime: this.checkOutTime,
          location: this.location,
          memberCount: this.memberCount,
          childrenCount: this.childrenCount,
        },
      });
    },
    apply() {
      this.guest = false;
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

.text-field-transparent .v-input__slot {
  background: transparent !important;
}

.black-border {
  border: 1px solid #d3d3d3;
  /* Light grey color */
  padding: 20px;
  /* Add padding if desired */
}

.black-border2 {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding: 20px;
  /* Add padding if desired */
  border-radius: 8px 0px 0px 8px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-bordere {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  /* Add padding if desired */
  padding-top: 19px;
  padding-left: 19px;

  border-radius: 0px 0px 0px 0px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-borderv {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-left: 19px;

  padding-top: 19px;

  /* Add padding if desired */
  border-radius: 0px 8px 8px 0px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}
</style>

<!-- ... rest of your code ... -->
