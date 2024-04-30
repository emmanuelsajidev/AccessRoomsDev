<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
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


          <v-flex xs12 pt-8 pb-10>

            <v-layout wrap pb-6>
              <v-flex pt-6>

                <v-layout wrap justify-center>
                  <v-card elevation="0">
                    <v-layout wrap justify-center>
                      <v-flex xs11 pt-4 text-left style="font-weight: 400;font-size: 20px;font-family: LexendRegular;">
                        <v-layout wrap justify-start>
                          <v-flex xs1 pr-1>

                            <v-autocomplete flat dense color="black" :items="categorys" v-model="category"
                              item-text="name" item-color="#FF1313" hide-details="true" clearable
                              class="custom-autocomplete rounded-lg">
                              <template v-slot:append>
                                <v-layout wrap justify-center>
                                  <v-flex xs1 pt-1>
                                    <v-icon color="black">mdi-chevron-down</v-icon>

                                  </v-flex>
                                </v-layout>
                              </template>
                              <template v-slot:label>
                                <span class="custom-label-text" style="color: black; font-size: 12px">
                                  Category</span>
                              </template>
                            </v-autocomplete>
                          </v-flex>
                          <v-flex xs1 pl-6>
                            <v-autocomplete flat dense color="black" :items="types" v-model="type" item-text="name"
                              item-color="#FF1313" hide-details="true" clearable class="custom-autocomplete rounded-lg">
                              <template v-slot:append>
                                <v-layout wrap>
                                  <v-flex xs12 pt-1>
                                    <v-icon color="black">mdi-chevron-down</v-icon>

                                  </v-flex>
                                </v-layout>
                              </template>
                              <template v-slot:label>
                                <span class="custom-label-text" style="color: black; font-size: 12px">
                                  Type</span>
                              </template>
                            </v-autocomplete>
                          </v-flex>



                        </v-layout>
                        <v-layout wrap>
                          <v-flex xs12 pt-4>
                            <v-layout wrap>
                              <v-flex xs2 class="black-border2">
                                <v-layout wrap justify-center>
                                  <v-flex xs12 pr-2>
                                    <v-autocomplete flat dense color="black" :items="locations" v-model="location"
                                      item-text="name" item-color="#FF1313" hide-details="true" clearable
                                      class="custom-autocomplete rounded-lg">
                                      <template v-slot:append>
                                        <v-layout wrap justify-start>
                                          <v-flex xs1 pt-1>
                                            <v-icon color="black">mdi-chevron-down</v-icon>

                                          </v-flex>
                                        </v-layout>
                                      </template>
                                      <template v-slot:label>
                                        <span class="custom-label-text" style="color: black; font-size: 12px;">
                                          Date
                                        </span>
                                      </template>
                                    </v-autocomplete>
                                  </v-flex>
                                </v-layout>
                              </v-flex>

                              <v-flex xs2 @click="guest = true" class="black-border">
                                <v-layout wrap justify-center>
                                  <v-flex xs11 pr-2 pt-1>
                                    <span style="color: black; font-size: 12px">
                                      No of Guests

                                    </span>

                                  </v-flex>
                                  <v-flex xs1 pt-1>
                                    <v-icon color="black">mdi-chevron-down</v-icon>

                                  </v-flex>
                                  <v-flex xs6 text-left v-if="children">
                                    <span style="color: black; font-size: 14px">Children</span>
                                  </v-flex>
                                  <v-flex xs5 text-center v-if="children">
                                    <span style="color: black; font-size: 14px">{{ children }}</span>
                                  </v-flex>
                                  <v-flex xs6 text-left v-if="adult">
                                    <span style="color: black; font-size: 14px"> Adult</span>
                                  </v-flex>
                                  <v-flex xs5 text-center v-if="adult">
                                    <span style="color: black; font-size: 14px">{{ adult }}</span>
                                  </v-flex>
                                </v-layout>
                              </v-flex>

                              <v-flex xs2 class="black-borderu">
                                <v-layout wrap justify-center>
                                  <v-flex xs12 pr-2>
                                    <v-menu ref="menuCheckIn" v-model="menuCheckIn" :close-on-content-click="false"
                                      max-width="290" style="box-shadow: none">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field class="text-field-transparent" dense hide-details="auto"
                                          v-model="checkInDate" v-bind="attrs" background-color="white" v-on="on"
                                          @click:clear="checkInDate = null" style="color: black; box-shadow: none;">
                                          <template v-slot:append>
                                            <v-layout wrap>
                                              <v-flex xs12 pt-1>
                                                <v-icon color="black">mdi-calendar</v-icon>

                                              </v-flex>
                                            </v-layout>


                                          </template>
                                          <template v-slot:label>
                                            <span class="custom-label-text" style="color: black; font-size: 12px;">
                                              Check in Date
                                            </span>
                                          </template>
                                        </v-text-field>
                                      </template>
                                      <v-date-picker style="box-shadow: none" v-model="checkInDate" color="#13736f"
                                        @change="menuCheckIn = false"></v-date-picker>
                                    </v-menu>
                                  </v-flex>
                                </v-layout>
                              </v-flex>


                              <v-flex xs3 class="black-borderx">
                                <v-layout wrap justify-center>
                                  <v-flex xs12 pr-2>
                                    <v-menu ref="checkInMenu" v-model="checkInMenuVisible" :close-on-content-click="false"
                                      :nudge-right="40" :return-value.sync="checkInTime" transition="scale-transition"
                                      offset-y max-width="290px" min-width="290px">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="checkInTime" hide-details="true" readonly v-bind="attrs"
                                          v-on="on">
                                          <template v-slot:append>
                                            <v-icon color="black">mdi-clock-time-two-outline</v-icon>
                                          </template>
                                          <template v-slot:label>
                                            <span class="custom-label-text" style="color: black; font-size: 12px;">
                                              Check In Time
                                            </span>
                                          </template>
                                        </v-text-field>
                                      </template>
                                      <v-time-picker v-if="checkInMenuVisible" v-model="checkInTime" full-width
                                        @click:minute="$refs.checkInMenu.save(checkInTime)"></v-time-picker>
                                    </v-menu>
                                  </v-flex>
                                </v-layout>
                              </v-flex>

                              <v-flex xs3 class="black-borderz">
                                <v-layout wrap justify-center>
                                  <v-flex xs12 pr-2>
                                    <v-menu ref="checkOutMenu" v-model="checkOutMenuVisible"
                                      :close-on-content-click="false" :nudge-right="40" :return-value.sync="checkOutTime"
                                      transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="checkOutTime" hide-details="true" readonly v-bind="attrs"
                                          v-on="on">
                                          <template v-slot:append>
                                            <v-icon color="black">mdi-clock-time-two-outline</v-icon>
                                          </template>
                                          <template v-slot:label>
                                            <span class="custom-label-text" style="color: black; font-size: 12px;">
                                              Check Out Time
                                            </span>
                                          </template>
                                        </v-text-field>
                                      </template>
                                      <v-time-picker v-if="checkOutMenuVisible" v-model="checkOutTime" full-width
                                        @click:minute="$refs.checkOutMenu.save(checkOutTime)"></v-time-picker>
                                    </v-menu>
                                  </v-flex>
                                </v-layout>
                              </v-flex>



                            </v-layout>
                          </v-flex>
                        </v-layout>

                      </v-flex>
                      <v-flex xs11 pt-4 pb-4>
                        <v-layout wrap justify-center>
                          <v-flex xs2>
                            <v-btn block color="#FF6200">
                              <span
                                style="font-weight:500;color:white;font-size: 18px;font-family: LexendRegular; text-transform: none;">Search</span>


                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>




                  <v-flex xs12 pt-6>
                    <v-card elevation="0">
                      <v-layout wrap justify-center>
                        <v-flex xs11 pt-4>
                          <span style="font-weight: 400;font-size: 20px;font-family: LexendRegular;">24 Total
                            results</span>
                        </v-flex>
                        <v-flex xs11 pt-3 pb-3>
                          <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 pb-4>
                          <v-layout wrap pb-3 justify-center>
                            <v-flex xs11 v-for="index in 3" :key="index" pt-5>
                              <v-card elevation="2">
                                <v-layout wrap justify-start>
                                  <v-flex xs12 pl-4>
                                    <v-layout wrap justify-start pt-3 pb-3>
                                      <v-flex xs2>
                                        <v-layout wrap justify-start>
                                          <v-flex xs10>
                                            <v-img height="auto" src="./../../assets/images/homeimage1.png"></v-img>

                                          </v-flex>
                                        </v-layout>

                                      </v-flex>
                                      <v-flex xs3 pt-3>
                                        <v-layout wrap justify-center>
                                          <v-flex xs9 text-left align-self-center>
                                            <v-layout wrap>
                                              <v-flex xs12 text-left>
                                                <span
                                                  style="font-weight: 500;font-size: 20px;font-family: LexendRegular;">Queen
                                                  of Alappy</span>

                                              </v-flex>
                                              <v-flex xs11 text-right>
                                                <span
                                                  style="font-family: LexendRegular;font-weight:bold;font-size: 12px;">Shikara</span>
                                              </v-flex>
                                            </v-layout>


                                          </v-flex>


                                        </v-layout>
                                      </v-flex>
                                      <v-flex xs5 pt-3>
                                        <v-layout wrap justify-center>
                                          <v-flex xs9 text-left align-self-center>
                                            <v-layout wrap>
                                              <v-flex xs12 text-left align-self-center>
                                                <span
                                                  style="font-family: LexendRegular;color:#757575;font-size: 14px;font-weight:400">No
                                                  of Persons</span>
                                                <br>
                                                <span
                                                  style="font-family: LexendRegular;color:black;font-size: 18px;font-weight:600">
                                                  5
                                                </span>

                                              </v-flex>

                                            </v-layout>


                                          </v-flex>


                                        </v-layout>
                                      </v-flex>



                                      <v-flex xs2 pt-3>
                                        <v-layout wrap justify-start>
                                          <v-flex xs12 text-left>
                                            <v-layout wrap>
                                              <v-flex xs12 text-left>
                                                <span
                                                  style="font-family: LexendRegular;color:black;font-size: 18px;font-weight:600">
                                                  ₹800

                                                </span>
                                                <br>
                                                <span
                                                  style="font-weight: 400;font-size: 12px;font-family: LexendRegular;">
                                                  per head rate

                                                </span>

                                              </v-flex>
                                              <v-flex xs9 pt-4>
                                                <v-btn color="#F17343" block>
                                                  <span
                                                    style="font-family: LexendRegular; color: white; font-size: 14px; font-weight: 400; text-transform: none;">Book
                                                    Now </span>
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
        <v-dialog width="550px" v-model="guest">
          <v-card class="pa-2">
            <v-layout wrap justify-center pt-5>
              <v-flex xs5 text-left pt-3>
                <span style="font-family: LexendRegular;color:black;font-size: 18px;font-weight:400">No of Adults</span>
              </v-flex>
              <v-flex xs5>
                <span>
                  <v-autocomplete flat dense outlined color="black" :items="adults" v-model="adult" item-text="name"
                    item-color="#FF1313" hide-details="true" clearable class="custom-autocomplete rounded-lg">
                    <template v-slot:append>
                      <v-layout wrap justify-start>
                        <v-flex xs1 pt-1>
                          <v-icon color="black">mdi-chevron-down</v-icon>

                        </v-flex>
                      </v-layout>
                    </template>
                    <template v-slot:label>
                      <span class="custom-label-text"
                        style="font-family: LexendRegular;color:black;font-size: 18px;font-weight:400">
                        Select</span>
                    </template>
                  </v-autocomplete>
                </span>

              </v-flex>
              <v-flex xs5 text-left pt-11>
                <span style="font-family: LexendRegular;color:black;font-size: 18px;font-weight:400">No of
                  Childrens</span>
                <span>
                  <span style="color:red">*</span>
                  <span style="color:#626262;font-size:10px">
                    Ages above 5 years
                  </span>
                </span>
              </v-flex>
              <v-flex xs5 pt-9>
                <span>
                  <v-autocomplete flat dense outlined color="black" :items="childrens" v-model="children" item-text="name"
                    item-color="#FF1313" hide-details="true" clearable class="custom-autocomplete rounded-lg">
                    <template v-slot:append>
                      <v-layout wrap justify-start>
                        <v-flex xs1 pt-1>
                          <v-icon color="black">mdi-chevron-down</v-icon>

                        </v-flex>
                      </v-layout>
                    </template>
                    <template v-slot:label>
                      <span class="custom-label-text"
                        style="font-family: LexendRegular;color:black;font-size: 18px;font-weight:400">
                        Select</span>
                    </template>
                  </v-autocomplete>
                </span>

              </v-flex>
              <v-flex xs10 pt-5 pb-3>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs10 pt-1 pb-3>
                <v-layout wrap justify-end>
                  <v-flex xs7 lg3 text-right>
                    <v-btn color="#FF6200" @click="apply()">
                      <span style="font-family: LexendRegular;color:white;font-size: 16px;font-weight:400">
                        APPLY
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <v-layout pt-3 wrap class="hidden-md-and-up" justify-center>
      <v-flex xs11>
        <v-layout wrap pt-16 justify-center>

          <v-flex class="black-border" xs10 style="font-weight: 400;font-size: 20px;font-family: LexendRegular;">
            <v-autocomplete flat dense color="black" :items="categorys" v-model="category" item-text="name"
              item-color="#FF1313" hide-details="true" clearable class="custom-autocomplete rounded-lg">
              <template v-slot:append>
                <v-layout wrap justify-start>
                  <v-flex xs12 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>

                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span class="custom-label-text" style="color: black; font-size: 14px">
                  Category</span>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex xs10 class="black-border" pt-3 style="font-weight: 400;font-size: 20px;font-family: LexendRegular;">
            <v-autocomplete flat dense color="black" :items="types" v-model="type" item-text="name" item-color="#FF1313"
              hide-details="true" clearable class="custom-autocomplete rounded-lg">
              <template v-slot:append>
                <v-layout wrap>
                  <v-flex xs12 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>

                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span class="custom-label-text" style="color: black; font-size: 14px">
                  Type</span>
              </template>
            </v-autocomplete>
          </v-flex>
          <v-flex class="black-border" xs10 pt-3 style="font-weight: 400;font-size: 20px;font-family: LexendRegular;">
            <v-autocomplete flat dense color="black" :items="locations" v-model="location" item-text="name"
              item-color="#FF1313" hide-details="true" clearable class="custom-autocomplete rounded-lg">
              <template v-slot:append>
                <v-layout wrap justify-start>
                  <v-flex xs1 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>

                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span class="custom-label-text" style="color: black; font-size: 14px">
                  Location</span>
              </template>
            </v-autocomplete>
          </v-flex>

          <v-flex class="black-border" xs10 @click="guest = true"
            style="font-weight: 400;font-size: 20px;font-family: LexendRegular;">
            <v-layout wrap justify-start>
              <v-flex xs10 pr-4>
                <span style="color: black; font-size: 14px">
                  No of Guests

                </span>

              </v-flex>
              <v-flex xs2 pl-2>
                <v-icon color="black">mdi-chevron-down</v-icon>

              </v-flex>
              <v-flex xs6 text-left v-if="children">
                <span style="color: black; font-size: 14px">Children</span>
              </v-flex>
              <v-flex xs5 text-center v-if="children">
                <span style="color: black; font-size: 14px">{{ children }}</span>
              </v-flex>
              <v-flex xs6 text-left v-if="adult">
                <span style="color: black; font-size: 14px"> Adult</span>
              </v-flex>
              <v-flex xs5 text-center v-if="adult">
                <span style="color: black; font-size: 14px">{{ adult }}</span>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex class="black-border" xs10 style="font-weight: 400;font-size: 20px;font-family: LexendRegular;">
            <v-autocomplete flat dense color="black" :items="triptypes" v-model="triptype" item-text="name"
              item-color="#FF1313" hide-details="true" clearable class="custom-autocomplete rounded-lg">
              <template v-slot:append>
                <v-layout wrap justify-start>
                  <v-flex xs1 pt-1>
                    <v-icon color="black">mdi-chevron-down</v-icon>

                  </v-flex>
                </v-layout>
              </template>
              <template v-slot:label>
                <span class="custom-label-text" style="color: black; font-size: 14px">
                  Trip Type</span>
              </template>
            </v-autocomplete>

          </v-flex>
          <!-- Check Out Time -->

          <v-flex xs10 class="black-borderm">
            <v-layout wrap justify-center>
              <v-flex xs12 pr-2>
                <v-menu ref="menuCheckIn2" v-model="menuCheckIn2" :close-on-content-click="false" max-width="290"
                  style="box-shadow: none">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field class="text-field-transparent" dense hide-details="auto" v-model="checkInDatem"
                      v-bind="attrs" v-on="on" @click:clear="checkInDatem = null" style="color: black; box-shadow: none;">
                      <template v-slot:append>
                        <v-layout wrap>
                          <v-flex pt-1>
                            <v-icon color="black">mdi-calendar</v-icon>
                          </v-flex>
                        </v-layout>
                      </template>
                      <template v-slot:label>
                        <span class="custom-label-text" style="color: black;font-family: lexendregular; font-size: 14px;">
                          Check In Date mobile
                        </span>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker style="box-shadow: none" v-model="checkInDatem" color="#13736f"
                    @change="menuCheckIn2 = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- Check In Time -->
          <v-flex xs10 class="black-borderv">
            <v-layout wrap justify-center>
              <v-flex xs12>
                <v-menu ref="checkInMenu2" v-model="checkInMenuVisible2" :close-on-content-click="false" :nudge-right="40"
                  :return-value.sync="checkInTime2" transition="scale-transition" offset-y max-width="290px"
                  min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="checkInTime2" hide-details="true" readonly v-bind="attrs" v-on="on">
                      <template v-slot:append>
                        <v-layout wrap>
                          <v-flex xs12 pl-5>
                            <v-icon color="black">mdi-clock-time-two-outline</v-icon>
                          </v-flex>
                        </v-layout>
                      </template>
                      <template v-slot:label>
                        <span class="custom-label-text"
                          style="color: black; font-family: lexendregular; font-size: 14px;">
                          Check In Time
                        </span>
                      </template>
                    </v-text-field>
                  </template>
                  <v-time-picker v-if="checkInMenuVisible2" v-model="checkInTime2" full-width
                    @click:minute="$refs.checkInMenu2.save(checkInTime2)"></v-time-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- Check Out Time -->
          <v-flex xs10 class="black-borderv">
            <v-layout wrap justify-center>
              <v-flex xs12>
                <v-menu ref="checkOutMenu2" v-model="checkOutMenuVisible2" :close-on-content-click="false"
                  :nudge-right="40" :return-value.sync="checkOutTime2" transition="scale-transition" offset-y
                  max-width="290px" min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="checkOutTime2" hide-details="true" readonly v-bind="attrs" v-on="on">
                      <template v-slot:append>
                        <v-icon color="black">mdi-clock-time-two-outline</v-icon>
                      </template>
                      <template v-slot:label>
                        <span class="custom-label-text"
                          style="color: black; font-family: lexendregular; font-size: 14px;">
                          Check Out Time
                        </span>
                      </template>
                    </v-text-field>
                  </template>
                  <v-time-picker v-if="checkOutMenuVisible2" v-model="checkOutTime2" full-width
                    @click:minute="$refs.checkOutMenu2.save(checkOutTime2)"></v-time-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>


          <v-flex pb-5 xs10 pt-5 style="font-weight: 400;font-size: 20px;font-family: LexendRegular;">
            <v-btn block color="#FF6200">
              <span style="font-weight:500;color:white;font-size: 14px;font-family: LexendRegular;">Search </span>
            </v-btn>
          </v-flex>
          <v-flex xs12 class="black-border" v-for="index in 3" :key="index" pt-5>
            <v-card elevation="0" color="#EDEDED">
              <v-layout wrap justify-center>
                <v-flex xs11>
                  <v-layout wrap justify-center pt-6 pb-6>
                    <v-flex xs12>
                      <v-img height="auto" src="./../../assets/images/homeimage1.png"></v-img>

                    </v-flex>
                    <v-flex xs12>
                      <v-layout wrap fill-height justify-center>
                        <v-flex xs12 text-left align-self-center>
                          <v-layout wrap>
                            <v-flex xs12 text-left>
                              <span style="font-weight: 500;font-size: 20px;font-family: LexendRegular;">Queen
                                of Alappy</span>

                            </v-flex>
                            <v-flex xs11 text-right>
                              <span style="font-family: LexendRegular;font-weight:bold;font-size: 12px;">Shikara</span>
                            </v-flex>
                          </v-layout>


                        </v-flex>


                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <v-layout wrap fill-height justify-center>
                        <v-flex xs12 text-left align-self-center>
                          <v-layout wrap>
                            <v-flex xs12 text-left align-self-center>
                              <span style="font-family: LexendRegular;color:#757575;font-size: 14px;font-weight:400">No of
                                Persons </span>
                              <br>
                              <span style="font-family: LexendRegular;color:black;font-size: 18px;font-weight:600">
                                5
                              </span>

                            </v-flex>

                          </v-layout>


                        </v-flex>


                      </v-layout>
                    </v-flex>





                    <v-flex xs12 pt-5>
                      <v-layout wrap fill-height justify-center>
                        <v-flex xs12 text-left align-self-center>
                          <v-layout wrap>
                            <v-flex xs12 text-left>
                              <span style="font-family: LexendRegular;color:black;font-size: 18px;font-weight:600">
                                ₹800

                              </span>
                              <br>
                              <span style="font-weight: 400;font-size: 12px;font-family: LexendRegular;">
                                per head rate

                              </span>

                            </v-flex>
                            <v-flex xs12 pt-4>
                              <v-btn color="#F17343" block>
                                <span
                                  style="font-family: LexendRegular; color: white; font-size: 14px; font-weight: 400; text-transform: none;">Book
                                  Now </span>
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


  </div>
