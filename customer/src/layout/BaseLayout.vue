<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="rgba(0, 38, 53, 1)"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar
      v-model="showSnackbar"
      color="rgba(0, 38, 53, 1)"
      right
      :timeout="timeout"
    >
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
    <v-layout wrap justify-center fill-height>
      <v-flex xs12 sm12 md12>
        <v-img
          src="./../assets/images/bg5.png"
          width="100%"
          :height="
            $vuetify.breakpoint.name == 'xs'
              ? '600px'
              : $vuetify.breakpoint.name == 'sm'
              ? '400px'
              : $vuetify.breakpoint.name == 'md'
              ? '350px'
              : $vuetify.breakpoint.name == 'lg'
              ? '350px'
              : '350px'
          "
        >
          <v-layout wrap fill-height justify-center>
            <v-flex xs11 sm11 lg10 align-self-center>
              <v-layout wrap>
                <v-flex xs12 pt-4 pb-4>
                  <v-card color="transparent" elevation="0">
                    <v-tabs
                      v-model="myTab"
                      background-color="transparent"
                      color="rgba(255, 98, 0, 1)"
                      left
                    >
                      <v-tab
                        :style="
                          myTab == 0
                            ? 'background-color:rgba(255, 98, 0, 1)'
                            : 'background-color:white'
                        "
                        style="border-top-left-radius: 10px"
                      >
                        <v-icon
                          class="pr-1"
                          :style="myTab == 0 ? 'color:white' : 'color:black'"
                          >mdi-ferry</v-icon
                        >
                        <span
                          :style="myTab == 0 ? 'color:white' : 'color:black'"
                          style="
                            font-family: RobotoBold;
                            font-weight: 500;
                            font-size: 14px;
                          "
                          >Houseboat</span
                        ></v-tab
                      >
                      <v-tab
                        :style="
                          myTab == 1
                            ? 'background-color:rgba(255, 98, 0, 1)'
                            : 'background-color:white'
                        "
                        style="border-top-right-radius: 10px"
                      >
                        <v-icon
                          class="pr-1"
                          :style="myTab == 1 ? 'color:white' : 'color:black'"
                          >mdi-sail-boat</v-icon
                        >
                        <span
                          :style="myTab == 1 ? 'color:white' : 'color:black'"
                          style="
                            font-family: RobotoBold;
                            font-weight: 500;
                            font-size: 14px;
                          "
                          >shikara</span
                        ></v-tab
                      >
                      <!----------------------------------HOUSEBOAT--FILTER----------------------------------------------------------------------------->
                      <v-tab-item>
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
                                  v-model="Htype"
                                  item-text="name"
                                  label="Type"
                                  item-color="#FF1313"
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
                                  color="black"
                                  :items="locationList"
                                  v-model="Hlocation"
                                  label="Location"
                                  item-text="name"
                                  item-value="_id"
                                  item-color="#FF1313"
                                  hide-details="true"
                                ></v-autocomplete>
                              </v-flex>
                              <v-flex xs12 sm6 md1 lg2 pt-2 pr-1>
                                <v-text-field
                                  class="font2a"
                                  v-model="Hroom"
                                  label="Rooms"
                                  hide-details
                                  outlined
                                  flat
                                  dense
                                ></v-text-field>
                              </v-flex>
                              <v-flex
                                xs12
                                sm6
                                md3
                                lg2
                                pt-2
                                pr-1
                                @click="Hguest = true"
                              >
                                <v-card
                                  v-if="Hadult"
                                  outlined
                                  style="border-color: #626262"
                                  class="py-1"
                                >
                                  <span
                                    class="pr-1 pl-2"
                                    v-if="Hadult"
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
                                    v-if="Hadult"
                                    style="
                                      font-family: LexendFont;
                                      color: #474646;
                                      font-size: 16px;
                                      font-weight: 400;
                                    "
                                    >{{ Hadult
                                    }}<v-icon>mdi-human-male</v-icon></span
                                  >
                                  <span
                                    class="pl-1"
                                    v-if="Hchildren"
                                    style="
                                      font-family: LexendFont;
                                      color: #474646;
                                      font-size: 16px;
                                      font-weight: 400;
                                    "
                                    >{{ Hchildren
                                    }}<v-icon>mdi-car-child-seat</v-icon></span
                                  >
                                </v-card>
                                <v-card
                                  v-else
                                  outlined
                                  style="border-color: #626262"
                                  class="py-1"
                                >
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
                              style="border-color: rgba(255, 98, 0, 1);"
                              :items="tripTypes"
                              v-model="Htriptype"
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
                                  ref="HmenuCheckInVisible"
                                  v-model="HmenuCheckInVisible"
                                  :close-on-content-click="false"
                                  :return-value.sync="HcheckInDate"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="HcheckInDate"
                                      outlined
                                      readonly
                                      label="Check In Date "
                                      dense
                                      hide-details="auto"
                                      clearable
                                      class="rounded-0"
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    color="rgba(255, 98, 0, 1)"
                                    v-model="HcheckInDate"
                                    no-title
                                    :min="nowDate"
                                    scrollable
                                    @change="
                                      $refs.HmenuCheckInVisible.save(
                                        HcheckInDate
                                      )
                                    "
                                  >
                                    <v-spacer></v-spacer>
                                  </v-date-picker>
                                </v-menu>
                              </v-flex>
                              <v-flex xs12 sm6 md2 pt-2 pr-1>
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
                                      dense
                                      hide-details="auto"
                                      clearable
                                      class="rounded-0"
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    color="rgba(255, 98, 0, 1)"
                                    v-model="HcheckOutDate"
                                    no-title
                                    :min="HcheckInDate"
                                    scrollable
                                    @change="
                                      $refs.HmenuCheckOutVisible.save(
                                        HcheckOutDate
                                      )
                                    "
                                  >
                                    <v-spacer></v-spacer>
                                  </v-date-picker>
                                </v-menu>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs11 py-2>
                            <v-layout wrap justify-center>
                              <v-flex xs11 sm6 md2>
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
                              <v-flex xs5 text-left pt-3>
                                <span
                                  style="
                                    font-family: LexendFont;
                                    color: black;
                                    font-size: 18px;
                                    font-weight: 400;
                                  "
                                  >No.of Adults</span
                                >
                                <span style="color: red">*</span>
                                <span style="color: #626262; font-size: 10px">
                                  Above 5 year child count added to adult count
                                </span>
                              </v-flex>
                              <v-flex xs5>
                                <span>
                                  <v-text-field
                                    class="font2a"
                                    v-model="Hadult"
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
                                    font-family: LexendFont;
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
                                    v-model="Hchildren"
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
                                          font-family: LexendFont;
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
                      </v-tab-item>
                      <!-----------------------------SHIKARA--FILTER------------------------------------------------------------------->
                      <v-tab-item>
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
                          <v-layout wrap>
                            <v-flex xs12 sm6 md3 pt-2 pr-1 pl-0 pl-md-1>
                              <v-autocomplete
                                outlined
                                class="font2a"
                                color="rgba(255, 98, 0, 1)"
                                dense
                                :items="locationList"
                                v-model="location"
                                label="Location"
                                item-text="name"
                                item-value="_id"
                                item-color="#FF1313"
                                hide-details="true"
                              ></v-autocomplete>
                              <v-layout wrap pt-3 v-if="location == '6567264a8831e05bfd738ec5'">
                                <v-flex
                                  style="
                                    font-family: 'LexendRegular';
                                    font-size: 14px;
                                    color: black;
                                    line-height: 1;
                                  "
                                >
                                  <span>Note: Max Capacity of shikaras is 7</span>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                            <!-- <v-flex xs12 sm6 md2 pt-2 pr-1>
                            <v-text-field  class="font2a"
                              v-model="room" label="Rooms"
                              hide-details outlined
                              flat dense 
                            ></v-text-field>
                          </v-flex> -->
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
                                  >{{ adult }}<v-icon>mdi-human-male</v-icon></span
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
                                  >{{ children }}<v-icon>mdi-car-child-seat</v-icon></span
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
                              <v-layout wrap pt-3>
                                      <v-flex
                                        style="
                                          font-family: 'LexendRegular';
                                          font-size: 14px;
                                          color: black;
                                          line-height: 1;
                                        "
                                      >
                                        <span>Note: Children below 4 years do not count</span>
                                      </v-flex>
                                    </v-layout>
                            </v-flex>
                            <v-flex xs12 sm6 md3 pt-2 pr-1 >
                              <v-menu
                                ref="menuCheckIn"
                                v-model="menuCheckIn"
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
                                    label="Checkin Date"
                                    dense
                                    hide-details
                                    clearable
                                    class="rounded-0 font2a"
                                    color="rgba(255, 98, 0, 1)"
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
                                  @change="$refs.menuCheckIn.save(checkInDate)"
                                >
                                  <v-spacer></v-spacer>
                                </v-date-picker>
                              </v-menu>
                            </v-flex>
                            <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pr-1>
                              <v-select
                                v-model="checkInTime"
                                :items="getAvailableTimes(checkInDate)"
                                label="Checkin time"
                                hide-details
                                outlined
                                flat
                                dense
                                class="font2a"
                                @change="clearCheckOutTime"
                              ></v-select>
                              <v-layout wrap>
                                
                  
                              <v-flex
                                v-if="
                                  location === '656726678831e05bfd738ece' ||
                                  location === '656726558831e05bfd738ec8'
                                "
                                xs12
                                pt-2
                              >
                                <v-flex
                                  style="
                                    font-family: 'LexendRegular';
                                    font-size: 14px;
                                    color: black;
                                    line-height: 1;
                                  "
                                >
                                  <span>Note:&nbsp;Minimum hours is 2</span>
                                </v-flex>
                              </v-flex>
                  
                            </v-layout>
                            </v-flex>
                  
                            <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pr-1>
                              <v-select
                                v-model="checkOutTime"
                                :items="getAvailableTimes(checkInDate, checkInTime)"
                                label="Checkout time"
                                hide-details
                                outlined
                                flat
                                dense
                                class="font2a"
                              ></v-select>
                            </v-flex>
                          </v-layout>
                          </v-flex>
                          <v-flex xs11 py-2>
                            <v-layout wrap justify-center>
                              <v-flex xs11 sm6 md2>
                                <v-btn block color="rgba(255, 98, 0, 1)">
                                  <span
                                    style="
                                      font-weight: 500;
                                      color: white;
                                      font-size: 18px;
                                      font-family: LexendRegular;
                                      text-transform: none;
                                    "
                                    @click="validation2()"
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
                                <span
                                  style="
                                    font-family: LexendFont;
                                    color: black;
                                    font-size: 18px;
                                    font-weight: 400;
                                  "
                                  >No.of Adults</span
                                ><span style="color: red">*</span>
                                <span style="color: #626262; font-size: 10px">
                                  Above 5 year child count added to adult count
                                </span>
                              </v-flex>
                              <v-flex xs5>
                                <span>
                                  <v-text-field
                                    class="font2a"
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
                                    font-family: LexendFont;
                                    color: black;
                                    font-size: 18px;
                                    font-weight: 400;
                                  "
                                  >No.of Childrens</span
                                >
                                <span>
                                  <span style="color: red">*</span>
                                  <span style="color: #626262; font-size: 10px">
                                    Ages above 5 years
                                  </span>
                                </span>
                              </v-flex>
                              <v-flex xs5 pt-3>
                                <span>
                                  <v-text-field
                                    class="font2a"
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
                                          font-family: LexendFont;
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
                      </v-tab-item>
                    </v-tabs>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-img>
      </v-flex>

      <!------------------------------------CONTENT------------------------------------------>
      <v-flex
        xs12
        v-if="flag == true && searchtype == 'houseboat'"
        pa-1
        style="background-color: #f9f9f9"
      >
        <viewhouseboat
          v-if="searchtype == 'houseboat'"
          :housedata="housedata"
          :Datalength="Datalength"
          :filterType="filterType"
          @stepper="winStepper"
        />
      </v-flex>
      <v-flex
        xs12
        pa-1
        style="background-color: #f9f9f9"
        v-if="flag == true && searchtype == 'shikara'"
      >
        <ViewShikara
          v-if="searchtype == 'shikara'"
          :shikaradata="shikaradata"
          :Datalength1="Datalength1"
        />
      </v-flex>
      <!-- <v-flex xs12 pa-1 style="background-color: #f9f9f9">
        <router-view :key="$route.fullPath"></router-view>
      </v-flex> -->
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
// import store from "./../store";
// import VueTimepicker from 'vue2-timepicker'
// import 'vue2-timepicker/dist/VueTimepicker.css'
import viewhouseboat from "./../views/Home/ViewHouseboat.vue";
import ViewShikara from "./../views/Home/ViewShikara.vue";
export default {
  components: {
    // VueTimepicker,
    viewhouseboat,
    ViewShikara,
  },
  data() {
    return {
      appLoading: false,
      ServerError: false,
      page: 1,
      showSnackbar: false,
      timeout: 5000,
      msg: null,
      Pagelength: 0,
      myTab: parseInt(localStorage.getItem("myTab")),
      tabType: "",
      //HOUSEBOAT
      Hcategory: localStorage.getItem("Hcategory"),
      Htype: localStorage.getItem("Htype"),
      Hlocation: localStorage.getItem("Hlocation"),
      Hroom: localStorage.getItem("Hroom"),
      Hadult: localStorage.getItem("Hadult"),
      Hchildren: localStorage.getItem("Hchildren"),
      Htriptype: localStorage.getItem("Htriptype"),
      HcheckInDate: localStorage.getItem("HcheckInDate"),
      HcheckOutDate: localStorage.getItem("HcheckOutDate"),
      HmenuCheckInVisible: false,
      HmenuCheckOutVisible: false,
      HmenuCheckIn: false,
      HmenuCheckOut: false,
      // boatData:[],
      housedata: [],
      shikaradata: [],
      Hguest: false,
      Hchildrens: [
        { id: 1, name: " 1" },
        { id: 2, name: " 2" },
        { id: 3, name: " 3" },
      ],
      Hadults: [
        { id: 1, name: " 1" },
        { id: 2, name: " 2" },
        { id: 3, name: " 3" },
      ],
      //SHIKARA
      location: localStorage.getItem("location"),
      adult: localStorage.getItem("adult"),
      children: localStorage.getItem("children"),
      checkInDate: localStorage.getItem("checkInDate"),
      checkInTime: localStorage.getItem("checkInTime"),
      checkOutTime: localStorage.getItem("checkOutTime"),
      menuCheckIn1: false,
      checkInDate1: null,
      checkInMenuVisible1: false,
      checkInTime1: "",
      checkOutMenuVisible1: false,
      checkOutTime1: "",
      // type: "",
      searchtype: "",
      // location: "",
      menuCheckIn2: false,
      checkInDate2: null,
      checkInMenuVisible2: false,
      checkInTime2: "",
      checkOutMenuVisible2: false,
      checkOutTime2: "",
      // checkInDate: null,
      checkInMenuVisible: false,
      checkOutMenuVisible: false,
      // checkInTime: "",
      // checkOutTime: "",
      locationList: [],
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
        { name: 'DayCruise', displayText: 'DayCruise (11 am - 5 pm)' },
        { name: 'OverNight', displayText: 'OverNight (12 pm - 9 am)' },
        { name: 'NightStay', displayText: 'NightStay (5.30 pm - 9 am)' },
      ],
      nowDate: new Date().toISOString().slice(0, 10),
      triptype: "",
      checkOutDate: null,
      menuCheckIn: false,
      menuCheckOut: false,
      // adult: null,
      // children: "",
      date: null,
      menuCheckInVisiblem: false,
      checkInDatem: null,
      checkInMenuVisiblem: false,
      checkInTimem: "",
      checkOutMenuVisiblem: false,
      checkOutTimem: "",
      guest: false,
      flag: false,
      flag1: false,
      Datalength: 0,
      Datalength1: 0,
      filterType: false,
      page1: 1,
      selectedTime: "",
      defaultTimeRange: { start: "06:00", end: "17:00" },
      currentHour: new Date().getHours(),
      currentMinute: new Date().getMinutes(),
      availableTimes: [],
    };
  },
  watch: {
    checkInDate() {
      // Clear checkInTime and checkOutTime when checkInDate changes
      this.checkInTime = null;
      this.checkOutTime = null;
    },
  },

  mounted() {
    this.myTab = parseInt(localStorage.getItem("myTab"));
    console.log("this.myTab1=", this.myTab);
    this.flag = false;
    this.getData();
    var typee = this.$route.query.type;
    console.log("typee==", typee);
    if (typee == "houseboat") {
      this.searchtype = typee;
      this.getHouseboat();
    }
    if (typee == "shikara") {
      this.searchtype = typee;
      this.getShikara();
    }
  },
  methods: {
    clearCheckOutTime() {
      if (this.checkOutTime && this.checkOutTime < this.checkInTime) {
        
        this.checkOutTime = null;
      }
    },
    getAvailableTimes(date) {
      const isToday = date === this.nowDate;
      const currentHour = new Date().getHours();
      const maxHour = 17; 
      const availableTimes = [];

      const startHour = isToday ? currentHour : 6;

      for (let hour = startHour; hour <= maxHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const formattedHour = hour < 10 ? `0${hour}` : hour;
          const formattedMinute = minute === 0 ? '00' : minute;
          availableTimes.push(`${formattedHour}:${formattedMinute}`);
        }
      }

      return availableTimes;
    },
    apply1() {
      if (this.Hadult) {
        this.Hguest = false;
      } else {
        this.msg = "Please choose number of adults";
        this.showSnackbar = true;
      }
    },
    apply() {
      this.guest = false;
    },
    searchProduct1() {
      this.flag = false;
      localStorage.setItem("Hcategory", this.Hcategory);
      localStorage.setItem("Htype", this.Htype);
      localStorage.setItem("Hlocation", this.Hlocation);
      localStorage.setItem("Hroom", this.Hroom);
      localStorage.setItem("Htriptype", this.Htriptype);
      localStorage.setItem("HcheckInDate", this.HcheckInDate);
      localStorage.setItem("HcheckOutDate", this.HcheckOutDate);
      localStorage.setItem("Hchildren", this.Hchildren);
      if (this.Hchildren === null) {
        this.Hchildren = 0;
}
      localStorage.setItem("Hadult", this.Hadult);
      localStorage.setItem("myTab", this.myTab);
      this.searchtype = "houseboat";
      this.getHouseboat();
    },
    searchProduct2() {
      this.flag = false;
      localStorage.setItem("checkInDate", this.checkInDate);
      localStorage.setItem("checkInTime", this.checkInTime);
      localStorage.setItem("checkOutTime", this.checkOutTime);
      localStorage.setItem("location", this.location);
      localStorage.setItem("children", this.children);
      if (this.children === null) {
        this.children = 0;
}
      localStorage.setItem("adult", this.adult);
      localStorage.setItem("myTab", this.myTab);
      localStorage.setItem("tabType", "shikara");
      this.searchtype = "shikara";
      this.getShikara();

      // this.$router.push("/ViewShikara");
    },
    winStepper(window_data) {
      if (window_data.ref == "pagecount") {
        this.page1 = window_data.page;
        console.log("single houseboat page is", this.page1);
        this.getHouseboat();
      }
    },
    getHouseboat() {
      this.appLoading = true;
      // var data = {
      //      productId: item,
      //     quantity: 1,
      // };
      // if (this.appLogin) {
      //   headers1 = {
      //   "token": localStorage.getItem("token"),
      //   };
      // } else data["guestid"] = localStorage.getItem("guestId");
      axios({
        method: "POST",
        url: "/houseboat/booking/filter",
        data: {
          category: localStorage.getItem("Hcategory"),
          houseBoatType: localStorage.getItem("Htype"),
          location: localStorage.getItem("Hlocation"),
          numberofRooms: localStorage.getItem("Hroom"),
          children: localStorage.getItem("Hchildren"),
          adult: localStorage.getItem("Hadult"),
          tripType: localStorage.getItem("Htriptype"),
          checkInDate: localStorage.getItem("HcheckInDate"),
          checkOutDate: localStorage.getItem("HcheckOutDate"),
          page: this.page1,
          limit: 20,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.housedata = response.data.data;
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
    convertToTimestamp(dateString) {
      const date = new Date(dateString);
      return date.getTime();
    },
    combineDateTime(dateString, timeString) {
      const formattedDate = `${dateString}T${timeString}:00`;
      return formattedDate;
    },
    getShikara() {
      this.appLoading = true;
      var time1 = localStorage.getItem("checkInTime");
      var time2 = localStorage.getItem("checkOutTime");
      var time3 = localStorage.getItem("checkInDate");
      axios({
        url: "/filter/available/shikaras",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          page: this.page,
          limit: 50,

          location: localStorage.getItem("location"),
          childrenCount: localStorage.getItem("children"),
          memberCount: localStorage.getItem("adult"),
          selectedDate: localStorage.getItem("checkInDate"),
          startTime: this.combineDateTime(time3, time1),
          endTime: this.combineDateTime(time3, time2),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.shikaradata = response.data.data;
            this.Datalength1 == response.data.totalLength;
            console.log("Datalength1=", this.Datalength1);
            this.Pagelength = Math.ceil(response.data.totalLength / this.limit);
            this.flag = true;
          } else {
            this.msg = response.data.msg;
            this.showSnackbar = true;
          }
        })
        .catch((err) => {
          //   this.ServerError = true;
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
            this.showSnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
    validation() {
      console.log("qasdfghjk");
      if (!this.Hcategory) {
        this.msg = "Please choose category";
        this.showSnackbar = true;
        return;
      } else if (!this.Htype) {
        this.msg = "Please choose houseboat type";
        this.showSnackbar = true;
        return;
      } else if (!this.Hlocation) {
        this.msg = "Please choose location";
        this.showSnackbar = true;
        return;
      } else if (!this.Hroom) {
        this.msg = "Please enter number of rooms";
        this.showSnackbar = true;
        return;
      } else if (!this.Hadult) {
        this.msg = "Please choose number of guests";
        this.showSnackbar = true;
        return;
      } else if (!this.Htriptype) {
        this.msg = "Please choose trip type";
        this.showSnackbar = true;
        return;
      } else if (!this.HcheckInDate) {
        this.msg = "Please choose check-in date";
        this.showSnackbar = true;
        return;
      } else if (!this.HcheckOutDate) {
        this.msg = "Please choose check out date";
        this.showSnackbar = true;
        return;
      } else {
        localStorage.setItem("Hcategory", this.Hcategory);
        localStorage.setItem("Htype", this.Htype);
        localStorage.setItem("Hlocation", this.Hlocation);
        localStorage.setItem("Hroom", this.Hroom);
        localStorage.setItem("Htriptype", this.Htriptype);
        localStorage.setItem("HcheckInDate", this.HcheckInDate);
        localStorage.setItem("HcheckOutDate", this.HcheckOutDate);
        localStorage.setItem("Hchildren", this.Hchildren);
        localStorage.setItem("Hadult", this.Hadult);
        var curTab = localStorage.getItem("myTab");
        localStorage.setItem("curTab", curTab);

        this.searchProduct1();
      }
    },
    validation2() {
      if (!this.location) {
        this.msg = "Please choose location";
        this.showSnackbar = true;
        return;
      } else if (!this.adult) {
        this.msg = "Please choose number of guests";
        this.showSnackbar = true;
        return;
      } else if (!this.checkInDate) {
        this.msg = "Please choose check-in date";
        this.showSnackbar = true;
        return;
      } else if (!this.checkInTime) {
        this.msg = "Please choose check-in time";
        this.showSnackbar = true;
        return;
      } else if (!this.checkOutTime) {
        this.msg = "Please choose check-out time";
        this.showSnackbar = true;
        return;
      } else {
        localStorage.setItem("checkInDate", this.checkInDate);
        localStorage.setItem("checkInTime", this.checkInTime);
        localStorage.setItem("checkOutTime", this.checkOutTime);
        localStorage.setItem("location", this.location);
        localStorage.setItem("children", this.children);
        localStorage.setItem("adult", this.adult);

        var curTab = localStorage.getItem("myTab");
        localStorage.setItem("curTab", curTab);
        this.searchProduct2();
      }
    },
  },
};
</script>
<style scoped>
  /* Override the overflow property for Vue2Timepicker dropdown */
  .custom-timepicker .timepicker-dropdown {
    overflow: visible !important;
  }
  </style>
  
