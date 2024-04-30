<template>
    <div>
        <v-snackbar v-model="snackbar" color="#F17343" right :timeout="3000">
            <v-layout wrap>
                <v-flex text-left class="align-self-center">{{ msg }}</v-flex>
                <v-flex text-right>
                    <v-btn small :ripple="false" text @click="snackbar = false">
                        <v-icon style="color: white">mdi-close</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-snackbar>
        <v-layout wrap justify-center>
            <v-flex xs12>
                <span style="font-family: LexendRegular;font-size: 25px;font-weight: 500;color: #313131;">Your
                    Bookings</span>
            </v-flex>
            <v-flex xs11 lg12 pt-6>
                <v-card elevation="0">
                    <v-layout wrap justify-center>
                        <v-flex xs11 pt-4 pb-4 class="LexendRegular">
                            <span style="color:#F17343;text-transform: none;font-size: 20px;font-weight: 500;">
                                Booking Details

                            </span>
                        </v-flex>
                        <v-flex xs12 class="hidden-sm-and-down" pt-1 pb-10 pl-10>
                            <v-layout wrap justify-start>
                           
                           
                                <v-flex xs3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Category
                                                
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left pt-1>
                                            <span class="subheading">
                                                {{ summarylist.category }}
                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                           
                                <v-flex xs3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Location
                                                
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left pt-1>
                                            <span class="subheading">
                                                {{ summarylist.location.name }}
                                            </span>
                                        </v-flex>




                                        

                                    </v-layout>

                                </v-flex>


                                <v-flex xs3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Trip Type
                                                
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left pt-1>
                                            <span class="subheading">
                                                {{ summarylist.tripType }}
                                            </span>
                                        </v-flex>




                                        

                                    </v-layout>

                                </v-flex>
                                <v-flex xs3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Total Rooms
                                                
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left pt-1>
                                            <span class="subheading">
                                                {{ summarylist.totalRooms }}
                                            </span>
                                        </v-flex>




                                        

                                    </v-layout>

                                </v-flex>

                                
                                <v-flex pt-6 xs3> 
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Adults
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left pt-1>
                                            <span class="subheading">
                                                {{ summarylist.noOfAdults }}
                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                                <v-flex pt-6 xs3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                No of Children
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left pt-1>
                                            <span class="subheading">
                                                {{ summarylist.noOfChildren }}

                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                                <v-flex pt-6 xs3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Check in Date
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left pt-1>
                                            <span class="subheading">
                                                {{ formatDate(summarylist.startDate) }}

                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                                <v-flex pt-6 xs3>
                                    <v-layout wrap pl-2>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Check Out Date
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left pt-1>
                                            <span class="subheading">
                                                {{ formatDate(summarylist.endDate) }}


                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                              


                            </v-layout>
                        </v-flex>
                        <v-flex xs12 class="hidden-md-and-up" pt-1 pb-10>
                            <v-layout wrap justify-center pl-4 pr-4>
                                <v-flex xs6>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Location
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left>
                                         {{ location2 }}

                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                                <v-flex xs6>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Adults
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left>
                                            <span class="subheading">
                                                {{ memberCount }}

                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                                <v-flex xs6 pt-3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Children
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left>
                                            <span class="subheading">
                                                {{ childrenCount }}

                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                                <v-flex xs6 pt-3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Check in date

                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left>
                                            <span class="subheading">
                                                {{ checkInDate }}

                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>
                                <v-flex xs6 pt-3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Check in time
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left>
                                            <span class="subheading">
                                                {{ checkInTime }}

                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>


                                <v-flex xs6 pt-3>
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            <span class="heading">
                                                Check Out time
                                            </span>
                                        </v-flex>
                                        <v-flex xs12 text-left>
                                            <span class="subheading">
                                                {{ checkOutTime }}

                                            </span>
                                        </v-flex>
                                    </v-layout>

                                </v-flex>


                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card>

            </v-flex>
            <v-flex xs12>
                <v-layout wrap justify-center>
                    <v-flex xs11 lg6 pt-7 pr-lg-8 pr-xs-0>
                        <v-card elevation="0">
                            <v-layout wrap justify-center pb-10>
                                <v-flex xs10 pt-8>
                                    <span style="color:#F17343;text-transform: none;font-size: 20px;font-weight: 500;">
                                        Guest Details
                                    </span>
                                </v-flex>
                                <v-flex xs10 pt-5>
                                    <span class="formfont">Name</span>

                                    <v-text-field type="text" dense hide-details="true" outlined color="orange"
                                        v-model="agentDetails.name" required></v-text-field>

                                </v-flex>
                                <v-flex xs10 pt-5>
                                    <span class="formfont">Email</span>

                                    <v-text-field :rules="emailRules" dense  outlined color="orange"
                                        type="email" v-model="agentDetails.email" required></v-text-field>

                                </v-flex>
                                <v-flex xs10 >
                                    <span class="formfont">Phone Number</span>

                                    <v-text-field type="number" hide-spin-buttons dense :rules="phoneNumberRules" outlined color="orange"
                                        v-model="agentDetails.phoneNumber" required></v-text-field>

                                </v-flex>
                                <v-flex xs10 >
                                    <span class="formfont">Address</span>

                                    <v-textarea type="number" height="80px" hide-details="true" outlined color="orange"
                                        v-model="agentDetails.address" required></v-textarea>

                                </v-flex>
                                <!-- <v-flex xs10 pt-5>
                                    <span class="formfont"> Registered Company Name</span>

                                    <v-text-field color="orange" dense hide-details="true" outlined
                                        v-model="agentDetails.regCompanyaName" required></v-text-field>

                                </v-flex> -->
                                <!-- <v-flex xs10 pt-5>
                                    <span class="formfont">Registered Company Address</span>
                                    <v-text-field color="orange" dense hide-details="true" outlined
                                        v-model="agentDetails.regCompanyAddress" required></v-text-field>

                                </v-flex> -->

                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex xs11 lg6 pt-7 pl-lg-8 pl-xs-0>
                        <v-card elevation="0">
                            <v-layout wrap justify-center pb-12 style="font-weight: 500;">
                                <v-flex xs10 pt-8>

                                    <span style="color:#F17343;text-transform: none;font-size: 20px;font-weight: 500;">
                                        Booking Summary
                                    </span></v-flex>
                                <v-flex xs10 pt-7>
                                    <v-layout wrap>
                                        <v-flex xs6 text-left>
                                            <span class="formfont"> Total Amount</span>
                                        </v-flex>
                                        <v-flex xs6 text-right>
                                            <span class="formfont">₹{{ bookingTotal }}</span>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs10 pt-6 class="formfont">
                                    <v-layout wrap>
                                        <v-flex xs6 text-left>
                                            <span class="formfont">Advance</span>
                                        </v-flex>
                                        <v-flex xs6 text-right>
                                            <span class="formfont">₹{{ advance }}</span>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs10 pt-7>
                                    <v-layout wrap>
                                        <v-flex xs6 text-left>
                                            <span class="formfont">GST</span>
                                        </v-flex>
                                        <v-flex xs6 text-right>
                                            <span class="formfont">₹{{ gstAmount }}</span>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>

                                <v-flex xs10 pt-7>
                                    <v-layout wrap>
                                        <v-flex xs6 text-left>
                                            <span class="formfont">Post Booking Amount</span>
                                        </v-flex>
                                        <v-flex xs6 text-right>
                                            <span class="formfont">₹{{ postBookingamount }}</span>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs10 pt-7>
                                    <v-layout wrap>
                                        <v-flex xs8 text-left>
                                            <span>Mode of Payment</span>
                                        </v-flex>
                                        <v-flex xs4 text-right>
                                            <v-autocomplete height="4px" outlined flat solo dense color="black"
                                                :items="types" v-model="advancepaymentMode" item-text="name" item-color="#FF1313"
                                                hide-details="true" clearable>
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
                                        <!-- <v-flex xs4 text-right class="formfont">
                                            ₹200.0
                                        </v-flex> -->
                                    </v-layout>
                                </v-flex>
                                <v-flex xs10 pt-4>
                                    <v-img height="30px" contain src="./../../assets/images/pattern2.png"></v-img>

                                </v-flex>
                                <!-- <v-flex xs10 pt-6>
                                    <v-layout wrap>
                                        <v-flex xs6 text-left>
                                            <span class="formfont">Total Payable Amount</span>
                                        </v-flex>
                                        <v-flex xs6 text-right>
                                            <span class="formfont">₹500.0</span>
                                        </v-flex>
                                    </v-layout>
                                </v-flex> -->
                                <v-flex xs10 pt-6>
                                    <v-layout wrap>
                                        <v-flex>
                                            <v-btn block color="#FF6200" @click="validatFeilds()">
                                                <span style="text-transform: none;color:white">Pay Now
                                                    {{ userid }}

                                                </span>
                                            </v-btn>
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
import axios from "axios";

