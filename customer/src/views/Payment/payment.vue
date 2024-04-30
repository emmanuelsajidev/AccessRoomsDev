<template>
  <div>
    <PageLoader :storage="appLoading" />
    <ServerError v-if="ServerError" />
    <v-snackbar v-model="showSnackBar" color="green" right :timeout="timeout">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: #FFF">
            {{ msg }}
          </span>
        </v-flex>
        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: #FFF">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
   <v-app id="inspire">
      <v-layout wrap justify-center>
    
      <v-flex xs10 align-self-center text-center pt-2>
         <v-layout wrap pb-6>
              <v-flex text-center align-self-center pt-md-12>
                <span class="popregular xlarge">SELECT YOUR PAYMENT METHOD</span>
              </v-flex>
            </v-layout>
        <v-card flat height="60vh">
          <v-layout
            v-if="$route.query.country == 'India'"
            wrap
            justify-center
            align-center
            pt-10
          >
            <v-flex xs12  md3 text-left>
              <v-checkbox
                hide-details=""
                class="slotText"
                :ripple="false"
                name="optcheck1"
                v-model="paytype"
                value="ccavenue"
              >
                <template v-slot:label>
                  <div>
                    <!-- <v-img
                      src="../assets/Images/hdfcbank.jpg"
                      :width="
                        $vuetify.breakpoint.name == 'xs'
                          ? '25vw'
                          : $vuetify.breakpoint.name == 'sm'
                          ? '18vw'
                          : $vuetify.breakpoint.name == 'md'
                          ? '15vw'
                          : $vuetify.breakpoint.name == 'lg'
                          ? '15vw'
                          : '14vw'
                      "
                    ></v-img> -->
                  </div>
                </template>
              </v-checkbox>
            </v-flex>
            <v-flex xs12  md3 text-left>
              <v-checkbox
                hide-details=""
                class="slotText"
                :ripple="false"
                name="optcheck1"
                v-model="paytype"
                value="phonepe"
              >
                <template v-slot:label>
                  <div>
<!-- 
                    <v-img
                      src="../assets/Images/PhonePe.png"
                      :width="
                        $vuetify.breakpoint.name == 'xs'
                          ? '25vw'
                          : $vuetify.breakpoint.name == 'sm'
                          ? '18vw'
                          : $vuetify.breakpoint.name == 'md'
                          ? '15vw'
                          : $vuetify.breakpoint.name == 'lg'
                          ? '15vw'
                          : '14vw'
                      "
                    ></v-img>  -->
                  </div>
                </template>
              </v-checkbox>
            </v-flex>




            <v-flex xs12  md3 text-left>
              <v-checkbox
                hide-details=""
                :ripple="false"
                class="slotText"
                name="optcheck1"
                v-model="paytype"
                value="payumoney"
              >
                <template v-slot:label>
                  <div>
                    <!-- <v-img
                      src="../assets/Images/payumoney.jpg"
                       :width="
                        $vuetify.breakpoint.name == 'xs'
                          ? '25vw'
                          : $vuetify.breakpoint.name == 'sm'
                          ? '18vw'
                          : $vuetify.breakpoint.name == 'md'
                          ? '15vw'
                          : $vuetify.breakpoint.name == 'lg'
                          ? '15vw'
                          : '14vw'
                      "
                    ></v-img> -->
                  </div>
                </template>
              </v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout v-else wrap justify-center align-center pt-10>
            <v-flex xs10 sm4 md3 text-center align-self-center>
              <v-checkbox
                hide-details=""
                class="slotText"
                :ripple="false"
                name="optcheck1"
                v-model="paytype"
                value="payubiz"
              >
                <template v-slot:label>
                  <div>
                    <!-- <v-img
                      src="../assets/Images/payubiz.png"
                       :width="
                        $vuetify.breakpoint.name == 'xs'
                          ? '50vw'
                          : $vuetify.breakpoint.name == 'sm'
                          ? '25vw'
                          : $vuetify.breakpoint.name == 'md'
                          ? '20vw'
                          : $vuetify.breakpoint.name == 'lg'
                          ? '16vw'
                          : '14vw'
                      "
                    ></v-img> -->
                  </div>
                </template>
              </v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout justify-center pt-15>
            <v-flex text-center xs10 sm3 md2>
              <v-btn
                :ripple="false"
                depressed
                block
                rounded
                color="green"
                @click="validateInput"
              >
                <span
                  style="
                    font-family: poppinssemibold;
                    font-size: 13px;
                    color: #fff;
                    text-transform: none;
                  "
                >
                  SUBMIT
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout><span>{{url1}}</span>
   </v-app>
  </div>
