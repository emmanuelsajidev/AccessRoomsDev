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
    <v-layout wrap justify-center>
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
            <v-flex xs11 sm11 lg10 align-self-start pt-8>
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
                                  dense
                                  color="black"
                                  :items="locationList"
                                  v-model="location"
                                  label="Location"
                                  item-text="name"
                                  item-value="_id"
                                  item-color="#FF1313"
                                  hide-details="true"
                                ></v-autocomplete>
                              </v-flex>
                              <v-flex
                                xs12
                                sm6
                                md2
                                pt-2
                                pr-1
                                @click="guest = true"
                              >
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
                                    >{{ adult
                                    }}<v-icon>mdi-human-male</v-icon></span
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
                                    >{{ children
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
                              <v-flex xs12 sm6 md3 pt-2 pr-1 align-self-center>
                                <v-menu
                                  ref="menuCheckIn"
                                  v-model="menuCheckIn"
                                  :close-on-content-click="false"
                                  :return-value.sync="checkInDate"
                                  transition="scale-transition"
                                  offset-y
                                  
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="checkInDate"
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
                                    v-model="checkInDate"
                                    no-title
                                    :min="nowDate"
                                    scrollable
                                    @change="
                                      $refs.menuCheckIn.save(checkInDate)
                                    "
                                  >
                                    <v-spacer></v-spacer>
                                  </v-date-picker>
                                </v-menu>
                              </v-flex>
                              <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pr-1>
                                <v-select
                                  v-model="checkInTime"
                                  :items="getAvailableTimes(checkInDate)"
                                  label="CheckIn Time"
                                  hide-details
                                  outlined
                                  flat
                                  dense
                                  class="font2a"
                                  @change="clearCheckOutTime"
                                ></v-select>
                              </v-flex>
                              
                              <v-flex xs12 sm6 md2 lg2 xl2 pt-2 pr-1>
                                <v-select
                                  v-model="checkOutTime"
                                  :items="getAvailableTimes(checkInDate, checkInTime)"
                                  label="Checkout Time"
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
    </v-layout>
    <v-layout wrap justify-center style="background-color: rgb(248, 248, 248)">
      <v-flex xs12 sm11 md10 pb-4 style="position: relative; margin-top: -5%">
        <v-card outlined color="white" class="py-2 px-2 px-sm-4 px-md-10">
          <v-layout wrap justify-start>
            <v-flex xs12 sm6 md6 lg6 xl6>
              <v-layout wrap justify-center fill-height>
                <v-flex xs12 v-if="list" align-self-end>
                  <span
                    v-if="list"
                    style="
                      font-weight: 500;
                      font-size: 22px;
                      font-family: LexendRegular;
                    "
                  >
                    <span v-if="list.houseBoatName">
                      {{ list.houseBoatName }}
                    </span>
                  </span>
                </v-flex>
                <v-flex xs12 text-left pt-1>
                  <span
                    style="
                      font-weight: 500;
                      font-size: 16px;
                      font-family: LexendRegular;
                    "
                  >
                    Total No. of Rooms : {{ list.totalRooms }}</span
                  >
                </v-flex>

                <v-flex xs12 lg12 align-self-end pt-1>
                  <v-layout wrap>
                    <v-flex xs1>
                      <v-avatar class="pa-0" size="20px">
                        <v-img
                          contain
                          src="./../../assets/icons/dicon1.png"
                        ></v-img>
                      </v-avatar>
                    </v-flex>
                    <v-flex
                      xs11
                      v-if="list && list.userid && list.userid.name"
                    >
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                      >
                        {{ list.userid.name }}
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
                    <v-flex xs11 v-if="list && list.location">
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                      >
                        {{ list.location.name }}
                      </span>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex
              align-self-end
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
                  <v-layout justify-end pt-2 px-1>
                     
                    <v-flex xs2 lg3>
                      <v-btn class="px-0" text @click.stop="shareDialog = true"
                      ><span
                        ><v-icon small>mdi-share-outline</v-icon>Share</span
                      ></v-btn
                    >
                      <v-btn class="px-1" @click="bookNow()" block color="#FF6200">
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
v-model="list.rating"
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
                <v-flex xs12 sm4 px-1>
                  <v-btn class="px-0" text @click.stop="shareDialog = true"
                    ><span
                      ><v-icon small>mdi-share-outline</v-icon>Share</span
                    ></v-btn
                  >
                </v-flex>

                <v-flex xs12 text-left>
                  <v-layout justify-center pt-2>
                    <v-flex xs12>
                      <v-btn @click="bookNow()" block color="#FF6200">
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
          <v-layout wrap justify-center pt-2>
            <v-flex xs12
              ><v-card elevation="0">
                <v-img
                  cover
                  height="400px"
                  v-if="HouseboatDetail.coverImage"
                  :src="mediaUURL + HouseboatDetail.coverImage"
                  ><template v-slot:placeholder> <ImageLoader /> </template
                ></v-img>
                <v-img
                  v-else
                  height="300px"
                  src="./../../assets/images/noimg.png"
                >
                  <template v-slot:placeholder>
                    <ImageLoader />
                  </template>
                </v-img> </v-card
            ></v-flex>
          </v-layout>
          <v-layout wrap justify-center pt-4>
            <v-flex xs12>
              <v-card elevation="0" outlined class="px-4 py-2">
                <v-layout wrap>
                  <v-flex
                    xs12
                    sm1
                    md2
                    lg1
                    align-self-center
                    text-left
                    v-if="HouseboatDetail"
                  >
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >CATEGORY </span
                    >
                    <br />
                    <span
                      v-if="HouseboatDetail.category"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                    >
                      {{ HouseboatDetail.category }}</span
                    >
                    <span v-else>-</span>
                  </v-flex>
                  <v-flex xs12 sm2 md2 lg2 align-self-center text-left>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >HOUSEBOAT TYPE </span
                    >
                    <br />
                    <span
                    v-for="(item, i) in HouseboatDetail.tripDetails.houseBoatType"
                        :key="i"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                      >{{ item }},</span
                    >
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    md2
                    lg2
                    align-self-center
                    text-left
                    v-if="TripDetail"
                  >
                    <!-- <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >MAX PERSONS</span
                    >
                    <br /> -->
                    <!-- <span
                      v-if="TripDetail.maxCapacityOfBoat"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                      >{{ TripDetail.maxCapacityOfBoat }}</span
                    > -->
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >NO.OF ROOMS</span
                    >
                    <br />
                    <span
                      v-if="TripDetail.maxCapacityOfBoat"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                      >{{ HouseboatDetail.totalRooms }}</span
                    >
                  </v-flex>
                  <v-flex
                    xs12
                    sm3
                    md2
                    lg3
                    align-self-center
                    text-left
                    v-if="TripDetail"
                  >
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >TRIP TYPE</span
                    >
                    <br />
                    <span
                      v-if="TripDetail.tripType"
                      style="
                        font-family: LexendFont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                      >{{ TripDetail.tripType }}</span
                    >
                  </v-flex>
                  <v-flex xs12 sm4 align-self-center text-right>
                    <v-layout wrap>
                      <v-flex xs12 v-if="HouseboatDetail.userid">
                        <span
                          style="
                            font-size: 16px;
                            font-weight: 300;
                            font-family: LexendFont;
                          "
                          v-if="HouseboatDetail.userid.name"
                        >
                          <v-icon small>mdi-account-outline</v-icon
                          >{{ HouseboatDetail.userid.name }}</span
                        ></v-flex
                      >
                      <v-flex xs12 v-if="HouseboatDetail.userid">
                        <span
                          style="
                            font-size: 16px;
                            font-weight: 300;
                            font-family: LexendFont;
                          "
                          v-if="HouseboatDetail.userid.locality"
                        >
                          <v-icon small>mdi-map-marker-outline</v-icon
                          >{{ HouseboatDetail.userid.locality }},</span
                        >
                        <span
                          style="
                            font-size: 16px;
                            font-weight: 300;
                            font-family: LexendFont;
                          "
                          v-if="HouseboatDetail.userid.district"
                          >{{ HouseboatDetail.userid.district }},</span
                        >
                        <span
                          style="
                            font-size: 16px;
                            font-weight: 300;
                            font-family: LexendFont;
                          "
                          v-if="HouseboatDetail.userid.state"
                          >{{ HouseboatDetail.userid.state }},</span
                        >
                        <span
                          style="
                            font-size: 16px;
                            font-weight: 300;
                            font-family: LexendFont;
                          "
                          v-if="HouseboatDetail.userid.country"
                          >{{ HouseboatDetail.userid.country }}</span
                        >
                      </v-flex>
                      <!-- <v-flex xs12 v-if="HouseboatDetail.userid">
                        <span
                          style="
                            font-size: 16px;
                            font-weight: 300;
                            font-family: LexendFont;
                          "
                          v-if="HouseboatDetail.userid.phoneNumber"
                        >
                          <v-icon small>mdi-phone-outline</v-icon
                          >{{
                            HouseboatDetail.userid.whatsappCountryCode
                          }}
                          {{ HouseboatDetail.userid.phoneNumber }},</span
                        >
                        <span
                          style="
                            font-size: 16px;
                            font-weight: 300;
                            font-family: LexendFont;
                          "
                          v-if="HouseboatDetail.userid.whatsappNumber"
                        >
                          {{ HouseboatDetail.userid.whatsappCountryCode }}
                          {{
                            HouseboatDetail.userid.whatsappNumber
                          }}</span
                        ></v-flex
                      > -->
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center pt-4>
            <v-flex xs12 v-if="HouseboatDetail">
              <v-layout wrap mt-2 v-if="HouseboatDetail.facilities">
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

                <v-flex
                  xs12
                  sm3
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.airCondition == true"
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
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.wifi == true"
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
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.television == true"
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
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.lifeJacket == true"
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
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.swimmingPool == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/swimmingpool.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Swimming pool</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.kettle == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/kettle.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Kettle</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.parking == true"
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
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.restrooms == true"
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
                <v-flex
                  xs12
                  sm3
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.fireextinguisher == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/fire.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Fire extinguisher</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  pt-1 pb-3
                  pr-2
                  text-left
                  v-if="HouseboatDetail.facilities.powerbackup == true"
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
                </v-flex>
              </v-layout>
              <v-layout wrap mt-2 v-else>
                <v-flex xs12 px-0 px-md-2>
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No facilities added</span>
                    </v-flex
                >
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout wrap  py-2 px-2>
            <v-flex
                  xs12
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 22px;
                  "
                  >Details</v-flex
                >
            <v-flex xs12 sm6 md4 lg3 xl3 text-left pt-2  v-if="HouseboatDetail.startingLocation">
                  <v-layout wrap v-if="HouseboatDetail">
                    <v-flex
                      xs12
                      sm12
                      md12
                      lg12
                      xl12
                      align-self-center
                      text-left  v-if="HouseboatDetail.startingLocation"
                    >
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Pickup/Drop Location</span
                      ><br />
                      <span
                        v-if="HouseboatDetail.startingLocation"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ HouseboatDetail.startingLocation.name }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3 xl3 text-left pt-2  v-if="HouseboatDetail.tripDetails">
                  <v-layout wrap >
                    <v-flex
                      xs12
                      sm12
                      md12
                      lg12
                      xl12
                      align-self-center
                      text-left
                    >
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Checkin Time</span
                      ><br />
                      <span
                        v-if="HouseboatDetail.tripDetails.checkInTime"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ HouseboatDetail.tripDetails.checkInTime }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3 xl3 text-left pt-2  v-if="HouseboatDetail.tripDetails">
                  <v-layout wrap >
                    <v-flex
                      xs12
                      sm12
                      md12
                      lg12
                      xl12
                      align-self-center
                      text-left
                    >
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Checkout Time</span
                      ><br />
                      <span
                        v-if="HouseboatDetail.tripDetails.checkOutTime"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ HouseboatDetail.tripDetails.checkOutTime }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                  xl3
                  text-left
                  pt-2
                  v-if="HouseboatDetail.tripDetails.tripType == 'OverNight'"
                >
                  <v-layout wrap>
                    <v-flex
                      xs12
                      sm12
                      md12
                      lg12
                      xl12
                      align-self-center
                      text-left
                    >
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >1st Day Trip Start Time</span
                      ><br />
                      <span
                        v-if="HouseboatDetail.tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ HouseboatDetail.tripDetails.firstDayStartTime }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                  xl3
                  text-left
                  pt-2
                  v-if="HouseboatDetail.tripDetails.tripType == 'OverNight'"
                >
                  <v-layout wrap>
                    <v-flex
                      xs12
                      sm12
                      md12
                      lg12
                      xl12
                      align-self-center
                      text-left
                    >
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >1st Day Trip End Time</span
                      ><br />
                      <span
                        v-if="HouseboatDetail.tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ HouseboatDetail.tripDetails.firstDayEndTime }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                  xl3
                  text-left
                  pt-2
                  v-if="HouseboatDetail.tripDetails.tripType == 'OverNight'"
                >
                  <v-layout wrap>
                    <v-flex
                      xs12
                      sm12
                      md12
                      lg12
                      xl12
                      align-self-center
                      text-left
                    >
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >2nd Day Trip Start Time</span
                      ><br />
                      <span
                        v-if="HouseboatDetail.tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ HouseboatDetail.tripDetails.secondDayStartTime }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex
                  xs12
                  sm6
                  md4
                  lg3
                  xl3
                  text-left
                  pt-2
                  v-if="HouseboatDetail.tripDetails.tripType == 'OverNight'"
                >
                  <v-layout wrap>
                    <v-flex
                      xs12
                      sm12
                      md12
                      lg12
                      xl12
                      align-self-center
                      text-left
                    >
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >2nd Day Trip End Time</span
                      ><br />
                      <span
                        v-if="HouseboatDetail.tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ HouseboatDetail.tripDetails.secondDayEndTime }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
          </v-layout>
          <v-layout wrap justify-center pt-2>
            <v-flex xs12 v-if="TripDetail">
              <v-layout wrap v-if="TripDetail.mealPlan">
                <v-flex
                  xs12
                  px-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 18px;
                  "
                  >Meal plan</v-flex
                >

                <v-flex
                  xs12
                  sm2
                  pt-3
                  px-2
                  v-if="TripDetail.mealPlan.welcomeDrink == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/welcomedrink.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Welcome drink</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm2
                  pt-3
                  px-2
                  v-if="TripDetail.mealPlan.lunch == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/lunch.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Lunch</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  pt-3
                  px-2
                  v-if="TripDetail.mealPlan.teaOrsnacks == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/food.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Tea/Coffee - Snacks</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm2
                  pt-3
                  px-2
                  v-if="TripDetail.mealPlan.dinner == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/dinner.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Dinner</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm2
                  pt-3
                  px-2
                  v-if="TripDetail.mealPlan.breakfast == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/breakfast.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Breakfast</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout wrap v-else>
                <v-flex xs12
                  ><span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No meal plan added</span
                  ></v-flex
                >
              </v-layout>
            </v-flex>
            <v-flex xs12 pt-4 px-2>
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
                v-if="TripDetail.addionalRules != ''"
              >
                <v-flex xs12 lg12 pl-1>
                  <span class="LexendRegular" style="font-size: 14px;font-family: LexendFont;">
                    {{ TripDetail.addionalRules }}</span
                  >
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center v-else>
                <v-flex xs12 lg12 pl-1> - </v-flex>
              </v-layout>
            </v-flex>
            <!-- <v-flex xs12 v-if="HouseboatDetail">
              <v-layout wrap >
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
                <v-flex
                  px-0
                  px-md-2
                  xs12
                  sm10
                  v-if="HouseboatDetail.propertyImages"
                >
                  <v-layout
                    wrap
                    v-if="HouseboatDetail.propertyImages.length > 0"
                  >
                    <v-flex
                      xs12
                      sm4
                      md3
                      v-for="(
                        item, i
                      ) in HouseboatDetail.propertyImages.slice(0, 4)"
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
                        $router.push(
                          '/ImageGalleryHouseboat?id=' +
                            HouseboatDetail._id
                        )
                      "
                      xs12
                      v-if="HouseboatDetail.propertyImages.length > 4"
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
                </v-flex>
              </v-layout>
            </v-flex> -->
            <v-flex xs12 pt-5 v-if="HouseboatDetail" px-2>
              <v-layout wrap justify-start>
                <v-flex xs12>
                  <span
                    style="
                      font-weight: 400;
                      font-size: 18px;
                      font-family: LexendRegular;
                    "
                    >Gallery</span
                  >
                </v-flex>

                <v-flex xs12>
                  <v-layout
                    wrap
                    justify-left
                    style="font-size: 14px"
                    v-if="HouseboatDetail.facilities"
                  >
                    <v-flex
                      text-left
                      xs11
                      sm6
                      md4
                      lg3
                      xl3
                      pt-2
                      v-if="HouseboatDetail.fullImage != ''"
                    >
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                        >Full Image</span
                      >
                      <v-layout wrap>
                        <viewer
                          images="HouseboatDetail.fullImage"
                          key="HouseboatDetail.fullImage"
                        >
                          <v-layout wrap>
                            <v-flex xs12  class="pa-1">
                              <img
                                :src="mediaUURL + HouseboatDetail.fullImage"
                                style="object-fit: cover"
                                height="200px"
                                width="100%"
                              />
                            </v-flex>
                          </v-layout>
                        </viewer>
                      </v-layout>
                    </v-flex>

                    <v-flex
                      text-left
                      xs11
                      sm6
                      md4
                      lg3
                      xl3
                      pt-2
                      v-if="HouseboatDetail.interiorImage != ''"
                    >
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                        >Interior Image</span
                      >
                      <v-layout wrap>
                        <viewer
                          images="HouseboatDetail.interiorImage"
                          key="HouseboatDetail.interiorImage"
                        >
                          <v-layout wrap>
                            <v-flex xs12 class="pa-1">
                              <img
                                :src="mediaUURL + HouseboatDetail.interiorImage"
                                style="object-fit: cover"
                                height="200px"
                                width="200px"
                              />
                            </v-flex>
                          </v-layout>
                        </viewer>
                      </v-layout>
                    </v-flex>

                    <v-flex
                      text-left
                      xs11
                      sm6
                      md4
                      lg3
                      xl3
                      pt-2
                      v-if="HouseboatDetail.upperImage != ''"
                    >
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                        >Upper Deck / Reception</span
                      >
                      <v-layout wrap>
                        <viewer
                          images="HouseboatDetail.upperImage"
                          key="HouseboatDetail.upperImage"
                        >
                          <v-layout wrap>
                            <v-flex xs12  class="pa-1">
                              <img
                                :src="mediaUURL + HouseboatDetail.upperImage"
                                style="object-fit: cover"
                                height="200px"
                                width="200px"
                              />
                            </v-flex>
                          </v-layout>
                        </viewer>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 pb-2 v-if="HouseboatDetail.roomImage.length > 0">
                  <span
                    style="
                      font-weight: 400;
                      font-size: 15px;
                      font-family: LexendRegular;
                    "
                    >Room Images</span
                  >
                </v-flex>
                <v-flex xs12 lg12 v-if="HouseboatDetail.roomImage.length > 0">
                  <viewer
                    :images="HouseboatDetail.roomImage"
                    :key="HouseboatDetail.roomImage.length"
                  >
                    <v-layout wrap>
                      <v-flex
                        xs12
                        sm6
                        md4
                        lg3
                        xl3
                        v-for="(item, i) in HouseboatDetail.roomImage"
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
                    </v-layout>
                  </viewer>
                </v-flex>

                <v-flex
                  xs12
                  pb-2
                  v-if="HouseboatDetail.propertyImages.length > 0"
                >
                  <span
                    style="
                      font-weight: 400;
                      font-size: 15px;
                      font-family: LexendRegular;
                    "
                    >Property Images</span
                  >
                </v-flex>
                <v-flex
                  xs12
                  lg12
                  v-if="HouseboatDetail.propertyImages.length > 0"
                >
                  <viewer
                    :images="HouseboatDetail.propertyImages"
                    :key="HouseboatDetail.propertyImages.length"
                  >
                    <v-layout wrap>
                      <v-flex
                        xs12
                        sm6
                        md4
                        lg3
                        xl3
                        v-for="(item, i) in HouseboatDetail.propertyImages"
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
                    </v-layout>
                  </viewer>
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
                                style="
                                  border-radius: 15px;
                                  background-color: #fafafa;
                                "
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
  <span  style="
                              font-weight: 400;
                              font-size: 18px;
                              font-family: LexendRegular;
                            ">No reviews found!</span>