</template>
<script>
import moment from 'moment'
import { format, parseISO } from 'date-fns'
// import axios from "axios";
export default {
  data() {
    return {
      appLoading: false,
      category: "",
      menuCheckIn1: false,
      checkInDate1: null,
      checkInMenuVisible1: false,
      checkInTime1: '',
      checkOutMenuVisible1: false,
      checkOutTime1: '',
      type: "",
      ServerError: false,
      location: "",
      menuCheckIn2: false,
      checkInDate2: null,
      checkInMenuVisible2: false,
      checkInTime2: '',
      checkOutMenuVisible2: false,
      checkOutTime2: '',
      snackbar: false,
      checkInDate: null,
      timeout: 5000,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      checkInMenuVisible: false,
      checkOutMenuVisible: false,
      checkInTime: '',
      checkOutTime: '',
      room: null,
      locations: [
        { id: 1, name: 'City A' },
        { id: 2, name: 'City B' },
        { id: 3, name: 'City C' },
      ],
      categorys: [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
      ],
      types: [
        { id: 1, name: 'Type 1' },
        { id: 2, name: 'Type 2' },
        { id: 3, name: 'Type 3' },
      ],
      rooms: [
        { id: 1, name: 'Room 101' },
        { id: 2, name: 'Room 102' },
        { id: 3, name: 'Room 103' },
      ],
      triptypes: [
        { id: 1, name: 'Business Trip' },
        { id: 2, name: 'Vacation' },
        { id: 3, name: 'Family Trip' },
      ],
      childrens: [
        { id: 1, name: ' 1' },
        { id: 2, name: ' 2' },
        { id: 3, name: ' 3' },
      ],
      adults: [
        { id: 1, name: ' 1' },
        { id: 2, name: ' 2' },
        { id: 3, name: ' 3' },
      ],


      limit: 10,
      triptype: "",
      fromDate: null,
      toDate: null,

      fromDate2: null,
      toDate2: null,
      checkOutDate: null,
      menuCheckIn: false,
      menuCheckOut: false,
      adult: null,
      children: "",
      date: null,
      menuCheckInVisiblem: false,
      checkInDatem: null,
      checkInMenuVisiblem: false,
      checkInTimem: '',
      checkOutMenuVisiblem: false,
      checkOutTimem: '',

      guest: false,
      msg: null,
      value: "",
      phone: "",
      cards: [
        {
          title: "bookingCount",
          name: "Total Bookings",
          src: require("../../assets/icons/homeIcon1.png"),
          count: "12",
        },
        {
          title: "reserveCount",
          name: "Reservations",
          src: require("../../assets/icons/homeIcon2.png"),
          count: "40",
        },
        {
          title: "houseBoatCount",
          name: "Houseboats",
          src: require("../../assets/icons/homeIcon3.png"),
          count: "30",
        },
        {
          title: "shikaraCount",
          name: "Shikaras",
          src: require("../../assets/icons/homeIcon4.png"),
          count: "30",
        },
      ],
    };
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
    computedDateFormattedDatefns() {
      return this.date ? format(parseISO(this.date), 'EEEE, MMMM do yyyy') : ''
    },
  },
  methods: {
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

.black-borderz {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-top: 8px;
  padding-left: 16px;


  /* Add padding if desired */
  border-radius: 0px 8px 8px 0px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-borderm {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-left: 20px;
  padding-right: 13px;
  padding-top: 20px;
  padding-bottom: 20px;


  /* Add padding if desired */
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-borderu {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-top: 22px;
  padding-left: 16px;


  /* Add padding if desired */
  border-radius: 0px 0px 0px 0px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-border3 {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding: 20px;
  /* Add padding if desired */
  border-radius: 0px 8px 8px 0px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-borderx {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-bottom: 20px;
  /* Add padding if desired */
  padding-left: 20px;
  /* Add padding if desired */
  padding-right: 20px;
  /* Add padding if desired */
  padding-top: 8px;
  /* Add padding if desired */


  border-radius: 0px 0px 0px 0px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}

.black-borderv {
  border: 1px solid #d3d3d3;
  /* Light grey color for the border */
  padding-bottom: 20px;
  /* Add padding if desired */
  padding-left: 20px;
  /* Add padding if desired */
  padding-right: 20px;
  /* Add padding if desired */
  padding-top: 8px;
  /* Add padding if desired */


  border-radius: 0px 0px 0px 0px;
  /* Top-left and top-right are curved, bottom-left and bottom-right are sharp */
}
</style>

<!-- ... rest of your code ... -->