export default {
    data() {
        return {
            emailRules: [
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            selectedOption: null,
            msg: null,
            locations:[],
            summarylist:{},
            userid: this.$route.query.id,
            type: "",
            bookingTotal: "",
            location2:"",
            gstAmount: "",
            postBookingamount: "",
            advance: "",
            advancepaymentMode:"",
            snackbar: false,
            types: ['Guest', 'Driver', 'Agent'],
            agentDetails: {
                name: '',
                email: '',
                phoneNumber: '',
                regCompanyaName: '',
                regCompanyAddress: '',
                address: '',
            }
        };
    },
    mounted() {
        this.getList();
        this.getSummary();

    },
    computed: {
    phoneNumberRules() {
        const rules = [];

        if (!this.isValidPhoneNumber(this.agentDetails.phoneNumber)) {
            rules.push('Invalid phone number');
        }

        return rules;
    },
    guestPhoneRules() {
        return [
            (v) => !!v || "Phone number is required",
            (v) => /^[0-9]{10}$/.test(v) || "Phone number must be 10 digits",
        ];
    },
  


},
//   created() {
//     const userid = this.$route.query.userid;
//     console.log("User ID:", userid);
//   },
    methods: {
        formatDate(dateString) {
      // Convert the dateString to a Date object
      const date = new Date(dateString);

      // Format the date using toLocaleDateString
      return date.toLocaleDateString();
    },
        isValidPhoneNumber(value) {
          // Implement your phone number validation logic here
          // You can use regular expressions or other methods
          // For example, a simple validation for a 10-digit US phone number:
          const phoneNumberRegex = /^\d{10}$/;
          return phoneNumberRegex.test(value);
      },
        getList() {
            this.appLoading = true;

            axios({
                method: "POST",
                url: "/booking/summary",
                headers: {
                    token: localStorage.getItem("token"),
                },
                data: {
                    totalAmount: this.agentrate,

                },
            }).then((response) => {
                this.advance = response.data.advance;
                this.bookingTotal = response.data.bookingTotal;
                this.gstAmount = response.data.gstAmount;
                this.postBookingamount = response.data.postBookingamount;
                this.appLoading = false;

            });
            // }
        },
        getSummary() {
            this.appLoading = true;

            axios({
                method: "POST",
                url: "/agent/houseboatbooked/pending/view",
                headers: {
                    token: localStorage.getItem("token"),
                },
                data: {
                    id: this.$route.query.userid,

                },
            }).then((response) => {
        if (response.data.status) {
          this.summarylist = response.data.data;
          this.appLoading = false;
        } else {
          this.appLoading = false;

          this.msg = response.data.msg;
          this.snackbar = true;

        }
      });
            // }
        },
        validatFeilds() {
            if (!this.agentDetails.name) {
                this.msg = "Please enter name";
                this.snackbar = true;
                return;
            } 
            // else if (!this.agentDetails.email) {
            //     this.msg = "Please enter email";
            //     this.snackbar = true;
            //     return;
            // }
            else if (!this.agentDetails.phoneNumber) {
                this.msg = "Please enter Phone number";
                this.snackbar = true;
                return;
            }
            // else if (!this.agentDetails.address) {
            //     this.msg = "Please enter Address";
            //     this.snackbar = true;
            //     return;
            // }
            else if (!this.advancepaymentMode) {
                this.msg = "Please enter mode of payment";
                this.snackbar = true;
                return;
            }
            
            // else if (!this.agentDetails.regCompanyaName) {
            //     this.msg = "Please enter Registered Company Name";
            //     this.snackbar = true;
            //     return;
            // }
            // else if (!this.agentDetails.regCompanyAddress) {
            //     this.msg = "Please enter Registered Company Address";
            //     this.snackbar = true;
            //     return;
            // }

            else {
                this.submitPayment();

            }
        },

        convertToTimestamp(dateString) {
            const date = new Date(dateString);
            return date.getTime();
        },
        combineDateTime(dateString, timeString) {
            const formattedDate = `${dateString}T${timeString}:00`;
            return formattedDate;
        },
        getLocation() {
  this.appLoading = true;
  axios({
      method: "POST",
      url: "/location/name",
      headers: {
          token: localStorage.getItem("token"),
      },
      data: {
          locid:this.location,
      },
  })
      .then((response) => {
          this.location2 = response.data.data;
          this.appLoading = false;
      })

      .catch((err) => {
          this.ServerError = true;
          console.log(err);
      });
},
        submitPayment() {
            this.appLoading = true;
            axios({
                method: "POST",
                url: "/shikara/agent/booking",
                headers: {
                    token: localStorage.getItem("token"),
                },
                data: {
                    agentgetAmount:this.agentSaved,
                    advance: this.advance,
                    bookingTotal: this.bookingTotal,
                    gstAmount: this.gstAmount,
                    postBookingamount: this.postBookingamount,
                    shikaraid: this.shikaraid,
                    bookingType: "shikara",
                    advancepaymentMode:this.advancepaymentMode,
                    agentDetails: this.agentDetails,
                    selectedDate: this.checkInDate,
                    startTime: this.combineDateTime(this.checkInDate, this.checkInTime),
                    endTime: this.combineDateTime(this.checkInDate, this.checkOutTime),
                    location:this.location,
                    memberCount: this.memberCount,
                    childrenCount: this.childrenCount,
                    amount: this.agentRate,
                    
                },
            })
            .then((response) => {
            this.appLoading = false;
            if (response.data.status==true) {
              this.msg = "Booking Successfull";
              this.snackbar = true;
            this.$router.push("/bookings");

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
    }
};
</script>
<style>
.heading {
    color: #000000;
    text-transform: none;
    font-family: robotolight;
    font-size: 16px;

}

.subheading {
    color: #000000;
    text-transform: none;
    font-family: LexendRegular;
    font-size: 13px;
    font-weight: 600;
}

.formfont {
    color: #000000;
    text-transform: none;
    font-family: LexendRegular;
    font-size: 14px;
    font-weight: 600;
}

.v-autocomplete__content .v-list__tile {
    height: 2px;
}
</style>