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
          src="./../../assets/images/bg5.png"
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
                                pl-4
                                pr-4
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
                                pl-3
                                pr-2
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
                              <v-flex xs12 sm6 md2 pt-2 pr-1>
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
                                md2
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
                                    class="pl-1 pr-2"
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
                                  style="border-color: rgba(255, 98, 0, 1)"
                                  :items="tripTypes"
                                  v-model="Htriptype"
                                  item-text="displayText"
                                  item-value="name"
                                  item-color="rgba(255, 98, 0, 1)"
                                  hide-details="true"
                                  class="font2a"
                                  color="rgba(255, 98, 0, 1)"
                                ></v-autocomplete
                              ></v-flex>
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
                                      label="Date"
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
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="HcheckOutDate"
                                      outlined
                                      readonly
                                      label="Date"
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
                                    :min="nowDate"
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
                                ><span style="color: red">*</span>
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
        sm11
        md11
        lg10
        style="position: relative; margin-top: -4%"
        pb-4
      >
        <v-card outlined color="white" class="py-6 px-2 px-sm-4 px-lg-14">
          <v-layout wrap justify-start v-if="shikaradata">
            <v-flex xs12 sm6 md6 lg6 xl6>
              <v-layout wrap justify-center fill-height>
                <v-flex xs12 v-if="shikaradata" align-self-end>
                  <span
                    v-if="shikaradata.shikaraId"
                    style="
                      font-weight: 500;
                      font-size: 22px;
                      font-family: LexendRegular;
                    "
                  >
                    <span v-if="shikaradata.shikaraId.shikaraName">
                      {{ shikaradata.shikaraId.shikaraName }}
                    </span>
                  </span>
                </v-flex>
                <v-flex xs12 text-left v-if="durationInHours">
                  <span
                    style="
                      font-weight: 500;
                      font-size: 16px;
                      font-family: LexendRegular;
                    "
                  >
                    Duration of journey : {{ durationInHours }} hours</span
                  >
                </v-flex>
                <v-flex xs12 lg12 align-self-end>
                  <v-layout wrap>
                    <v-flex xs1>
                      <v-avatar class="pa-0" size="15px">
                        <v-img
                          contain
                          src="./../../assets/icons/dicon1.png"
                        ></v-img>
                      </v-avatar>
                    </v-flex>
                    <v-flex
                      xs11
                      v-if="
                        shikaradata.shikaraId &&
                        shikaradata.shikaraId.userid &&
                        shikaradata.shikaraId.userid.name
                      "
                    >
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                      >
                        {{ shikaradata.shikaraId.userid.name }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 lg12 align-self-end>
                  <v-layout wrap>
                    <v-flex xs1>
                      <v-avatar class="pa-0" size="15px">
                        <v-img
                          contain
                          src="./../../assets/icons/dicon2.png"
                        ></v-img>
                      </v-avatar>
                    </v-flex>
                    <v-flex
                      xs11
                      v-if="
                        shikaradata.shikaraId &&
                        shikaradata.shikaraId.location &&
                        shikaradata.shikaraId.location.name
                      "
                    >
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                      >
                        {{ shikaradata.shikaraId.location.name }}

                        <!-- {{ list.shikaraId.vendorid.userid.district }} -->
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex
              class="hidden-sm-and-down"
              xs12
              sm6
              md6
              lg6
              xl6
              pt-6
              pt-lg-0
            >
              <v-layout wrap justify-center>
                <v-flex xs12 text-right>
                  <span
                    style="
                      font-weight: 500;
                      font-size: 28px;
                      font-family: LexendRegular;
                    "
                    >₹ {{ customerRate }}</span
                  >
                </v-flex>

                <v-flex xs12 text-right>
                  <v-layout justify-end pt-2>
                    <v-flex xs2 lg3>
                      <v-btn class="px-0" text @click.stop="shareDialog = true"
                        ><span
                          ><v-icon small>mdi-share-outline</v-icon>Share</span
                        ></v-btn
                      >
                      <v-btn
                        class="px-1"
                        @click="bookNow()"
                        block
                        color="#FF6200"
                      >
                        <span
                          style="
                            font-weight: 500;
                            font-size: 12px;
                            text-transform: none;
                            font-family: LexendRegular;
                            color: white;
                          "
                          >Book Now</span
                        >
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs12>
              <v-rating
                :length="5"
                :size="18"
                v-model="shikaradata.rating"
                active-color="#ff6200"
                color="#ff6200"
                background-color="#ff6200"
              />
            </v-flex>

            <v-flex class="hidden-md-and-up" xs12 lg6 pt-6 pt-lg-0>
              <v-layout wrap justify-center>
                <v-flex xs12 text-left>
                  <span
                    style="
                      font-weight: 500;
                      font-size: 28px;
                      font-family: LexendRegular;
                    "
                    >₹ {{ customerRate }}</span
                  >
                </v-flex>

                <v-flex xs12 text-left>
                  <v-layout justify-center pt-2>
                    <v-flex xs12>
                      <v-btn class="px-0" text @click.stop="shareDialog = true"
                        ><span
                          ><v-icon small>mdi-share-outline</v-icon>Share</span
                        ></v-btn
                      >
                      <v-btn
                        class="px-1"
                        @click="bookNow()"
                        block
                        color="#FF6200"
                      >
                        <span
                          style="
                            font-weight: 500;
                            font-size: 12px;
                            text-transform: none;
                            font-family: LexendRegular;
                            color: white;
                          "
                          >Book Now</span
                        >
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center pt-4>
            <v-flex xs12 v-if="shikaradata.shikaraId"
              ><v-card elevation="0" v-if="shikaradata.shikaraId.coverImage">
                <v-img
                  height="300px"
                  :src="mediaUURL + shikaradata.shikaraId.coverImage"
                >
                  <template v-slot:placeholder>
                    <ImageLoader />
                  </template>
                </v-img> </v-card
            ></v-flex>
            <v-flex xs12>
              <v-layout wrap mt-2 v-if="FacilitiesData">
                <v-flex
                  xs12
                  px-0
                  px-md-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 22px;
                  "
                  >Facilities</v-flex
                >
                <v-flex xs12 px-0 px-md-2 v-if="Isfacility == false"
                  ><span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No facilities added</span
                  ></v-flex
                >
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.airCondition == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/ac.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Air condition</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.wifi == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/wifi.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Wifi</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.television == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/tv.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Smart TV</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.lifeJacket == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/lifejacket.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Life Jacket</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.parking == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/parking.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Parking</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.restrooms == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/restroom.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Restroom</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <!-- <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.television == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/parking.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Parking</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex> -->
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.toilet == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/restroom.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Toilet</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.towels == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/towel.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Towels</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <!-- <v-flex
                  xs12
                  sm3
                  py-3
                  pr-2
                  text-left
                  v-if="FacilitiesData.powerbackup == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/battery.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Power backup</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex> -->
              </v-layout>
              <v-layout wrap v-if="tripDetails">
                <v-flex
                  xs12
                  px-0
                  px-md-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 22px;
                  "
                  >Details</v-flex
                >
                <v-flex
                  xs12
                  sm2
                  md3
                  align-self-center
                  text-left
                  px-2
                  v-if="shikaradata.shikaraId"
                >
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                    "
                    >Pickup/Drop Location :</span
                  ><br />
                  <span
                    v-if="shikaradata.shikaraId.startingLocation"
                    style="
                      font-family: LexendFont;
                      font-weight: 300;
                      font-size: 16px;
                      color: black;
                    "
                  >
                    {{ shikaradata.shikaraId.startingLocation.name }}</span
                  >
                  <span v-else>-</span>
                </v-flex>
                <v-flex xs12 sm3 md2 align-self-center text-left px-2>
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                    "
                    >Max.capacity : </span
                  ><br />
                  <span
                    v-if="tripDetails.maxCapacityOfBoat"
                    style="
                      color: black;
                      font-family: LexendFont;
                      font-weight: 300;
                      font-size: 16px;
                    "
                  >
                    {{ tripDetails.maxCapacityOfBoat }}</span
                  >
                  <span v-else>-</span>
                </v-flex>
                <v-flex xs12 sm3 md2 align-self-center text-left px-2>
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                    "
                    >Min.capacity : </span
                  ><br />
                  <span
                    v-if="tripDetails.minCapacityOfBoat"
                    style="
                      color: black;
                      font-family: LexendFont;
                      font-weight: 300;
                      font-size: 16px;
                    "
                  >
                    {{ tripDetails.minCapacityOfBoat }}</span
                  >
                  <span v-else>-</span>
                </v-flex>
                <v-flex xs12 sm2 align-self-center text-left px-2>
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                    "
                    >Min hours :</span
                  ><br />
                  <span
                    v-if="tripDetails.minimumHour"
                    style="
                      color: black;
                      font-family: LexendFont;
                      font-weight: 300;
                      font-size: 16px;
                    "
                  >
                    {{ tripDetails.minimumHour }}</span
                  >
                  <span v-else>-</span>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 pt-4 px-2 v-if="shikaradata">
              <v-layout wrap>
                <v-flex xs12>
                  <span
                    style="
                      font-weight: 400;
                      font-size: 18px;
                      font-family: LexendRegular;
                    "
                    >Rules</span
                  >
                </v-flex>
              </v-layout>
              <v-layout
                wrap
                justify-center
                v-if="shikaradata.shikaraId.addionalRules != ''"
              >
                <v-flex xs12 lg12 pl-1>
                  <span
                    class="LexendRegular"
                    style="font-size: 14px; font-family: LexendFont"
                  >
                    {{ shikaradata.shikaraId.addionalRules }}</span
                  >
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center v-else>
                <v-flex xs12 lg12 pl-1> - </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout wrap>
                <v-flex
                  xs12
                  px-0
                  px-md-2
                  pt-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 22px;
                  "
                  >Photos</v-flex
                >
                <v-flex px-0 px-md-2 xs12 sm12 v-if="OtherImgs">
                  <viewer :images="OtherImgs" :key="OtherImgs.length">
                    <v-layout
                      wrap
                      justify-center
                      justify-sm-start
                      v-if="OtherImgs.length > 0"
                    >
                      <v-flex
                        xs12
                        sm4
                        md3
                        text-center
                        text-sm-left
                        v-for="(item, i) in OtherImgs"
                        :key="i"
                        class="pa-1"
                      >
                        <img
                          :src="mediaUURL + item"
                          style="object-fit: cover"
                          height="200px"
                          width="200px"
                        />
                      </v-flex>
                      <v-flex
                        @click="
                          $router.push('/ImageGallery?id=' + $route.query.id)
                        "
                        xs12
                        v-if="moreimg == true"
                        class="mr-2"
                        align-self-center
                        text-center
                      >
                        <span
                          style="
                            font-family: LexendFont;
                            font-weight: 500;
                            font-size: 15px;
                            color: rgb(170, 170, 170);
                            cursor: pointer;
                          "
                          >View More</span
                        ></v-flex
                      >
                    </v-layout>

                    <v-layout wrap v-else>
                      <v-flex xs12>
                        <span
                          style="
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >No images found</span
                        >
                      </v-flex>
                    </v-layout>
                  </viewer>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs12>
              <v-layout wrap>
                <v-flex xs12 pb-lg-4>
                  <span
                    style="
                      font-weight: 400;
                      font-size: 18px;
                      font-family: LexendRegular;
                    "
                    >Reviews</span
                  ></v-flex
                >
                <v-flex xs12 lg4 v-for="(item, i) in review" :key="i">
                  <v-layout wrap justify-center>
                    <v-flex xs11>
                      <v-card
                        height="260px"
                        style="border-radius: 15px; background-color: #fafafa"
                      >
                        <v-layout wrap justify-center>
                          <v-flex
                            xs9
                            pt-3
                            style="
                              font-weight: 400;
                              font-size: 18px;
                              font-family: LexendRegular;
                            "
                          >
                            {{ item.user.name }}
                          </v-flex>

                          <v-flex xs10 pl-lg-1 pt-3>
                            <v-rating
                              :length="5"
                              :size="18"
                              v-model="item.rating"
                              active-color="#ff6200"
                              color="#ff6200"
                              background-color="#ff6200"
                            />
                          </v-flex>

                          <v-flex xs9 pt-3 style="text-align: justify">
                            <span
                              style="
                                font-weight: 400;
                                font-size: 15px;
                                font-family: LexendRegular;
                              "
                            >
                              {{ item.comment }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 pt-lg-3 v-if="review.length === 0" text-center>
                  <span
                    style="
                      font-weight: 400;
                      font-size: 18px;
                      font-family: LexendRegular;
                    "
                    >No reviews found!</span
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-dialog
            v-model="shareDialog"
            :width="
              $vuetify.breakpoint.name == 'xs'
                ? '100vw'
                : $vuetify.breakpoint.name == 'sm'
                ? '50vw'
                : $vuetify.breakpoint.name == 'md'
                ? '40vw'
                : $vuetify.breakpoint.name == 'lg'
                ? '40vw'
                : '20vw'
            "
          >
            <v-card>
              <v-layout wrap justify-center pa-4 v-if="shikaradata">
                <v-flex xs12 pt-2 text-center align-self-start>
                  <span style="font-family: poppinsbold; font-size: 24px"
                    >Share Via</span
                  >
                </v-flex>
                <v-flex
                  xs4
                  sm2
                  align-self-baseline
                  text-left
                  py-4
                  v-for="(item, i) in socialMedias"
                  :key="i"
                >
                  <ShareNetwork
                    v-if="shikaradata.shikaraId"
                    :network="item.network"
                    :url="'http://accessrooms.com' + $route.fullPath"
                    :title="shikaradata.shikaraId.shikaraName"
                    :media="mediaUURL + shikaradata.shikaraId.coverImage"
                  >
                    <v-img
                      :width="item.size"
                      :src="getImgUrl(item.image)"
                    ></v-img>
                  </ShareNetwork>
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
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
Vue.use(VueViewer);
export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackbar: false,
      timeout: 5000,
      msg: null,
      Pagelength: 0,
      myTab: null,
      tabType: "",
      shareDialog: false,
      FacilitiesData: [],
      tripDetails: {},
      socialMedias: [
        {
          network: "whatsapp",
          title: "Whatsapp",
          icon: "mdi-whatsapp",
          image: "whatsapp.jpg",
          size: "55px",
        },
        {
          network: "facebook",
          title: " Facebook",
          icon: "mdi-facebook",
          image: "fb.png",
          size: "50px",
        },
        {
          network: "email",
          title: "Gmail ",
          icon: "mdi-email",
          image: "gmail.png",
          size: "58px",
        },
      ],
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
      shikaradata: "",
      OtherImgs: [],
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
      searchtype: "",
      menuCheckIn2: false,
      checkInDate2: null,
      checkInMenuVisible2: false,
      checkInTime2: "",
      checkOutMenuVisible2: false,
      checkOutTime2: "",
      checkInMenuVisible: false,
      checkOutMenuVisible: false,
      locationList: [],
      nowDate: new Date().toISOString().slice(0, 10),
      triptype: "",
      checkOutDate: null,
      Isfacility: false,
      customerRate: "",
      customerRateCommission: "",
      menuCheckIn: false,
      menuCheckOut: false,
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
      review: [],
      moreimg: false,
      durationInHours: "",
      availableTimes: [],
      tripTypes: [
        { name: "DayCruise", displayText: "DayCruise (11 am - 5 pm)" },
        { name: "OverNight", displayText: "OverNight (12 pm - 9 am)" },
        { name: "NightStay", displayText: "NightStay (5.30 pm - 9 am)" },
      ],
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
    this.flag = false;
    this.getData();
    this.getshikara();
  },
  computed: {
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
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
          const formattedMinute = minute === 0 ? "00" : minute;
          availableTimes.push(`${formattedHour}:${formattedMinute}`);
        }
      }

      return availableTimes;
    },
    getImgUrl(pic) {
      return require("./../../assets/social/" + pic);
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
      if (this.adult) {
        this.guest = false;
      } else {
        this.msg = "Please choose number of adults";
        this.showSnackbar = true;
      }
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
      localStorage.setItem("Hadult", this.Hadult);
      localStorage.setItem("myTab", this.myTab);
      this.$router.push("/SearchBoats?type=" + "houseboat");
    },
    searchProduct2() {
      this.flag = false;
      localStorage.setItem("checkInDate", this.checkInDate);
      localStorage.setItem("checkInTime", this.checkInTime);
      localStorage.setItem("checkOutTime", this.checkOutTime);
      localStorage.setItem("location", this.location);
      localStorage.setItem("children", this.children);
      localStorage.setItem("adult", this.adult);
      localStorage.setItem("myTab", this.myTab);
      localStorage.setItem("tabType", "shikara");
      this.$router.push("/SearchBoats?type=" + "houseboat");
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
    convertToTimestamp(dateString) {
      const date = new Date(dateString);
      return date.getTime();
    },
    combineDateTime(dateString, timeString) {
      const formattedDate = `${dateString}T${timeString}:00`;
      return formattedDate;
    },
    getshikara() {
      this.appLoading = true;
      var time1 = this.$route.query.checkInTime;
      var time2 = this.$route.query.checkOutTime;
      var time3 = this.$route.query.checkInDate;
      axios({
        method: "POST",
        url: "/view/shikara",
        data: {
          shikaraid: this.$route.query.id,
          location: this.$route.query.location,
          childrenCount: this.$route.query.children,
          memberCount: this.$route.query.adult,
          selectedDate: this.$route.query.checkInDate,
          startTime: this.combineDateTime(time3, time1),
          endTime: this.combineDateTime(time3, time2),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.review = response.data.reviews;

            this.durationInHours = response.data.durationInHours;
            this.shikaradata = response.data.data;
            this.tripDetails = response.data.tripDetails;
            this.FacilitiesData = this.shikaradata.shikaraId.facilities;
            if (this.FacilitiesData) {
              this.Isfacility = true;
            } else {
              this.Isfacility = false;
            }
            this.customerRate = response.data.customerRate;
            this.customerRateCommission = response.data.customerRateCommission;
            this.OtherImgs = this.shikaradata.shikaraId.propertyImages;

            if (this.OtherImgs && this.OtherImgs.length > 4) {
              this.OtherImgs = this.OtherImgs.slice(0, 4);
              this.moreimg = true;
            }
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
      console.log("qwerty");
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
    bookNow() {
      this.appLoading = true;
      var headers1 = {};
      var time1 = localStorage.getItem("checkInTime");
      var time2 = localStorage.getItem("checkOutTime");
      var time3 = localStorage.getItem("checkInDate");
      var child = localStorage.getItem("children");
      if (child == null || child == "null" || child == "") {
        child = 0;
      }
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
      } else
        headers1 = {
          guestid: localStorage.getItem("guestId"),
        };
      axios({
        method: "Post",
        url: "/shikara/customer/booking",
        headers: headers1,
        data: {
          bookedbyid: localStorage.getItem("guestId"),
          shikaraid: this.$route.query.id,
          shikaraName: this.shikaradata.shikaraId.shikaraName,
          location: localStorage.getItem("location"),
          childrenCount: child,
          memberCount: localStorage.getItem("adult"),
          selectedDate: localStorage.getItem("checkInDate"),
          // startTime:localStorage.getItem("checkInTime"),
          // endTime:localStorage.getItem("checkOutTime"),
          startTime: this.combineDateTime(time3, time1),
          endTime: this.combineDateTime(time3, time2),
          amount: this.customerRate,
          customerRateCommission: this.customerRateCommission,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.msg = response.data.msg;
            this.showsnackbar = true;
            var curId = response.data.data._id;
            this.$router.push(
              "/BookShikara?id=" + curId + "&&rate=" + this.customerRate
            );
            // @click="$router.push('/BookShikara?id='+shikaradata._id + '&&rate=' + customerRate)"
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
