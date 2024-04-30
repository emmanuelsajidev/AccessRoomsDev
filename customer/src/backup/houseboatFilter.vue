<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="rgba(255, 98, 0, 1)" right :timeout="3000">
      <v-layout wrap>
        <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap class="hidden-sm-and-down" justify-center
    style="border-radius: 10px;">
      <v-flex
        xs11
        pt-4
        text-left
        style="font-weight: 400; font-size: 20px; font-family: LexendRegular"
      >
        <v-layout wrap justify-start>
          <v-flex xs12 sm6 md2 pr-1>
            <v-autocomplete
              flat
              dense
              color="black"
              :items="['Luxury', 'Premium', 'Deluxe']"
              v-model="category"
              item-text="name"
              item-color="#FF1313"
              hide-details="true"
              clearable
              class="custom-autocomplete rounded-lg"
            >
              <template v-slot:append>
                <v-layout wrap justify-center>
                  <v-flex xs1 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>
                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span
                  class="custom-label-text"
                  style="color: black; font-size: 14px;font-family:RobotoBold;"
                >
                  Category</span
                >
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs12 sm6 md2 pl-6>
            <v-autocomplete
              flat
              dense
              color="black"
              :items="['Private', 'Sharing']"
              v-model="type"
              item-text="name"
              item-color="#FF1313"
              hide-details="true"
              clearable
              class="custom-autocomplete rounded-lg"
            >
              <template v-slot:append>
                <v-layout wrap>
                  <v-flex xs12 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>
                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span
                  class="custom-label-text"
                  style="color: black; font-size: 14px;font-family:RobotoBold;"
                >
                  Type</span
                >
              </template>
            </v-autocomplete>
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12 pt-4>
            <v-layout wrap>
              <v-flex xs2 class="black-border2">
                <v-layout wrap justify-center>
                  <v-flex xs12 pr-2>
                    <v-autocomplete
                      flat
                      dense clearable
                      color="black"
                      :items="locationList"
                      v-model="location"
                      item-text="name"
                      item-value="_id"
                      item-color="#FF1313"
                      hide-details="true"
                      placeholder="Location"
                      
                      class="custom-autocomplete rounded-lg"
                    >
                      <template v-slot:append>
                        <v-layout wrap justify-start>
                          <v-flex xs1 pt-1>
                            <v-icon color="black">mdi-chevron-down</v-icon>
                          </v-flex>
                        </v-layout>
                      </template>
                      <template v-slot:label>
                        <span
                          class="custom-label-text"
                          style="color: black; font-size: 14px;font-family:RobotoBold;"
                        >
                          Location</span
                        >
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs2 class="black-border">
                <v-layout wrap justify-center>
                  <v-flex xs12 pr-2>
                    <!-- <v-autocomplete
                      flat
                      dense
                      color="black"
                      :items="rooms"
                      v-model="room"
                      item-text="name"
                      item-color="#FF1313"
                      hide-details="true"
                      clearable
                      class="custom-autocomplete rounded-lg"
                    > -->
                    <v-text-field
            v-model="room"
            hide-details 
            flat dense style=""
          >
                      <!-- <template v-slot:append>
                        <v-layout wrap justify-start>
                          <v-flex xs1 pt-1>
                            <v-icon color="black">mdi-chevron-down</v-icon>
                          </v-flex>
                        </v-layout>
                      </template> -->
                      <template v-slot:label>
                        <span
                          class="custom-label-text"
                          style="color: black; font-size: 14px;font-family:RobotoBold;"
                        >
                          Rooms</span
                        >
                      </template>
                    <!-- </v-autocomplete> -->
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs2 @click="guest = true" class="black-border">
                <v-layout wrap justify-center>
                  <v-flex xs11 pr-2>
                    <span style="color: black; font-size: 14px;font-family:RobotoBold;">
                      No.of Guests
                    </span>
                  </v-flex>
                  <v-flex xs1>
                    <v-icon color="black">mdi-chevron-down</v-icon>
                  </v-flex>
                  <v-flex xs6 text-left v-if="children">
                    <span style="color: black; font-size: 14px">Children</span>
                  </v-flex>
                  <v-flex xs5 text-center v-if="children">
                    <span style="color: black; font-size: 14px">{{
                      children
                    }}</span>
                  </v-flex>
                  <v-flex xs6 text-left v-if="adult">
                    <span style="color: black; font-size: 14px"> Adult</span>
                  </v-flex>
                  <v-flex xs5 text-center v-if="adult">
                    <span style="color: black; font-size: 14px">{{
                      adult
                    }}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs2 class="black-border">
                <v-layout wrap justify-center>
                  <v-flex xs12 pr-2>
                    <v-autocomplete
                      flat
                      dense
                      color="black"
                       :items="['DayCruise', 'OverNight', 'NightStay']"
                      v-model="triptype"
                      item-text="name"
                      item-color="#FF1313"
                      hide-details="true"
                      clearable
                      class="custom-autocomplete rounded-lg"
                    >
                      <template v-slot:append>
                        <v-layout wrap justify-start>
                          <v-flex xs1 pt-1>
                            <v-icon color="black">mdi-chevron-down</v-icon>
                          </v-flex>
                        </v-layout>
                      </template>
                      <template v-slot:label>
                        <span
                          class="custom-label-text"
                          style="color: black; font-size: 14px;font-family:RobotoBold;"
                        >
                          Trip Type</span
                        >
                      </template>
                    </v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs2 class="black-bordere">
                <v-layout wrap justify-center>
                  <v-flex xs12 pr-2>
                    <v-menu
                      ref="menuCheckIn"
                      v-model="menuCheckInVisible"
                      :close-on-content-click="false"
                      max-width="290"
                      style="box-shadow: none"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="text-field-transparent"
                          dense
                          hide-details="auto"
                          v-model="checkInDate"
                          v-bind="attrs"
                          background-color="white"
                          v-on="on"
                          @click:clear="checkInDate = null"
                          style="color: black; box-shadow: none"
                        >
                          <template v-slot:append>
                            <v-layout wrap>
                              <v-flex pt-1>
                                <v-icon color="black">mdi-calendar</v-icon>
                              </v-flex>
                            </v-layout>
                          </template>
                          <template v-slot:label>
                            <span
                              class="custom-label-text"
                              style="color: black; font-size: 14px;font-family:RobotoBold;"
                            >
                              Check In
                            </span>
                          </template>
                        </v-text-field>
                      </template>

                      <v-date-picker
                        style="box-shadow: none"
                        v-model="checkInDate"
                        color="#13736f"
                        @change="menuCheckInVisible = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs2 class="black-borderv">
                <v-layout wrap justify-center>
                  <v-flex xs12 pr-2>
                    <v-menu
                      ref="menuCheckOut"
                      v-model="menuCheckOutVisible"
                      :close-on-content-click="false"
                      max-width="290"
                      style="box-shadow: none"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="text-field-transparent"
                          dense
                          hide-details="auto"
                          v-model="checkOutDate"
                          v-bind="attrs"
                          background-color="white"
                          v-on="on"
                          @click:clear="checkOutDate = null"
                          style="color: black; box-shadow: none"
                        >
                          <template v-slot:append>
                            <v-layout wrap>
                              <v-flex pt-1>
                                <v-icon color="black">mdi-calendar</v-icon>
                              </v-flex>
                            </v-layout>
                          </template>
                          <template v-slot:label>
                            <span
                              class="custom-label-text"
                              style="color: black; font-size: 14px;font-family:RobotoBold;"
                            >
                              Check Out
                            </span>
                          </template>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        style="box-shadow: none"
                        v-model="checkOutDate"
                        color="#13736f"
                        @change="menuCheckOutVisible = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 pt-4 pb-4>
        <v-layout wrap justify-center>
          <v-flex xs2>
            <v-btn block color="rgba(255, 98, 0, 1)">
              <span
                style="
                  font-weight: 500;
                  color: white;
                  font-size: 18px;
                  font-family: LexendRegular;
                  text-transform: none;
                "  @click="searchProduct()"
                >Search  </span
              >
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout pt-3 wrap class="hidden-md-and-up" justify-center>
      <v-flex xs11>
        <v-layout wrap pt-2 pt-md-16 justify-center>
          <v-flex
            class="black-border"
            xs12 sm6 md2
            style="
              font-weight: 400;
              font-size: 20px;
              font-family: LexendRegular;
            "
          >
            <v-autocomplete
              flat
              dense
              color="black"
              :items="['Luxury', 'Premium', 'Deluxe']"
              v-model="category"
              item-text="name"
              item-color="#FF1313"
              hide-details="true"
              clearable
              class="custom-autocomplete rounded-lg"
            >
              <template v-slot:append>
                <v-layout wrap justify-start>
                  <v-flex xs12 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>
                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span
                  class="custom-label-text"
                  style="color: black; font-size: 14px"
                >
                  Category</span
                >
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex
          xs12 sm6 md2
            class="black-border"
            pt-3
            style="
              font-weight: 400;
              font-size: 20px;
              font-family: LexendRegular;
            "
          >
            <v-autocomplete
              flat
              dense
              color="black"
              :items="['Private', 'Sharing']"
              v-model="type"
              item-text="name"
              item-color="#FF1313"
              hide-details="true"
              clearable
              class="custom-autocomplete rounded-lg"
            >
              <template v-slot:append >
                <v-layout wrap>
                  <v-flex xs12 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>
                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span
                  class="custom-label-text"
                  style="color: black; font-size: 14px"
                >
                  Type</span
                >
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex
            class="black-border"
            xs12 sm6 md1
            pt-3
            style="
              font-weight: 400;
              font-size: 20px;
              font-family: LexendRegular;
            "
          >
            <v-autocomplete
              flat
              dense
              color="black"
              :items="locationList"
              v-model="location"
              item-text="name"
              item-value="_id"
              item-color="#FF1313"
              hide-details="true"
              clearable
              class="custom-autocomplete rounded-lg"
            >
              <template v-slot:append>
                <v-layout wrap justify-start>
                  <v-flex xs1 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>
                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span
                  class="custom-label-text"
                  style="color: black; font-size: 14px"
                >
                  Location</span
                >
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex
            class="black-border"
            xs12 sm6 md1
            style="
              font-weight: 400;
              font-size: 20px;
              font-family: LexendRegular;
            "
          >
          <v-text-field
            v-model="room"
            hide-details 
            outlined dense
          >
            <!-- <v-autocomplete
              flat
              dense
              color="black"
              :items="rooms"
              v-model="room"
              item-text="name"
              item-color="#FF1313"
              hide-details="true"
              clearable
              class="custom-autocomplete rounded-lg"
            > -->
              <template v-slot:append>
                <v-layout wrap justify-start>
                  <v-flex xs1 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>
                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span
                  class="custom-label-text"
                  style="color: black; font-size: 14px"
                >
                  Rooms</span
                >
              </template>
            <!-- </v-autocomplete> -->
          </v-text-field>
          </v-flex>
          <v-flex
            class="black-border"
            xs12 sm6 md1
            @click="guest = true"
            style="
              font-weight: 400;
              font-size: 20px;
              font-family: LexendRegular;
            "
          >
            <v-layout wrap justify-start>
              <v-flex xs10 pr-4>
                <span style="color: black; font-size: 14px">
                  No.of Guests
                </span>
              </v-flex>
              <v-flex xs2 pl-2>
                <v-icon color="black">mdi-chevron-down</v-icon>
              </v-flex>
              <v-flex xs6 text-left v-if="children">
                <span style="color: black; font-size: 14px">Children</span>
              </v-flex>
              <v-flex xs5 text-center v-if="children">
                <span style="color: black; font-size: 14px">{{
                  children
                }}</span>
              </v-flex>
              <v-flex xs6 text-left v-if="adult">
                <span style="color: black; font-size: 14px"> Adult</span>
              </v-flex>
              <v-flex xs5 text-center v-if="adult">
                <span style="color: black; font-size: 14px">{{ adult }}</span>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex
            class="black-border"
            xs12 sm6 md1
            style="
              font-weight: 400;
              font-size: 20px;
              font-family: LexendRegular;
            "
          >
            <v-autocomplete
              flat
              dense
              color="black"
               :items="['DayCruise', 'OverNight', 'NightStay']"
              v-model="triptype"
              item-text="name"
              item-color="#FF1313"
              hide-details="true"
              clearable
              class="custom-autocomplete rounded-lg"
            >
              <template v-slot:append>
                <v-layout wrap justify-start>
                  <v-flex xs1 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>
                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span
                  class="custom-label-text"
                  style="color: black; font-size: 14px"
                >
                  Trip Type</span
                >
              </template>
            </v-autocomplete>
          </v-flex>

          <v-flex
            class="black-border"
            xs12 sm6 md1
            style="
              font-weight: 400;
              font-size: 20px;
              font-family: LexendRegular;
            "
          >
            <v-menu
              ref="menuCheckIn"
              v-model="menuCheckIn"
              :close-on-content-click="false"
              max-width="290"
              style="box-shadow: none"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="text-field-transparent"
                  dense
                  hide-details="auto"
                  v-model="checkInDate"
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="checkInDate = null"
                  style="color: black; box-shadow: none"
                >
                  <template v-slot:append>
                    <v-icon color="black">mdi-calendar</v-icon>
                  </template>
                  <template v-slot:label>
                    <span
                      class="custom-label-text"
                      style="color: black; font-size: 14px"
                    >
                      Check In
                    </span>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                style="box-shadow: none"
                v-model="checkInDate"
                color="#13736f"
                @change="menuCheckIn = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex
            class="black-border"
            xs12 sm6 md1
            style="
              font-weight: 400;
              font-size: 20px;
              font-family: LexendRegular;
            "
          >
            <v-menu
              ref="menuCheckOut"
              v-model="menuCheckOut"
              :close-on-content-click="false"
              max-width="290"
              style="box-shadow: none"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="text-field-transparent"
                  dense
                  hide-details="auto"
                  v-model="checkOutDate"
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="checkOutDate = null"
                  style="color: black; box-shadow: none"
                >
                  <template v-slot:append>
                    <v-icon color="black">mdi-calendar</v-icon>
                  </template>
                  <template v-slot:label>
                    <span
                      class="custom-label-text"
                      style="color: black; font-size: 14px"
                    >
                      Check Out
                    </span>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                style="box-shadow: none"
                v-model="checkOutDate"
                color="#13736f"
                @change="menuCheckOut = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex
            pb-5
            xs12 sm6 md1
            pt-5
            style="
              font-weight: 400;
              font-size: 20px;
              font-family: LexendRegular;
            "
          >
            <v-btn block color="rgba(255, 98, 0, 1)"   @click="searchProduct()">
              <span
                style="
                  font-weight: 500;
                  color: white;
                  font-size: 14px;
                  font-family: LexendRegular;
                "
                >Search</span
              >
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog width="550px" v-model="guest">
            <v-card class="pa-2">
              <v-layout wrap justify-center pt-5>
                <v-flex xs5 text-left pt-3>
                  <span style="font-family: RobotoRegular;color:black;font-size: 18px;font-weight:400">No.of Adults</span>
                  <span style="color: red">*</span>
                                  <span style="color: #626262; font-size: 10px">
                                  Above 5 year child count added to adult count
                                  </span>
                </v-flex>
                <v-flex xs5>
                  <span>
                    <v-autocomplete flat dense outlined color="black" :items="adults" v-model="adult" item-text="name"
                      item-color="#FF1313" hide-details="true" clearable class="custom-autocomplete rounded-lg">
                      <template v-slot:append>
                        <v-layout wrap justify-start>
                          <v-flex xs1 pt-1>
                            <v-icon color="black">mdi-chevron-down</v-icon>
  
                          </v-flex>
                        </v-layout>
                      </template>
                      <template v-slot:label>
                        <span class="custom-label-text"
                          style="font-family: RobotoRegular;color:black;font-size: 18px;font-weight:400">
                          Select</span>
                      </template>
                    </v-autocomplete>
                  </span>
  
                </v-flex>
                <v-flex xs5 text-left pt-11>
                  <span style="font-family: RobotoRegular;color:black;font-size: 18px;font-weight:400">No of
                    Childrens</span>
                  <span>
                    <span style="color:red">*</span>
                    <span style="color:#626262;font-size:10px">
                      Ages above 5 years
                    </span>
                  </span>
                </v-flex>
                <v-flex xs5 pt-9>
                  <span>
                    <v-autocomplete flat dense outlined color="black" :items="childrens" v-model="children" item-text="name"
                      item-color="#FF1313" hide-details="true" clearable class="custom-autocomplete rounded-lg">
                      <template v-slot:append>
                        <v-layout wrap justify-start>
                          <v-flex xs1 pt-1>
                            <v-icon color="black">mdi-chevron-down</v-icon>
  
                          </v-flex>
                        </v-layout>
                      </template>
                      <template v-slot:label>
                        <span class="custom-label-text"
                          style="font-family: RobotoRegular;color:black;font-size: 18px;font-weight:400">
                          Select</span>
                      </template>
                    </v-autocomplete>
                  </span>
  
                </v-flex>
                <v-flex xs10 pt-5 pb-3>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs10 pt-1 pb-3>
                  <v-layout wrap justify-end>
                    <v-flex xs7 lg3 text-right>
                      <v-btn color="#FF6200" @click="apply()">
                        <span style="font-family: RobotoRegular;color:white;font-size: 16px;font-weight:400">
                          APPLY
                        </span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-dialog>
  </div>