</template>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
import axios from "axios";
export default {
  name: "payment",
  data() {
    return {
      appLoading: false,
      ServerError: false,
      showSnackBar: false,
      timeout: 5000,
      msg: null,
      pay: {},
      errors: [],
      paytype: null,
      orderid: null,
      payid: null,
      url1: null,
    };
  },
  mounted: function () {
    this.home();
    if (this.$route.query.country != "India") this.paytype = "payubiz";
    if (this.$route.query.country == "India") this.paytype = "ccavenue";
    if (this.$route.query.country == "India") this.paytype = "phonepe";
  },


  methods: {
    validateInput() {
      if (!this.paytype) {
        this.showSnackBar = true;
        this.msg = "Please select one payment method";
      } else {
        this.payment();
      }
    },
    home: function () {
      this.appLoading = true;
      setTimeout(
        function () {
          this.appLoading = false;
          // alert('cool');
        }.bind(this),
        1000
      );
    },
    payment() {
      if (this.paytype != null) {
        var pay = {};
        this.appLoading = true;
        pay["paymentgateway"] = this.paytype;
        pay["id"] = this.$route.query.id;
        axios({
          method: "post",
          url: "/payment/check/",
          data: pay,
        })
          .then((response) => {
            if (response.data) {
              this.appLoading = false;
             if(response.data.status){
              this.url1= response.data.url;
              if (this.paytype == "payumoney") {
                window.location = response.data.redirecturl;
              }
               else if (this.paytype == "ccavenue") {
                document.open();
                document.write(response.data.data);
                document.close();
              } else if (this.paytype == "payubiz") {
                // currency = "faDollarSign";
                // localStorage.setItem("currency", currency);
                document.open();
                document.write(response.data);
                document.close();
              } 
              else if (this.paytype == "razorpay") {
                this.orderid = response.data.data.order_id;
                
                var options = {
                  key: "rzp_live_QzUTts38xmCQ7a",
                  amount: Number(response.data.data.amount),
                  name:
                    response.data.donationdata.firstname +
                    " " +
                    response.data.donationdata.lastname,
                  currency: "INR",
                  description: "WTI Donation",
                  image: "https://jolly-volhard-bc2f0b.netlify.com/favicon.ico",
                  order_id: response.data.data.order_id,

                  // "handler": function (response){
                  //   alert(response.razorpay_payment_id);
                  // },

                  prefill: {
                    name:
                      response.data.donationdata.firstname +
                      response.data.donationdata.lastname,
                    email: response.data.donationdata.email,
                    contact: response.data.donationdata.mobile,
                  },

                  // notes: {
                  //   address: "",
                  // },

                  theme: {
                    color: "#00ffff",
                  },
                  modal: {
                    ondismiss: function () {
                      // alert('hlo');
                      location.href = "https://donation.wti.org.in";
                    },
                  },
                  //order_id: response.data.data.order_id,
                  callback_url:
                    "https://donation.wti.org.in/paywait/" +
                    response.data.donationdata._id,

                  //callback_url: "https://donation.wti.org.in/success/"+ this.orderid +"/" +response.data.data.amount +"/" +response.data.donationdata._id +"/" +response.data.donationdata.type,
                  // callback_url: "http://localhost:8080/Payment/" + this.order_id,
                  redirect: true,
                };
                var rzp1 = new Razorpay(options);
                rzp1.open();
                this.payid = response.data.donationdata._id;
              }
              else if (this.paytype == "phonepe") {
                window.location = response.data.url;
              }
             }
             else{
              console.log("else")
              this.$router.push('/error')
             }
            }
             else {
              this.appLoading = false;
              alert(response.data.msg);
            }
          })
          .catch(() => {
           this.appLoading = false;
          this.ServerError=true

          });
      } else this.msg = "Please tick on the box provided.";
    },
  },
};
</script>