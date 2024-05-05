<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar
      v-model="showSnackbar"
      color="rgba(255, 98, 0, 1)"
      right
      top
      :timeout="3000"
    >
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center>
      <v-flex
        xs12
        px-4
        pt-4
        text-left
        style="font-weight: 400; font-size: 20px; font-family: LexendRegular"
      >
        <v-layout wrap justify-start>
          <v-flex
            xs12
            sm6
            md2
            style="line-height: 10px"
            pl-0
            pl-md-4
            pr-0
            pr-sm-4
          >
            <v-autocomplete
              flat
              class="font2a"
              dense
              color="rgba(255, 98, 0, 1)"
              :items="['Luxury', 'Premium', 'Deluxe']"
              v-model="category"
              label="Category"
              :menu-props="{
                styles: {
                  fontFamily: 'LexendFont',
                  fontSize: '14px',
                  fontWeight: '400',
                },
              }"
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
            pl-0
            pl-sm-3
            pr-0
            pr-md-2
            pt-3
            pt-sm-0
          >
            <v-autocomplete
              flat
              class="font2a"
              dense
              :items="['Private', 'Sharing']"
              v-model="type"
              item-text="name"
              label="Type"
              item-color="#FF1313"
              color="rgba(255, 98, 0, 1)"
              hide-details="auto"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12 sm6 md2 pt-2 pl-0 pl-md-1 pr-1>
            <v-autocomplete
              outlined
              class="font2a"
              dense
              color="rgba(255, 98, 0, 1)"
              :items="locationList"
              v-model="location"
              label="Location"
              item-text="name"
              item-value="_id"
              item-color="#FF1313"
              hide-details="true"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm6 md2 pt-2 pr-1>
            <v-text-field
              class="font2a"
              v-model="room"
              label="Rooms"
              hide-details
              outlined
              color="rgba(255, 98, 0, 1)"
              flat
              dense
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md2 pt-2 pr-1 @click="guest = true">
            <v-card
              v-if="adult"
              outlined
              style="border-color: #626262"
              class="py-1"
            >
              <span
                class="pr-1 pl-2"
                v-if="adult"
                style="
                  font-family: LexendFont;
                  color: #474646;
                  font-size: 16px;
                  font-weight: 400;
                "
                >Guests :</span
              >
              <span
                class="pr-1 pl-2"
                v-if="adult"
                style="
                  font-family: LexendFont;
                  color: #474646;
                  font-size: 16px;
                  font-weight: 400;
                "
                >{{ adult }}<v-icon> mdi-human-male</v-icon></span
              >
              <span
                class="pl-1 pr-2"
                v-if="children"
                style="
                  font-family: LexendFont;
                  color: #474646;
                  font-size: 16px;
                  font-weight: 400;
                "
                >{{ children }}<v-icon> mdi-car-child-seat</v-icon></span
              >
            </v-card>
            <v-card v-else outlined style="border-color: #626262" class="py-1">
              <span
                style="
                  font-family: LexendFont;
                  color: #474646;
                  font-size: 16px;
                  font-weight: 400;
                "
                class="py-2 pl-2"
                >No.of guest</span
              >
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md2 pt-2 pr-1 align-self-center>
            <v-autocomplete
              flat
              outlined
              dense
              label="Trip Type"
              style="border-color: rgba(255, 98, 0, 1)"
              :items="tripTypes"
              v-model="triptype"
              item-text="displayText"
              item-value="name"
              item-color="rgba(255, 98, 0, 1)"
              hide-details="true"
              class="font2a"
              color="rgba(255, 98, 0, 1)"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12 sm6 md2 pt-2 pr-1>
            <v-menu
              ref="menuCheckInVisible"
              v-model="menuCheckInVisible"
              :close-on-content-click="false"
              :return-value.sync="checkInDate"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="checkInDate"
                  outlined
                  readonly
                  label="Check In Date"
                  dense
                  hide-details="auto"
                  clearable
                  color="rgba(255, 98, 0, 1)"
                  class="rounded-0 font2a"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="rgba(255, 98, 0, 1)"
                v-model="checkInDate"
                no-title
                :min="nowDate"
                scrollable
                @change="$refs.menuCheckInVisible.save(checkInDate)"
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm6 md2 pt-2 pr-1>
            <v-menu
              ref="menuCheckOutVisible"
              v-model="menuCheckOutVisible"
              :close-on-content-click="false"
              :return-value.sync="checkOutDate"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="checkOutDate"
                  outlined
                  :disabled="checkInDate ? false : true"
                  readonly
                  label="Check Out Date"
                  dense
                  hide-details="auto"
                  clearable
                  class="rounded-0 font2a"
                  color="rgba(255, 98, 0, 1)"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="rgba(255, 98, 0, 1)"
                v-model="checkOutDate"
                no-title
                :min="checkInDate"
                scrollable
                @change="$refs.menuCheckOutVisible.save(checkOutDate)"
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- <v-flex xs11 py-2>
        <v-layout wrap justify-center>
          <v-flex xs12 sm4 lg2>
            <v-btn block color="rgba(255, 98, 0, 1)">
              <span
                style="
                  font-weight: 500;
                  color: white;
                  font-size: 18px;
                  font-family: LexendRegular;
                  text-transform: none;
                "
                @click="validation()"
                >Search
              </span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex> -->
    </v-layout>
    <v-dialog width="550px" v-model="guest">
      <v-card class="pa-2">
        <v-layout wrap justify-center pt-5>
          <v-flex xs5 text-left pt-3>
            <span
              style="
                font-family: RobotoRegular;
                color: black;
                font-size: 18px;
                font-weight: 400;
              "
              >No. of Adults</span
            >
            <span style="color: red">*</span>
            <span style="color: #626262; font-size: 10px">
              Children above 5 year old are considered as adults
            </span>
          </v-flex>
          <v-flex xs5>
            <span>
              <v-text-field
                class="font2a"
                color="rgba(255, 98, 0, 1)"
                v-model="adult"
                label="Adults"
                hide-details
                outlined
                flat
                dense
              ></v-text-field>
            </span>
          </v-flex>
          <v-flex xs5 text-left pt-5>
            <span
              style="
                font-family: RobotoRegular;
                color: black;
                font-size: 18px;
                font-weight: 400;
              "
              >No.of Children</span
            >
            <span>
              <span style="color: red">*</span>
              <span style="color: #626262; font-size: 10px">
                Ages below 5 years
              </span>
            </span>
          </v-flex>
          <v-flex xs5 pt-3>
            <span>
              <v-text-field
                class="font2a"
                color="rgba(255, 98, 0, 1)"
                v-model="children"
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
                <v-btn color="#FF6200" @click="apply()">
                  <span
                    style="
                      font-family: RobotoRegular;
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
    <v-layout wrap justify-center>
      <v-flex xs12 sm11 md12 lg10 pb-4>
        <v-card outlined color="white" class="py-8" v-if="housedata">
          <v-layout wrap justify-center>
            <v-flex xs12 sm11>
              <span
                style="
                  font-size: 20px;
                  font-weight: 400;
                  color: black;
                  font-family: LexendFont;
                "
                >{{ Datalength }} Total results</span
              ></v-flex
            >
            <v-flex xs12 sm11 py-4><v-divider></v-divider></v-flex>
          </v-layout>
          <v-layout
            wrap
            justify-start
            px-0
            px-sm-6
            v-if="filterType == true && housedata.length > 0"
          >
            <v-flex
              xs12
              sm6
              md4
              v-for="(item, i) in housedata"
              :key="i"
              pa-1
              pa-sm-2
              pa-md-6
              style="background-color: transparent"
            >
              <v-card class="pa-4" elevation="1" style="border-radius: 10px">
                <!-- @click="$router.push('/HouseboatDetail?id=' + item._id)" -->

                <v-layout wrap>
                  <v-flex xs12>
                    <v-card
                      elevation="0"
                      width="330px"
                      style="border-radius: 10px"
                    >
                      <div v-viewer style="display: flex; min-height: 200px">
                        <img
                          v-if="item.fullImage"
                          style="
                            width: 100%;
                            height: 150px;
                            object-fit: cover;
                            cursor: pointer;
                          "
                          :src="mediaUURL + item.fullImage"
                        />
                        <!-- <template v-slot:placeholder>
                            <ImageLoader /> </template
                        > -->
                      </div>

                      <v-img
                        v-if="!item.fullImage"
                        height="150px"
                        src="./../assets/images/nophoto.jpg"
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex
                    xs12
                    text-left
                    px-2
                    pt-2
                    style="
                      font-family: LexendFont;
                      font-weight: 500;
                      font-size: 16px;
                    "
                  >
                    <span>
                      {{ item.houseBoatName }}
                    </span>
                  </v-flex>
                  <v-flex xs12 text-left px-2>
                    <v-icon x-small color="black">mdi-bed-outline</v-icon>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 500;
                        font-size: 15px;
                      "
                    >
                      {{ item.totalRooms }} Rooms</span
                    >
                    <!-- <span    style="
                        font-family: LexendFont;
                        font-weight: 500;
                        font-size: 15px;
                      ">
    {{ item.length > 1 ? item.reduce((sum, item1) => sum + item1.totalRooms, 0) : item[0].totalRooms }} Rooms
  </span> -->
                  </v-flex>
                  <v-flex xs12 md6 text-left pl-2>
                    <span
                      v-if="item.customerRate"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 20px;
                      "
                    >
                      ₹{{ item.customerRate }}</span
                    >
                    <span v-else>-</span>
                  </v-flex>
                  <v-flex xs12 md6 text-left text-md-right>
                    <v-btn
                      dark
                      small
                      style="border-radius: 10px"
                      color="rgba(255, 98, 0, 1)"
                      @click="navigateToHouseboatDetail(item)"
                    >
                      <span
                        style="
                          font-weight: 500;
                          font-size: 15px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >Book Now</span
                      ></v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs11 py-2>
              <v-layout wrap justify-center>
                <v-flex xs12 sm4 lg2>
                  <v-btn block color="rgba(255, 98, 0, 1)">
                    <span
                      style="
                        font-weight: 500;
                        color: white;
                        font-size: 18px;
                        font-family: LexendRegular;
                        text-transform: none;
                      "
                      @click="validation()"
                      >View More
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout
            wrap
            justify-center
            v-if="filterType == true && housedata.length <= 0"
          >
            <v-flex xs11 py-4>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 16px;
                "
                >No data found</span
              >
            </v-flex>
          </v-layout>
          <!------------------------------- if multiple filter result ---------------------------------------->
          <v-layout
            wrap
            justify-start
            px-0
            px-sm-6
            v-if="filterType == false && housedata.length > 0"
          >
            <v-flex
              xs12
              sm6
              md4
              v-for="(item, i) in housedata"
              :key="i"
              pa-1
              pa-sm-2
              pa-md-6
              style="background-color: transparent"
            >
              <v-card
                class="pa-4"
                elevation="1"
                style="border-radius: 10px"
                @click="navigateToPage2(item)"
              >
                <!-- @click="$router.push('/HouseboatDetail?id=' + item._id)"
              > -->
                <v-layout wrap>
                  <v-flex xs12>
                    <v-card
                      elevation="0"
                      width="330px"
                      style="border-radius: 10px"
                    >
                      <v-img
                        v-if="item.houseBoatDetails[0].fullImage"
                        height="150px"
                        :src="mediaUURL + item.houseBoatDetails[0].fullImage"
                      >
                        <template v-slot:placeholder> <ImageLoader /> </template
                      ></v-img>
                      <v-img
                        v-else
                        height="150px"
                        src="./../assets/images/nophoto.jpg"
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex
                    xs12
                    text-left
                    px-2
                    pt-2
                    style="
                      font-family: LexendFont;
                      font-weight: 500;
                      font-size: 16px;
                    "
                  >
                    <span v-for="(item1, j) in item.houseBoatDetails" :key="j">
                      {{ item1.houseBoatName }}
                      <span
                        v-if="j < Object.keys(item.houseBoatDetails).length - 1"
                        >,
                      </span>
                    </span>
                  </v-flex>
                  <v-flex xs12 text-left px-2>
                    <v-icon x-small color="black">mdi-bed-outline</v-icon>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 500;
                        font-size: 15px;
                      "
                    >
                      {{
                        item.houseBoatDetails.length > 1
                          ? item.houseBoatDetails.reduce(
                              (sum, item1) => sum + item1.totalRooms,
                              0
                            )
                          : item.houseBoatDetails[0].totalRooms
                      }}
                      Rooms
                    </span>
                  </v-flex>
                  <v-flex xs12 md5 text-left pl-2>
                    <span
                      v-if="item.totalAmount"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 20px;
                      "
                    >
                      ₹ {{ item.totalAmount }}
                      <!-- {{
                        item.length > 1
                          ? item.reduce(
                              (sum, item1) => sum + item1.customerRate,
                              0
                            )
                          : item[0].customerRate
                      }} -->
                    </span>
                    <span v-else>-</span>
                  </v-flex>
                  <v-flex xs12 md7 text-left text-md-right>
                    <v-btn
                      dark
                      small
                      style="border-radius: 10px"
                      color="rgba(255, 98, 0, 1)"
                    >
                      <span
                        style="
                          font-weight: 500;
                          font-size: 15px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >Book Now</span
                      ></v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs11 py-2>
              <v-layout wrap justify-center>
                <v-flex xs12 sm4 lg2>
                  <v-btn block color="rgba(255, 98, 0, 1)">
                    <span
                      style="
                        font-weight: 500;
                        color: white;
                        font-size: 18px;
                        font-family: LexendRegular;
                        text-transform: none;
                      "
                      @click="validation()"
                      >View More
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout
            wrap
            justify-center
            v-if="filterType == false && housedata.length <= 0"
          >
            <v-flex xs11 py-4>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 16px;
                "
                >No data found</span
              >
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
import store from "./../store";
export default {
  data() {
    return {
      CurTab: "",
      appLoading: false,
      menuCheckInVisible: false,
      menuCheckOutVisible: false,
      category: "Deluxe",
      type: "Private",
      ServerError: false,
      location: "656726678831e05bfd738ece",
      showSnackbar: false,
      timeout: 5000,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      room: 1,
      locationList: [],
      types: [
        { id: 1, name: "Type 1" },
        { id: 2, name: "Type 2" },
        { id: 3, name: "Type 3" },
      ],
      rooms: [
        { id: 1, name: "Room 101" },
        { id: 2, name: "Room 102" },
        { id: 3, name: "Room 103" },
      ],
      triptypes: [
        { id: 1, name: "Business Trip" },
        { id: 2, name: "Vacation" },
        { id: 3, name: "Family Trip" },
      ],
      childrens: [
        { id: 1, name: " 1" },
        { id: 2, name: " 2" },
        { id: 3, name: " 3" },
      ],
      adults: [
        { id: 1, name: " 1" },
        { id: 2, name: " 2" },
        { id: 3, name: " 3" },
      ],
      tripTypes: [
        { name: "OverNight", displayText: "OverNight (12 pm - 9 am)" },
        { name: "DayCruise", displayText: "DayCruise (11 am - 5 pm)" },
        { name: "NightStay", displayText: "NightStay (5.30 pm - 9 am)" },
      ],
      limit: 10,
      triptype: "OverNight",
      fromDate: null,
      toDate: null,
      nowDate: new Date().toISOString().slice(0, 10),
      fromDate2: null,
      toDate2: null,
      menuCheckIn: false,
      menuCheckOut: false,
      adult: 2,
      children: 1,
      checkInDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      checkOutDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      guest: false,
      msg: null,
      value: "",
      phone: "",
      cards: [
        {
          title: "bookingCount",
          name: "Total Bookings",
          src: require("./../assets/icons/homeIcon1.png"),
          count: "12",
        },
        {
          title: "reserveCount",
          name: "Reservations",
          src: require("./../assets/icons/homeIcon2.png"),
          count: "40",
        },
        {
          title: "houseBoatCount",
          name: "Houseboats",
          src: require("./../assets/icons/homeIcon3.png"),
          count: "30",
        },
        {
          title: "shikaraCount",
          name: "Shikaras",
          src: require("./../assets/icons/homeIcon4.png"),
          count: "30",
        },
      ],
      //new updates
      housedata: [],
      filterType: false,
      Datalength: 0,
      viewerVisible: false, // Variable to control the visibility of the viewer
      viewerImages: [], // Array to store images to be displayed in the viewer
    };
  },
  watch: {
    checkInDate(newCheckInDate) {
      if (this.checkInDate && !isNaN(new Date(this.checkOutDate))) {
        const checkOutDate = new Date(this.checkOutDate);
        const checkInDate = new Date(newCheckInDate);
        if (checkOutDate.getTime() < checkInDate.getTime()) {
          this.checkOutDate = null;
        }
      }
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    apply() {
      if (this.adult) {
        this.guest = false;
      } else {
        this.msg = "Please choose number of adults";
        this.showSnackbar = true;
      }
    },
    validation() {
      if (!this.category) {
        this.msg = "Please choose category";
        this.showSnackbar = true;
        return;
      } else if (!this.type) {
        this.msg = "Please choose houseboat type";
        this.showSnackbar = true;
        return;
      } else if (!this.location) {
        this.msg = "Please choose location";
        this.showSnackbar = true;
        return;
      } else if (!this.room) {
        this.msg = "Please enter number of rooms";
        this.showSnackbar = true;
        return;
      } else if (!this.adult) {
        this.msg = "Please choose number of guests";
        this.showSnackbar = true;
        return;
      } else if (!this.triptype) {
        this.msg = "Please choose trip type";
        this.showSnackbar = true;
        return;
      } else if (!this.checkInDate) {
        this.msg = "Please choose check-in date";
        this.showSnackbar = true;
        return;
      } else if (!this.checkOutDate) {
        this.msg = "Please choose check out date";
        this.showSnackbar = true;
        return;
      } else {
        this.searchProduct();
      }
    },
    searchProduct() {
      var searchItems = {};
      searchItems.category = this.category;
      searchItems.type = this.type;
      searchItems.location = this.location;
      searchItems.room = this.room;
      searchItems.triptype = this.triptype;
      searchItems.checkInDate = this.checkInDate;
      searchItems.checkOutDate = this.checkOutDate;
      searchItems.children = this.children;
      searchItems.adult = this.adult;
      store.commit("HBsearchItems", searchItems);

      localStorage.setItem("Hcategory", this.category);
      localStorage.setItem("Htype", this.type);
      localStorage.setItem("Hlocation", this.location);
      localStorage.setItem("Hroom", this.room);
      localStorage.setItem("Htriptype", this.triptype);
      localStorage.setItem("HcheckInDate", this.checkInDate);
      localStorage.setItem("HcheckOutDate", this.checkOutDate);
      if (this.children > 0) {
        localStorage.setItem("Hchildren", this.children);
      } else {
        localStorage.setItem("Hchildren", 0);
      }
      // localStorage.setItem("Hchildren",this.children);
      localStorage.setItem("Hadult", this.adult);
      var curTab = localStorage.getItem("myTab");
      localStorage.setItem("curTab", curTab);
      this.$router.push("/SearchBoats?type=" + "houseboat");
    },
    searchProduct1() {
      this.appLoading = true;
      var headers1 = {};
      // var data = {
      // keyword: this.keyword.productname,
      //     page: this.page,
      //     limit: this.limit,
      // };
      axios({
        method: "POST",
        url: "/product/search",
        // data: data,
        headers: headers1,
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.$store.commit("getSearchResults", response.data.data);

            this.products = response.data.data;
            this.result = response.data;
            this.$router.push("/SearchBoats?type='search'");
          } else {
            this.products = [];
          }
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
    getData() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/location/list",
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.locationList = response.data.data;
            this.getHouseboat();
          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    getHouseboat() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/houseboat/booking/filter",
        data: {
          category: this.category,
          houseBoatType: this.type,
          location: this.location,
          numberofRooms: this.room,
          children: this.children,
          adult: this.adult,
          tripType: this.triptype,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
          page: this.page1,
          limit: 6,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.housedata = response.data.data.slice(0, 6);
            this.Datalength = response.data.totalLength;

            console.log("Datalength=", this.Datalength);
            this.filterType = response.data.singleboat;
            // if (this.housedata.length > 0) {
            this.flag = true;
            // }
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    navigateToPage2(item) {
      const category = localStorage.getItem("Hcategory");
      const type = localStorage.getItem("Htype");
      const location = localStorage.getItem("Hlocation");
      const room = localStorage.getItem("Hroom");
      const triptype = localStorage.getItem("Htriptype");
      const checkInDate = localStorage.getItem("HcheckInDate");
      const checkOutDate = localStorage.getItem("HcheckOutDate");
      const children = localStorage.getItem("Hchildren");
      const adult = localStorage.getItem("Hadult");

      this.$router.push({
        path: "/HouseboatDetailMultiple",
        query: {
          ids: item._id,
          category,
          type,
          location,
          room,
          triptype,
          checkInDate,
          checkOutDate,
          children,
          adult,
        },
      });
    },
    navigateToHouseboatDetail(item) {
      localStorage.setItem("Hcategory", this.category);
      localStorage.setItem("Htype", this.type);
      localStorage.setItem("Hlocation", this.location);
      localStorage.setItem("Hroom", this.room);
      localStorage.setItem("Htriptype", this.triptype);
      localStorage.setItem("HcheckInDate", this.checkInDate);
      localStorage.setItem("HcheckOutDate", this.checkOutDate);
      if (this.children > 0) {
        localStorage.setItem("Hchildren", this.children);
      } else {
        localStorage.setItem("Hchildren", 0);
      }
      // localStorage.setItem("Hchildren",this.children);
      localStorage.setItem("Hadult", this.adult);
      var curTab = localStorage.getItem("myTab");
      localStorage.setItem("curTab", curTab);
      const id = item._id;
      const category = this.category;
      const type = this.type;
      const location = this.location;
      const room = this.room;
      const triptype = this.triptype;
      const checkInDate = this.checkInDate;
      const checkOutDate = this.checkOutDate;
      const children = this.children;
      const adult = this.adult;
      const houseboatname = item.houseBoatName;
      const url = `/HouseBoat?houseboatname=${houseboatname}&id=${id}&category=${category}&type=${type}&triptype=${triptype}&room=${room}&checkInDate=${checkInDate}&location=${location}&checkOutDate=${checkOutDate}&children=${children}&adult=${adult}`;

      this.$router.push(url);
    },
  },
};
</script>
<style>
.v-date-picker__scroll .v-date-picker__scroll-content::-webkit-scrollbar {
  width: 800px; /* Adjust the width as needed */
}
</style>