</v-flex>

                      </v-layout>
                    </v-flex>

              </v-layout>
            </v-flex>
          </v-layout>
          <!-- <v-layout wrap v-if="j < Object.keys(item).length - 1">
              <v-flex xs12 py-2>
                <v-divider></v-divider>
              </v-flex>
            </v-layout> -->
        </v-card>
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
            <v-layout wrap justify-center pa-4>
              <v-flex xs12 pt-2 text-center align-self-start>
                <span style="font-family: LexendFont; font-size: 24px"
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
                  v-if="HouseboatDetail"
                  :network="item.network"
                  :url="'https://accessrooms.com' + $route.fullPath"
                  :title="HouseboatDetail.houseBoatName"
                  :media="mediaUURL + HouseboatDetail.coverImage">
                  <!-- @shared="handleShareComplete" -->
                
                  <v-img
                    :width="item.size"
                    :src="getImgUrl(item.image)"
                  ></v-img>
                </ShareNetwork>
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
Vue.use(VueViewer);
import axios from "axios";
import store from "./../../store";
export default {
  data() {
    return {
      appLoading: false,
      ServerError: false,
      page: 1,
      showSnackbar: false,
      timeout: 5000,
      msg: null,
      Pagelength: 0,
      myTab: null,
      tabType: "",
      shareDialog: false,
      list: {},
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
      socialMedias: [
        {
          network: "whatsapp",
          title: "Whatsapp",
          icon: "mdi-whatsapp",
          image: "whatsapp.jpg",
          size: "55px",
        },
        // { network: "Messenger", icon: "mdi-facebook-messenger" },
        {
          network: "facebook",
          title: " Facebook",
          icon: "mdi-facebook",
          image: "fb.png",
          size: "50px",
        },
        // {
        //   network: "twitter",
        //   title: " Twitter",
        //   icon: "mdi-twitter",
        //   image: "twitter.png",
        //   size: "50px",
        // },
        {
          network: "email",
          title: "Gmail ",
          icon: "mdi-email",
          image: "gmail.png",
          size: "58px",
        },
        // {
        //   network: "linkedin",
        //   title: "Linkedin ",
        //   icon: "mdi-linkedin",
        //   image: "linkedin.png",
        //   size: "50px",
        // },
        // { network: "telegram",title:"Telegram ",  icon: "mdi-telegram" ,size:"50px"},
      ],
      tripTypes: [
        { name: 'OverNight', displayText: 'OverNight (12 pm - 9 am)' },
        { name: 'DayCruise', displayText: 'DayCruise (11 am - 5 pm)' },
        { name: 'NightStay', displayText: 'NightStay (5.30 pm - 9 am)' },
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
      review:[],
      flag1: false,
      Datalength: "",
      Datalength1: "",
      filterType: false,
      customerRate: "",
      customerRateCommission: "",
      //data display
      fulldata: {},
      TripDetail: {},
      HouseboatDetail: {},
      IsMealplan: false,
      Isfacility: false,
      Item1: {},
      OtherImgs: [],
      moreimg: false,
      itemIds: [],
      itemIds2: [],
      noOfPpleSelected: localStorage.getItem("Hadult"),
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
  computed: {
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
  },
  mounted() {
    this.myTab=parseInt(localStorage.getItem("myTab"));
    this.getLocation();
    this.getData2();
  },
  created() {
    this.itemIds = this.$route.query.ids;
    console.log("page2 itemIds", this.itemIds);
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
    handleShareComplete() {
      location.reload();
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
    getData2() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/houseboatbooking/get",
        params: {
          id: this.$route.query.id,
          category: this.$route.query.category,
          houseBoatType: this.$route.query.type,
          location: this.$route.query.location,
          numberofRooms: this.$route.query.room,
          tripType: this.$route.query.triptype,
          checkInDate: this.$route.query.checkInDate,
          checkOutDate: this.$route.query.checkOutDate,
          children: this.$route.query.children,
          adult: this.$route.query.adult,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
          this.review = response.data.reviews;

            (this.customerRate = response.data.customerRate),
              (this.customerRateCommission =
                response.data.customerRateCommission),
              (this.HouseboatDetail = response.data.data);
            this.list = response.data.data;
            this.TripDetail = response.data.tripDetails;
            this.FacilitiesData = this.HouseboatDetail.facilities;
            if (this.FacilitiesData) {
              this.Isfacility = true;
            } else {
              this.Isfacility = false;
            }
            this.Item1 = this.TripDetail.mealPlan;
            if (this.Item1) {
              this.IsMealplan = true;
            } else {
              this.IsMealplan = false;
            }
            this.OtherImgs = this.HouseboatDetail.propertyImages;

            if (this.OtherImgs && this.OtherImgs.length > 5) {
              this.OtherImgs = this.OtherImgs.slice(0, 5);
              this.moreimg = true;
            }
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
    getLocation() {
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
    bookNow() {
      this.appLoading = true;
      var headers1 = {};
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
      } else
        headers1 = {
          guestid: localStorage.getItem("guestId"),
        };
        const childrenValue = localStorage.getItem("Hchildren");
const isChildrenAvailable = childrenValue !== null && childrenValue !== 'null' && childrenValue !== undefined && childrenValue !== '';
      axios({
        method: "Post",
        url: "/houseboat/booknow/",
        headers: headers1,
        data: {
          // id: this.$route.query.id,
          category: localStorage.getItem("Hcategory"),
          houseBoatType: localStorage.getItem("Htype"),
          location: localStorage.getItem("Hlocation"),
          totalRooms: localStorage.getItem("Hroom"),
          tripType: localStorage.getItem("Htriptype"),
          startDate: localStorage.getItem("HcheckInDate"),
          endDate: localStorage.getItem("HcheckOutDate"),
          children: isChildrenAvailable ? childrenValue : 0,
          adult: localStorage.getItem("Hadult"),
          totalAmount: this.customerRate,
          totalCommissionAmount: this.customerRateCommission,
          id: [this.$route.query.id],
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.msg = response.data.msg;
            this.showsnackbar = true;
            var curId = response.data.data._id;
            this.$router.push("/BookHouseboat?id=" + curId);
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
    //filter routes
    apply() {
      this.guest = false;
    },
    searchProduct1() {
      this.flag = false;
      var searchItems = {};
      searchItems.category = this.Hcategory;
      searchItems.type = this.Htype;
      searchItems.location = this.Hlocation;
      searchItems.room = this.Hroom;
      searchItems.triptype = this.Htriptype;
      searchItems.checkInDate = this.HcheckInDate;
      searchItems.checkOutDate = this.HcheckOutDate;
      searchItems.children = this.Hchildren;
      searchItems.adult = this.Hadult;
      
      store.commit("HBsearchItems", searchItems);

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
      var curTab = localStorage.getItem("myTab");
      localStorage.setItem("curTab", curTab);
      this.$router.push("/SearchBoats?type=" + "houseboat");
    },
    searchProduct2() {
      this.flag = false;
      var searchItems = {};

      searchItems.checkInDate = this.checkInDate;
      searchItems.checkInTime = this.checkInTime;
      searchItems.checkOutTime = this.checkOutTime;
      searchItems.children = this.children;
      searchItems.location = this.location;
      searchItems.adult = this.adult;
      store.commit("SKsearchItems", searchItems);

      localStorage.setItem("checkInDate", this.checkInDate);
      localStorage.setItem("checkInTime", this.checkInTime);
      localStorage.setItem("checkOutTime", this.checkOutTime);
      localStorage.setItem("location", this.location);
      localStorage.setItem("children", this.children);
      localStorage.setItem("adult", this.adult);
      localStorage.setItem("myTab", this.myTab);
      var curTab = localStorage.getItem("myTab");
      localStorage.setItem("curTab", curTab);
      this.$router.push("/SearchBoats?type=" + "shikara");
    },
    getHouseboat() {
      this.appLoading = true;
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
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.housedata = response.data.data;
            this.Datalength == response.data.totalLength;
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
        // localStorage.setItem("Hcategory", this.Hcategory);
        // localStorage.setItem("Htype", this.Htype);
        // localStorage.setItem("Hlocation", this.Hlocation);
        // localStorage.setItem("Hroom", this.Hroom);
        // localStorage.setItem("Htriptype", this.Htriptype);
        // localStorage.setItem("HcheckInDate", this.HcheckInDate);
        // localStorage.setItem("HcheckOutDate", this.HcheckOutDate);
        // localStorage.setItem("Hchildren", this.Hchildren);
        // localStorage.setItem("Hadult", this.Hadult);
        // var curTab = localStorage.getItem("myTab");
        // localStorage.setItem("curTab", curTab);

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
  },
};
</script>
