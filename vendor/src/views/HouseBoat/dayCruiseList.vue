<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#182444"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackBar" color="#ff6200" right top timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start py-2>
          <v-flex xs12 sm9 md10 align-self-center v-if="boatData.houseBoatId">
            <span
              v-if="boatData.houseBoatId.houseBoatName"
              class="title1"
              :style="{
                'font-size':
                  $vuetify.breakpoint.name == 'xs'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'sm'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'md'
                    ? '25px'
                    : $vuetify.breakpoint.name == 'lg'
                    ? '25px'
                    : '30px',
              }"
              >{{ boatData.houseBoatId.houseBoatName }}</span
            >
            <span
              class="pa-1 ml-2"
              style="
                border-radius: 5px;
                background-color: white;
                color: black;
                font-family: LexendFont;
                font-weight: 500;
                font-size: 15px;
                text-transform: uppercase;
              "
              >DAY CRUISE</span
            ></v-flex
          >
          <v-flex xs12 sm3 md2 py-2 pr-0 pr-md-2>
            <v-btn
              color="#ff6200"
              small
              block
              dark
              @click="
                $router.push(
                  '/DaycruiseSpecialRate?boatId=' +
                    $route.query.id +
                    '&&id=' +
                    boatData._id
                )
              "
              ><span
                style="
                  color: white;
                  font-weight: 500;
                  font-size: 14px;
                  font-family: LexendFont;
                "
                >Add special rate</span
              ></v-btn
            >
          </v-flex>
        </v-layout>
        <v-layout wrap justify-space-around pt-2>
          <v-flex xs12>
            <v-card tile class="pa-0 pa-sm-2 pa-md-8" elevation="0">
              <!-- <v-layout wrap justify-start v-if="boatData.addionalRules">
                    <v-flex xs12 py-1 text-left v-if="boatData.addionalRules">
                          <span
                          style="
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                              color: black;
                            "
                            > {{ boatData.addionalRules }}
                          </span>
                        </v-flex>
                      </v-layout> -->
              <v-layout wrap mt-4 v-if="boatData.mealPlan">
                <v-flex
                  xs8
                  md10
                  px-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 18px;
                  "
                  >Meal Plan</v-flex
                >
                <v-flex
                  text-right px-2 px-sm-0
                  xs4
                  md2
                  @click="
                    (editBoatData = true),
                      (curItem = boatData),
                      (curMel = boatData.mealPlan)
                  "
                >
                  <span
                    style="
                      color: #ff6200;
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                      cursor: pointer;
                    "
                    ><v-icon color="#ff6200" small>mdi-pencil</v-icon>Edit</span
                  >
                </v-flex>
                <v-flex xs12 v-if="IsMealplan == false"
                pl-2 ><span
                    style="
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No meal plan added</span
                  ></v-flex
                >

                <v-flex
                  xs12
                  sm2
                  py-2
                  px-2
                  v-if="boatData.mealPlan.welcomeDrink == true"
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
                          font-weight: 300;
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
                  py-2
                  px-2
                  v-if="boatData.mealPlan.lunch == true"
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
                          font-weight: 300;
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
                  py-2
                  px-2
                  v-if="boatData.mealPlan.teaOrsnacks == true"
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
                          font-weight: 300;
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
                  py-2
                  px-2
                  v-if="boatData.mealPlan.dinner == true"
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
                          font-weight: 300;
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
                  py-2
                  px-2
                  v-if="boatData.mealPlan.breakfast == true"
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
                          font-weight: 300;
                          font-size: 16px;
                        "
                        >Breakfast</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout wrap justify-start>
                <v-flex
                  xs10
                  px-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 18px;
                  "
                  >Additional rules</v-flex
                >
                <v-flex xs12 px-2 text-left v-if="boatData.addionalRules">
                  <span
                    style="
                      font-family: LexendFont;
                      font-weight: 300;
                      font-size: 16px;
                      color: black;
                    "
                  >
                    {{ boatData.addionalRules }}
                  </span>
                </v-flex>
              </v-layout>
              <v-layout wrap justify-start>
                <v-flex xs12 sm12 text-left>
                  <v-layout wrap v-if="boatData.houseBoatType">
                    <v-flex xs12 sm2 align-self-center text-left px-2>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Boat type :</span
                      >
                      <v-layout wrap v-if="boatData.houseBoatType.length > 0">
                        <v-flex
                        xs6 sm12 md6
                          v-for="(item, i) in boatData.houseBoatType"
                          :key="i"
                        >
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 300;
                              font-size: 16px;
                              color: black;
                            "
                          >
                            {{ item }}</span
                          >
                        </v-flex>
                      </v-layout>
                      <v-layout wrap v-else>
                        <v-flex xs12> <span>-</span></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm2 align-self-center text-left px-2>
                       <v-layout wrap>
                        <v-flex xs9 sm12 align-self-center>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Check in </span
                      ></v-flex>
                        <v-flex xs3 sm12 align-self-center pt-1 pt-sm-0>
                      <span
                        v-if="boatData.checkInTime"
                        style="
                          color: black;
                          font-family: LexendFont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                       : {{ boatData.checkInTime }}</span
                      >
                      <span v-else>-</span></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm2 align-self-center text-left px-2>
                       <v-layout wrap>
                        <v-flex xs9 sm12 align-self-center>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Check out </span
                      ></v-flex>
                        <v-flex xs3 sm12 align-self-center pt-1 pt-sm-0>
                      <span
                        v-if="boatData.checkOutTime"
                        style="
                          color: black;
                          font-family: LexendFont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                       : {{ boatData.checkOutTime }}</span
                      >
                      <span v-else>-</span></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm2 align-self-center text-left px-2>
                       <v-layout wrap>
                        <v-flex xs9 sm12 align-self-center>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Max person </span
                      ></v-flex>
                        <v-flex xs3 sm12 align-self-center pt-1 pt-sm-0>
                      <span
                        v-if="boatData.maxPersonTrip"
                        style="
                          color: black;
                          font-family: LexendFont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                       : {{ boatData.maxPersonTrip }}</span
                      >
                      <span v-else>-</span></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm2 align-self-center text-left px-2>
                       <v-layout wrap>
                        <v-flex xs9 sm12 align-self-center>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Min person </span
                      ></v-flex>
                        <v-flex xs3 sm12 align-self-center pt-1 pt-sm-0>
                      <span
                        v-if="boatData.minPersonTrip"
                        style="
                          color: black;
                          font-family: LexendFont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                       : {{ boatData.minPersonTrip }}</span
                      >
                      <span v-else>-</span></v-flex>
                      </v-layout>
                    </v-flex>
                    <!-- <v-flex xs12 sm2 align-self-center text-left px-2>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Boat capacity :</span
                      ><br />
                      <span
                        v-if="boatData.maxCapacityOfBoat"
                        style="
                          color: black;
                          font-family: LexendFont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                        {{ boatData.maxCapacityOfBoat }}</span
                      >
                      <span v-else>-</span>
                    </v-flex> -->
                  </v-layout>
                </v-flex>
                <v-flex
                  xs5
                  md10
                  pt-4
                  px-2
                  pb-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 18px;
                  "
                  >Package</v-flex
                >
                <v-flex text-right xs7 md2 pt-4 px-2 @click="addPackage = true">
                  <span
                    style="
                      color: #ff6200;
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                      cursor: pointer;
                    "
                    ><v-icon color="#ff6200" small>mdi-plus</v-icon>Add
                    New</span
                  >
                </v-flex>
                <v-flex xs12 px-2 v-if="List.length > 0">
                  <v-card elevation="0" pa-1 outlined>
                    <v-simple-table>
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
                            <!-- <th class="text-left tablefont"><b>Extra Person Rate</b></th> -->
                            <th class="text-left tablefont">
                              <b>Agent rate (₹)</b>
                            </th>
                            <th class="text-left tablefont"><b>Delete</b></th>
                            <!-- <th class="text-left tablefont"><b>Agent Extra Rate</b></th> -->
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(value, i) in List" :key="i" class="table">
                            <!-- <td>{{ i + 1 }}</td> -->
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
                              <span v-if="value.customerRate">{{
                                value.customerRate
                              }}</span>
                              <span v-else>-</span>
                            </td>
                            <td>
                              <span v-if="value.agentRate">{{
                                value.agentRate
                              }}</span>
                              <span v-else>-</span>
                            </td>
                            <td>
                              <v-icon
                                @click="
                                  (deleteialog = true)((deleteId = value._id))
                                "
                                >mdi-trash-can-outline</v-icon
                              >
                            </td>
                            <!-- <td class="text-center">
                        <v-layout wrap>
                          <v-flex xs6>
                            <v-icon
                              size="18"
                              color="#182444"
                              style="cursor: pointer"
                              @click="
                                (deletedialog = true), (DeleteId = value._id)
                              "
                              >mdi-delete</v-icon
                            >
                          </v-flex>
                          <v-flex xs6>
                            <v-icon
                              size="18"
                              color="#182444"
                              style="cursor: pointer"
                              @click="calledit(value)"
                              >mdi-pencil</v-icon
                            >
                          </v-flex>
                        </v-layout>
                      </td> -->
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-dialog width="800px" v-model="editBoatData">
      <v-card width="800px" class="pa-4">
        <v-layout wrap justify-center>
          <v-flex xs11 text-center
            ><span
              style="
                color: #002635;
                font-family: LexendFont;
                font-size: 25px;
                font-weight: 400;
              "
              >Edit Details</span
            ></v-flex
          >
          <v-flex xs1 text-right>
            <v-icon @click="editBoatData = false" color="#002635"
              >mdi-close-box</v-icon
            ></v-flex
          >
          <v-flex xs8 text-center py-4>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-layout wrap justify-start>
          <v-flex xs12 sm6>
            <v-layout wrap justify-center>
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Houseboat type</span>
                <v-select
                  hide-details="auto"
                  v-model="curItem.houseBoatType"
                  :items="['Private', 'Sharing']"
                  :menu-props="{ maxHeight: '400' }"
                  outlined
                  multiple
                  persistent-hint
                  dense
                ></v-select>
              </v-flex>
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Check in time</span>
                <v-dialog
                  ref="menu4"
                  v-model="menu4"
                  :return-value.sync="curItem.checkInTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="curItem.checkInTime"
                      hide-details="auto"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu4"
                    v-model="curItem.checkInTime"
                    full-width
                    color="#f17343"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="#f17343" @click="menu4 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="#f17343"
                      @click="$refs.menu4.save(curItem.checkInTime)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Check out time</span>
                <v-dialog
                  ref="menu3"
                  v-model="menu3"
                  :return-value.sync="curItem.checkOutTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="curItem.checkOutTime"
                      hide-details="auto"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu3"
                    v-model="curItem.checkOutTime"
                    full-width
                    color="#f17343"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="#f17343" @click="menu3 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="#f17343"
                      @click="$refs.menu3.save(curItem.checkOutTime)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Maximum person in a trip</span>
                <v-text-field
                  dense
                  outlined
                  type="text"
                  v-model="curItem.maxPersonTrip"
                  hide-details="auto"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Minimum person in a trip</span>
                <v-text-field
                  dense
                  outlined
                  type="text"
                  v-model="curItem.minPersonTrip"
                  hide-details="auto"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm6>
            <v-layout wrap justify-center>
              <!-- <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Maximum capacity of boat</span>
                <v-text-field
                  dense
                  outlined
                  type="text"
                  v-model="curItem.maxCapacityOfBoat"
                  hide-details="auto"
                >
                </v-text-field>
              </v-flex> -->
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Additional rules</span>
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
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Meal plan</span>
                <v-layout wrap>
                  <v-flex xs4 pb-2>
                    <span class="title3" style="color: #505050"
                      >Welcome drink</span
                    >
                    <v-switch
                      class="mt-0"
                      v-model="curMel.welcomeDrink"
                      hide-details
                      inset
                      color="#F17343"
                    ></v-switch>
                  </v-flex>
                  <v-flex xs4 pb-2>
                    <span class="title3" style="color: #505050">Lunch</span>
                    <v-switch
                      class="mt-0"
                      v-model="curMel.lunch"
                      hide-details
                      inset
                      color="#F17343"
                    ></v-switch>
                  </v-flex>
                  <v-flex xs4 pb-2>
                    <span class="title3" style="color: #505050">Dinner</span>
                    <v-switch
                      class="mt-0"
                      v-model="curMel.dinner"
                      hide-details
                      inset
                      color="#F17343"
                    ></v-switch>
                  </v-flex>
                  <v-flex xs4 pb-2>
                    <span class="title3" style="color: #505050">Breakfast</span>
                    <v-switch
                      class="mt-0"
                      v-model="curMel.breakfast"
                      hide-details
                      inset
                      color="#F17343"
                    ></v-switch>
                  </v-flex>
                  <v-flex xs4 pb-2>
                    <span class="title3" style="color: #505050"
                      >Tea/Coffee,Snacks</span
                    >
                    <v-switch
                      class="mt-0"
                      v-model="curMel.teaOrsnacks"
                      hide-details
                      inset
                      color="#F17343"
                    ></v-switch>
                  </v-flex>
                </v-layout>
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
            @click="edit1()"
            >Edit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="400px" v-model="deleteialog">
      <v-card width="400px" class="pa-2">
        <v-layout wrap justify-center>
          <v-flex xs11 text-center
            ><span style="color: #002635" class="dialogHead"
              >Delete</span
            ></v-flex
          >
          <v-flex xs1 text-right>
            <v-icon @click="deleteialog = false" color="#002635"
              >mdi-close-box</v-icon
            ></v-flex
          >
          <v-flex xs8 text-center py-4>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-card-text class="px-4 pb-0 dialogText text-center"
          >Are you sure you want to delete this package?
        </v-card-text>
        <v-card-actions class="pt-3">
          <v-spacer></v-spacer>
          <v-btn color="#002635" class="dialogText" dark @click="delete1()"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="600px" v-model="addPackage">
      <v-form v-model="addcat" ref="addcat">
        <v-card width="600px" class="pa-4">
          <v-layout wrap justify-center>
            <v-flex xs11 text-center
              ><span
                style="
                  color: #002635;
                  font-family: LexendFont;
                  font-size: 25px;
                  font-weight: 400;
                "
                >Add Package</span
              ></v-flex
            >
            <v-flex xs1 text-right>
              <v-icon @click="addPackage = false" color="#002635"
                >mdi-close-box</v-icon
              ></v-flex
            >
            <v-flex xs8 text-center py-4>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-start>
            <v-flex xs12>
              <v-layout wrap justify-center>
                <v-flex xs12 sm10 text-left>
                  <span class="title2">Type</span>
                  <v-select
                    hide-details="auto"
                    v-model="season.packageType"
                    :items="['Seasonal', 'OffSeasonal']"
                    :menu-props="{ maxHeight: '400' }"
                    outlined
                    persistent-hint
                    dense
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm10 text-left pt-4>
                  <span class="title2">Start date</span>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="season.startDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="season.startDate"
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
                      v-model="season.startDate"
                      no-title
                      :min="nowDate"
                      scrollable
                      @change="$refs.menu.save(season.startDate)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm10 pt-4 text-left>
                  <span class="title2">End date</span>
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :return-value.sync="season.endDate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="season.endDate"
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
                      v-model="season.endDate"
                      no-title
                      scrollable
                      :min="nowDate"
                      @change="$refs.menu2.save(season.endDate)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm10 pt-4 text-left>
                  <span class="title2 pr-2">Customer rate (₹)</span>
                  <span
                    style="
                      font-family: LexendFont;
                      font-size: 15px;
                      font-weight: 300;
                    "
                  >
                    (Per Head)</span
                  >
                  <v-text-field
                    dense
                    outlined
                    type="number"
                    hide-spin-buttons
                    v-model="season.customerRate"
                    :rules="[rules.required]"
                    hide-details="auto"
                  >
                  </v-text-field>
                  <span
                    v-if="season.customerRate"
                    style="
                      font-family: LexendFont;
                      font-size: 12px;
                      font-weight: 500;
                    "
                    >Net rate: ₹{{ tenpercent1 }}</span
                  >
                </v-flex>
                <v-flex xs12 sm10 pt-4 text-left>
                  <span class="title2 pr-2">Agent rate (₹)</span>
                  <span
                    style="
                      font-family: LexendFont;
                      font-size: 15px;
                      font-weight: 300;
                    "
                  >
                    (Per head)</span
                  >
                  <v-text-field
                    dense
                    outlined
                    type="text"
                    v-model="season.agentRate"
                    :rules="[rules.required]"
                    hide-details="auto"
                  >
                  </v-text-field>
                  <span
                    v-if="season.agentRate"
                    style="
                      font-family: LexendFont;
                      font-size: 12px;
                      font-weight: 500;
                    "
                    >Net rate: ₹{{ tenpercent3 }}</span
                  >
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
              @click="validation()"
              >Add</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showSnackBar: false,
      timeout: 2000,
      ServerError: false,
      addcat: false,
      appLoading: false,
      menu: false,
      menu2: false,
      tenpercent1: 0,
      tenpercent3: 0,
      boatData: [],
      List: [],
      msg: null,
      page: 1,
      limit: 20,
      deleteialog: false,
      deleteId: "",
      editBoatData: false,
      curItem: {},
      curMel: {},
      menu4: false,
      menu3: false,
      IsMealplan: true,
      addPackage: false,
      season: {
        packageType: "",
        startDate: "",
        endDate: "",
        customerRate: "",
        agentRate: "",
      },
      nowDate: new Date().toISOString().slice(0, 10),
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    "season.customerRate": function (newRate) {
      this.tenpercent1 = (newRate * (100 / 110)).toFixed(2); // Assuming 10% reduction, adjust as needed
    },
    "season.agentRate": function (newRate) {
      console.log("asdfghj");
      this.tenpercent3 = (newRate * (100 / 110)).toFixed(2);
      console.log("tenpercent3=", this.tenpercent3); // Assuming 10% reduction, adjust as needed
    },
    page() {
      this.getData();
    },
  },
  methods: {
    resetForm() {
      this.$refs.addcat.reset();
    },
    getData() {
      this.appLoading = true;
      axios({
        url: "/houseboat/trip/daycruise",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          houseboatId: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.boatData = response.data.data;
          if (this.boatData.mealPlan) {
            var allFalse = Object.keys(this.boatData.mealPlan).every(function (
              key
            ) {
              return !this.boatData.mealPlan[key];
            },
            this);

            this.IsMealplan = !allFalse;
            console.log("IsMealplan=", this.IsMealplan);
          }
          this.getList();
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    getList() {
      this.appLoading = true;
      axios({
        url: "/houseboat/allpackages",
        method: "get",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          tripId: this.boatData._id,
          page: this.page,
          limit: this.limit,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.List = response.data.data;
          this.Pagelength = Math.ceil(response.data.count / this.limit);
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    edit1() {
      var mealPlan = {};
      mealPlan.welcomeDrink = this.curMel.welcomeDrink;
      mealPlan.lunch = this.curMel.lunch;
      mealPlan.dinner = this.curMel.dinner;
      mealPlan.breakfast = this.curMel.breakfast;
      mealPlan.teaOrsnacks = this.curMel.teaOrsnacks;

      this.appLoading = true;
      axios({
        method: "POST",
        url: "/houseboat/trip/edit",
        data: {
          checkInTime: this.curItem.checkInTime,
          maxPersonTrip: this.curItem.maxPersonTrip,
          checkOutTime: this.curItem.checkOutTime,
          minPersonTrip: this.curItem.minPersonTrip,
          houseBoatType: this.curItem.houseBoatType,
          // maxCapacityOfBoat: this.curItem.maxCapacityOfBoat,
          maxCapacityOfBoat: this.curItem.maxPersonTrip,
          // (since max person per trip is equal to boat capacity)
          addionalRules: this.curItem.addionalRules,
          mealPlan: mealPlan,
          tripId: this.boatData._id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showSnackBar = true;
          this.curItem = {};
          this.editBoatData = false;
          this.getData();
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
      // }
    },
    validation() {
      if (!this.season.packageType) {
        this.msg = "Please choose package type";
        this.showSnackBar = true;
        return;
      } else if (!this.season.startDate) {
        this.msg = "Please choose start date";
        this.showSnackBar = true;
        return;
      } else if (!this.season.endDate) {
        this.msg = "Please choose end date";
        this.showSnackBar = true;
        return;
      } else if (!this.season.customerRate) {
        this.msg = "Please enter customer rate";
        this.showSnackBar = true;
        return;
      } else if (!this.season.agentRate) {
        this.msg = "Please enter agent rate";
        this.showSnackBar = true;
        return;
      } else {
        this.add();
      }
    },
    add() {
      this.season.customerRateCommission = this.tenpercent1;
      this.season.agentRateCommission = this.tenpercent3;
      this.appLoading = true;
      console.log("season=", this.season);
      var Newarr = [this.season];
      axios({
        method: "POST",
        url: "/houseboat/trip/package/add",
        data: {
          tripTypeId: this.boatData._id,
          packageDetails: Newarr,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showSnackBar = true;
          this.addPackage = false;
          this.season.packageType = "";
          this.season.startDate = "";
          this.season.endDate = "";
          this.season.customerRate = "";
          this.season.agentRate = "";
          this.addPackage = false;
          location.reload();
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
      // }
    },
    delete1() {
      axios({
        method: "get",
        url: "/houseboat/package/delete",
        params: {
          id: this.deleteId,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showSnackBar = true;
          this.deleteialog = false;
          this.getData();
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
      // }
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
  background: linear-gradient(to bottom, rgba(255, 125, 20, 1), #f17343);
}
</style>