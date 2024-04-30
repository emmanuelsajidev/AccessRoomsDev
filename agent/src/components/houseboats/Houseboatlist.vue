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
                                              height="180px"
                                              width="250px"
                                              :src="mediaUURL + item.coverImage"
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
                                                xs8
                                                pb-2
                                                v-if="item.houseBoatName"
                                                text-left
                                                align-self-center
                                              >
                                                <span
                                                  style="
                                                    font-weight: 500;
                                                    font-size: 20px;
                                                    font-family: LexendRegular;
                                                  "
                                                >
                                                  {{
                                                    item.houseBoatName
                                                  }}&nbsp;<br />

                                                  <span
                                                    style="font-size: 14px"
                                                    v-if="item.startingLocation"
                                                  >
                                                    Pickup/ Drop:
                                                    {{
                                                      item.startingLocation
                                                        .name
                                                    }},
                                                    {{
                                                      item.totalRooms
                                                    }}&nbsp;Rooms
                                                  </span>
                                                </span>
                                              </v-flex>

                                              <v-flex xs4 pt-1 pl-2 text-left>
                                                <span
                                                  style="
                                                    font-weight: 500;
                                                    font-size: 13px;
                                                    font-family: LexendRegular;
                                                  "
                                                >
                                                  Check In :
                                                  {{
                                                    item.tripDetails
                                                      .checkInTime
                                                  }}<br />
                                                  <span
                                                    style="
                                                      font-weight: 500;
                                                      font-size: 13px;
                                                      font-family: LexendRegular;
                                                    "
                                                  >
                                                    Check Out :
                                                    {{
                                                      item.tripDetails
                                                        .checkOutTime
                                                    }}<br />
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
                                                  item.facilities.wifi === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/wifi.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs11 text-left>
                                                    <span>&nbsp;Wifi</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>

                                              <v-flex
                                                text-left
                                                pt-2
                                                xs4
                                                v-if="
                                                  item.facilities
                                                    .airCondition === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1 text-left>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/ac.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs11>
                                                    <span
                                                      >&nbsp;Air Condition</span
                                                    >
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>

                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.facilities.lifeJacket ===
                                                  true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/lifejacket.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs11 text-left>
                                                    <span
                                                      >&nbsp;Lifejacket</span
                                                    >
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>

                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.facilities.parking ===
                                                  true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/parking.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs11 text-left>
                                                    <span>&nbsp;Parking</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.facilities.restrooms ===
                                                  true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/was.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs11 text-left>
                                                    <span>&nbsp;Restrooms</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>

                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.facilities.television ===
                                                  true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1 text-left>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/tv.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs11>
                                                    <span
                                                      >&nbsp;Television</span
                                                    >
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.facilities.toilet ===
                                                  true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/restroom.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs11 text-left>
                                                    <span>&nbsp;Toilet</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.facilities.towels ===
                                                  true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1 text-left>
                                                    <v-img
                                                      color="black"
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/towel.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs11>
                                                    <span>&nbsp;Towels</span>
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>
                                              <v-flex
                                                text-left
                                                pt-2
                                                xs4
                                                v-if="
                                                  item.facilities
                                                    .powerbackup === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1 text-left>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/battery.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs11>
                                                    <span
                                                      >&nbsp;Power Backup</span
                                                    >
                                                  </v-flex>
                                                </v-layout>
                                              </v-flex>

                                              <v-flex
                                                pt-2
                                                text-left
                                                xs4
                                                v-if="
                                                  item.facilities
                                                    .fireextinguisher === true
                                                "
                                              >
                                                <v-layout wrap justify-start>
                                                  <v-flex xs1>
                                                    <v-img
                                                      height="20px"
                                                      width="20px"
                                                      contain
                                                      src="./../../assets/icons/fire.png"
                                                    >
                                                    </v-img>
                                                  </v-flex>
                                                  <v-flex xs9 text-left>
                                                    <span
                                                      >&nbsp;Fire
                                                      Extinguisher</span
                                                    >
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
                                                  {{ item.agentRate }}
                                                  <span style="font-size: 11px">
                                                    ( Excluding GST )
                                                  </span>
                                                </span>
                                                <br />
                                                <!-- <span
                                                  style="font-weight: 400;font-size: 12px;font-family: LexendRegular;">
                                                  per head rate

                                                </span> -->
                                              </v-flex>

                                              <v-flex xs12 pt-4 pl-6 pr-6>
                                                <v-btn
                                                  @click="gotoView(item._id)"
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
          >{{ totalData }} Total Results
        </span>
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
                        :src="mediaUURL + item.coverImage"
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
                            {{ item.houseBoatName }}&nbsp;<br />
                            <span style="font-size: 16px">
                              &nbsp;{{ item.totalRooms }}
                              rooms
                            </span>
                          </span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <!-- <v-flex xs11 pt-1 text-left>
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
                    </v-flex> -->
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
                          v-if="item.facilities.airCondition === true"
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
                          v-if="item.facilities.lifeJacket === true"
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
                          v-if="item.facilities.parking === true"
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
                          v-if="item.facilities.restrooms === true"
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
                          v-if="item.facilities.television === true"
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
                          v-if="item.facilities.toilet === true"
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
                          v-if="item.facilities.towels === true"
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
                          v-if="item.facilities.wifi === true"
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

                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.facilities.powerbackup === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/battery.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10 text-left>
                              <span>Power Backup</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          pt-3
                          text-left
                          xs11
                          v-if="item.facilities.fireextinguisher === true"
                        >
                          <v-layout wrap justify-start>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/fire.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs10 text-left>
                              <span>Fire Extinguisher</span>
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
                        <v-flex xs11 text-center>
                          <span
                            style="
                              font-family: LexendRegular;
                              color: black;
                              font-size: 18px;
                              font-weight: 600;
                            "
                          >
                            ₹
                            {{ item.agentRate }}
                          </span>
                          <br />
                          <!-- <span
                                                  style="font-weight: 400;font-size: 12px;font-family: LexendRegular;">
                                                  per head rate

                                                </span> -->
                        </v-flex>
                        <v-flex xs11 pt-4 pb-2>
                          <v-btn
                            @click="gotoView(item._id)"
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

    <v-layout wrap>
      <v-flex xs12>
        <v-layout wrap justify-start>
          <v-flex
            class="LexendRegular"
            xs12
            lg4
            pa-2
            pa-sm-md-lg-xl-0
            pl-lg-4
            v-for="(item, i) in list2"
            :key="i"
            pt-5
          >
            <v-card elevation="2" xs12 style="border-radius: 12px">
              <v-layout wrap justify-start>
                <v-flex xs12>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-layout wrap justify-start>
                        <v-flex xs12>
                          <v-carousel
                            :show-arrows="false"
                            :progress="false"
                            :continuous="false"
                            hide-controls-on-hover="true"
                            height="100%"
                            width="100%"
                            hide-delimiters
                            :cycle="true"
                          >
                            <v-carousel-item
                              v-for="(id, j) in item.houseBoatDetails"
                              :key="j"
                            >
                              <v-img
                                style="border-radius: 12px 12px 0px 0px"
                                :src="mediaUURL + id.coverImage"
                                height="200px"
                                width="100%"
                              ></v-img>
                            </v-carousel-item>
                          </v-carousel>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout wrap justify-center>
                        <v-flex xs11 pt-3>
                          <span
                            style="font-weight: bold"
                            v-for="(item2, j) in item.houseBoatDetails"
                            :key="j"
                          >
                            {{ item2.houseBoatName }},
                          </span>
                        </v-flex>
                        <v-flex xs11 pt-2>
                          <span
                            v-for="(item2, j) in item.houseBoatDetails"
                            :key="j"
                          >
                          </span>
                          <v-icon color="black">mdi-bed-queen-outline</v-icon>
                          Total Rooms:
                          {{
                            item.houseBoatDetails.reduce(
                              (total, item2) => total + item2.totalRooms,
                              0
                            )
                          }}
                        </v-flex>

                        <v-flex
                          xs11
                          pt-2
                          style="font-size: 20px; font-weight: bold"
                        >
                          <span>
                            ₹
                            {{ item.totalAmount }}
                          </span>

                          <!-- <span v-else> -&nbsp; </span> -->
                        </v-flex>

                        <v-flex xs11 pt-4 block pb-4>
                          <v-btn
                            @click="navigateToPage2(item._id)"
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
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout wrap justify-center v-if="list">
      <v-flex xs11 pt-4 pt-lg-0 pb-3 v-if="list.length > 0">
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
      // carouselSpeed: 1000,
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
      checkOutDate: null,
      guest: false,
      msg: null,
      value: "",
      phone: "",
      list: [],
      list2: [],
    };
  },
  watch: {
    currentPage() {
      this.getList();
    },
  },
  created() {
    const {
      Hcategory,
      Htype,
      Hroom,
      Hadult,
      Hchildren,
      HcheckInDate,

      Hlocation,
      Htriptype,
      HcheckOutDate,
    } = this.$route.query;
    this.Hcategory = Hcategory || this.Hcategory;
    this.Htype = Htype || this.Htype;
    this.Hlocation = Hlocation || this.Hlocation;
    this.Hroom = Hroom || this.Hroom;
    this.Hadult = Hadult || this.Hadult;
    this.Hchildren = Hchildren || this.Hchildren;
    this.Htriptype = Htriptype || this.Htriptype;
    this.HcheckInDate = HcheckInDate || this.HcheckInDate;
    this.HcheckOutDate = HcheckOutDate || this.HcheckOutDate;
  },

  computed: {
    searchFilters2() {
      return this.$store.state.searchFilters2;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    navigateToPage2(item) {
      // const itemIds = item.map((item) => item._id);
      console.log("itemIds", item);
      this.$router.push({
        name: "Houseboatviewmultiple",
        query: {
          ids: item,
        },
      });
    },
    getList() {
      this.appLoading = true;

      axios({
        method: "POST",
        url: "/agent/houseboat/booking/filter",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          page: this.currentPage,
          limit: 10,
          category: this.Hcategory,
          houseBoatType: this.Htype,
          location: this.Hlocation,
          tripType: this.Htriptype,
          numberofRooms: this.Hroom,
          checkInDate: this.HcheckInDate,
          checkOutDate: this.HcheckOutDate,
          children: this.Hchildren,
          adult: this.Hadult,
        },
      }).then((response) => {
        if (response.data.status) {
          this.totalData = response.data.totalLength;
          this.pages = Math.ceil(this.totalData / response.data.limit);

          this.appLoading = false;

          if (response.data.singleboat) {
            this.list = response.data.data;
          } else {
            this.list2 = response.data.data;
          }
        } else {
          this.appLoading = false;

          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },

    gotoView(id) {
      this.$router.push({
        name: "Houseboatview",
        query: {
          id: id,
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
