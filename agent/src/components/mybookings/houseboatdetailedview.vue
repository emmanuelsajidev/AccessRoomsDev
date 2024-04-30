<template>
  <div>
    <PageLoader v-bind:storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="snackbar" color="#ff6200" right :timeout="3000">
      <v-layout wrap class="LexendRegular">
        <v-flex text-left class="align-self-center" style="color: white">{{
          msg
        }}</v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="snackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center>
      <v-flex xs12 pt-8>
        <v-layout wrap justify-center style="background-color: white">
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
                    <v-flex xs12>
                      <v-layout wrap justify-start>
                        <v-flex xs12>
                          <v-img
                            v-if="
                              list.houseBoatId && list.houseBoatId.coverImage
                            "
                            style="border-radius: 0px 0px 0px 0px"
                            :src="mediaUURL + list.houseBoatId.coverImage"
                            height="100%"
                            width="100%"
                          ></v-img>
                        </v-flex>
                      </v-layout>
                    </v-flex>

                    <v-flex xs12 pl-6>
                      <v-layout wrap pb-6 justify-start fill-height>
                        <v-flex
                          xs12
                          sm6
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
                                v-if="
                                  list.houseBoatId &&
                                  list.houseBoatId.houseBoatName
                                "
                                style="
                                  font-weight: 500;
                                  font-size: 20px;
                                  font-weight: bold;
                                  font-family: LexendRegular;
                                "
                              >
                                {{ list.houseBoatId.houseBoatName }}
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
                                Booking # :
                              </span>
                              <span
                                style="
                                  color: #f17343;
                                  font-family: LexendRegular;
                                  font-size: 15px;
                                "
                              >
                                &nbsp; {{ list.bookingNo }}
                              </span>
                            </v-flex>

                            <v-flex pt-3>
                              <span
                                style="
                                  font-family: LexendRegular;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Trip Type :&nbsp;
                                <span
                                  style="
                                    color: #f17343;
                                    font-family: LexendRegular;
                                  "
                                >
                                  {{ list.tripType }}
                                </span>
                              </span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          xs12
                          sm6
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
                                {{
                                  list.userid && list.userid.companyName
                                    ? list.userid.companyName
                                    : ""
                                }}
                              </span>
                            </v-flex>
                            <v-flex xs12 text-left pt-4>
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
                                  {{ list.noOfAdults }} Adults,
                                  {{ list.noOfChildren }} Children (below 5 years)
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
                                Check In Date :&nbsp;

                                <span
                                  style="
                                    color: #f17343;
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                  v-if="list"
                                >
                                  {{ formattedDate(list.startDate) }}
                                </span>
                              </span>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex
                          xs12
                          sm6
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
                                  font-weight: 400;
                                  font-size: 14px;
                                  font-weight: bold;
                                  font-family: LexendRegular;
                                "
                              >
                              </span>
                              <span
                                v-if="list.vendorName && list.vendorName.name"
                                style="
                                  color: #f17343;
                                  font-family: LexendRegular;
                                  font-size: 15px;
                                  font-weight: 400;
                                "
                              >
                                {{ list.vendorName.name }}
                              </span>
                            </v-flex>
                            <v-flex xs12 text-left pt-3 v-if="list.houseBoatId">
                              <span
                                style="
                                  font-family: LexendRegular;
                                  font-size: 14px;
                                  font-weight: 500;
                                "
                              >
                                Pickup/ Drop :&nbsp;

                                <span
                                  style="
                                    color: #f17343;
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                >
                                  {{ list.houseBoatId.location.name }}
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
                                Check Out Date :&nbsp;

                                <span
                                  style="
                                    color: #f17343;
                                    font-family: LexendRegular;
                                    font-size: 15px;
                                    font-weight: 400;
                                  "
                                  v-if="list"
                                >
                                  {{ formattedDate(list.endDate) }}
                                </span>
                              </span>
                            </v-flex>
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
                  <v-flex xs12>
                    <v-layout wrap justify-center>
                      <v-flex xs12 sm6 md3 lg3 xl3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs6>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span class="heading"> Name </span>
                              </v-flex>
                              <v-flex pt-1 xs12 class="subheading">
                                <span>
                                  {{ list.fullName }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg3 xl3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs6>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span class="heading"> Phone Number </span>
                              </v-flex>
                              <v-flex xs12 pt-1>
                                <span class="subheading">
                                  {{ list.phoneNumber }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg3 xl3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs6>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span class="heading"> Email </span>
                              </v-flex>
                              <v-flex xs12 pt-1>
                                <span class="subheading">
                                  {{ list.email }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm6 md3 lg3 xl3 pt-6>
                        <v-layout wrap justify-start>
                          <v-flex xs6>
                            <v-layout wrap>
                              <v-flex xs12>
                                <span class="heading"> Address </span>
                              </v-flex>
                              <v-flex xs12 pt-1>
                                <span class="subheading">
                                  {{ list.address }}
                                </span>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex xs12 pt-3>
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
                  <v-flex xs12 pt-6>
                    <v-layout wrap justify-start>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs12>
                            <span class="heading"> Booking # </span>
                          </v-flex>
                          <v-flex pt-1 xs12 class="subheading">
                            <span>
                              {{ list.bookingNo }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs12>
                            <span class="heading"> Booked On </span>
                          </v-flex>
                          <v-flex
                            pt-1
                            xs12
                            class="subheading"
                            v-if="list.bookingDate"
                          >
                            <span>
                              {{ formattedDate(list.bookingDate) }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs10 text-left>
                            <span class="heading"> Total Amount </span>
                          </v-flex>
                          <v-flex xs10 pt-1 text-left>
                            <span class="subheading">
                              ₹ {{ list.totalAmount }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs10 text-left>
                            <span class="heading"> Advance Paid </span>
                          </v-flex>
                          <v-flex xs10 pt-1 text-left>
                            <span class="subheading">
                              ₹ {{ list.advanceAmountPaid }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs12 text-left>
                            <span class="heading"> Balance Amount </span>
                          </v-flex>
                          <v-flex xs12 pt-1 text-left>
                            <span class="subheading">
                              ₹ {{ list.balancePayAmount }}
                            </span>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6 lg2>
                        <v-layout wrap>
                          <v-flex xs12 text-left>
                            <span class="heading">
                              Status of Balance Amount
                            </span>
                          </v-flex>
                          <v-flex xs12 pt-1 text-left>
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
              <v-flex xs5 pt-3>
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
              <v-flex xs7 pt-3>
                <span
                  style="
                    font-family: LexendRegular;

                    color: red;
                    text-transform: none;
                    font-size: 14px;
                    font-weight: 500;
                  "
                >
                  Kindly ensure the remaining balance is remitted within 24
                  hours prior to the commencement of the trip.
                </span>
              </v-flex>
              <v-flex xs12 pt-6>
                <v-layout wrap>
                  <v-flex xs11 lg3 pr-4>
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
                    xs11
                    lg3
                    pl-lg-4
                    pl-0
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
                      >Choose Payment Mode
                    </span>
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
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Pending'
                    "
                    xs11
                    lg4
                    pl-4
                    pt-7
                    @click="$refs.uploadFront.click()"
                  >
                    <v-layout wrap justify-center>
                      <v-flex xs1 pt-1>
                        <v-icon color="black"> mdi-upload </v-icon>
                      </v-flex>
                      <v-flex xs9 text-left pb-6>
                        <input
                          v-show="false"
                          id="file"
                          ref="uploadFront"
                          type="file"
                          @change="uploadFront"
                        />
                        <v-chip hide-details color="white">
                          <span
                            style="
                              font-weight: bold;
                              font-family: LexendRegular;
                              font-size: 12px;
                            "
                            >Upload Payment Reciept</span
                          >

                          &nbsp;
                          <span
                            style="
                              color: #929292;
                              font-size: 12px;
                              font-family: LexendLight;
                            "
                            >{{ imageFileFront.name }}</span
                          >
                        </v-chip>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex
                    xs11
                    lg2
                    pt-7
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Pending'
                    "
                  >
                    <v-btn @click="validate()" color="#F17343" block>
                      <span style="color: white"> SUBMIT DETAILS </span>
                      <v-icon color="white">mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-flex>

                  <v-flex
                    @click="
                      copyToClipboard(
                        list.vendorName.vendorId.bankDetails.upiId
                      )
                    "
                    xs11
                    sm11
                    md4
                    lg4
                    xl4
                    pt-7
                    v-if="
                      list.advancepaymentMode === 'Agent' &&
                      list.balancepaymentStatus === 'Pending'
                    "
                  >
                    <div style="display: flex; align-items: center">
                      <span style="color: black; font-family: LexendRegular"
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
                        list.vendorName.vendorId.bankDetails.upiId
                      }}</span>
                    </div>
                  </v-flex>
                  <v-flex
                    xs11
                    sm11
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
                        mediaUURL + list.vendorName.vendorId.bankDetails.qrCode
                      "
                    ></v-img>
                  </v-flex>

                  <v-flex
                    xs11
                    sm11
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
                    xs11
                    sm11
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
      carouselSpeed: 2000,
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
        url: "/agent/my/bookings/details",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          bookingId: this.id,
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
     else if (!this.balancepaymentMode) {
        this.msg = "Please Select Mode";
        this.snackbar = true;
      }
       else {
        this.submitPayment();
      }
    },
    submitPayment() {
      this.formData.append("bookingId", this.id);
      this.formData.append("balancepaymentMode", this.balancepaymentMode);
      this.formData.append("paymentReceipt", this.imageFileFront);
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/agent/houseboat/paybalance",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: this.formData,
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.snackbar = true;
            location.reload();
            this.$router.push("/houseboatbookings");
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