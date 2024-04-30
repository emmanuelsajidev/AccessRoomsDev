<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#FF681F"
      spinner="spinner"
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
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center>
      <v-flex xs12 align-self-center>
        <v-card tile class="pa-0 pa-md-4">
          <v-layout wrap>
            <v-flex xs12 class="hidden-sm-and-down" v-if="HouseboatData">
              <v-img
                cover
                v-if="HouseboatData.coverImage"
                :src="mediaURLnewx + HouseboatData.coverImage"
                contain
                ><template v-slot:placeholder>
                  <ImageLoader />
                </template>
                <v-layout justify-start fill-height>
                  <v-flex xs3 md2 align-self-end mb-4 ml-8>
                    <v-card
                      class="pa-1"
                      height="110px"
                      width="150px"
                      v-if="HouseboatData.propertyImages"
                    >
                      <v-img
                        height="100%"
                        width="100%"
                        v-if="HouseboatData.propertyImages.length > 0"
                        :src="mediaURLnewx + HouseboatData.propertyImages[0]"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                      <v-img
                        height="100%"
                        v-else
                        src="./../../assets/Images/noimg.png"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex xs8 align-self-end mb-4>
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 500;
                        font-size: 22px;
                        color: white;
                      "
                      v-if="HouseboatData.shikaraName"
                      >{{ HouseboatData.shikaraName }}</span
                    >
                  </v-flex>
                  <v-flex xs2 align-self-end text-right mb-4 pr-8>
                    <v-btn
                      style="border-radius: 2px"
                      color="grey"
                      @click="
                        $router.push('/EditShikara?id=' + $route.query.id)
                      "
                    >
                      <span
                        style="
                          font-family: mainfont;
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
                width="1251px"
                :height="
                  $vuetify.breakpoint.name == 'xs' ||
                  $vuetify.breakpoint.name == 'sm'
                    ? '600px'
                    : $vuetify.breakpoint.name == 'md'
                    ? '600px'
                    : $vuetify.breakpoint.name == 'lg'
                    ? '300px'
                    : '300px'
                "
                src="./../../assets/Images/noimg.png"
              >
                <v-layout justify-start fill-height>
                  <v-flex xs12 sm2 align-self-end mb-4 ml-4>
                    <v-card
                      class="pa-1"
                      height="110px"
                      width="110px"
                      v-if="HouseboatData.propertyImages"
                    >
                      <v-img
                        height="110px"
                        cover
                        v-if="HouseboatData.propertyImages.length > 0"
                        :src="mediaURLnewx + HouseboatData.propertyImages[0]"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                      <v-img
                        height="100%"
                        v-else
                        src="./../../assets/Images/noimg.png"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex xs8 align-self-end mb-4>
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 500;
                        font-size: 22px;
                        color: white;
                      "
                      v-if="HouseboatData.shikaraName"
                      >{{ HouseboatData.shikaraName }}</span
                    >
                  </v-flex>
                  <v-flex xs2 align-self-end text-right mb-4 pr-8>
                    <v-btn
                      style="border-radius: 2px"
                      color="grey"
                      @click="
                        $router.push('/EditShikara?id=' + $route.query.id)
                      "
                    >
                      <span
                        style="
                          font-family: mainfont;
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
            </v-flex>
            <v-flex xs12 class="hidden-md-and-up" v-if="HouseboatData">
              <v-img
                cover
                height="200px"
                v-if="HouseboatData.coverImage"
                :src="mediaURLnewx + HouseboatData.coverImage"
                ><template v-slot:placeholder>
                  <ImageLoader />
                </template>
                <v-layout justify-start fill-height>
                  <v-flex
                    xs3
                    sm2
                    align-self-end
                    ma-1
                    v-if="HouseboatData.propertyImages"
                  >
                    <v-card class="pa-0" height="50px" contain>
                      <v-img
                        height="100%"
                        width="100%"
                        v-if="HouseboatData.propertyImages.length > 0"
                        :src="mediaURLnewx + HouseboatData.propertyImages[0]"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                      <v-img
                        height="100%"
                        v-else
                        src="./../../assets/Images/noimg.png"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex xs9 align-self-end mb-4>
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 500;
                        font-size: 16px;
                        color: white;
                      "
                      v-if="HouseboatData.shikaraName"
                      >{{ HouseboatData.shikaraName }}</span
                    >
                  </v-flex>
                  <v-flex xs2 align-self-end text-right mb-4 pr-8>
                    <v-btn
                      style="border-radius: 2px"
                      text
                      @click="
                        $router.push('/EditShikara?id=' + $route.query.id)
                      "
                    >
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 600;
                          font-size: 15px;
                          color: white;
                        "
                        ><v-icon>mdi-pencil</v-icon></span
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-img>
              <v-img
                v-else
                height="200px"
                width="1251px"
                src="./../../assets/Images/noimg.png"
              >
                <v-layout justify-start fill-height>
                  <v-flex
                    xs3
                    sm2
                    align-self-end
                    ma-1
                    v-if="HouseboatData.propertyImages"
                  >
                    <v-card class="pa-0" height="50px" contain>
                      <v-img
                        height="100%"
                        width="100%"
                        v-if="HouseboatData.propertyImages.length > 0"
                        :src="mediaURLnewx + HouseboatData.propertyImages[0]"
                        contain
                      ></v-img>
                      <v-img
                        height="100%"
                        v-else
                        src="./../../assets/Images/noimg.png"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                      <!-- <v-img
                v-else
                height="100%"
                        width="100%"
                src="./../../assets/images/noimg.png"
              > -->
                    </v-card>
                  </v-flex>
                  <v-flex xs9 align-self-end mb-4>
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 500;
                        font-size: 16px;
                        color: white;
                      "
                      v-if="HouseboatData.shikaraName"
                      >{{ HouseboatData.shikaraName }}</span
                    >
                  </v-flex>
                  <v-flex xs2 align-self-end text-right mb-4 pr-8>
                    <v-btn
                      style="border-radius: 2px"
                      text
                      @click="
                        $router.push('/EditShikara?id=' + $route.query.id)
                      "
                    >
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 600;
                          font-size: 15px;
                          color: white;
                        "
                        ><v-icon>mdi-pencil</v-icon></span
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-img>
            </v-flex>
          </v-layout>
          <v-layout
            wrap
            style="background-color: rgba(245, 242, 240, 1)"
            pa-4
            my-4
          >
            <v-flex xs12>
              <v-layout wrap justify-center pa-4 class="mainfont" fill-height>
                <v-flex pr-3 xs12 sm3 lg2 align-self-center>
                  <v-btn block @click="approve = true" color="green">
                    <span style="color: aliceblue"> APPROVE </span>
                  </v-btn>
                </v-flex>
                <v-flex pr-3 xs12 sm3 lg2 pt-3 pt-lg-0 align-self-center>
                  <v-btn block color="orange" @click="block = true">
                    <span style="color: aliceblue"> BLOCK </span>
                  </v-btn>
                </v-flex>
                <v-flex pr-3 xs12 sm3 lg2 pt-3 pt-lg-0 align-self-center>
                  <v-btn block color="red" @click="reject = true">
                    <span style="color: aliceblue"> REJECT </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout justify-start wrap px-4>
            <v-flex xs12 sm8>
              <v-layout wrap justify-start pt-2>
                <v-flex
                  v-if="HouseboatData.addionalRules"
                  xs12
                  px-2
                  style="
                    font-family: mainfont;
                    font-weight: 400;
                    font-size: 18px;
                  "
                  >Additional Rules</v-flex
                >
                <v-flex xs12 px-2 text-left v-if="HouseboatData.addionalRules">
                  <span
                    style="
                      font-family: mainfont;
                      font-weight: 300;
                      font-size: 16px;
                      color: black;
                    "
                  >
                    {{ HouseboatData.addionalRules }}
                  </span>
                </v-flex>
              </v-layout>
            </v-flex></v-layout
          >
          <v-layout justify-start wrap v-if="isTrip == true" px-4>
            <v-flex xs12>
              <!-- <v-layout wrap mt-4 v-if="tripDetails.mealPlan">
                    <v-flex
                      xs12 px-2
                      style="
                        font-family: mainfont;
                        font-weight: 400;
                        font-size: 18px;
                      "
                      >Meal Plan</v-flex
                    >
                    <v-flex xs12 v-if="IsMealplan == false" pb-2 px-2
                      ><span
                        style="
                          font-family: mainfont;
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
                      v-if="tripDetails.mealPlan.welcomeDrink == true"
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
                              font-family: mainfont;
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
                      v-if="tripDetails.mealPlan.lunch == true"
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
                              font-family: mainfont;
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
                      v-if="tripDetails.mealPlan.teaOrsnacks == true"
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
                              font-family: mainfont;
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
                      v-if="tripDetails.mealPlan.dinner == true"
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
                              font-family: mainfont;
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
                      v-if="tripDetails.mealPlan.breakfast == true"
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
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 16px;
                            "
                            >Breakfast</span
                          ></v-flex
                        >
                      </v-layout>
                    </v-flex>
                  </v-layout> -->
              <v-layout wrap justify-start>
                <v-flex xs12 sm12 text-left>
                  <v-layout wrap v-if="tripDetails">
                    <v-flex xs12 sm2 md3 align-self-center text-left px-2>
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Pickup/Drop Location :</span
                      ><br />
                      <span
                        v-if="HouseboatData.startingLocation"
                        style="
                          font-family: mainfont;
                          font-weight: 300;
                          font-size: 16px;
                          color: black;
                        "
                      >
                        {{ HouseboatData.startingLocation.name }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                    <!-- <v-flex xs12 sm2 align-self-center text-left px-2>
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Drop location :</span
                      ><br />
                      <span
                        v-if="tripDetails.dropLocation"
                        style="
                          color: black;
                          font-family: mainfont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                        {{ tripDetails.dropLocation }}</span
                      >
                      <span v-else>-</span>
                    </v-flex> -->
                    <v-flex xs12 sm3 md2 align-self-center text-left px-2>
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Max.capacity : </span
                      ><br />
                      <span
                        v-if="tripDetails.maxCapacityOfBoat"
                        style="
                          color: black;
                          font-family: mainfont;
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
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Min.capacity : </span
                      ><br />
                      <span
                        v-if="tripDetails.minCapacityOfBoat"
                        style="
                          color: black;
                          font-family: mainfont;
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
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Min hours :</span
                      ><br />
                      <span
                        v-if="tripDetails.minimumHour"
                        style="
                          color: black;
                          font-family: mainfont;
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
                <v-flex
                  xs12
                  sm10
                  px-2
                  align-self-center
                  style="
                    font-family: mainfont;
                    font-weight: 400;
                    font-size: 18px;
                  "
                  >Packages</v-flex
                >
                <!-- <v-flex xs12 sm2 py-2 pr-0 pr-md-2 align-self-end>
                  <v-btn
                    color="rgba(255, 98, 0, 1)"
                    small
                    block
                    dark
                    @click="
                      $router.push(
                        '/ShikaraSpecialRate?boatId=' +
                          $route.query.id +
                          '&&id=' +
                          tripDetails._id
                      )
                    "
                    ><span
                      style="
                        color: white;
                        font-weight: 500;
                        font-size: 14px;
                        font-family: mainfont;
                      "
                      >Add special rate</span
                    ></v-btn
                  >
                </v-flex> -->
                <v-flex xs12 px-2 v-if="tripDetails.package">
                  <v-card
                    elevation="0"
                    pa-1
                    outlined
                    v-if="tripDetails.package.length > 0"
                  >
                    <v-simple-table
                      style="
                        font-family: mainfont;
                        font-weight: 300;
                        font-size: 16px;
                      "
                    >
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left tablefont"><b>S.No.</b></th>
                            <th class="text-left tablefont"><b>Type</b></th>
                            <th class="text-left tablefont">
                              <b>Start date</b>
                            </th>
                            <th class="text-left tablefont"><b>End date</b></th>
                            <th class="text-left tablefont">
                              <b>Customer rate (₹)</b>
                            </th>
                            <th class="text-left tablefont">
                              <b>Agent rate (₹)</b>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(value, i) in tripDetails.package"
                            :key="i"
                            class="table"
                          >
                            <td>
                              <span v-if="page == 1">
                                {{ i + 1 }}
                              </span>
                              <span v-else>
                                {{ i + 1 + 20 * (page - 1) }}
                              </span>
                            </td>
                            <td>
                              <span v-if="value.packageType">{{
                                value.packageType
                              }}</span>
                              <span v-else>-</span>
                            </td>
                            <td>
                              <span v-if="value.startDate">{{
                                formatDate(value.startDate)
                              }}</span>
                              <span v-else>-</span>
                            </td>
                            <td>
                              <span v-if="value.endDate">{{
                                formatDate(value.endDate)
                              }}</span>
                              <span v-else>-</span>
                            </td>

                            <td>
                              <span v-if="value.customerRate"
                                >{{ value.customerRate }} ({{
                                  value.customerRateCommission
                                }})</span
                              >
                              <span v-else>-</span>
                            </td>
                            <td>
                              <span v-if="value.agentRate"
                                >{{ value.agentRate }} ({{
                                  value.agentRateCommission
                                }})</span
                              >
                              <span v-else>-</span>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-flex>
                <v-flex xs12 px-2 v-else>
                  <span
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No available packages</span
                  >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout justify-start wrap pl-5 v-if="isTrip == false" pt-1>
            <v-flex xs12>
              <span
                style="font-family: mainfont; font-weight: 400; font-size: 16px"
                >No trip added</span
              >
            </v-flex></v-layout
          >
          <v-layout wrap pl-5 justify-center justify-md-start>
            <v-flex
              xs12
              style="font-family: mainfont; font-weight: 400; font-size: 22px"
              >Photos</v-flex
            >
            <v-flex xs12 sm10 v-if="OtherImgs">
              <v-layout wrap v-if="OtherImgs.length > 0">
                <v-flex
                  xs12
                  sm4
                  md3
                  v-for="(item, i) in OtherImgs"
                  :key="i"
                  class="pa-1"
                >
                  <img
                    :src="mediaURLnewx + item"
                    style="object-fit: cover"
                    height="200px"
                    width="200px"
                  />
                </v-flex>
                <v-flex
                  @click="$router.push('/shikaraGallery?id=' + $route.query.id)"
                  xs12
                  sm1
                  class="mr-2"
                  align-self-center
                  text-center
                >
                  <span
                    style="
                      font-family: mainfont;
                      font-weight: 600;
                      font-size: 10px;
                      color: rgba(241, 115, 67, 1);
                      cursor: pointer;
                    "
                    >View All <v-icon small>mdi-arrow-right</v-icon></span
                  ></v-flex
                >
              </v-layout>
              <v-layout wrap v-else>
                <v-flex xs12>
                  <span
                    style="
                      font-family: mainfont;
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
    <v-dialog :retain-focus="true" persistent v-model="block" max-width="600px">
      <v-card>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-title
              class="mainfont"
              style="color: black; font-size: 18px; font-weight: lighter"
            >
              Are you sure you want to Block?
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="block = false" class="mainfont"
            >Cancel</v-btn
          >
          <v-btn
            color="red"
            class="mainfont"
            text
            @click="userAction3('Active')"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      :retain-focus="true"
      persistent
      v-model="approve"
      max-width="600px"
    >
      <v-card>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-title
              class="mainfont"
              style="color: black; font-size: 18px; font-weight: lighter"
            >
              Are you sure you want to Approve?
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="approve = false" class="mainfont"
            >Cancel</v-btn
          >
          <v-btn color="red" class="mainfont" text @click="userAction('Active')"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      :retain-focus="true"
      persistent
      v-model="reject"
      max-width="600px"
    >
      <v-card>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-title
              class="mainfont"
              style="color: black; font-size: 18px; font-weight: lighter"
            >
              Are you sure you want to Reject?
            </v-card-title>
          </v-flex>
        </v-layout>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="reject = false" class="mainfont"
            >Cancel</v-btn
          >
          <v-btn
            color="red"
            class="mainfont"
            text
            @click="userAction2('Active')"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
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
      showSnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      HouseboatData: [],
      tripDetails: [],
      tab: null,
      msg: null,
      reject: false,
      approve: false,
      block: false,
      page: 1,
      limit: 20,
      deleteialog: false,
      deleteId: "",
      editialog: false,
      editItem: {},
      Item2: [],
      Item3: [],
      IsMealplan: true,
      IsMealplan2: true,
      Isfacility: true,
      FacilitiesData: {},
      OtherImgs: [],
      moreimg: false,
      isTrip: true,
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
    userAction() {
      // this.appLoading = true;
      axios({
        method: "POST",
        url: "/shikara/approve",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          shikaraId: this.$route.query.id,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            this.$router.push("/shikaraapproved");
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    userAction2() {
      axios({
        method: "POST",
        url: "/shikara/reject",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          shikaraId: this.$route.query.id,

        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            this.$router.push("/shikaraapproved");
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    userAction3() {
      axios({
        method: "POST",
        url: "/shikara/block",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          shikaraId: this.$route.query.id,

        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            this.$router.push("/ShikaraBlocked");
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    getData() {
      this.appLoading = true;
      axios({
        url: "/shikara/get",
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
          this.tripDetails = response.data.trip;
          if (this.tripDetails.mealPlan) {
            var allFalse = Object.keys(this.tripDetails.mealPlan).every(
              function (key) {
                return !this.tripDetails.mealPlan[key];
              },
              this
            );

            this.IsMealplan = !allFalse;
            console.log("IsMealplan=", this.IsMealplan);
          }
          if (Object.keys(this.tripDetails).length === 0) {
            console.log("empty trip");
            this.isTrip = false;
          }
          this.Item3 = this.tripDetails.package;
          this.OtherImgs = this.HouseboatData.propertyImages;

          if (this.OtherImgs && this.OtherImgs.length > 4) {
            this.OtherImgs = this.OtherImgs.slice(0, 4);
            this.moreimg = true;
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
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    deleteBoat(id) {
      axios({
        url: "/shikara/delete",
        method: "get",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          id: id,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackbar = true;
            this.deleteialog = false;
            this.deleteId = "";
            this.appLoading = false;
            this.getData();
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