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
    <v-snackbar v-model="showSnackbar" color="#002635" right :timeout="timeout">
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
    <v-layout wrap justify-center style="background-color: #f9f9f9">
      <v-flex xs12 sm11 lg9>
        <v-layout wrap justify-center>
          <v-flex xs12 text-left pt-8 pl-2 pl-md-0>
            <span
              style="
                font-weight: 400;
                font-size: 20px;
                font-family: LexendFont;
                text-transform: none;
              "
              >My Bookings</span
            >
          </v-flex>
        </v-layout>
        <v-layout wrap>
          <v-flex xs12 pt-6 pb-4>
            <v-card color="transparent" elevation="0">
              <v-tabs
                v-model="myTab"
                background-color="transparent"
                color="#ff6200"
                left
              >
                <v-tab
                  :style="
                    myTab == 0
                      ? 'background-color:#ff6200'
                      : 'background-color:white'
                  "
                >
                  <!-- <v-icon
                          class="pr-1"
                          :style="myTab == 0 ? 'color:white' : 'color:black'"
                          >mdi-ferry</v-icon
                        > -->
                  <span
                    :style="myTab == 0 ? 'color:white' : 'color:black'"
                    style="
                      font-family: RobotoBold;
                      font-weight: 500;
                      font-size: 14px;
                    "
                    >Current</span
                  ></v-tab
                >
                <v-tab
                  :style="
                    myTab == 1
                      ? 'background-color:#ff6200'
                      : 'background-color:white'
                  "
                >
                  <!-- <v-icon
                          class="pr-1"
                          :style="myTab == 1 ? 'color:white' : 'color:black'"
                          >mdi-sail-boat</v-icon
                        > -->
                  <span
                    :style="myTab == 1 ? 'color:white' : 'color:black'"
                    style="
                      font-family: RobotoBold;
                      font-weight: 500;
                      font-size: 14px;
                    "
                    >Previous</span
                  ></v-tab
                >

                <v-tab-item>
                  <v-layout wrap v-if="currentBookings">
                    <v-flex xs12 v-if="currentBookings.length > 0">
                      <v-layout wrap pa-4>
                        <v-flex
                          xs12
                          v-for="(item, i) in currentBookings"
                          :key="i"
                          py-2
                        >
                          <v-card
                            elevation="1"
                            v-if="item.bookedFor == 'HouseBoat'"
                          >
                            <v-layout wrap>
                              <v-flex xs12 md2 align-self-center>
                                <v-card
                                  elevation="0"
                                  width="330px"
                                  class="hidden-sm-and-down"
                                >
                                  <v-img
                                    v-if="item.houseBoatId"
                                    height="150px"
                                    :src="
                                      mediaUURL + item.houseBoatId.coverImage
                                    "
                                  >
                                    <template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                  <v-img
                                    v-else
                                    height="150px"
                                    src="./../../assets/images/nophoto.jpg"
                                  ></v-img>
                                </v-card>
                                <v-card
                                  elevation="0"
                                  width="100%"
                                  class="hidden-md-and-up"
                                >
                                  <v-img
                                    v-if="item.houseBoatId"
                                    height="150px"
                                    :src="
                                      mediaUURL + item.houseBoatId.coverImage
                                    "
                                  >
                                    <template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                  <v-img
                                    v-else
                                    height="150px"
                                    src="./../../assets/images/nophoto.jpg"
                                  ></v-img>
                                </v-card>
                              </v-flex>
                              <v-flex xs12 sm4 md3 py-1 py-sm-4 pl-4>
                                <v-layout wrap fill-height>
                                  <v-flex
                                    xs12
                                    text-left
                                    align-self-start
                                    v-if="item.houseBoatId"
                                  >
                                    <span
                                      v-if="item.houseBoatId.houseBoatName"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 20px;
                                        font-weight: 500;
                                      "
                                      >{{
                                        item.houseBoatId.houseBoatName
                                      }}</span
                                    >
                                    <!-- <span v-for="(item1, j) in item.houseBoatId" :key="j">
            {{ item1.houseBoatName }}
            <span v-if="j < Object.keys(item.houseBoatId).length - 1">, </span>
          </span> -->
                                  </v-flex>
                                  <v-flex xs12 text-left>
                                    <!-- <br /> -->
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Houseboat</span
                                    >
                                  </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Booking No: {{ item.bookingNo }}</span
                                    >
                                    <!-- </v-flex>
                                <v-flex xs12 text-left> --><br />
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Booked On:
                                      {{ formatDate(item.bookingDate) }}</span
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm2
                                md2
                                py-0
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Rooms</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.totalRooms"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.totalRooms }}
                                    </span>
                                    <span v-else>-</span>  </v-flex>
                                    </v-layout>
                                    </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Category</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.category"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.category }}
                                    </span>
                                    <span v-else>-</span>  </v-flex>
                                    </v-layout>
                                    </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm2
                                md2
                                py-0
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      No.of Guests</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.noOfAdults"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.noOfAdults }}
                                      <v-icon>mdi-human-male</v-icon></span
                                    >
                                    <span v-else>0</span>
                                    <span
                                      v-if="item.noOfChildren"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.noOfChildren }}
                                      <v-icon>mdi-car-child-seat</v-icon></span
                                    > </v-flex>
                                    </v-layout>
                                  </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Houseboat type</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.houseBoatType"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.houseBoatType }}
                                    </span>
                                    <span v-else>-</span>  </v-flex>
                                    </v-layout>
                                    </v-flex
                                  >
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm2
                                md1
                                py-0
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Check In</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.startDate"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ formatDate(item.startDate) }}</span
                                    >
                                    <span v-else>-</span> </v-flex>
                                    </v-layout>
                                    </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Check Out</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.endDate"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ formatDate(item.endDate) }}
                                    </span>
                                    <span v-else>-</span>  </v-flex>
                                    </v-layout>
                                    </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm2
                                md2
                                py-0
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout
                                  wrap
                                  fill-height
                                  justify-end
                                  pr-0
                                  pr-sm-1
                                >
                                  <v-flex
                                    xs12
                                    text-left
                                    text-sm-right
                                    align-self-start
                                    pr-2
                                  >
                                    <span
                                      v-if="item.totalAmount"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 18px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      ₹ {{ item.totalAmount }}</span
                                    >
                                    <span v-else>-</span></v-flex
                                  >
                                  <!-- <v-flex xs12 sm10  text-right align-self-end>
                                <v-btn block
                                      @click="
                                        $router.push(
                                          'resheduleHouseboat?id=' +
                                            item._id +
                                            '&&name=' +
                                            item.houseBoatId.houseBoatName
                                        )
                                      "
                                       dark class="px-0"
                                      color="#ff6200"
                                    >
                                      <span
                                      style="
                                      font-family: LexendFont;
                                      font-size: 14px;
                                      font-weight: 500;
                                    "
                                      >
                                        Reschedule
                                      </span>
                                    </v-btn>
                                    </v-flex> -->
                                  <v-flex xs12 md10 text-right align-self-end pb-2 pb-sm-0>
                                    <v-btn
                                      block
                                      color="#ff6200"
                                      dark
                                      @click="
                                        $router.push(
                                          '/bookingDetail?id=' + item._id
                                        )
                                      "
                                    >
                                      <span
                                        style="
                                          font-family: LexendFont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        >Details </span
                                      ></v-btn
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                          <v-card
                            elevation="1"
                            class="pa-2"
                            v-if="item.bookedFor == 'Shikara'"
                          >
                            <v-layout wrap>
                              <v-flex xs12 sm12 md2>
                                <v-card
                                  elevation="0"
                                  width="330px"
                                  class="hidden-sm-and-down"
                                >
                                  <v-img
                                    v-if="item.shikaraid"
                                    height="150px"
                                    :src="mediaUURL + item.shikaraid.coverImage"
                                  >
                                    <template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                  <v-img
                                    v-else
                                    height="150px"
                                    src="./../../assets/images/nophoto.jpg"
                                  ></v-img>
                                </v-card>
                                <v-card
                                  elevation="0"
                                  width="100%"
                                  class="hidden-md-and-up"
                                >
                                  <v-img
                                    v-if="item.shikaraid"
                                    height="150px"
                                    :src="mediaUURL + item.shikaraid.coverImage"
                                  >
                                    <template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                  <v-img
                                    v-else
                                    height="150px"
                                    src="./../../assets/images/nophoto.jpg"
                                  ></v-img>
                                </v-card>
                              </v-flex>
                              <v-flex xs12 sm5 md3 py-1 py-sm-4 pl-4>
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 20px;
                                        font-weight: 500;
                                      "
                                      >{{ item.shikaraid.shikaraName }}</span
                                    ><br />
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Shikara</span
                                    >
                                  </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Booking No: {{ item.bookingNo }}</span
                                    ><br />
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Booked On:
                                      {{ formatDate(item.bookedOn) }}</span
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm3
                                md2
                                py-1
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      No.of Guests</span
                                    ><br />
                                    <span
                                      v-if="item.memberCount"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.memberCount }}
                                      <v-icon>mdi-human-male</v-icon></span
                                    >
                                    <span v-else>0</span>
                                    <span
                                      v-if="item.childrenCount"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.childrenCount }}
                                      <v-icon>mdi-car-child-seat</v-icon></span
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm1
                                md1
                                py-1
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Check In</span
                                    ><br />
                                    <span
                                      v-if="item.startTime"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ formatTime(item.startTime) }}</span
                                    >
                                    <span v-else>-</span></v-flex
                                  >
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm1
                                md1
                                py-1
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Check Out</span
                                    ><br />
                                    <span
                                      v-if="item.endTime"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ formatTime(item.endTime) }}
                                    </span>
                                    <span v-else>-</span></v-flex
                                  >
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm3
                                md3
                                py-1
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height justify-end>
                                  <v-flex xs12 text-right align-self-start>
                                    <span
                                      v-if="item.bookingTotal"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 18px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      ₹ {{ item.bookingTotal }}</span
                                    >
                                    <span v-else>-</span></v-flex
                                  >
                                  <v-flex xs12 sm7 text-right align-self-end>
                                    <v-btn
                                      block
                                      color="#ff6200"
                                      dark
                                      @click="
                                        $router.push(
                                          '/bookingDetail2?id=' + item._id
                                        )
                                      "
                                    >
                                      <span
                                        style="
                                          font-family: LexendFont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        >Details</span
                                      ></v-btn
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap v-if="currentBookings" pb-4>
                        <v-flex xs12>
                          <v-pagination
                            small
                            color="#ff6200"
                            v-model="page1"
                            :length="firstpage"
                            :total-visible="7"
                          >
                          </v-pagination>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 pa-8 v-else>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >No bookings found</span
                      >
                    </v-flex>
                  </v-layout>
                </v-tab-item>
                <v-tab-item>
                  <v-layout wrap v-if="expiredBookings">
                    <v-flex xs12 v-if="expiredBookings.length > 0">
                      <v-layout wrap pa-4>
                        <v-flex
                          xs12
                          v-for="(item, i) in expiredBookings"
                          :key="i"
                          py-2
                        >
                          <v-card
                            elevation="1"
                            v-if="item.bookedFor == 'HouseBoat'"
                          >
                            <v-layout wrap>
                              <v-flex xs12 md2 align-self-center>
                                <v-card
                                  elevation="0"
                                  width="330px"
                                  class="hidden-sm-and-down"
                                >
                                  <v-img
                                    v-if="item.houseBoatId"
                                    height="150px"
                                    :src="
                                      mediaUURL + item.houseBoatId.coverImage
                                    "
                                  >
                                    <template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                  <v-img
                                    v-else
                                    height="150px"
                                    src="./../../assets/images/nophoto.jpg"
                                  ></v-img>
                                </v-card>
                                <v-card
                                  elevation="0"
                                  width="100%"
                                  class="hidden-md-and-up"
                                >
                                  <v-img
                                    v-if="item.houseBoatId"
                                    height="150px"
                                    :src="
                                      mediaUURL + item.houseBoatId.coverImage
                                    "
                                  >
                                    <template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                  <v-img
                                    v-else
                                    height="150px"
                                    src="./../../assets/images/nophoto.jpg"
                                  ></v-img>
                                </v-card>
                              </v-flex>
                              <v-flex xs12 sm4 md3 py-1 py-sm-4 pl-4>
                                <v-layout wrap fill-height>
                                  <v-flex
                                    xs12
                                    text-left
                                    align-self-start
                                    v-if="item.houseBoatId"
                                  >
                                    <span
                                      v-if="item.houseBoatId.houseBoatName"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 20px;
                                        font-weight: 500;
                                      "
                                      >{{
                                        item.houseBoatId.houseBoatName
                                      }}</span
                                    >
                                    <!-- <span v-for="(item1, j) in item.houseBoatId" :key="j">
            {{ item1.houseBoatName }}
            <span v-if="j < Object.keys(item.houseBoatId).length - 1">, </span>
          </span> -->
                                  </v-flex>
                                  <v-flex xs12 text-left>
                                    <!-- <br /> -->
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Houseboat</span
                                    >
                                  </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Booking No: {{ item.bookingNo }}</span
                                    >
                                    <!-- </v-flex>
                                <v-flex xs12 text-left> --><br />
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Booked On:
                                      {{ formatDate(item.bookingDate) }}</span
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm2
                                md2
                                py-0
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                        <span
                                          style="
                                            font-family: LexendFont;
                                            font-size: 12px;
                                            font-weight: 400;
                                            text-transform: uppercase;
                                            color: #757575;
                                          "
                                        >
                                          Rooms</span></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                        <span
                                          v-if="item.totalRooms"
                                          style="
                                            font-family: LexendFont;
                                            font-size: 14px;
                                            font-weight: 500;
                                            text-transform: uppercase;
                                          "
                                        >
                                          {{ item.totalRooms }}
                                        </span>
                                        <span v-else>-</span>
                                      </v-flex>
                                    </v-layout>
                                  </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Category</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.category"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.category }}
                                    </span>
                                    <span v-else>-</span> </v-flex>
                                    </v-layout>
                                    </v-flex
                                  >
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm2
                                md2
                                py-0
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      No.of Guests</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.noOfAdults"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.noOfAdults }}
                                      <v-icon>mdi-human-male</v-icon></span
                                    >
                                    <span v-else>0</span>
                                    <span
                                      v-if="item.noOfChildren"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.noOfChildren }}
                                      <v-icon>mdi-car-child-seat</v-icon></span
                                    >  </v-flex>
                                    </v-layout>
                                  </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Houseboat type</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.houseBoatType"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.houseBoatType }}
                                    </span>
                                    <span v-else>-</span> </v-flex>
                                    </v-layout>
                                    </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm2
                                md1
                                py-0
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Check In</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.startDate"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ formatDate(item.startDate) }}</span
                                    >
                                    <span v-else>-</span>
                                  </v-flex>
                                    </v-layout>
                                    </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <v-layout wrap>
                                      <v-flex xs6 sm12 align-self-center>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Check Out</span
                                    ></v-flex>
                                      <v-flex
                                        xs6
                                        sm12
                                        align-self-center
                                        pt-1
                                        pt-sm-0
                                      >
                                    <span
                                      v-if="item.endDate"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ formatDate(item.endDate) }}
                                    </span>
                                    <span v-else>-</span>
                                  </v-flex>
                                    </v-layout>
                                    </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm2
                                md2
                                py-0
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout
                                  wrap
                                  fill-height
                                  justify-end
                                  pr-0
                                  pr-sm-1
                                >
                                  <v-flex xs12 text-left text-sm-right align-self-start>
                                    <span
                                      v-if="item.totalAmount"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 18px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      ₹ {{ item.totalAmount }}</span
                                    >
                                    <span v-else>-</span></v-flex
                                  >
                                  <!-- <v-flex xs12 sm10  text-right align-self-end>
                                <v-btn block
                                      @click="
                                        $router.push(
                                          'resheduleHouseboat?id=' +
                                            item._id +
                                            '&&name=' +
                                            item.houseBoatId.houseBoatName
                                        )
                                      "
                                       dark class="px-0"
                                      color="#ff6200"
                                    >
                                      <span
                                      style="
                                      font-family: LexendFont;
                                      font-size: 14px;
                                      font-weight: 500;
                                    "
                                      >
                                        Reschedule
                                      </span>
                                    </v-btn>
                                    </v-flex> -->
                                  <v-flex xs12 md10 text-right align-self-end pb-2 pb-sm-0>
                                    <v-btn
                                      block
                                      color="#ff6200"
                                      dark
                                      @click="
                                        $router.push(
                                          '/bookingDetail?id=' + item._id
                                        )
                                      "
                                    >
                                      <span
                                        style="
                                          font-family: LexendFont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        >Details</span
                                      ></v-btn
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                          <v-card
                            elevation="1"
                            class="pa-2"
                            v-if="item.bookedFor == 'Shikara'"
                          >
                            <v-layout wrap>
                              <v-flex xs12 sm12 md2>
                                <v-card
                                  elevation="0"
                                  width="330px"
                                  class="hidden-sm-and-down"
                                >
                                  <v-img
                                    v-if="item.shikaraid"
                                    height="150px"
                                    :src="mediaUURL + item.shikaraid.coverImage"
                                  >
                                    <template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                  <v-img
                                    v-else
                                    height="150px"
                                    src="./../../assets/images/nophoto.jpg"
                                  ></v-img>
                                </v-card>
                                <v-card
                                  elevation="0"
                                  width="100%"
                                  class="hidden-md-and-up"
                                >
                                  <v-img
                                    v-if="item.shikaraid"
                                    height="150px"
                                    :src="mediaUURL + item.shikaraid.coverImage"
                                  >
                                    <template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                  <v-img
                                    v-else
                                    height="150px"
                                    src="./../../assets/images/nophoto.jpg"
                                  ></v-img>
                                </v-card>
                              </v-flex>
                              <v-flex xs12 sm5 md3 py-1 py-sm-4 pl-4>
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 20px;
                                        font-weight: 500;
                                      "
                                      >{{ item.shikaraid.shikaraName }}</span
                                    ><br />
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Shikara</span
                                    >
                                  </v-flex>
                                  <v-flex xs12 text-left align-self-end>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Booking No: {{ item.bookingNo }}</span
                                    ><br />
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 400;
                                      "
                                      >Booked On:
                                      {{ formatDate(item.bookedOn) }}</span
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm3
                                md2
                                py-1
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      No.of Guests</span
                                    ><br />
                                    <span
                                      v-if="item.memberCount"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.memberCount }}
                                      <v-icon>mdi-human-male</v-icon></span
                                    >
                                    <span v-else>0</span>
                                    <span
                                      v-if="item.childrenCount"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ item.childrenCount }}
                                      <v-icon>mdi-car-child-seat</v-icon></span
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm1
                                md1
                                py-1
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Check In</span
                                    ><br />
                                    <span
                                      v-if="item.startTime"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ formatTime(item.startTime) }}</span
                                    >
                                    <span v-else>-</span></v-flex
                                  >
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm1
                                md1
                                py-1
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height>
                                  <v-flex xs12 text-left align-self-start>
                                    <span
                                      style="
                                        font-family: LexendFont;
                                        font-size: 12px;
                                        font-weight: 400;
                                        text-transform: uppercase;
                                        color: #757575;
                                      "
                                    >
                                      Check Out</span
                                    ><br />
                                    <span
                                      v-if="item.endTime"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 14px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      {{ formatTime(item.endTime) }}
                                    </span>
                                    <span v-else>-</span></v-flex
                                  >
                                </v-layout>
                              </v-flex>
                              <v-flex
                                xs12
                                sm3
                                md3
                                py-1
                                py-sm-4
                                pl-sm-1
                                pl-4
                                pr-4
                                pr-sm-0
                              >
                                <v-layout wrap fill-height justify-end>
                                  <v-flex xs12 text-right align-self-start>
                                    <span
                                      v-if="item.bookingTotal"
                                      style="
                                        font-family: LexendFont;
                                        font-size: 18px;
                                        font-weight: 500;
                                        text-transform: uppercase;
                                      "
                                    >
                                      ₹ {{ item.bookingTotal }}</span
                                    >
                                    <span v-else>-</span></v-flex
                                  >
                                  <v-flex xs12 sm7 text-right align-self-end>
                                    <v-btn
                                      block
                                      color="#ff6200"
                                      dark
                                      @click="
                                        $router.push(
                                          '/bookingDetail2?id=' + item._id
                                        )
                                      "
                                    >
                                      <span
                                        style="
                                          font-family: LexendFont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        >Details</span
                                      ></v-btn
                                    >
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                        </v-flex>
                      </v-layout>
                      <v-layout wrap v-if="expiredBookings" pb-4>
                        <v-flex xs12 v-if="expiredBookings.length > 0">
                          <v-pagination
                            small
                            color="#ff6200"
                            v-model="page2"
                            :length="secondpage"
                            :total-visible="7"
                          >
                          </v-pagination>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 pa-8 v-else
                      ><span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >No bookings found</span
                      ></v-flex
                    >
                  </v-layout>
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
  <script>
