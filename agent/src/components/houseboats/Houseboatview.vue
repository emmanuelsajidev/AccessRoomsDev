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
    <v-layout wrap pt-6>
      <v-flex xs12>
        <v-card elevation="0">
          <v-layout wrap justify-center>
            <v-flex xs11 pt-8 pb-8>
              <v-layout wrap>
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
                        >₹ {{ agentRate }}</span
                      >
                    </v-flex>
                    <v-flex xs12 text-right>
                      <v-layout justify-end pt-2>
                        <v-flex xs2 lg3>
                          <v-btn @click="gotoBooknow()" block color="#FF6200">
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

                <v-flex xs12 pl-lg-10 text-right>
                      <v-rating
                        :length="5"
                        :size="18"
                        v-model="list.rating"
                        active-color="#ff6200"
                        color="#ff6200"
                        background-color="#ff6200"
                    /></v-flex>

                <v-flex class="hidden-md-and-up" xs12 lg6 pt-6 pt-lg-0>
                  <v-layout wrap justify-center>
                    <v-flex xs12 text-left>
                      <span
                        style="
                          font-weight: 500;
                          font-size: 28px;
                          font-family: LexendRegular;
                        "
                        >₹ {{ agentRate }}</span
                      >
                    </v-flex>

                    <v-flex xs12 text-left>
                      <v-layout justify-center pt-2>
                        <v-flex xs12>
                          <v-btn @click="gotoBooknow()" block color="#FF6200">
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
                <v-flex xs12 pt-5 v-if="list && list.coverImage">
                  <v-img
                    width="100%"
                    height="100%"
                    contain
                    max-width="100%"
                    :src="mediaUURL + list.coverImage"
                  >
                  </v-img>
                </v-flex>

                <v-flex xs12 sm6 md4 lg3 xl3 text-left pt-6>
                  <v-layout wrap v-if="list">
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
                          font-family: LexendRegular;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Pickup/Drop Location</span
                      ><br />
                      <span
                        v-if="list.startingLocation"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ list.startingLocation.name }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3 xl3 text-left pt-6>
                  <v-layout wrap v-if="list">
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
                          font-family: LexendRegular;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Checkin Time</span
                      ><br />
                      <span
                        v-if="tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ tripDetails.checkInTime }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm6 md4 lg3 xl3 text-left pt-6>
                  <v-layout wrap v-if="list">
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
                          font-family: LexendRegular;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Checkout Time</span
                      ><br />
                      <span
                        v-if="tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ tripDetails.checkOutTime }}</span
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
                  pt-6
                  v-if="tripDetails.tripType == 'OverNight'"
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
                          font-family: LexendRegular;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >1st Day Trip Start Time</span
                      ><br />
                      <span
                        v-if="tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ tripDetails.firstDayStartTime }}</span
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
                  pt-6
                  v-if="tripDetails.tripType == 'OverNight'"
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
                          font-family: LexendRegular;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >1st Day Trip End Time</span
                      ><br />
                      <span
                        v-if="tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ tripDetails.firstDayEndTime }}</span
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
                  pt-6
                  v-if="tripDetails.tripType == 'OverNight'"
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
                          font-family: LexendRegular;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >2nd Day Trip Start Time</span
                      ><br />
                      <span
                        v-if="tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ tripDetails.secondDayStartTime }}</span
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
                  pt-6
                  v-if="tripDetails.tripType == 'OverNight'"
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
                          font-family: LexendRegular;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >2nd Day Trip End Time</span
                      ><br />
                      <span
                        v-if="tripDetails"
                        style="
                          font-family: LexendRegular;
                          font-weight: 300;
                          font-size: 15px;
                          color: black;
                        "
                      >
                        {{ tripDetails.secondDayEndTime }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 pt-4>
                  <v-layout wrap>
                    <v-flex xs12>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendRegular;
                        "
                        >Facilities</span
                      >
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-center v-if="list.facilities">
                    <v-flex xs12>
                      <v-layout
                        wrap
                        justify-start
                        class="LexendRegular"
                        style="font-size: 14px"
                      >
                        <v-flex
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.airCondition === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2 text-center>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/ac.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Air Condition</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.lifeJacket === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/lifejacket.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Lifejacket</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.parking === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/parking.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Parking</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.restrooms === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/was.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Restrooms</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.television === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
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
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.toilet === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/restroom.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Toilet</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.towels === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
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
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.wifi === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/wifi.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Wifi</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.powerbackup === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/battery.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Power Backup</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.facilities.fireextinguisher === true"
                        >
                          <v-layout wrap>
                            <v-flex xs2>
                              <v-img
                                height="20px"
                                width="20px"
                                contain
                                src="./../../assets/icons/fire.png"
                              >
                              </v-img>
                            </v-flex>
                            <v-flex xs6>
                              <span>Fire Extinguisher</span>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 pt-4>
                  <v-layout wrap v-if="tripDetails.mealPlan">
                    <v-flex xs12>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendRegular;
                        "
                        >Meal Plan</span
                      >
                    </v-flex>
                  </v-layout>
                  <v-layout
                    wrap
                    justify-left
                    class="LexendRegular"
                    style="font-size: 14px"
                    v-if="list.facilities"
                  >
                    <v-flex
                      text-left
                      xs11
                      sm6
                      md3
                      lg3
                      xl3
                      pt-3
                      v-if="tripDetails.mealPlan.welcomeDrink == true"
                    >
                      <v-layout wrap>
                        <v-flex xs2>
                          <v-img
                            height="20px"
                            width="20px"
                            contain
                            src="./../../assets/icons/welcomedrink.png"
                          >
                          </v-img>
                        </v-flex>
                        <v-flex xs6>
                          <span>Welcome drink</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex
                      text-left
                      xs11
                      sm6
                      md3
                      lg3
                      xl3
                      pt-3
                      v-if="tripDetails.mealPlan.lunch == true"
                    >
                      <v-layout wrap>
                        <v-flex xs2>
                          <v-img
                            height="20px"
                            width="20px"
                            contain
                            src="./../../assets/icons/lunch.png"
                          >
                          </v-img>
                        </v-flex>
                        <v-flex xs6>
                          <span>Lunch</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex
                      text-left
                      xs11
                      sm6
                      md3
                      lg3
                      xl3
                      pt-3
                      v-if="tripDetails.mealPlan.teaOrsnacks == true"
                    >
                      <v-layout wrap>
                        <v-flex xs2>
                          <v-img
                            height="20px"
                            width="20px"
                            contain
                            src="./../../assets/icons/food.png"
                          >
                          </v-img>
                        </v-flex>
                        <v-flex xs6>
                          <span>Tea/Coffee - Snacks</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex
                      text-left
                      xs11
                      sm6
                      md3
                      lg3
                      xl3
                      pt-3
                      v-if="tripDetails.mealPlan.dinner == true"
                    >
                      <v-layout wrap>
                        <v-flex xs2>
                          <v-img
                            height="20px"
                            width="20px"
                            contain
                            src="./../../assets/icons/dinner.png"
                          >
                          </v-img>
                        </v-flex>
                        <v-flex xs6>
                          <span>Dinner</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex
                      text-left
                      xs11
                      sm6
                      md3
                      lg3
                      xl3
                      pt-3
                      v-if="tripDetails.mealPlan.breakfast == true"
                    >
                      <v-layout wrap>
                        <v-flex xs2>
                          <v-img
                            height="20px"
                            width="20px"
                            contain
                            src="./../../assets/icons/breakfast.png"
                          >
                          </v-img>
                        </v-flex>
                        <v-flex xs6>
                          <span>Breakfast</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 pt-4>
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
                    v-if="tripDetails.addionalRules != ''"
                  >
                    <v-flex xs12 lg12 pl-1>
                      <span class="LexendRegular" style="font-size: 14px">
                        {{ tripDetails.addionalRules }}</span
                      >
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-center v-else>
                    <v-flex xs12 lg12 pl-1> - </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 pt-8 v-if="list">
                  <v-layout wrap justify-start>
                    <v-flex xs12 pb-2>
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
                        v-if="list.facilities"
                      >
                        <v-flex
                          text-left
                          xs11
                          sm6
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.fullImage != ''"
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
                              :images="[list.fullImage]"
                              key="list.fullImage"
                            >
                              <v-layout wrap>
                                <v-flex xs12 sm6 md3 lg3 xl3 class="pa-1">
                                  <img
                                    :src="mediaUURL + list.fullImage"
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
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.interiorImage != ''"
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
                              :images="[list.interiorImage]"
                              key="list.interiorImage"
                            >
                              <v-layout wrap>
                                <v-flex xs12 sm6 md3 lg3 xl3 class="pa-1">
                                  <img
                                    :src="mediaUURL + list.interiorImage"
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
                          md3
                          lg3
                          xl3
                          pt-3
                          v-if="list.upperImage != ''"
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
                              :images="[list.upperImage]"
                              key="list.upperImage"
                            >
                              <v-layout wrap>
                                <v-flex xs12 sm6 md3 lg3 xl3 class="pa-1">
                                  <img
                                    :src="mediaUURL + list.upperImage"
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

                    <v-flex xs12 pb-2 v-if="roomImage.length > 0">
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                        >Room Images</span
                      >
                    </v-flex>
                    <v-flex xs12 lg12 v-if="roomImage.length > 0">
                      <viewer :images="roomImage" :key="roomImage.length">
                        <v-layout wrap>
                          <v-flex
                            xs12
                            sm6
                            md3
                            lg3
                            xl3
                            v-for="(item, i) in roomImage"
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

                    <v-flex xs12 pb-2 v-if="propertyImages.length > 0">
                      <span
                        style="
                          font-weight: 400;
                          font-size: 15px;
                          font-family: LexendRegular;
                        "
                        >Property Images</span
                      >
                    </v-flex>
                    <v-flex xs12 lg12 v-if="propertyImages.length > 0">
                      <viewer
                        :images="propertyImages"
                        :key="propertyImages.length"
                      >
                        <v-layout wrap>
                          <v-flex
                            xs12
                            sm6
                            md3
                            lg3
                            xl3
                            v-for="(item, i) in propertyImages"
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
            </v-flex>
          </v-layout>
        </v-card>
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
export default {
  data() {
    return {
      id: this.$route.query.id,
      currentPage: 1,
      ServerError: false,
      msg: null,
      propertyImages: [],
      review: [],
      roomImage: [],
      userid: "",
      appLoading: false,
      amount: "",
      customerRate: "",
      agentSaved: "",
      list: {},
      tripDetails: "",
      agentRateCommission: "",
      agentRate: "",
      snackbar: false,
    };
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
        url: "/agent/houseboatbooked/data",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          id: this.id,
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
      })
        .then((response) => {
          this.list = response.data.data;
          this.review = response.data.reviews;
          this.tripDetails = response.data.tripDetails;
          this.agentRate = response.data.agentRate;
          this.agentRateCommission = response.data.agentRateCommission;
          this.propertyImages = this.list.propertyImages;
          this.roomImage = this.list.roomImage;
          this.appLoading = false;
        })
        .catch((err) => {
          this.ServerError = true;
          console.error(err);
        });
    },
    gotoBooknow() {
      // Assuming houseBoatId is an array
      const houseBoatIdArray = [this.id];

      axios({
        method: "POST",
        url: "/agent/houseboat/booknow",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          houseBoatName: this.list.houseBoatName,
          totalAmount: this.agentRate,
          id: houseBoatIdArray,
          category: this.Hcategory,
          houseBoatType: this.Htype,
          location: this.Hlocation,
          tripType: this.Htriptype,
          totalRooms: this.Hroom,
          checkInDate: this.HcheckInDate,
          checkOutDate: this.HcheckOutDate,
          children: this.Hchildren,
          adult: this.Hadult,
          totalCommissionAmount: this.agentRateCommission,
        },
      })
        .then((response) => {
          if (response.data.status) {
            this.userid = response.data.data._id;
            console.log("deewdwedwwe", this.userid);
            this.appLoading = false;

            this.$router.push({
              name: "booknowhouseboat",
              query: {
                uid: this.userid,
                agentRateCommission: this.agentRateCommission,
              },
            });
          } else {
            this.appLoading = false;
            this.msg = response.data.msg;
            this.snackbar = true;
          }
        })
        .catch((error) => {
          // Handle error if needed
          console.error("Error in gotoBooknow:", error);
          this.appLoading = false;
          this.msg = "An error occurred while processing your request.";
          this.snackbar = true;
        });
    },

    apply() {
      this.guest = false;
    },
  },
};
</script>