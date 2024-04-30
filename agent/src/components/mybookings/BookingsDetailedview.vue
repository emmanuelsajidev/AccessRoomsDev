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
    <v-layout wrap justify-center >
      <!-- <v-flex xs12 pt-14 pt-lg-4>
        <span
          style="font-size: 12px; font-weight: 400; font-family: LexendRegular"
          >My Bookings</span
        >
      </v-flex> -->
      <v-flex xs12 pt-8>
        <v-layout wrap pb-9 justify-center style="background-color: white">
          <v-flex xs11>
            <v-layout wrap justify-center pb-6>
              <v-flex text-left pt-6>
                <span
                  style="
                    font-family: LexendRegular;
                    color: #f17343;
                    text-transform: none;
                    font-size: 20px;
                    font-weight: 500;
                  "
                >
                  BOOKING DETAILS
                </span>
              </v-flex>
              <v-flex xs12 pt-5>
                <v-card
                  elevation="0"
                  color="#EDEDED"
                  style="border-radius: 12px"
                >
                  <v-layout wrap justify-center>
                    <v-flex xs12 v-if="list.shikaraid">
                      <v-layout wrap justify-start>
                        <v-flex xs12>
                          <v-flex>
                            <v-img
                              style="border-radius: 0px 0px 0px 0px"
                              :src="mediaUURL + list.shikaraid.coverImage"
                            >
                            </v-img>
                          </v-flex>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12 pl-6 v-if="list.shikaraid">
                      <v-layout wrap pb-6 justify-start fill-height>
                        <v-flex
                          xs12
                          sm4
                          md4
                          lg4
                          xl4
                          pt-6
                          text-left
                          align-self-center
                        >
                          <v-layout wrap>
                            <v-flex xs12>
                              <span
                                style="
                                  font-weight: 500;
                                  font-size: 20px;
                                  font-weight: bold;
                                  font-family: LexendRegular;
                                "
                              >
                                {{ list.shikaraid.shikaraName }}
                                <!-- <span
                                        style="font-weight: 300; font-size: 14px; font-family: LexendRegular;">
                                        {{ list.bookingType }}
                                    </span> -->
                              </span>
                            </v-flex>
                            <v-flex xs12 pt-3>
                              <span
                                style="
                                  font-family: LexendRegular;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Booking #
                              </span>
                              <span
                                style="
                                  color: #f17343;
                                  font-family: LexendRegular;
                                  font-size: 15px;
                                  font-weight: 400;
                                "
                              >
                                &nbsp; {{ list.bookingNo }}
                              </span>
                            </v-flex>

                            <v-flex pt-3>
                              <span
                                style="
                                  font-family: LexendRegular;
                                  font-size: 15px;
                                  font-weight: 500;
                                "
                              >
                                Timings:&nbsp;
                                <span
                                  style="
                                    color: #f17343;
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                >
                                  {{ formattedDate(list.selectedDate) }},
                                  <br />

                                  {{ formatTimeNew(list.startTime) }} - {{ formatTimeNew(list.endTime) }}

                                </span>
                              </span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          xs12
                          sm4
                          md5
                          lg4
                          xl5
                          pt-6
                          text-left
                          align-self-center
                        >
                          <v-layout wrap>
                            <v-flex xs12 v-if="list.customerDetails">
                              <span
                                style="
                                  font-weight: 400;
                                  font-size: 14px;
                                  font-weight: bold;
                                  font-family: LexendRegular;
                                "
                              >
                                Booked for : &nbsp;
                              </span>
                              <span
                                style="
                                  color: #f17343;
                                  font-family: LexendRegular;
                                  font-size: 15px;
                                  font-weight: 400;
                                "
                              >
                                {{ list.customerDetails.name }},
                                {{ list.customerDetails.phoneNumber }}
                              </span>
                            </v-flex>
                            <v-flex xs12 text-left pt-4 v-if="list.memberCount">
                              <span
                                style="
                                  font-family: LexendRegular;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Members :&nbsp;
                                <span
                                  style="
                                    color: #f17343;
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                >
                                  {{ list.memberCount }} Adults,
                                  {{ list.childrenCount }} Children (below 5 years)
                                </span>
                              </span>
                            </v-flex>

                            <v-flex xs12 text-left pt-3>
                              <span
                                style="
                                  font-family: LexendRegular;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Balance :&nbsp;

                                <span
                                  style="
                                    color: red;
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                  v-if="list.balancepaymentStatus == 'Pending'"
                                >
                                  ₹ {{ list.postBookingamount }} Not Paid
                                </span>
                                <span
                                  style="
                                    color: green;
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                  v-else
                                >
                                  ₹ {{ list.postBookingamount }} Paid
                                </span>
                              </span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex xs12 sm4 md2 lg3 xl2 pt-6 align-self-center>
                          <v-layout wrap justify-end>
                            <v-flex
                              class="hidden-sm-and-down"
                              xs12
                              text-left
                              pr-1
                            >
                              <span
                                style="
                                  font-weight: 400;
                                  font-size: 14px;
                                  font-weight: bold;
                                  font-family: LexendRegular;
                                "
                                >Pickup/Drop </span
                              >&nbsp;:
                              <span
                                style="
                                  color: #f17343;
                                  font-family: LexendRegular;
                                  font-size: 15px;
                                  font-weight: 400;
                                "
                                >{{ list.shikaraid.startingLocation.name }}</span
                              >
                              <br />
                              <br />

                              <span
                                style="
                                  font-family: LexendRegular;
                                  color: black;
                                  font-size: 22px;
                                  font-weight: 600;
                                "
                              >
                                ₹ {{ list.bookingTotal }}
                              </span>
                            </v-flex>
                            <v-flex
                              class="hidden-md-and-up"
                              xs12
                              text-left
                              pr-1
                            >
                              <span
                                style="
                                  font-weight: 400;
                                  font-size: 14px;
                                  font-weight: bold;
                                  font-family: LexendRegular;
                                "
                                >Starting Location</span
                              >&nbsp;:
                              <span
                                style="
                                  color: #f17343;
                                  font-family: LexendRegular;
                                  font-size: 15px;
                                  font-weight: 400;
                                "
                                >{{ list.location.name }}</span
                              >
                              <br />
                              <span
                                style="
                                  font-family: LexendRegular;
                                  color: black;
                                  font-size: 22px;
                                  font-weight: 600;
                                "
                              >
                                ₹ {{ list.bookingTotal }}
                              </span>
                            </v-flex>
                            <!-- <v-flex xs12 text-left pt-4 pr-1 style="font-family:LexendRegular">
                              <span style="color:		#50C878;font-size:13px;font-weight:bolder">
                                Commission: &nbsp;
                              </span>
                              <span style="font-family: LexendRegular;color:#50C878;font-size: 15px;font-weight:600">
                                ₹ {{ list.agentgetAmount }}

                              </span>

                            </v-flex> -->
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
              <v-flex xs12 pt-10>
                <v-layout wrap>
                  <v-flex xs12>
                    <span
                      style="
                        font-family: LexendRegular;

                        color: #f17343;
                        text-transform: none;
                        font-size: 20px;
                        font-weight: 500;
                      "
                    >
                      CUSTOMER DETAILS
                    </span>
                  </v-flex>
                  <v-flex xs12 v-if="list.customerDetails">
                    <v-layout wrap >
                      <v-flex xs12 sm4  lg3  pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs12 lg12>
                            <v-layout wrap>
                              <v-flex xs6  lg12>
                                <span class="heading"> Name : </span>
                              </v-flex>
                              <v-flex align-self-center  xs6 lg12 class="subheading">
                                <span>
                                  {{ list.customerDetails.name }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm4 lg3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-layout wrap>
                              <v-flex lg12>
                                <span class="heading"> Phone Number : </span>
                              </v-flex>
                              <v-flex lg12 >
                                <span class="subheading">
                                  {{ list.customerDetails.phoneNumber }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm4 lg3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-layout wrap>
                              <v-flex lg12>
                                <span class="heading"> Email :</span>
                              </v-flex>
                              <v-flex lg12 >
                                <span v-if="list.customerDetails.email" class="subheading">
                                  {{ list.customerDetails.email }}
                                </span>
                                <span v-else>-</span>

                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm4 lg3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs12>
                            <v-layout wrap>
                              <v-flex xs6 lg12>
                                <span class="heading"> Address : </span>
                              </v-flex>
                              <v-flex xs6 lg12 >
                                <span v-if="list.customerDetails.address" class="subheading">
                                  {{ list.customerDetails.address }}
                                </span>
                                <span>-</span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12 pt-6>
                <span
                  style="
                    font-family: LexendRegular;

                    color: #f17343;
                    text-transform: none;
                    font-size: 20px;
                    font-weight: 500;
                  "
                >
                  PAYMENT DETAILS
                </span>
              </v-flex>
              <v-flex xs12>
                <v-layout wrap justify-center>
                  <v-flex xs12 pt-3>
                    <v-layout wrap justify-start>
                      <v-flex xs12 lg2 pt-3>
                        <v-layout wrap>
                          <v-flex xs6 lg12>
                            <span class="heading"> Booking # :</span>
                          </v-flex>
                          <v-flex lg12 xs6 class="subheading">
                            <span>
                              {{ list.bookingNo }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 lg2 pt-3>
                        <v-layout wrap>
                          <v-flex xs6 lg12>
                            <span class="heading"> Booking On :</span>
                          </v-flex>
                          <v-flex  xs6  lg12 class="subheading">
                            <span>
                              {{ formattedDate(list.bookedOn) }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 lg2 pt-3>
                        <v-layout wrap>
                          <v-flex xs6 lg12 text-left>
                            <span class="heading"> Total Amount :</span>
                          </v-flex>
                          <v-flex xs6 lg12  text-left>
                            <span class="subheading">
                              ₹ {{ list.bookingTotal }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 lg2 pt-3>
                        <v-layout wrap>
                          <v-flex xs6 lg12 text-left>
                            <span class="heading"> Advance Paid :</span>
                          </v-flex>
                          <v-flex xs6  lg12 text-left>
                            <span class="subheading">
                              ₹ {{ list.advance }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 lg2 pt-3 >
                        <v-layout wrap>
                          <v-flex xs6 lg12 text-left>
                            <span class="heading"> Balance Amount :</span>
                          </v-flex>
                          <v-flex xs6  lg12 text-left>
                            <span class="subheading">
                              ₹ {{ list.postBookingamount }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 lg2 pt-3>
                        <v-layout wrap>
                          <v-flex xs6 lg12 text-left>
                            <span class="heading">
                              Status of Balance Amount :
                            </span>
                          </v-flex>
                          <v-flex xs6 lg12 text-left>
                            <span
                              class="subheading"
                              v-if="list.balancepaymentStatus == 'Pending'"
                            >
                              Not Paid
                            </span>
                            <span
                              style="
                                font-weight: 600;
                                font-size: 12px;
                                text-transform: none;
                              "
                              class="LexendRegular"
                              v-else-if="
                                list.advancepaymentMode === 'Agent' &&
                                list.balancepaymentStatus === 'Verified'
                              "
                              >Paid and Verified by Vendor</span
                            >

                            <span
                              style="
                                font-weight: 600;
                                font-size: 12px;
                                text-transform: none;
                              "
                              class="LexendRegular"
                              v-else-if="
                                list.advancepaymentMode === 'Agent' &&
                                list.balancepaymentStatus === 'Success'
                              "
                            >
                              Payment done waiting for approval from Vendor
                            </span>
                            <span
                              v-else
                              style="
                                font-weight: 600;
                                font-size: 12px;
                                text-transform: none;
                              "
                              class="LexendRegular"
                            >
                              Paid
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12 pt-5 pb-5>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12 lg5 pt-3>
                <span
                  style="
                  font-family: LexendRegular;

                    color: #f17343;
                    text-transform: none;
                    font-size: 20px;
                    font-weight: 500;
                  "
                >
                  PROCEED WITH BALANCE PAYMENT
                </span>
              </v-flex>
              <v-flex xs12 lg7 pt-3>
                <span
                  style="
                  font-family: LexendRegular;

                    color: red;
                    text-transform: none;
                    font-size: 14px;
                    font-weight: 500;
                  "
                >
                Kindly ensure the remaining balance is remitted within 24 hours prior to the commencement of the trip.
                </span>
              </v-flex>
              <v-flex xs12 pt-6>
                <v-layout wrap>
                  <v-flex xs12 sm5 md4 lg3>
                    <span
                      style="
                        font-weight: 500;
                        color: black;
                        font-size: 18px;
                        font-family: LexendRegular;
                        text-transform: none;
                      "
                      >Payee Deatils</span
                    >
                    <v-autocomplete
                      disabled
                      outlined
                      dense
                      color="black"
                      :items="categorys"
                      v-model="advancepaymentMode"
                      item-text="name"
                      item-color="#FF1313"
                      hide-details="true"
                      class="custom-autocomplete rounded-lg"
                    >
                    </v-autocomplete>
                  </v-flex>
                  <v-flex
                    xs12
                    sm5 
                    pl-lg--4
                    pl-sm-4
                    md4
                    lg3
                   
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Pending'
                    "
                  >
                    <span
                      style="
                        font-weight: 500;
                        color: black;
                        font-size: 18px;
                        font-family: LexendRegular;
                        text-transform: none;
                      "
                      >Choose Payment Mode</span
                    >
                    <v-autocomplete
                      outlined
                      dense
                      color="black"
                      :items="mode"
                      v-model="balancepaymentMode"
                      item-text="name"
                      item-color="#FF1313"
                      hide-details="true"
                      clearable
                      class="custom-autocomplete rounded-lg"
                    >
                      <template v-slot:append>
                        <v-layout wrap justify-center>
                          <v-flex xs1 pt-1>
                            <v-icon color="black">mdi-chevron-down</v-icon>
                          </v-flex>
                        </v-layout>
                      </template>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex
                  pt-6
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Pending'
                    "
                    xs12
                    sm5
                    lg4
                   
                    @click="$refs.uploadFront.click()"
                  >
                    <v-layout wrap justify-center>
                      <v-flex xs2>
                        <v-img
                          height="auto"
                          src="./../../assets/images/upload.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs9 text-left align-self-center>
                        <input
                          v-show="false"
                          id="file"
                          ref="uploadFront"
                          type="file"
                          @change="uploadFront"
                        />
                        <v-chip hide-details color="white">
                          <v-layout wrap>
                            <v-flex xs12>
                              <span
                            style="
                              font-weight: bold;
                              font-family: LexendRegular;
                            "
                            >Upload Payment Reciept</span
                          >
                            </v-flex>
                            <v-flex xs12>
                              <span
                            style="
                              color: #929292;
                              font-size: 12px;
                              font-family: LexendRegular;
                            "
                            >{{ imageFileFront.name }}</span
                          >
                            </v-flex>
                          </v-layout>
                        
                        

                         
                        </v-chip>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex
                  align-self-center
                    xs12
                    sm5
                    lg2
                    pt-2
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Pending'
                    "
                  >
                    <v-btn @click="validate()" color="#F17343" block>
                      <span
                        style="
                          color: white;
                          font-family: LexendRegular;
                          text-transform: none;
                        "
                      >
                        Submit Details
                      </span>
                      <v-icon color="white">mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-flex>

                  <v-flex
                    @click="
                      copyToClipboard(list.shikaraid.vendorid.bankDetails.upiId)
                    "
                    xs12
                    sm5
                    md4
                    lg4
                    xl4
                    pt-7
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Pending'
                    "
                  >
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        font-family: LexendRegular;
                      "
                    >
                      <span style="color: black"
                        >COPY UPI ID OF THE VENDOR
                      </span>
                      <v-icon
                        color="black"
                        style="cursor: pointer; margin-left: 5px"
                      >
                        mdi-content-copy
                      </v-icon>
                    </div>
                    <div>
                      <span style="font-family: LexendRegular">{{
                        list.shikaraid.vendorid.bankDetails.upiId
                      }}</span>
                    </div>
                  </v-flex>
                  <v-flex
                    xs12
                    sm5
                    md4
                    lg4
                    xl4
                    pt-7
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Pending'
                    "
                  >
                    <span style="color: black; font-family: LexendRegular">
                      QR CODE OF THE VENDOR
                    </span>
                    <v-img
                      height="100%"
                      width="100%"
                      style="border-radius: 12px 12px 12px 12px"
                      :src="
                        mediaUURL + list.shikaraid.vendorid.bankDetails.qrCode
                      "
                    ></v-img>
                  </v-flex>
                  <v-flex
                    xs12
                    sm5
                    md4
                    lg4
                    xl4
                    pt-7
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Verified'
                    "
                  >
                    <span class="LexendRegular" style="text-transform: none">
                      Paid and Verified by Vendor
                    </span>
                    <v-icon color="green"> mdi-check-decagram </v-icon>
                  </v-flex>

                  <v-flex
                    xs12
                    sm5
                    md4
                    lg4
                    xl4
                    pt-7
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Success'
                    "
                  >
                    <span class="LexendRegular" style="text-transform: none">
                      Payment done waiting for approval from Vendor
                    </span>
                    <v-icon color="blue"> mdi-clock-time-eight </v-icon>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
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
      ServerError: false,
      snackbar: false,
      timeout: 5000,
      list: {},
      balancepaymentMode: null,
      msg: null,
      favorites: [],
      categorys: ["Agent", "Guest", "Driver"],
      mode: ["UPI Id", "Bank Transfer", "QR code"],

      value: "",
      phone: "",
      imageFileFront: "",
      imageFileBack: "",
      imageFile: "",
      advancepaymentMode: null,
      id: this.$route.query.id,
      docsFront: "",
      docsBack: "",
      docs: "",
      docs1: "",
      file: "",
      formData: new FormData(),
    };
  },
  computed: {
    appUser() {
      return this.$store.state.userData;
    },
  },
  beforeMount() {
    // this.imageFileFront=this.appUser.agentIdProofFront
  },
  mounted() {
    this.getList();
  },
  methods: {
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
    formattedDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(date).toLocaleDateString("en-GB", options);
    },
    copyToClipboard(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      this.msg = "UPI ID copied to clipboard";
      this.snackbar = true;
    },
    getList() {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/view/shikbook",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          shikbookid: this.id,
        },
      })
        .then((response) => {
          this.list = response.data.data;
          this.advancepaymentMode = this.list.advancepaymentMode;
          this.appLoading = false;
        })
        .catch((err) => {
          this.ServerError = true;
          console.error(err);
        });
    },

   
    uploadFront(event) {
      this.docsFront = event.target.files[0];
      if (this.docsFront) {
        this.imageFileFront = this.docsFront;
      }
    },
    uploadBack(event) {
      this.docsBack = event.target.files[0];
      if (this.docsBack) {
        this.imageFileBack = this.docsBack;
      }
    },
    upload(event) {
      console.log(this.imageFile);
      this.docs = event.target.files[0];
      if (this.docs) {
        this.imageFile = this.docs;
      }
    },
    formatTime(time) {
      if (!time) return "";

      const date = new Date(time);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    },
    validate() {
  if (!this.docsFront || this.docsFront == "") {
    this.msg = "Please Upload Reciept";
    this.snackbar = true;
  } 
  if(!this.balancepaymentMode)
  {
    this.msg = "Please Select Mode";
    this.snackbar = true;
  }
  
  else {
    this.submitPayment();
  }
},
    submitPayment() {
      this.formData.append("shikbookid", this.id);
      this.formData.append("balancepaymentMode", this.balancepaymentMode);
      this.formData.append("paymentReceipt", this.imageFileFront);
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/postpay/shikara",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: this.formData,
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = "Payment Successfull";
            this.snackbar = true;
            location.reload();
            // this.$router.push("/shikarabookings");
          } else {
            this.msg = response.data.msg;
            this.snackbar = true;
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.error(err);
        });
    },
  },
};
</script>
<style>
.bg {
  background: url("./../../assets/images/reg1Back.png") no-repeat center center;
}

.changeStyle {
  position: relative;
  margin-top: -18%;

  @media (max-width: 960px) {
    position: relative;
    margin-top: 0%;
  }
}

@media only screen and (min-width: 960px) and (max-width: 1100px) {
  .changeStyle {
    position: relative;
    margin-top: -10%;
  }
}

.heading {
  color: #000000;
  text-transform: none;
  font-family: LexendRegular;
  font-size: 16px;
}

.subheading {
  color: #000000;
  text-transform: none;
  font-family: LexendRegular;
  font-size: 13px;
  font-weight: 600;
}

.v-autocomplete__content .v-list__tile {
  height: 2px;
}
</style>