import axios from "axios";
// import store from "./../store";
export default {
  data() {
    return {
      showSnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      msg: "",
      currentBookings: [],
      expiredBookings: [],
      myTab: "",
      page1: 1,
      limit1: 10,
      page2: 1,
      limit2: 10,
      secondpage: 0,
      firstpage: 0,
      customerId: localStorage.getItem("customerId"),
    };
  },
  computed: {
    appLogin() {
      return this.$store.state.isLoggedIn;
    },
    SKsearchItems() {
      return this.$store.state.SKsearchItems;
    },
    HBsearchItems() {
      return this.$store.state.HBsearchItems;
    },
  },
  watch: {
    page1() {
      this.getData();
    },
    page2() {
      this.getData();
    },
  },
  mounted() {
    this.customerId = localStorage.getItem("customerId");
    if (this.customerId) {
      this.getData();
    }
  },
  methods: {
    getData() {
      this.appLoading = true;
      var headers1 = {};
      if (this.appLogin) {
        headers1 = {
          token: localStorage.getItem("token"),
        };
      }
      axios({
        headers: headers1,
        method: "post",
        url: "/customer/my/allBookings",
        data: {
          cusid: this.customerId,
          page1: this.page1,
          limit1: this.limit1,
          page2: this.page2,
          limit2: this.limit2,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.currentBookings = response.data.current;
            this.expiredBookings = response.data.expired;
            var currentLength = response.data.currentLength;
            console.log("currentLength=", currentLength);
            if (currentLength) {
              this.firstpage = Math.ceil(currentLength / this.limit1);
              console.log("firstpage=", this.firstpage);
            }
            var expiredLength = response.data.expiredLength;
            console.log("expiredLength=", expiredLength);
            if (expiredLength) {
              this.secondpage = Math.ceil(expiredLength / this.limit2);
              console.log("secondpage=", this.secondpage);
            }
            // this.pagelength = Math.ceil(response.data.totalLength / 20);
            // if(response.data.expiredLength){
            // this.Pagelength2 = Math.ceil(response.data.expiredLength / this.limit2);
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
    formatDate(item) {
      var dt = new Date(item);
      var day = dt.getDate();
      var year = dt.getFullYear();
      // var hours = dt.getHours();
      // var minutes = dt.getMinutes();
      dt = dt.toString();
      // var ampm = hours >= 12 ? "pm" : "am";
      // hours = hours % 12;
      // hours = hours ? hours : 12;
      // minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = day + " " + dt.slice(4, 7) + " " + year;
      // +
      // " , " +
      // hours +
      // ":" +
      // minutes +
      // " " +
      // ampm;

      return strTime;
    },
    formatTime(item) {
      var dt = new Date(item);
      // var day = dt.getDate();
      // var year = dt.getFullYear();
      var hours = dt.getHours();
      var minutes = dt.getMinutes();
      dt = dt.toString();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime =
        //day + " " + dt.slice(4, 7) + " " + year;
        // +
        // " , " +
        hours + ":" + minutes + " " + ampm;

      return strTime;
    },
  },
};
</script>
  <style scoped>
.vertical-divider {
  display: flex;
  align-items: center;
}

.divider {
  width: 1px;
  height: 100%;
  background-color: #ccc; /* Adjust the color as needed */
  margin: 0 auto; /* Center the divider */
}
.dottedline {
  border: none;
  border-top: 1px dashed rgb(82, 79, 79);
  color: #fff;
  background-color: #fff;
  height: 1px;
  width: 100%;
}
</style>