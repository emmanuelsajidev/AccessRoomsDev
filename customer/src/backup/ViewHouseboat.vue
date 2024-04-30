<template>
  <div>
    <v-layout wrap justify-center>
      <v-flex xs12 align-self-center>
        <v-card tile class="pa-4">
          <v-layout wrap>
            <v-flex xs12 v-if="HouseboatData">
              <v-img
                cover
                v-if="HouseboatData.fullImage"
                :src="mediaUURL + HouseboatData.fullImage"
                contain
              >
                <v-layout justify-start fill-height>
                  <v-flex xs12 sm2 align-self-end mb-4 ml-8>
                    <v-card class="pa-1" height="110px" width="150px">
                      <v-img
                        height="100%"
                        width="100%"
                        v-if="HouseboatData.propertyImages"
                        :src="mediaUURL + HouseboatData.propertyImages[0]"
                        contain
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex xs8 align-self-end mb-4>
                    <span
                      style="
                        font-family: LexendFont;
                        font-weight: 500;
                        font-size: 22px;
                        color: white;
                      "
                      v-if="HouseboatData.houseBoatName"
                      >{{ HouseboatData.houseBoatName }}</span
                    >
                    <br />
                    <span
                      class="px-2 py-1"
                      style="
                        border-radius: 5px;
                        font-family: LexendFont;
                        font-weight: 500;
                        font-size: 10px;
                        color: white;
                        background-color: rgba(60, 187, 205, 1);
                      "
                      v-if="HouseboatData.category"
                      >{{ HouseboatData.category }}</span
                    >
                  </v-flex>
                  <v-flex xs2 align-self-end text-right mb-4 pr-8>
                    <v-btn style="border-radius: 2px" color="grey" @click="(editDialog=true),(curItem=HouseboatData)">
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 600;
                          font-size: 15px;
                          color: white;
                        "
                        >Edit</span
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-img>
              <v-img
                v-else
                cover
                height="300px"
                width="1251px"
                src="./../../assets/images/noimg.png"
              >
                <v-layout justify-start fill-height>
                  <v-flex xs12 sm2 align-self-end mb-4 ml-4>
                    <v-card class="pa-1" height="110px" width="110px">
                      <v-img
                        height="110px"
                        cover
                        v-if="HouseboatData.propertyImages"
                        :src="mediaUURL + HouseboatData.propertyImages[0]"
                        contain
                      ></v-img>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-img>
            </v-flex>
          </v-layout>
          <v-layout
            justify-start
            wrap
            style="background-color: rgba(245, 242, 240, 1)"
            pa-4
            my-4
          >
            <v-flex xs12 sm2 align-self-center text-center>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(144, 144, 144, 1);
                  text-transform: uppercase;
                "
                >Category</span
              >
              <br />
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 600;
                  font-size: 15px;
                  color: rgba(64, 64, 64, 1);
                "
                v-if="HouseboatData.category"
              >
                {{ HouseboatData.category }}</span
              >
            </v-flex>
            <v-flex xs12 sm2 align-self-center text-center>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(144, 144, 144, 1);
                  text-transform: uppercase;
                "
                >Total Rooms</span
              >
              <br />
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 600;
                  font-size: 15px;
                  color: rgba(64, 64, 64, 1);
                "
                v-if="HouseboatData.totalRooms"
              >
                {{ HouseboatData.totalRooms }}</span
              >
            </v-flex>
            <v-flex xs12 sm2 align-self-center text-center>
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(144, 144, 144, 1);
                  text-transform: uppercase;
                "
                v-if="HouseboatData.expiryType == 'licenseExpiry'"
                >License expiry</span
              >
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(144, 144, 144, 1);
                  text-transform: uppercase;
                "
                v-if="HouseboatData.expiryType == 'insuranceExpiry'"
                >Insurance expiry</span
              >
              <br />
              <span
                style="
                  font-family: LexendFont;
                  font-weight: 600;
                  font-size: 15px;
                  color: rgba(64, 64, 64, 1);
                "
                v-if="HouseboatData.expiryDate"
              >
                {{ formatDate(HouseboatData.expiryDate) }}</span
              >
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex
              xs12
              sm1
              class="mr-2"
              align-self-center
              text-center
              v-if="HouseboatData.fullImage"
            >
              <v-img
                v-if="HouseboatData.fullImage"
                height="90px"
                width="100px"
                :src="mediaUURL + HouseboatData.fullImage"
              ></v-img>
            </v-flex>
            <v-flex
              xs12
              sm1
              class="mr-2"
              align-self-center
              text-center
              v-if="HouseboatData.interiorImage"
            >
              <v-img
                v-if="HouseboatData.interiorImage"
                height="90px"
                width="100px"
                :src="mediaUURL + HouseboatData.interiorImage"
              ></v-img>
            </v-flex>
            <v-flex
              xs12
              sm1
              class="mr-2"
              align-self-center
              text-center
              v-if="HouseboatData.roomImage"
            >
              <v-img
                v-if="HouseboatData.roomImage"
                height="90px"
                width="100px"
                :src="mediaUURL + HouseboatData.roomImage"
              ></v-img>
            </v-flex>
            <v-flex
              xs12
              sm1
              class="mr-2"
              align-self-center
              text-center
              v-if="HouseboatData.upperImage"
            >
              <v-img
                v-if="HouseboatData.upperImage"
                height="90px"
                width="100px"
                :src="mediaUURL + HouseboatData.upperImage"
              ></v-img>
            </v-flex>
            <v-flex xs12 sm1 v-if="moreimg==true" class="mr-2" align-self-center text-center>
              <span
                style="
                  font-family: RobotoRegular;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(241, 115, 67, 1);
                " @click="$router.push('/ImageGallery?id='+$route.query.id)"
                >View All <v-icon small>mdi-arrow-right</v-icon></span
              ></v-flex
            >
          </v-layout>
          <v-layout wrap mt-4 v-if="FacilitiesData">
            <v-flex
              xs12
              style="font-family: LexendFont; font-weight: 400; font-size: 22px"
              >Facilities</v-flex
            >
            <v-flex xs12 v-if="Isfacility == false"
              ><span
                style="
                  font-family: RobotoRegular;
                  font-weight: 400;
                  font-size: 16px;
                "
                >No facilities added</span
              ></v-flex
            >
            <v-flex
              xs12
              sm3
              py-4
              px-2
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
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Air conditioning</span
                  ></v-flex
                >
              </v-layout>
            </v-flex>
            <v-flex xs12 sm3 py-4 px-2 v-if="FacilitiesData.wifi == true">
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
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Wifi</span
                  ></v-flex
                >
              </v-layout>
            </v-flex>
            <v-flex xs12 sm3 py-4 px-2 v-if="FacilitiesData.television == true">
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
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Smart Tv</span
                  ></v-flex
                >
              </v-layout>
            </v-flex>
            <v-flex xs12 sm3 py-4 px-2 v-if="FacilitiesData.lifeJacket == true">
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
                      font-family: RobotoRegular;
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
              py-4
              px-2
              v-if="FacilitiesData.swimmingPool == true"
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
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Swimming pool</span
                  ></v-flex
                >
              </v-layout>
            </v-flex>
            <v-flex xs12 sm3 py-4 px-2 v-if="FacilitiesData.kettle == true">
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
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Kettle</span
                  ></v-flex
                >
              </v-layout>
            </v-flex>
            <v-flex xs12 sm3 py-4 px-2 v-if="FacilitiesData.parking == true">
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
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Parking</span
                  ></v-flex
                >
              </v-layout>
            </v-flex>
            <v-flex xs12 sm3 py-4 px-2 v-if="FacilitiesData.restrooms == true">
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
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Restroom</span
                  ></v-flex
                >
              </v-layout>
            </v-flex>
          </v-layout>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="rgba(255, 98, 0, 1)"
            grow
          >
            <v-tab v-if="HouseboatData.isDayCriuse==true">
              <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 18px;
                "
                >Day Cruise</span
              >
            </v-tab>
            <v-tab v-if="HouseboatData.isOverNight==true">
              <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 18px;
                "
                >Over Night</span
              >
            </v-tab>
            <v-tab v-if="HouseboatData.isNightStay==true">
              <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 18px;
                "
                >Night Stay</span
              >
            </v-tab>
            <v-tab-item v-if="HouseboatData.isDayCriuse==true" style="background-color: white">
              <v-card color="basil" flat>
                <v-card-text>
                  <v-layout wrap justify-end>
                    <v-flex xs1 text-right @click="(EditTrip1=true),(editItem1=Item1)">
                      <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 18px;
                "
                ><v-icon color="rgba(255, 98, 0, 1)" small>mdi-pencil</v-icon>Edit</span
              >
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-start>
                    <v-flex xs12 sm3>
                      <v-layout wrap>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Boat type
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.houseBoatType"
                            style="
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                              color: black;
                            "
                          >
                            : {{ Item1.houseBoatType }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Check in time
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.checkInTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.checkInTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Check out time
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.checkOutTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.checkOutTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max person
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.maxPersonTrip"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.maxPersonTrip }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Min person
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.minPersonTrip"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.minPersonTrip }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max boat capacity
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.maxCapacityOfBoat"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.maxCapacityOfBoat }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex
                      xs12
                      sm4
                      v-for="(items, i) in Item1.package"
                      :key="i"
                    >
                      <v-card
                        elevation="0"
                        color="#fff5d9"
                        style="border-color: rgba(255, 98, 0, 1)"
                        class="mx-2 pa-2"
                      >
                        <span
                          style="
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 17px;
                            color: grey;
                          "
                          >{{ items.packageType }}</span
                        >
                        <v-layout wrap>
                          <v-flex xs6 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Start date
                            </span>
                          </v-flex>
                          <v-flex xs5 py-1>
                            <span
                              v-if="items.startDate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                            >
                              : {{ formatDate(items.startDate) }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                          <v-flex xs6 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >End date
                            </span>
                          </v-flex>
                          <v-flex xs5 py-1>
                            <span
                              v-if="items.endDate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                              >: {{ formatDate(items.endDate) }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                          <v-flex xs6 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Customer rate
                            </span>
                          </v-flex>
                          <v-flex xs5 py-1>
                            <span
                              v-if="items.customerRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                            >
                              : ₹ {{ items.customerRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                          <v-flex xs6 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Agent rate
                            </span>
                          </v-flex>
                          <v-flex xs5 py-1>
                            <span
                              v-if="items.agentRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                            >
                              : ₹ {{ items.agentRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap mt-4 v-if="Item1.mealPlan">
                    <v-flex
                      xs12
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 18px;
                      "
                      >Meal Plan</v-flex
                    >
                    <v-flex xs12 v-if="IsMealplan == false"
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >No meal plan added</span
                      ></v-flex
                    >

                    <v-flex
                      xs12
                      sm2
                      py-4
                      px-2
                      v-if="Item1.mealPlan.welcomeDrink == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item1.mealPlan.lunch == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item1.mealPlan.teaOrsnacks == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item1.mealPlan.dinner == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item1.mealPlan.breakfast == true"
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
                              font-family: RobotoRegular;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Breakfast</span
                          ></v-flex
                        >
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item v-if="HouseboatData.isOverNight==true" style="background-color: white">
              <v-card color="basil" flat>
                <v-card-text>
                  <v-layout wrap justify-end>
                    <v-flex xs1 text-right @click="(EditTrip2=true),(editItem2=Item2)">
                      <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: LexendFont;
                  font-weight: 400;
                  font-size: 18px;
                "
                ><v-icon color="rgba(255, 98, 0, 1)" small>mdi-pencil</v-icon>Edit</span
              >
                    </v-flex>
                  </v-layout>
                  <v-layout wrap justify-start>
                    <v-flex xs12 sm3>
                      <v-layout wrap>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Boat type
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.houseBoatType"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.houseBoatType }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Check in time
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.checkInTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.checkInTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Check out time
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.checkOutTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.checkOutTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max capacity
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.maxCapacityOfBoat"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.maxCapacityOfBoat }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Min capacity
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.minCapacityOfBoat"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.minCapacityOfBoat }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max boat capacity
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.maxCapacityOfBoat"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.maxCapacityOfBoat }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm3>
                      <v-layout wrap>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max person/room
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.maxPersonPerRoom"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.maxPersonPerRoom }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Day 1 check-in
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.firstDayStartTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.firstDayStartTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Day 1 check-out
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.firstDayEndTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.firstDayEndTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Day 2 check-in
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.secondDayStartTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.secondDayStartTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Day 2 check-out
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item2.secondDayEndTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item2.secondDayEndTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex
                      xs12
                      sm3
                      v-for="(items, i) in Item2.package"
                      :key="i"
                    >
                      <v-card
                        elevation="0"
                        color="#fff5d9"
                        style="border-color: rgba(255, 98, 0, 1)"
                        class="mx-2 pa-2"
                      >
                        <span
                          style="
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 17px;
                            color: grey;
                          "
                          >{{ items.packageType }} Rate</span
                        >
                        <v-layout wrap>
                          <v-flex xs12 py-1>
                            <!-- <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Start date :
                            </span> -->
                            <span
                              v-if="items.startDate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                            >
                              ( {{ formatDate(items.startDate) }} -
                              {{ formatDate(items.endDate) }} )</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                          <v-flex xs8 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Customer rate
                            </span>
                          </v-flex>
                          <v-flex xs4 py-1>
                            <span
                              v-if="items.customerRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                            >
                              : ₹ {{ items.customerRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                          <v-flex xs8 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Extra person rate
                            </span>
                          </v-flex>
                          <v-flex xs4 py-1>
                            <span
                              v-if="items.customerExtraRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                            >
                              : ₹ {{ items.customerExtraRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>

                          <v-flex xs8 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Agent rate
                            </span>
                          </v-flex>
                          <v-flex xs4 py-1>
                            <span
                              v-if="items.agentRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                              >: ₹ {{ items.agentRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>

                          <v-flex xs8 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Agent extra rate
                            </span>
                          </v-flex>
                          <v-flex xs4 py-1>
                            <span
                              v-if="items.agentExtraRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                              >: ₹ {{ items.agentExtraRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap mt-4 v-if="Item1.mealPlan">
                    <v-flex
                      xs12
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 18px;
                      "
                      >Meal Plan</v-flex
                    >
                    <v-flex xs12 v-if="IsMealplan2 == false"
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >No meal plan added</span
                      ></v-flex
                    >

                    <v-flex
                      xs12
                      sm2
                      py-4
                      px-2
                      v-if="Item1.mealPlan.welcomeDrink == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item1.mealPlan.lunch == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item1.mealPlan.teaOrsnacks == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item1.mealPlan.dinner == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item1.mealPlan.breakfast == true"
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
                              font-family: RobotoRegular;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Breakfast</span
                          ></v-flex
                        >
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item v-if="HouseboatData.isNightStay==true" style="background-color: white">
              <v-card color="basil" flat>
                <v-card-text>
                  <v-layout wrap justify-start>
                    <v-flex xs12 sm3>
                      <v-layout wrap>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Boat type
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.houseBoatType"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.houseBoatType }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Check in time
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.checkInTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.checkInTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Check out time
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.checkOutTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.checkOutTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max capacity
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.maxCapacityOfBoat"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.maxCapacityOfBoat }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Min capacity
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.minCapacityOfBoat"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.minCapacityOfBoat }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max boat capacity
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.maxCapacityOfBoat"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.maxCapacityOfBoat }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm3>
                      <v-layout wrap>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max person/room
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.maxPersonPerRoom"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.maxPersonPerRoom }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Day 1 check-in
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.firstDayStartTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.firstDayStartTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Day 1 check-out
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.firstDayEndTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.firstDayEndTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Day 2 check-in
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.secondDayStartTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.secondDayStartTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs8 py-1>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Day 2 check-out
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item3.secondDayEndTime"
                            style="
                              color: black;
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item3.secondDayEndTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex
                      xs12
                      sm3
                      v-for="(items, i) in Item3.package"
                      :key="i"
                    >
                      <v-card
                        elevation="0"
                        color="#fff5d9"
                        style="border-color: rgba(255, 98, 0, 1)"
                        class="mx-2 pa-2"
                      >
                        <span
                          style="
                            font-family: LexendFont;
                            font-weight: 400;
                            font-size: 17px;
                            color: grey;
                          "
                          >{{ items.packageType }} Rate</span
                        >
                        <v-layout wrap>
                          <v-flex xs12 py-1>
                            <span
                              v-if="items.startDate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                            >
                              ( {{ formatDate(items.startDate) }} -
                              {{ formatDate(items.endDate) }} )</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                          <v-flex xs8 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Customer rate
                            </span>
                          </v-flex>
                          <v-flex xs4 py-1>
                            <span
                              v-if="items.customerRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                            >
                              : ₹ {{ items.customerRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                          <v-flex xs8 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Extra person rate
                            </span>
                          </v-flex>
                          <v-flex xs4 py-1>
                            <span
                              v-if="items.customerExtraRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                            >
                              : ₹ {{ items.customerExtraRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>

                          <v-flex xs8 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Agent rate
                            </span>
                          </v-flex>
                          <v-flex xs4 py-1>
                            <span
                              v-if="items.agentRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                              >: ₹ {{ items.agentRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>

                          <v-flex xs8 py-1>
                            <span
                              style="
                                font-family: LexendFont;
                                font-weight: 400;
                                font-size: 17px;
                              "
                              >Agent extra rate
                            </span>
                          </v-flex>
                          <v-flex xs4 py-1>
                            <span
                              v-if="items.agentExtraRate"
                              style="
                                font-family: LexendFont;
                                font-weight: 300;
                                font-size: 16px;
                              "
                              >: ₹ {{ items.agentExtraRate }}</span
                            >
                            <span v-else>-</span>
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  <v-layout wrap mt-4 v-if="Item3.mealPlan">
                    <v-flex
                      xs12
                      style="
                        font-family: LexendFont;
                        font-weight: 400;
                        font-size: 18px;
                      "
                      >Meal Plan</v-flex
                    >
                    <v-flex xs12 v-if="IsMealplan2 == false"
                      ><span
                        style="
                          font-family: RobotoRegular;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >No meal plan added</span
                      ></v-flex
                    >

                    <v-flex
                      xs12
                      sm2
                      py-4
                      px-2
                      v-if="Item3.mealPlan.welcomeDrink == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item3.mealPlan.lunch == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item3.mealPlan.teaOrsnacks == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item3.mealPlan.dinner == true"
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
                              font-family: RobotoRegular;
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
                      py-4
                      px-2
                      v-if="Item3.mealPlan.breakfast == true"
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
                              font-family: RobotoRegular;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Breakfast</span
                          ></v-flex
                        >
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
          <v-layout wrap mt-4>
            <v-flex
              xs12
              style="font-family: LexendFont; font-weight: 400; font-size: 22px"
              >Photos</v-flex
            >
            <v-flex xs12 v-if="OtherImgs">
              <v-layout wrap v-if="OtherImgs.length > 0">
                <v-flex
                  xs12
                  sm3
                  v-for="(item, i) in OtherImgs"
                  :key="i"
                  class="ma-2"
                >
                  <v-card height="223px" width="287px">
                    <img
                      width="263px"
                      height="223px"
                      :src="mediaUURL + item"
                      style="cursor: pointer"
                      contain
                    />
                  </v-card>
                </v-flex>
                <v-flex @click="$router.push('/ImageGallery?id='+$route.query.id)"  xs12 sm1 class="mr-2" align-self-center text-center>
              <span
                style="
                  font-family: RobotoRegular;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(241, 115, 67, 1);
                "  
                >View All <v-icon small>mdi-arrow-right</v-icon></span
              ></v-flex
            >
              </v-layout>
              <v-layout wrap v-else>
                <v-flex xs12>
                  <span
                    style="
                      font-family: RobotoRegular;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No images found</span
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog width="600px" v-model="editDialog">
          <v-card width="600px" class="pa-4">
            <v-layout wrap justify-center>
                <v-flex xs11 text-center><span style="color:#002635;font-family:LexendFont;font-size:25px;font-weight:400">Edit Houseboat</span></v-flex>
                <v-flex xs1 text-right>
                  <v-icon
                  @click="editDialog = false"
                    color="#002635"
                    >mdi-close-box</v-icon
                  ></v-flex
                >
                <v-flex xs8 text-center py-4 >
              <v-divider></v-divider>
            </v-flex>
              </v-layout>
              <v-layout wrap justify-start>
                <v-flex xs12 sm12>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm10 text-left>
                      <span class="title2">Houseboat Name</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="curItem.houseBoatName"
                        placeholder="Houseboat Name"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Total Rooms</span>
                      <v-text-field
                        dense
                        v-model="curItem.totalRooms"
                        outlined
                        type="number"
                        placeholder="Total Rooms"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Category</span>
                      <v-select
                        hide-details="auto"
                        v-model="curItem.category"
                        :items="['Luxuary', 'Premium', 'Delux']"
                        :menu-props="{ maxHeight: '400' }"
                        Placeholder="Category"
                        outlined
                        persistent-hint
                        dense
                      ></v-select>
                    </v-flex>
                 
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Additional Rules</span>
                      <v-textarea
                        dense
                        v-model="curItem.addionalRules"
                        outlined
                        type="text"
                        placeholder="Rules"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-textarea>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <!-- <v-flex xs12 sm6>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm10>
                      <span class="title2">{{curItem.expiryType}}</span>
                      <v-radio-group
                        dense
                        v-model="curItem.expiryType"
                        row
                        class="mt-0 pt-0"
                        hide-details="auto"
                      >
                        <v-radio
                          label="License Expiry"
                          value="licenseExpiry"
                        ></v-radio>
                        <v-radio
                          label="Insurance Expiry"
                          value="insuranceExpiry"
                        ></v-radio>
                      </v-radio-group>
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="curItem.expiryDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="curItem.expiryDate"
                            placeholder="Expiry Date"
                            background-color="white"
                            outlined
                            color="#182444"
                            readonly
                            hide-details
                            clearable
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="curItem.expiryDate"
                          no-title
                          scrollable
                          @change="$refs.menu2.save(curItem.expiryDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="font3">Boat License/Insurance</span
                      ><span style="color: rgba(241, 115, 67, 1)">*</span
                      ><span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          color: grey;
                        "
                        >front & back side in single file</span
                      >
                      <v-file-input
                      ref="fileInput2"
                        label="File input"
                        outlined
                        dense
                        hide-details="auto"
                        v-model="boatLicenseProof"
                        @change="getFiles"
                      >
                        <template v-slot:append>
                          <v-btn
                            dense
                            class="hidden-xs-only btnstly"
                            small
                            @click="openFileInput2"
                            ><span style="color: white"
                              >Choose File</span
                            ></v-btn
                          >
                        </template>
                      </v-file-input>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="font3">Owner/Lease Document </span
                      ><span style="color: rgba(241, 115, 67, 1)">*</span
                      ><span
                        style="
                          font-family: LexendFont;
                          font-size: 14px;
                          font-weight: 300;
                          color: grey;
                        "
                        >(front & back side in single file)</span
                      >
                      <v-file-input
                      ref="fileInput"
                        label="File input"
                        outlined
                        dense
                        hide-details="auto"
                        v-model="leaseProof"
                        @change="getFiles2"
                      >
                        <template v-slot:append>
                          <v-btn
                            dense
                            class="hidden-xs-only btnstly"
                            small
                            @click="openFileInput"
                            ><span style="color: white"
                              >Choose File</span
                            ></v-btn
                          >
                        </template>
                      </v-file-input>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Facilities</span>
                      <v-layout wrap>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Air condition</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="curItem.facilities.airCondition"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Kettle</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="curItem.facilities.kettle"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Parking</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="curItem.facilities.parking"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Rest rooms</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="curItem.facilities.restrooms"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Life Jacket</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="curItem.facilities.lifeJacket"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Wi-Fi</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="curItem.facilities.wifi"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >TV</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="curItem.facilities.television"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Swiming Pool</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="curItem.facilities.swimmingPool"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex> -->
              </v-layout>
            <v-card-actions class="pt-3">
              <v-spacer></v-spacer>
              <v-btn
                color="#002635"
                class="body-2 font-weight-bold"
                dark
                @click="editHouseboat()"
                >Edit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog width="800px" v-model="EditTrip1">
          <v-card width="800px" class="pa-4">
            <v-layout wrap justify-center>
                <v-flex xs11 text-center><span style="color:#002635;font-family:LexendFont;font-size:25px;font-weight:400">Edit Day Cruise</span></v-flex>
                <v-flex xs1 text-right>
                  <v-icon
                  @click="EditTrip1 = false"
                    color="#002635"
                    >mdi-close-box</v-icon
                  ></v-flex
                >
                <v-flex xs8 text-center py-4 >
              <v-divider></v-divider>
            </v-flex>
            </v-layout>
            <v-layout wrap justify-start>
                <v-flex xs6>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Check In Time</span>
                      <v-menu
                        ref="menu4"
                        v-model="menu4"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="editItem1.checkInTime"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editItem1.checkInTime"
                            readonly
                            outlined
                            dense
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu4"
                          v-model="editItem1.checkInTime"
                          full-width
                          @click:minute="$refs.menu4.save(editItem1.checkInTime)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Maximum Person In a Trip</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="editItem1.maxPersonTrip"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Houseboat Type</span>
                      <v-select
                        hide-details="auto"
                        v-model="editItem1.houseBoatType"
                        :items="['Private', 'Sharing']"
                        :menu-props="{ maxHeight: '400' }"
                        outlined multiple
                        persistent-hint
                        dense
                      ></v-select>
                    </v-flex>
                    <!-- <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Meal Plan</span>
                      <v-layout wrap>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Welcome Drink</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="editItem1.mealPlan.welcomeDrink"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Lunch</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="editItem1.mealPlan.lunch"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Dinner</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="editItem1.mealPlan.dinner"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Breakfast</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="editItem1.mealPlan.breakfast"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                        <v-flex xs3 pb-2>
                          <span
                            class="title3"
                            style="color: rgba(80, 80, 80, 1)"
                            >Tea/Coffee,Snacks</span
                          >
                          <v-switch
                            class="mt-0"
                            v-model="editItem1.mealPlan.teaOrsnacks"
                            hide-details
                            inset
                            color="#F17343"
                          ></v-switch>
                        </v-flex>
                      </v-layout>
                    </v-flex> -->
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout wrap justify-center>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Check Out time</span>
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="editItem1.checkOutTime"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editItem1.checkOutTime"
                            readonly
                            outlined
                            dense
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu3"
                          v-model="editItem1.checkOutTime"
                          full-width
                          @click:minute="$refs.menu3.save(editItem1.checkOutTime)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Minimum Person In a Trip</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="editItem1.minPersonTrip"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <!-- <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Houseboat Type</span>
                      <v-select
                        hide-details="auto"
                        v-model="editItem1.houseBoatType"
                        :items="['Private', 'Sharing']"
                        :menu-props="{ maxHeight: '400' }"
                        outlined
                        persistent-hint
                        dense
                      ></v-select>
                    </v-flex> -->
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Maximum capacity of boat</span>
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="editItem1.maxCapacityOfBoat"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              
              </v-layout>
              <v-layout wrap justify-center>
                <v-flex xs10 py-2><v-divider></v-divider></v-flex>
              </v-layout>
              <v-layout wrap justify-start>
                <v-flex xs6>
                  <v-layout wrap justify-center>
                    <v-flex xs10 text-left py-2>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >OFF-SEASONAL RATE</span
                      >
                    </v-flex>
                    <v-flex xs12 sm10 text-left>
                      <span class="title2">Start Date</span>
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="DayoffSeasonedit.startDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="DayoffSeasonedit.startDate"
                            outlined
                            readonly
                            dense
                            hide-details="auto"
                            clearable
                            class="rounded-0"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="DayoffSeasonedit.startDate"
                          no-title
                          scrollable
                          @change="$refs.menu.save(DayoffSeasonedit.startDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">End Date</span>
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="DayoffSeasonedit.endDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="DayoffSeasonedit.endDate"
                            outlined
                            readonly
                            dense
                            hide-details="auto"
                            clearable
                            class="rounded-0"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="DayoffSeasonedit.endDate"
                          no-title
                          scrollable
                          @change="$refs.menu2.save(DayoffSeasonedit.endDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2 pr-2">Customer Rate</span>
                      <!-- <span
                        style="
                          font-family: LexendFont;
                          font-size: 15px;
                          font-weight: 300;
                        "
                        >(Per Head)</span
                      > -->
                      <v-text-field
                        dense
                        outlined
                        type="number"
                        v-model="DayoffSeasonedit.customerRate"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Agent rate</span>
                      <!-- <span
                        style="
                          font-family: LexendFont;
                          font-size: 15px;
                          font-weight: 300;
                        "
                        >(Per Head)</span
                      > -->
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="DayoffSeasonedit.agentRate"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout wrap justify-center>
                    <v-flex xs10 text-left py-2>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >SEASONAL RATE</span
                      >
                    </v-flex>
                    <v-flex xs12 sm10 text-left>
                      <span class="title2">Start Date</span>
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :return-value.sync="DaySeasonedit.startDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="DaySeasonedit.startDate"
                            outlined
                            readonly
                            dense
                            hide-details="auto"
                            clearable
                            class="rounded-0"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="DaySeasonedit.startDate"
                          no-title
                          scrollable
                          @change="$refs.menu3.save(DaySeasonedit.startDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">End Date</span>
                      <v-menu
                        ref="menu4"
                        v-model="menu4"
                        :close-on-content-click="false"
                        :return-value.sync="DaySeasonedit.endDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="DaySeasonedit.endDate"
                            outlined
                            readonly
                            dense
                            hide-details="auto"
                            clearable
                            class="rounded-0"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="DaySeasonedit.endDate"
                          no-title
                          scrollable
                          @change="$refs.menu4.save(DaySeasonedit.endDate)"
                        >
                          <v-spacer></v-spacer>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2 pr-2">Customer Rate</span>
                      <!-- <span
                        style="
                          font-family: LexendFont;
                          font-size: 15px;
                          font-weight: 300;
                        "
                        >(Per Head)</span
                      > -->
                      <v-text-field
                        dense
                        outlined
                        type="number"
                        v-model="DaySeasonedit.customerRate"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm10 pt-4 text-left>
                      <span class="title2">Agent rate</span>
                      <!-- <span
                        style="
                          font-family: LexendFont;
                          font-size: 15px;
                          font-weight: 300;
                        "
                        >(Per Head)</span
                      > -->
                      <v-text-field
                        dense
                        outlined
                        type="text"
                        v-model="DaySeasonedit.agentRate"
                        :rules="[rules.required]"
                        hide-details="auto"
                      >
                      </v-text-field>
                    </v-flex>
                    
                  </v-layout>
                </v-flex>
              </v-layout>
            <v-card-actions class="pt-3">
              <v-spacer></v-spacer>
              <v-btn
                color="#002635"
                class="body-2 font-weight-bold"
                dark
                @click="TripEdit()"
                >Edit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
  </div>
</template> 
<script>
import axios from "axios";
export default {
  data() {
    return {
      showsnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      HouseboatData: [],
      boatLicenseProof: "",
      attachments: null,
      leaseProof: "",
      attachments2: null,
      formData: new FormData(),
      menu2:false,
      menu:false,
      tripDetails: [],
      tab: null,
      msg: null,
      page: 1,
      limit: 20,
      deleteialog: false,
      deleteId: "",
      editDialog: false,
      EditTrip1:false,
      editItem1:{},
      EditTrip2:false,
      editItem2:{},
      curItem: {},
      Item1: [],
      Item2: [],
      Item3: [],
      IsMealplan: true,
      IsMealplan2: true,
      Isfacility: true,
      FacilitiesData: {},
      OtherImgs:[],
      moreimg:false,
      DaySeasonedit:{},
      DayoffSeasonedit:{},
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      phoneRules: [
        (v) => !!v || "phone is required",
        (v) => (v && v.length <= 10) || "invalid number",
        (v) => (v && v.length >= 10) || "invalid number",
        (v) => /^\d{10}$/.test(v) || "phone number must be a number",
      ],
      menu4:false,
      menu3:false,
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    page() {
      this.getData();
    },
  },
  methods: {
    openFileInput() {
    // Trigger a click event on the file input element
    this.$refs.fileInput.$el.querySelector('input').click();
  },
  openFileInput2() {
    // Trigger a click event on the file input element
    this.$refs.fileInput2.$el.querySelector('input').click();
  },
   getFiles() {
      var selectedFiles = this.boatLicenseProof;
      console.log("img=", this.boatLicenseProof);
      if (this.boatLicenseProof) {
        this.msg = null;
        this.attachments = selectedFiles;
        console.log("attachments=", this.attachments);
      }
    },
    getFiles2() {
      // this.categoryImg = this.Image
      var selectedFiles2 = this.leaseProof;
      console.log("img=", this.leaseProof);
      if (this.leaseProof) {
        this.msg = null;
        this.attachments2 = selectedFiles2;
        console.log("attachments2=", this.attachments2);
      }
    },
    getData() {
      this.appLoading = true;
      axios({
        url: "/houseboat/get",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          id: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.HouseboatData = response.data.data;
          this.OtherImgs = this.HouseboatData.propertyImages;

          if (this.OtherImgs && this.OtherImgs.length > 7) {
            this.OtherImgs = this.OtherImgs.slice(0, 7);
            this.moreimg=true;
          }
          this.FacilitiesData = this.HouseboatData.facilities;
          console.log("FacilitiesData=", this.FacilitiesData);
          if (this.FacilitiesData) {
            var allFalse4 = Object.values(this.FacilitiesData).every(function (
              value
            ) {
              return !value;
            });

            this.Isfacility = !allFalse4;
            console.log("Isfacility=", this.Isfacility);
          } else {
            // Handle the case when this.HouseboatData.facilities is undefined
            console.log("Facilities data is undefined.");
          }
          this.tripDetails = response.data.trip;
          if (this.tripDetails) {
            if (this.tripDetails.length > 0) {
              for (var i = 0; i < this.tripDetails.length; i++) {
                if (this.tripDetails[i].tripType == "DayCriuse") {
                  this.Item1 = this.tripDetails[i];
                  console.log("item1=",this.Item1);
                  if (this.Item1.mealPlan) {
                    var allFalse = Object.keys(this.Item1.mealPlan).every(
                      function (key) {
                        return !this.Item1.mealPlan[key];
                      },
                      this
                    );

                    this.IsMealplan = !allFalse;
                    console.log("IsMealplan=", this.IsMealplan);
                  }
                }
                if (this.tripDetails[i].tripType == "OverNight") {
                  this.Item2 = this.tripDetails[i];
                  console.log("Item2=",this.Item2);

                  if (this.Item2.mealPlan) {
                    var allFalse2 = Object.keys(this.Item2.mealPlan).every(
                      function (key) {
                        return !this.Item2.mealPlan[key];
                      },
                      this
                    );

                    this.IsMealplan2 = !allFalse2;
                    console.log("IsMealplan2=", this.IsMealplan2);
                  }
                }
                if (this.tripDetails[i].tripType == "NightStay") {
                  this.Item3 = this.tripDetails[i];
                  
                  console.log("Item3=",this.Item3);
                }
              }
            }
          }
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    editHouseboat() {
      var facilities = {};
      facilities.airCondition = this.curItem.facilities.airCondition;
      facilities.kettle = this.curItem.facilities.kettle;
      facilities.parking = this.curItem.facilities.parking;
      facilities.restrooms = this.curItem.facilities.restrooms;
      facilities.lifeJacket = this.curItem.facilities.lifeJacket;
      facilities.wifi = this.curItem.facilities.wifi;
      facilities.television = this.curItem.facilities.television;
      facilities.swimmingPool = this.curItem.facilities.swimmingPool;

      axios({
        method: "POST",
        url: "/houseboat/edit",
        data: {
          houseBoatName: this.curItem.houseBoatName,
          totalRooms: this.curItem.totalRooms,
          category: this.curItem.category,
          addionalRules: this.curItem.addionalRules,
          // expiryType: this.curItem.expiryType,
          expiryDate: this.curItem.expiryDate,
          facilities: facilities,
          id:this.curItem._id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.status) {
          this.msg = response.data.msg;
          this.showSnackBar = true;
         this.curItem={};
         this.editDialog=false;
         this.getData();
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
      // }
    },
    // TripEdit() {
    //   // var mealPlan = {};
    //   // mealPlan.welcomeDrink = this.welcomeDrink;
    //   // mealPlan.lunch = this.lunch;
    //   // mealPlan.teaOrsnacks = this.teaOrsnacks;
    //   // mealPlan.dinner = this.dinner;
    //   // mealPlan.breakfast = this.breakfast;

    //   var Newarr = [this.DaySeasonedit, this.DayoffSeasonedit];
    //   axios({
    //     method: "POST",
    //     url: "/houseboat/trip/edit",
    //     data: {
    //       checkInTime: this.editItem1.checkInTime,
    //       checkOutTime: this.editItem1.checkOutTime,
    //       maxCapacityOfBoat: this.editItem1.maxCapacityOfBoat,
    //       maxPersonTrip: this.editItem1.maxPersonTrip,
    //       minPersonTrip: this.editItem1.minPersonTrip,
    //       houseBoatType: this.editItem1.houseBoatType,
    //       // mealPlan: mealPlan,
    //       tripId: this.editItem1._id,
    //       tripType: "DayCriuse",
    //       packageDetails: Newarr,
    //     },
    //     headers: {
    //       token: localStorage.getItem("token"),
    //     },
    //   }).then((response) => {
    //     if (response.data.status) {
    //       this.msg = response.data.msg;
    //       this.snackbar = true;
    //       var tripId = response.data.data._id;
    //       console.log("tripId=", tripId);
    //       this.$router.push('/AddDaycruiseSeasonalRate?name='+this.$route.query.name+'&&id=' + tripId);
    //     } else {
    //       this.msg = response.data.msg;
    //       this.snackbar = true;
    //     }
    //   });
    //   // }
    // },
   
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
  },
};
</script>
<style scoped>
.gr1 {
  background: linear-gradient(
    to bottom,
    rgba(255, 125, 20, 1),
    rgba(241, 115, 67, 1)
  );
}
.gr2 {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}
/* .basil {
  background-color: #FFFBE6 !important;
} */
.basil--text {
  color: #356859 !important;
}
</style>