</template>
  <script>
import axios from "axios";
import store from "./../store";
export default {
  data() {
    return {
      CurTab:"",
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

      limit: 10,
      triptype: "",
      fromDate: null,
      toDate: null,

      fromDate2: null,
      toDate2: null,
      menuCheckIn: false,
      menuCheckOut: false,
      adult: null,
      children: 0,
      checkInDate: null,
      checkOutDate: null,
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
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    apply() {
      this.guest = false;
    },
    searchProduct(){
      var searchItems={};
      searchItems.category = this.category;
      searchItems.type = this.type;
      searchItems.location = this.location;
      searchItems.room = this.room;
      searchItems.triptype = this.triptype;
      searchItems.checkInDate = this.checkInDate;
      searchItems.checkOutDate = this.checkOutDate;
      searchItems.children = this.children;
      searchItems.adult = this.adult;
      store.commit("HBsearchItems",searchItems)

      localStorage.setItem("Hcategory",this.category);
      localStorage.setItem("Htype",this.type);
      localStorage.setItem("Hlocation",this.location);
      localStorage.setItem("Hroom",this.room);
      localStorage.setItem("Htriptype",this.triptype);
      localStorage.setItem("HcheckInDate",this.checkInDate);
      localStorage.setItem("HcheckOutDate",this.checkOutDate);
      localStorage.setItem("Hchildren",this.children);
      localStorage.setItem("Hadult",this.adult);
      var curTab =localStorage.getItem("myTab");
      localStorage.setItem("curTab",curTab);

      this.$router.push("/SearchBoats")
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
            this.$router.push("/SearchBoats?type='search'")
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
  },
};
</script>
  <style scoped>
.custom-autocomplete.v-autocomplete input {
  border: none !important;
  outline: none !important;
}

>>> .v-input__slot::before {
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
.borderStly{
  border-top-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>