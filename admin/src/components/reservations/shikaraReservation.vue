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
    <v-layout wrap justify-center pa-0 pa-4>
      <v-flex xs12>
        <v-layout wrap justify-start py-2>
          <v-flex xs12 align-self-center>
            <span
              class="mainfont"
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
              >Shikara reservations</span
            >
          </v-flex>
        </v-layout>
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
            >
              <span
                :style="myTab == 0 ? 'color:white' : 'color:black'"
                style="font-family: mainfont; font-weight: 500; font-size: 14px"
                >Current</span
              ></v-tab
            >
            <v-tab
              :style="
                myTab == 1
                  ? 'background-color:rgba(255, 98, 0, 1)'
                  : 'background-color:white'
              "
            >
              <span
                :style="myTab == 1 ? 'color:white' : 'color:black'"
                style="font-family: mainfont; font-weight: 500; font-size: 14px"
                >cancelled</span
              ></v-tab
            >
            <v-tab-item>
              <v-layout wrap pt-6 pb-6 pl-4>
                <v-flex pt-2 pl-lg-0 pl-2 xs11 sm4 lg2>
                  <v-menu
                    ref="menuvtwo"
                    v-model="menuvtwo"
                    :close-on-content-click="false"
                    :return-value.sync="fromdatecurrent"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="fromdatecurrent"
                        outlined
                        readonly
                        label=" From Date"
                        color="orange"
                        dense
                        hide-details="auto"
                        clearable
                        class="mainfont rounded-0"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fromdatecurrent"
                      no-title
                      color="orange"
                      scrollable
                      @change="$refs.menuvtwo.save(fromdatecurrent)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex pl-2 pt-2 xs11 sm4 lg2>
                  <v-menu
                    ref="menuvone"
                    v-model="menuvone"
                    :close-on-content-click="false"
                    :return-value.sync="todatecurrent"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="todatecurrent"
                        outlined
                        readonly
                        label=" To Date"
                        color="orange"
                        dense
                        hide-details="auto"
                        clearable
                        class="rounded-0 mainfont"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="todatecurrent"
                      no-title
                      color="orange"
                      :min="fromdatecurrent"
                      @change="$refs.menuvone.save(todatecurrent)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs11 sm4 lg2 pt-2 pl-2>
                  <v-text-field
                    v-model="keywordcurrent"
                    outlined
                    dense
                    hide-details
                    clearable
                    color="black"
                    label="Search "
                    class="custom-text-field"
                    style="border-radius: 0%"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center v-if="list">
                <v-flex xs12 v-if="list.length > 0">
                  <v-card elevation="0">
                    <v-layout
                      wrap
                      justify-center
                      class="hidden-sm-and-down"
                      pb-5
                    >
                      <v-flex xs12 px-4 v-for="(item, i) in list" :key="i" pt-5>
                        <v-card
                          elevation="0"
                          color="#EDEDED"
                          style="border-radius: 12px"
                        >
                          <v-layout wrap justify-center v-if="item">
                            <v-flex xs3>
                              <v-layout wrap justify-start>
                                <v-flex xs12 v-if="item.shikaraId">
                                  <v-img
                                    v-if="item.shikaraId.coverImage"
                                    style="border-radius: 12px 0px 0px 12px"
                                    :src="
                                      mediaURLnewx + item.shikaraId.coverImage
                                    "
                                    :height="
                                      $vuetify.breakpoint.name == 'xs'
                                        ? '180px'
                                        : $vuetify.breakpoint.name == 'sm'
                                        ? '180px'
                                        : $vuetify.breakpoint.name == 'md'
                                        ? '200px'
                                        : $vuetify.breakpoint.name == 'lg'
                                        ? '180px'
                                        : '180px'
                                    "
                                    width="250px"
                                    ><template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                </v-flex>
                              </v-layout>
                            </v-flex>

                            <v-flex xs9 pl-6>
                              <v-layout wrap justify-start fill-height>
                                <v-flex xs4 text-left align-self-center>
                                  <v-layout wrap fill-height>
                                    <v-flex xs12 align-self-start>
                                      <span
                                        style="
                                          font-weight: 500;
                                          font-size: 20px;
                                          font-weight: bold;
                                          font-family: mainfont;
                                        "
                                      >
                                        {{ item.shikaraId.shikaraName }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Reservation # :
                                      </span>
                                      <span
                                        style="
                                          color: #f17343;
                                          font-size: 15px;
                                          font-family: mainfont;
                                        "
                                      >
                                        &nbsp; {{ item.reservationNo }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Date :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatDate(item.checkInDate) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Check-in :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatTimeNew(item.startTime) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Check-out :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatTimeNew(item.endTime) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <!-- <v-flex xs12 pt-2 align-self-end>
                                        <span
                                          style="
                                            font-family: mainfont;
                                            font-size: 14px;
                                            font-weight: 500;
                                          "
                                        >
                                          Location :&nbsp;
                                          <span
                                            style="color: #f17343"
                                            v-if="item.shikaraId.location"
                                          >
                                            {{ item.shikaraId.location.name }}
                                          </span>
                                        </span>
                                      </v-flex> -->
                                  </v-layout>
                                </v-flex>

                                <v-flex
                                  xs5
                                  text-left
                                  align-self-end
                                  pb-0
                                  pb-md-3
                                  pl-2
                                >
                                  <v-layout wrap fill-height>
                                    <v-flex xs12 v-if="item" align-self-start>
                                      <span
                                        style="
                                          font-weight: 400;
                                          font-size: 14px;
                                          font-family: mainfont;
                                        "
                                      >
                                        Booked for : &nbsp;
                                      </span>
                                      <span
                                        v-if="item.guestName"
                                        style="
                                          color: #f17343;
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 400;
                                        "
                                      >
                                        {{ item.guestName }}</span
                                      >
                                      <span
                                        v-if="item.guestPhoneNumber"
                                        style="
                                          color: #f17343;
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 400;
                                        "
                                      >
                                        ,{{ item.guestPhoneNumber }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                      >
                                        Advance :&nbsp;
                                        <span
                                          style="color: #f17343"
                                          v-if="item.advancePayment"
                                        >
                                          ₹ {{ item.advancePayment }}
                                        </span>
                                      </span>
                                    </v-flex>

                                    <v-flex
                                      xs12
                                      text-left
                                      pt-2
                                      align-self-end
                                      v-if="item.balancepaymentStatus"
                                    >
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Balance :&nbsp;

                                        <span
                                          style="color: red"
                                          v-if="
                                            item.balancepaymentStatus ==
                                              'Pending' &&
                                            item.advancepaymentMode == 'Agent'
                                          "
                                        >
                                          ₹ {{ item.balancePayAmount }} Not Paid
                                        </span>
                                        <span
                                          style="color: green"
                                          v-else-if="
                                            item.balancepaymentStatus ==
                                              'Success' &&
                                            item.advancepaymentMode == 'Agent'
                                          "
                                        >
                                          ₹ {{ item.balancePayAmount }} Paid
                                        </span>
                                        <span style="color: green" v-else>
                                          ₹ {{ item.balancePayAmount }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                      >
                                        Balance payed by :&nbsp;
                                        <span
                                          style="color: #f17343"
                                          v-if="item.balancePayedBy"
                                        >
                                          {{ item.balancePayedBy }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                      >
                                        Start/Drop Location :&nbsp;
                                        <span
                                          style="color: #f17343"
                                          v-if="item.shikaraId.startingLocation"
                                        >
                                          {{
                                            item.shikaraId.startingLocation.name
                                          }}
                                        </span>
                                      </span>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>

                                <v-flex xs3 align-self-center>
                                  <v-layout wrap justify-center>
                                    <v-flex
                                      xs12
                                      text-center
                                      pl-3
                                      pr-1
                                      pb-2
                                      v-if="item.totalPayableAmount"
                                    >
                                      <span
                                        style="
                                          font-family: mainfont;
                                          color: black;
                                          font-size: 20px;
                                          font-weight: 600;
                                        "
                                      >
                                        ₹ {{ item.totalPayableAmount }}
                                      </span>
                                    </v-flex>

                                    <!-- <v-flex
                                        xs12
                                        sm7
                                        text-center
                                        pr-0
                                        pr-md-2
                                        pb-2
                                      >
                                        <v-btn
                                          @click="
                                            $router.push(
                                              '/shikaraReservationEdit?id=' +
                                                item._id
                                            )
                                          "
                                          small
                                          dark
                                          block
                                          color="#F17343"
                                        >
                                          <span
                                            style="
                                              font-family: mainfont;
                                              color: white;
                                              font-size: 14px;
                                              font-weight: 300;
                                              text-transform: none;
                                            "
                                            ><v-icon
                                              small
                                              color="white"
                                              class="pb-1"
                                              >mdi-pencil</v-icon
                                            >
                                            Edit
                                          </span>
                                        </v-btn>
                                      </v-flex> -->
                                    <v-flex
                                      xs12
                                      sm7
                                      text-center
                                      pr-0
                                      pr-md-2
                                      pb-2
                                    >
                                      <v-btn
                                        @click="
                                          (cancelDialog = true),
                                            (deleteId = item._id)
                                        "
                                        small
                                        dark
                                        block
                                        color="#F17343"
                                      >
                                        <span
                                          style="
                                            font-family: mainfont;
                                            color: white;
                                            font-size: 14px;
                                            font-weight: 300;
                                            text-transform: none;
                                          "
                                          ><v-icon
                                            small
                                            color="white"
                                            class="pb-1"
                                            >mdi-cancel</v-icon
                                          >
                                          Cancel
                                        </span>
                                      </v-btn>
                                    </v-flex>
                                    <!-- <v-flex xs12 text-center pl-3 pr-1>
                                                                  <span
                                                                      style="font-family: mainfont; color: black; font-size: 10px; font-weight: 600">
                                                                      ₹ {{ item.bookingTotal }}
                                                                  </span>
                                                              </v-flex> -->
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-card>
                      </v-flex>
                    </v-layout>

                    <v-layout wrap justify-center class="hidden-md-and-up" pb-6>
                      <v-flex xs11 v-for="(item, i) in list" :key="i" pt-5>
                        <v-card
                          elevation="0"
                          color="#EDEDED"
                          style="border-radius: 12px"
                        >
                          <v-layout wrap justify-center v-if="item">
                            <v-flex xs12>
                              <v-layout wrap justify-start>
                                <v-flex xs12 v-if="item.shikaraId">
                                  <v-img
                                    v-if="item.shikaraId.coverImage"
                                    style="border-radius: 12px 12px 0px 0px"
                                    :src="
                                      mediaURLnewx + item.shikaraId.coverImage
                                    "
                                    height="150px"
                                    width="100%"
                                    ><template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                </v-flex>
                              </v-layout>
                            </v-flex>

                            <v-flex xs12>
                              <v-layout wrap justify-center fill-height>
                                <v-flex xs12 text-left align-self-center>
                                  <v-layout wrap justify-center>
                                    <v-flex xs11 pt-2>
                                      <span
                                        v-if="item.shikaraId.shikaraName"
                                        style="
                                          font-weight: 500;
                                          font-size: 20px;
                                          font-weight: bold;
                                          font-family: mainfont;
                                        "
                                      >
                                        {{ item.shikaraId.shikaraName }}
                                      </span>
                                      <span v-else>-</span>
                                    </v-flex>
                                    <v-flex xs11 pt-2>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Reservation # :
                                      </span>
                                      <span
                                        style="color: #f17343; font-size: 15px"
                                      >
                                        &nbsp; {{ item.reservationNo }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs11 pt-3>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Date :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatDate(item.checkInDate) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs11 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Check-in :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatTimeNew(item.startTime) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs11 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Check-out :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatTimeNew(item.endTime) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <!-- <v-flex xs11 pt-2 align-self-end>
                                        <span
                                          style="
                                            font-family: mainfont;
                                            font-size: 15px;
                                            font-weight: 500;
                                          "
                                          v-if="item.shikaraId.location"
                                        >
                                          Location :&nbsp;
                                          <span>
                                            {{ item.shikaraId.location.name }}
                                          </span>
                                        </span>
                                      </v-flex> -->
                                  </v-layout>
                                </v-flex>

                                <v-flex
                                  xs11
                                  pt-0
                                  pt-md-3
                                  text-left
                                  align-self-center
                                >
                                  <v-layout wrap justify-center>
                                    <v-flex xs12 text-left v-if="item">
                                      <span
                                        style="
                                          font-weight: 400;
                                          font-size: 14px;
                                          font-family: mainfont;
                                        "
                                      >
                                        Booked for : &nbsp;
                                      </span>
                                      <span
                                        v-if="item.guestName"
                                        style="
                                          color: #f17343;
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 400;
                                        "
                                      >
                                        {{ item.guestName }}</span
                                      >
                                      <span
                                        v-if="item.guestPhoneNumber"
                                        style="
                                          color: #f17343;
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 400;
                                        "
                                      >
                                        ,{{ item.guestPhoneNumber }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-1 pt-md-4>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        v-if="item.advancePayment"
                                      >
                                        Advance :&nbsp;
                                        <span style="color: #f17343">
                                          ₹ {{ item.advancePayment }}
                                        </span>
                                      </span>
                                    </v-flex>

                                    <v-flex xs12 text-left pt-1 pt-md-3>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                        v-if="item.balancepaymentStatus"
                                      >
                                        Balance :&nbsp;

                                        <span
                                          style="color: red"
                                          v-if="
                                            item.balancepaymentStatus ==
                                              'Pending' &&
                                            item.advancepaymentMode == 'Agent'
                                          "
                                        >
                                          ₹ {{ item.balancePayAmount }} Not Paid
                                        </span>
                                        <span
                                          style="color: green"
                                          v-else-if="
                                            item.balancepaymentStatus ==
                                              'Success' &&
                                            item.advancepaymentMode == 'Agent'
                                          "
                                        >
                                          ₹ {{ item.balancePayAmount }} Paid
                                        </span>
                                        <span style="color: green" v-else>
                                          ₹ {{ item.balancePayAmount }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-1 pt-md-4>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        v-if="item.balancePayedBy"
                                      >
                                        Balance payed by :&nbsp;
                                        <span style="color: #f17343">
                                          {{ item.balancePayedBy }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-1 pt-md-4>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        v-if="item.shikaraId.startingLocation"
                                      >
                                        Start/Drop Location :&nbsp;
                                        <span style="color: #f17343">
                                          {{
                                            item.shikaraId.startingLocation.name
                                          }}
                                        </span>
                                      </span>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>

                                <v-flex pt-3 xs11 align-self-center>
                                  <v-layout wrap justify-center>
                                    <v-flex xs12 text-center pb-2>
                                      <span
                                        v-if="item.totalPayableAmount"
                                        style="
                                          font-family: mainfont;
                                          color: black;
                                          font-size: 20px;
                                          font-weight: 600;
                                        "
                                      >
                                        ₹ {{ item.totalPayableAmount }}
                                      </span>
                                    </v-flex>

                                    <!-- <v-flex pb-3 xs12 text-center>
                                        <v-btn
                                          @click="
                                            $router.push(
                                              '/shikaraReservationEdit?id=' +
                                                item._id
                                            )
                                          "
                                          small
                                          dark
                                          block
                                          color="#F17343"
                                        >
                                          <span
                                            style="
                                              font-family: mainfont;
                                              color: white;
                                              font-size: 14px;
                                              font-weight: 400;
                                              text-transform: none;
                                            "
                                          >
                                            <v-icon
                                              small
                                              color="white"
                                              class="pb-1"
                                              >mdi-pencil</v-icon
                                            >
                                            Edit
                                          </span>
                                        </v-btn>
                                      </v-flex> -->
                                    <v-flex pb-3 xs12 text-center>
                                      <v-btn
                                        @click="
                                          (cancelDialog = true),
                                            (deleteId = item._id)
                                        "
                                        small
                                        dark
                                        block
                                        color="#F17343"
                                      >
                                        <span
                                          style="
                                            font-family: mainfont;
                                            color: white;
                                            font-size: 14px;
                                            font-weight: 400;
                                            text-transform: none;
                                          "
                                        >
                                          <v-icon
                                            small
                                            color="white"
                                            class="pb-1"
                                            >mdi-cancel</v-icon
                                          >
                                          Cancel
                                        </span>
                                      </v-btn>
                                    </v-flex>
                                    <!-- <v-flex xs12 text-center pl-3 pr-1>
                                                                  <span
                                                                      style="font-family: mainfont; color: black; font-size: 10px; font-weight: 600">
                                                                      ₹ {{ item.bookingTotal }}
                                                                  </span>
                                                              </v-flex> -->
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
                <v-flex xs12 pa-4 v-else>
                  <span
                    style="
                      font-weight: 400;
                      font-size: 20px;
                      font-family: mainfont;
                      text-align: center;
                    "
                  >
                    No reservations found
                  </span>
                </v-flex>
              </v-layout>

              <v-layout v-if="list.length > 0" wrap justify-center pb-3>
                <v-flex xs11>
                  <v-layout wrap>
                    <v-flex xs12 id="specific-section">
                      <v-pagination
                        small
                        color="#FF681F"
                        v-model="page"
                        :length="Pagelength"
                        :total-visible="7"
                      >
                      </v-pagination>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-dialog width="400px" v-model="cancelDialog">
                <v-card width="400px" class="pa-2">
                  <v-layout wrap justify-center>
                    <v-flex xs11 text-center
                      ><span style="color: rgba(0, 38, 53, 1)" class="mainfont"
                        >Cancel</span
                      ></v-flex
                    >
                    <v-flex xs1 text-right>
                      <v-icon @click="cancelDialog = false" color="#FF681F"
                        >mdi-close-box</v-icon
                      ></v-flex
                    >
                    <v-flex xs8 text-center py-4>
                      <v-divider></v-divider>
                    </v-flex>
                  </v-layout>
                  <v-card-text class="px-4 pb-0 mainfont text-center"
                    >Are you sure you want to cancel this reservation?
                  </v-card-text>
                  <v-card-actions class="pt-3">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#FF681F"
                      class="mainfont"
                      dark
                      @click="cancelReservation()"
                      >OK</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-tab-item>
            <v-tab-item>
              <v-layout wrap pt-6 pb-6 pl-4>
                <v-flex pt-2 pl-lg-0 pl-2 xs11 sm4 lg2>
                  <v-menu
                    ref="menuvthree"
                    v-model="menuvthree"
                    :close-on-content-click="false"
                    :return-value.sync="fromdatecancelled"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="fromdatecancelled"
                        outlined
                        readonly
                        label=" From Date"
                        color="orange"
                        dense
                        hide-details="auto"
                        clearable
                        class="mainfont rounded-0"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="fromdatecancelled"
                      no-title
                      color="orange"
                      scrollable
                      @change="$refs.menuvthree.save(fromdatecancelled)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex pl-2 pt-2 xs11 sm4 lg2>
                  <v-menu
                    ref="menuvfour"
                    v-model="menuvfour"
                    :close-on-content-click="false"
                    :return-value.sync="todatecancelled"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="todatecancelled"
                        outlined
                        readonly
                        label=" To Date"
                        color="orange"
                        dense
                        hide-details="auto"
                        clearable
                        class="rounded-0 mainfont"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="todatecancelled"
                      no-title
                      color="orange"
                      :min="fromdatecancelled"
                      @change="$refs.menuvfour.save(todatecancelled)"
                    >
                      <v-spacer></v-spacer>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs11 sm4 lg2 pt-2 pl-2>
                  <v-text-field
                    v-model="keywordcancelled"
                    outlined
                    dense
                    hide-details
                    clearable
                    color="black"
                    label="Search "
                    class="custom-text-field"
                    style="border-radius: 0%"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout wrap justify-center v-if="list2">
                <v-flex xs12 v-if="list2.length > 0">
                  <v-card elevation="0">
                    <v-layout
                      wrap
                      justify-center
                      class="hidden-sm-and-down"
                      pb-5
                    >
                      <v-flex
                        xs12
                        px-4
                        v-for="(item, i) in list2"
                        :key="i"
                        pt-5
                      >
                        <v-card
                          elevation="0"
                          color="#EDEDED"
                          style="border-radius: 12px"
                        >
                          <v-layout wrap justify-center>
                            <v-flex xs3>
                              <v-layout wrap justify-start>
                                <v-flex xs12 v-if="item.shikaraId">
                                  <v-img
                                    v-if="item.shikaraId.coverImage"
                                    style="border-radius: 12px 0px 0px 12px"
                                    :src="
                                      mediaURLnewx + item.shikaraId.coverImage
                                    "
                                    :height="
                                      $vuetify.breakpoint.name == 'xs'
                                        ? '180px'
                                        : $vuetify.breakpoint.name == 'sm'
                                        ? '180px'
                                        : $vuetify.breakpoint.name == 'md'
                                        ? '200px'
                                        : $vuetify.breakpoint.name == 'lg'
                                        ? '180px'
                                        : '180px'
                                    "
                                    width="250px"
                                    ><template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                </v-flex>
                              </v-layout>
                            </v-flex>

                            <v-flex xs9 pl-6>
                              <v-layout wrap justify-start fill-height>
                                <v-flex xs4 text-left align-self-center>
                                  <v-layout wrap fill-height>
                                    <v-flex xs12 align-self-start>
                                      <span
                                        style="
                                          font-weight: 500;
                                          font-size: 20px;
                                          font-weight: bold;
                                          font-family: mainfont;
                                        "
                                      >
                                        {{ item.shikaraId.shikaraName }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Reservation # :
                                      </span>
                                      <span
                                        style="
                                          color: #f17343;
                                          font-size: 15px;
                                          font-family: mainfont;
                                        "
                                      >
                                        &nbsp; {{ item.reservationNo }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Date :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatDate(item.checkInDate) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Check-in :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatTimeNew(item.startTime) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Check-out :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatTimeNew(item.endTime) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <!-- <v-flex xs12 pt-2 align-self-end>
                                        <span
                                          style="
                                            font-family: mainfont;
                                            font-size: 14px;
                                            font-weight: 500;
                                          "
                                        >
                                          Location :&nbsp;
                                          <span
                                            style="color: #f17343"
                                            v-if="item.shikaraId.location"
                                          >
                                            {{ item.shikaraId.location.name }}
                                          </span>
                                        </span>
                                      </v-flex> -->
                                  </v-layout>
                                </v-flex>

                                <v-flex
                                  xs5
                                  text-left
                                  align-self-end
                                  pb-0
                                  pb-md-3
                                  pl-2
                                >
                                  <v-layout wrap fill-height>
                                    <v-flex xs12 v-if="item" align-self-start>
                                      <span
                                        style="
                                          font-weight: 400;
                                          font-size: 14px;
                                          font-family: mainfont;
                                        "
                                      >
                                        Booked for : &nbsp;
                                      </span>
                                      <span
                                        v-if="item.guestName"
                                        style="
                                          color: #f17343;
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 400;
                                        "
                                      >
                                        {{ item.guestName }}</span
                                      >
                                      <span
                                        v-if="item.guestPhoneNumber"
                                        style="
                                          color: #f17343;
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 400;
                                        "
                                      >
                                        ,{{ item.guestPhoneNumber }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                      >
                                        Advance :&nbsp;
                                        <span
                                          style="color: #f17343"
                                          v-if="item.advancePayment"
                                        >
                                          ₹ {{ item.advancePayment }}
                                        </span>
                                      </span>
                                    </v-flex>

                                    <v-flex
                                      xs12
                                      text-left
                                      pt-2
                                      align-self-end
                                      v-if="item.balancepaymentStatus"
                                    >
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Balance :&nbsp;

                                        <span
                                          style="color: red"
                                          v-if="
                                            item.balancepaymentStatus ==
                                              'Pending' &&
                                            item.advancepaymentMode == 'Agent'
                                          "
                                        >
                                          ₹ {{ item.balancePayAmount }} Not Paid
                                        </span>
                                        <span
                                          style="color: green"
                                          v-else-if="
                                            item.balancepaymentStatus ==
                                              'Success' &&
                                            item.advancepaymentMode == 'Agent'
                                          "
                                        >
                                          ₹ {{ item.balancePayAmount }} Paid
                                        </span>
                                        <span style="color: green" v-else>
                                          ₹ {{ item.balancePayAmount }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                      >
                                        Balance payed by :&nbsp;
                                        <span
                                          style="color: #f17343"
                                          v-if="item.balancePayedBy"
                                        >
                                          {{ item.balancePayedBy }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                      >
                                        Start/Drop Location :&nbsp;
                                        <span
                                          style="color: #f17343"
                                          v-if="item.shikaraId.startingLocation"
                                        >
                                          {{
                                            item.shikaraId.startingLocation.name
                                          }}
                                        </span>
                                      </span>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>

                                <v-flex xs3 align-self-center>
                                  <v-layout wrap justify-center>
                                    <v-flex
                                      xs12
                                      text-center
                                      pl-3
                                      pr-1
                                      pb-2
                                      v-if="item.totalPayableAmount"
                                    >
                                      <span
                                        style="
                                          font-family: mainfont;
                                          color: black;
                                          font-size: 20px;
                                          font-weight: 600;
                                        "
                                      >
                                        ₹ {{ item.totalPayableAmount }}
                                      </span>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-card>
                      </v-flex>
                    </v-layout>

                    <v-layout wrap justify-center class="hidden-md-and-up" pb-6>
                      <v-flex xs11 v-for="(item, i) in list2" :key="i" pt-5>
                        <v-card
                          elevation="0"
                          color="#EDEDED"
                          style="border-radius: 12px"
                        >
                          <v-layout wrap justify-center>
                            <v-flex xs12>
                              <v-layout wrap justify-start>
                                <v-flex xs12 v-if="item.shikaraId">
                                  <v-img
                                    v-if="item.shikaraId.coverImage"
                                    style="border-radius: 12px 12px 0px 0px"
                                    :src="
                                      mediaURLnewx + item.shikaraId.coverImage
                                    "
                                    height="150px"
                                    width="100%"
                                    ><template v-slot:placeholder>
                                      <ImageLoader /> </template
                                  ></v-img>
                                </v-flex>
                              </v-layout>
                            </v-flex>

                            <v-flex xs12>
                              <v-layout wrap justify-center fill-height>
                                <v-flex xs12 text-left align-self-center>
                                  <v-layout wrap justify-center>
                                    <v-flex xs11 pt-2>
                                      <span
                                        style="
                                          font-weight: 500;
                                          font-size: 20px;
                                          font-weight: bold;
                                          font-family: mainfont;
                                        "
                                      >
                                        {{ item.shikaraId.shikaraName }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs11 pt-2>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Reservation # :
                                      </span>
                                      <span
                                        style="color: #f17343; font-size: 15px"
                                      >
                                        &nbsp; {{ item.reservationNo }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs11 pt-3>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Date :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatDate(item.checkInDate) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs11 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Check-in :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatTimeNew(item.startTime) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs11 pt-2 align-self-end>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                      >
                                        Check-out :&nbsp;
                                        <span style="color: #f17343">
                                          {{ formatTimeNew(item.endTime) }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <!-- <v-flex xs11 pt-2 align-self-end>
                                        <span
                                          style="
                                            font-family: mainfont;
                                            font-size: 15px;
                                            font-weight: 500;
                                          "
                                          v-if="item.shikaraId.location"
                                        >
                                          Location :&nbsp;
                                          <span>
                                            {{ item.shikaraId.location.name }}
                                          </span>
                                        </span>
                                      </v-flex> -->
                                  </v-layout>
                                </v-flex>

                                <v-flex
                                  xs11
                                  pt-0
                                  pt-md-3
                                  text-left
                                  align-self-center
                                >
                                  <v-layout wrap justify-center>
                                    <v-flex xs12 text-left v-if="item">
                                      <span
                                        style="
                                          font-weight: 400;
                                          font-size: 14px;
                                          font-family: mainfont;
                                        "
                                      >
                                        Booked for : &nbsp;
                                      </span>
                                      <span
                                        v-if="item.guestName"
                                        style="
                                          color: #f17343;
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 400;
                                        "
                                      >
                                        {{ item.guestName }}</span
                                      >
                                      <span
                                        v-if="item.guestPhoneNumber"
                                        style="
                                          color: #f17343;
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 400;
                                        "
                                      >
                                        ,{{ item.guestPhoneNumber }}
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-1 pt-md-4>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        v-if="item.advancePayment"
                                      >
                                        Advance :&nbsp;
                                        <span style="color: #f17343">
                                          ₹ {{ item.advancePayment }}
                                        </span>
                                      </span>
                                    </v-flex>

                                    <v-flex xs12 text-left pt-1 pt-md-3>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 15px;
                                          font-weight: 500;
                                        "
                                        v-if="item.balancePayAmount"
                                      >
                                        Balance :&nbsp;

                                        <span
                                          style="color: red"
                                          v-if="
                                            item.balancepaymentStatus ==
                                              'Pending' &&
                                            item.advancepaymentMode == 'Agent'
                                          "
                                        >
                                          ₹ {{ item.balancePayAmount }} Not Paid
                                        </span>
                                        <span
                                          style="color: green"
                                          v-else-if="
                                            item.balancepaymentStatus ==
                                              'Success' &&
                                            item.advancepaymentMode == 'Agent'
                                          "
                                        >
                                          ₹ {{ item.balancePayAmount }} Paid
                                        </span>
                                        <span style="color: green" v-else>
                                          ₹ {{ item.balancePayAmount }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-1 pt-md-4>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        v-if="item.balancePayedBy"
                                      >
                                        Balance payed by :&nbsp;
                                        <span style="color: #f17343">
                                          {{ item.balancePayedBy }}
                                        </span>
                                      </span>
                                    </v-flex>
                                    <v-flex xs12 text-left pt-1 pt-md-4>
                                      <span
                                        style="
                                          font-family: mainfont;
                                          font-size: 14px;
                                          font-weight: 500;
                                        "
                                        v-if="item.shikaraId.startingLocation"
                                      >
                                        Start/Drop Location :&nbsp;
                                        <span style="color: #f17343">
                                          {{
                                            item.shikaraId.startingLocation.name
                                          }}
                                        </span>
                                      </span>
                                    </v-flex>
                                  </v-layout>
                                </v-flex>

                                <v-flex pt-3 xs11 align-self-center>
                                  <v-layout wrap justify-center>
                                    <v-flex xs12 text-center pb-2>
                                      <span
                                        v-if="item.totalPayableAmount"
                                        style="
                                          font-family: mainfont;
                                          color: black;
                                          font-size: 20px;
                                          font-weight: 600;
                                        "
                                      >
                                        ₹ {{ item.totalPayableAmount }}
                                      </span>
                                    </v-flex>

                                    <!-- <v-flex pb-3 xs12 text-center>
                                        <v-btn
                                          @click="gotoView(item.houseboatBookId)"
                                          block
                                          color="#F17343"
                                        >
                                          <span
                                            style="
                                              font-family: mainfont;
                                              color: white;
                                              font-size: 14px;
                                              font-weight: 400;
                                              text-transform: none;
                                            "
                                          >
                                            Edit
                                          </span>
                                        </v-btn>
                                      </v-flex> -->
                                  </v-layout>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
                <v-flex xs12 pa-4 v-else>
                  <span
                    style="
                      font-weight: 400;
                      font-size: 20px;
                      font-family: mainfont;
                      text-align: center;
                    "
                  >
                    No reservations found
                  </span>
                </v-flex>
              </v-layout>

              <v-layout v-if="list2.length > 0" wrap justify-center pb-3>
                <v-flex xs11>
                  <v-layout wrap>
                    <v-flex xs12 id="specific-section"  class="mainfont">
                      <v-pagination
                        small
                        color="#FF681F"
                        v-model="page2"
                        :length="Pagelength2"
                        :total-visible="7"
                      >
                      </v-pagination>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-tab-item>
          </v-tabs>
        </v-card>
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
      ServerError: false,
      snackbar: false,
      list: [],
      list2: [],
      timeout: 5000,
      msg: null,
      page: 1,
      limit: 20,
      keywordcancelled: "",
      fromdatecancelled: "",
      todatecancelled: "",
      keywordcurrent: "",
      fromdatecurrent: "",
      todatecurrent: "",
      menuvtwo: false,
      menuvone: false,
      menuvthree: false,
      menuvfour: false,
      page2: 1,
      limit2: 20,
      deleteId: "",
      carouselSpeed: 1000,
      cancelDialog: false,
      value: "",
      phone: "",
      currentPage: 1,
      myTab: "",
    };
  },
  watch: {
    keywordcurrent() {
      this.getList();
    },

    keywordcancelled() {
      this.getcancelledList();
    },

    fromdatecancelled() {
      this.getcancelledList();
    },

    todatecancelled() {
      this.getcancelledList();
    },

    fromdatecurrent() {
      this.getList();
    },
    todatecurrent() {
      this.getList();
    },
    page() {
      this.getList();
    },
    page2() {
      this.getcancelledList();
    },
  },
  mounted() {
    this.getList();
    this.getcancelledList();
  },

  methods: {
    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    formatTime(time) {
      if (!time) return "";
      const formattedTime = new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedTime;
    },
    getList() {
      this.appLoading = true;

      axios({
        method: "get",
        url: "/admin/reservation/all/shikara",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          keyword: this.keywordcurrent,
          fromDate: this.fromdatecurrent,
          toDate: this.todatecurrent,
          page: this.page,
          count: this.limit,
        },
      }).then((response) => {
        if (response.data.status) {
          this.list = response.data.data;
          this.totalData = response.data.totalLength;
          this.Pagelength = Math.ceil(response.data.totalLength / this.limit);
          this.appLoading = false;
        } else {
          this.appLoading = false;

          this.msg = response.data.msg;
          this.snackbar = true;
        }
      });
      // }
    },
    getcancelledList() {
      this.appLoading = true;

      axios({
        method: "get",
        url: "/admin/reservation/shikara/cancelled/getlist",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          toDate: this.todatecancelled,
          fromDate: this.fromdatecancelled,
          keyword: this.keywordcancelled,
          page: this.page2,
          count: this.limit2,
        },
      }).then((response) => {
        if (response.data.status) {
          this.list2 = response.data.data;
          this.Pagelength2 = Math.ceil(response.data.totalLength / this.limit2);
          this.appLoading = false;
        } else {
          this.appLoading = false;

          this.msg = response.data.msg;
          this.snackbar = true;
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
    formatTimeNew(item) {
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
        // day + " " + dt.slice(4, 7) + " " + year;
        // +
        // " , " +
        hours + ":" + minutes + " " + ampm;

      return strTime;
    },
    cancelReservation() {
      this.appLoading = true;
      axios({
        method: "get",
        url: "/admin/reservation/shikara/cancel",
        params: {
          id: this.deleteId,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status) {
          this.msg = response.data.msg;
          this.showsnackbar = true;
          this.cancelDialog = false;
          location.reload();
        } else {
          this.msg = response.data.msg;
          this.showsnackbar = true;
        }
      });
      // }
    },
  },
};
</script>