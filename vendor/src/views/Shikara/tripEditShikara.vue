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
    <v-snackbar v-model="showsnackbar" color="#ff6200" right top timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showsnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start py-2>
          <v-flex xs12 sm6 align-self-center v-if="boatData.shikaraId">
            <span
              v-if="boatData.shikaraId.shikaraName"
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
              >{{ boatData.shikaraId.shikaraName }}</span
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
              >Packages</span
            ></v-flex
          >
          <v-spacer class="hidden-xs-only"></v-spacer>
          <v-flex xs12 sm3 lg2 py-2 pr-0 pr-md-2 align-self-end>
            <v-btn
              color="#ff6200"
              small
              block
              dark
              @click="
                $router.push(
                  '/ShikaraSpecialRate?boatId=' +
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
            <v-card tile class="pa-2 pa-sm-8" elevation="0">
              <v-layout wrap justify-start>
                <v-flex xs12 py-1 text-left v-if="boatData.addionalRules">
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
              <!-- <v-layout wrap mt-4 v-if="boatData.mealPlan">
                   <v-flex
                     xs6 sm10 px-2
                     style="
                       font-family: LexendFont;
                       font-weight: 400;
                       font-size: 18px;
                     "
                     >Meal Plan</v-flex
                   >
                 
                   <v-flex px-2 xs12 v-if="IsMealplan == false"
                     ><span
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
                     py-4
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
                <v-flex xs12 sm10 text-left>
                  <v-layout wrap>
                    <!-- <v-flex xs12 sm3 py-1 align-self-center text-left px-2>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Pick-up location :</span
                      ><br />
                      <span
                        v-if="boatData.pickUpLocation"
                        style="
                          font-family: LexendFont;
                          font-weight: 300;
                          font-size: 16px;
                          color: black;
                        "
                      >
                        {{ boatData.pickUpLocation }}</span
                      >
                      <span v-else>-</span>
                    </v-flex> -->
                    <!-- <v-flex xs12 sm3 py-1 align-self-center text-left px-2>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Drop location :</span
                      ><br />
                      <span
                        v-if="boatData.dropLocation"
                        style="
                          color: black;
                          font-family: LexendFont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                        {{ boatData.dropLocation }}</span
                      >
                      <span v-else>-</span>
                    </v-flex> -->
                    <v-flex xs12 sm4 py-1 align-self-center text-left px-2>
                      <v-layout wrap>
                        <v-flex xs9 sm12 align-self-center>
                          <span
                            style="
                              font-family: LexendFont;
                              font-weight: 400;
                              font-size: 18px;
                            "
                            >Max capacity :
                          </span>
                        </v-flex>
                        <v-flex xs3 sm12 align-self-center pt-1 pt-sm-0>
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
                          <span v-else>-</span></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm4 py-1 align-self-center text-left px-2>
                      <v-layout wrap>
                        <v-flex xs9 sm12 align-self-center>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Min capacity :</span
                      > </v-flex>
                        <v-flex xs3 sm12 align-self-center pt-1 pt-sm-0>
                      <span
                        v-if="boatData.minCapacityOfBoat"
                        style="
                          color: black;
                          font-family: LexendFont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                        {{ boatData.minCapacityOfBoat }}</span
                      >
                      <span v-else>-</span></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 sm4 py-1 align-self-center text-left px-2>
                      <v-layout wrap>
                        <v-flex xs9 sm12 align-self-center>
                      <span
                        style="
                          font-family: LexendFont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Min.hours :</span
                      > </v-flex>
                        <v-flex xs3 sm12 align-self-center pt-1 pt-sm-0>
                      <span
                        v-if="boatData.minimumHour"
                        style="
                          color: black;
                          font-family: LexendFont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                        {{ boatData.minimumHour }}</span
                      >
                      <span v-else>-</span></v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  text-left text-sm-right
                  align-self-start
                  xs12
                  sm2
                  @click="(editBoatData = true), (curItem = boatData)"
                  style="cursor: pointer"
                >
                  <span
                    style="
                      color: #ff6200;
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                    "
                    ><v-icon color="#ff6200" small>mdi-pencil</v-icon>Edit</span
                  >
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  md10
                  pt-2 pt-sm-4
                  px-2
                  pb-2
                  style="
                    font-family: LexendFont;
                    font-weight: 400;
                    font-size: 18px;
                  "
                  >Package</v-flex
                >
                <v-flex
                  text-left
                  text-sm-right
                  xs12
                  sm6
                  md2
                  pt-0
                  pt-sm-4
                  px-2
                  @click="addPackage = true"
                  style="cursor: pointer"
                >
                  <span
                    style="
                      color: #ff6200;
                      font-family: LexendFont;
                      font-weight: 400;
                      font-size: 18px;
                    "
                    ><v-icon color="#ff6200" small>mdi-plus</v-icon>Add
                    New</span
                  >
                </v-flex>
                <v-flex xs12 px-0 px-sm-2 v-if="List.length > 0">
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
                            <th class="text-left tablefont">
                              <b>Agent rate (₹)</b>
                            </th>
                            <th class="text-left tablefont"><b>Delete</b></th>
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
              <!-- <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Pick up Location</span>
                <v-text-field
                  dense
                  outlined
                  type="text"
                  v-model="boatData.pickUpLocation"
                  hide-details="auto"
                >
                </v-text-field>
              </v-flex> -->
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Maximum Capacity</span>
                <v-text-field
                  dense
                  outlined
                  type="number"
                  hide-spin-buttons
                  v-model="boatData.maxCapacityOfBoat"
                  hide-details="auto"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Minimum Hours</span>
                <v-text-field
                  dense
                  outlined
                  type="number"
                  hide-spin-buttons
                  v-model="boatData.minimumHour"
                  hide-details="auto"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm6>
            <v-layout wrap justify-center>
              <!-- <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Drop Location</span>
                <v-text-field
                  dense
                  outlined
                  type="text"
                  v-model="boatData.dropLocation"
                  hide-details="auto"
                >
                </v-text-field>
              </v-flex> -->
              <v-flex xs12 sm10 pt-4 text-left>
                <span class="title2">Minimum Capacity</span>
                <v-text-field
                  dense
                  outlined
                  type="number"
                  hide-spin-buttons
                  v-model="boatData.minCapacityOfBoat"
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
            @click="edit1()"
            >Edit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="600px" v-model="addPackage">
      <v-form v-model="addcat" ref="addcat" @submit.prevent>
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
              <v-icon @click="(addPackage = false), resetForm()" color="#002635"
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
                  <span class="title2">Start Date</span>
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
                      scrollable
                      :min="nowDate"
                      @change="$refs.menu.save(season.startDate)"
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
                      :min="nowDate"
                      scrollable
                      @change="$refs.menu2.save(season.endDate)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm10 pt-4 text-left>
                  <span class="title2 pr-2">Customer Rate (₹)</span>
                  <span
                    style="
                      font-family: LexendFont;
                      font-size: 15px;
                      font-weight: 300;
                    "
                    >(Per Hour)</span
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
                    >Net rate: ₹{{ tenpercent11 }}</span
                  >
                </v-flex>
                <v-flex xs12 sm10 pt-4 text-left>
                  <span class="title2 pr-2">Agent Rate (₹)</span>
                  <span
                    style="
                      font-family: LexendFont;
                      font-size: 15px;
                      font-weight: 300;
                    "
                    >(Per Hour)</span
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
                    >Net rate: ₹{{ tenpercent33 }}</span
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
      showsnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      addcat: false,
      boatData: [],
      List: [],
      msg: null,
      page: 1,
      limit: 20,
      deleteialog: false,
      deleteId: "",
      editBoatData: false,
      tenpercent11: 0,
      tenpercent33: 0,
      curItem: {},
      curMel: {},
      menu2: false,
      menu: false,
      menu5: false,
      menu6: false,
      menu7: false,
      menu8: false,
      IsMealplan: true,
      addPackage: false,
      season: {
        packageType: "",
        startDate: "",
        endDate: "",
        customerRate: "",
        agentRate: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      nowDate: new Date().toISOString().slice(0, 10),
    };
  },

  mounted() {
    this.getData();
  },
  watch: {
    "season.customerRate": function (newRate) {
      this.tenpercent11 = (newRate * (100 / 120)).toFixed(2); // Assuming 10% reduction, adjust as needed
    },
    "season.agentRate": function (newRate) {
      console.log("asdfghj");
      this.tenpercent33 = (newRate * (100 / 120)).toFixed(2);
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
    allowedDates(val) {
      const currentDate = new Date();

      // Allow dates from today onwards if the day of the month is even
      return (
        parseInt(val.split("-")[2], 10) % 2 === 0 &&
        new Date(val) >= currentDate
      );
    },
    validation() {
      if (!this.season.packageType) {
        this.msg = "Please choose package type";
        this.showsnackbar = true;
        return;
      } else if (!this.season.startDate) {
        this.msg = "Please choose start date";
        this.showsnackbar = true;
        return;
      } else if (!this.season.endDate) {
        this.msg = "Please choose end date";
        this.showsnackbar = true;
        return;
      } else if (!this.season.customerRate) {
        this.msg = "Please enter customer rate";
        this.showsnackbar = true;
        return;
      } else if (!this.season.agentRate) {
        this.msg = "Please enter agent rate";
        this.showsnackbar = true;
        return;
      } else {
        this.add();
      }
    },
    getData() {
      this.appLoading = true;
      axios({
        url: "/shikara/trip/details",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          shikaraId: this.$route.query.id,
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
        url: "/shikara/allpackages",
        method: "get",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          tripId: this.boatData._id,
          shikaraId: this.$route.query.id,
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
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/shikara/trip/edit",
        data: {
          maxCapacityOfBoat: this.boatData.maxCapacityOfBoat,
          minCapacityOfBoat: this.boatData.minCapacityOfBoat,
          pickUpLocation: this.boatData.pickUpLocation,
          dropLocation: this.boatData.dropLocation,
          minimumHour: this.boatData.minimumHour,
          tripId: this.boatData._id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showsnackbar = true;
          this.editBoatData = false;
          this.getData();
        } else {
          this.msg = response.data.msg;
          this.showsnackbar = true;
        }
      });
      // }
    },
    delete1() {
      this.appLoading = true;
      axios({
        method: "get",
        url: "/shikara/package/delete",
        params: {
          id: this.deleteId,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status == true) {
          this.msg = response.data.msg;
          this.showsnackbar = true;
          this.deleteialog = false;
          this.getData();
        } else {
          this.msg = response.data.msg;
          this.showsnackbar = true;
        }
      });
      // }
    },
    add() {
      this.season.customerRateCommission = this.tenpercent11;
      this.season.agentRateCommission = this.tenpercent33;
      this.appLoading = true;
      console.log("season=", this.season);
      var Newarr = [this.season];
      axios({
        method: "POST",
        url: "/shikara/trip/package/add",
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
          this.showsnackbar = true;
          //  this.addPackage=false;
          this.season.packageType = "";
          this.season.startDate = "";
          this.season.endDate = "";
          this.season.customerRate = "";
          this.season.agentRate = "";
          this.$refs.addcat.reset();
          this.addPackage = false;
          this.getList();
        } else {
          this.msg = response.data.msg;
          this.showsnackbar = true;
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