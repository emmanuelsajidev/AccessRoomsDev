<!-- <template>
  <v-app>
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
    <v-layout wrap class="payment_page">
      <v-flex xs12 sm12 md12 pt-0 align-self-center>
        <v-layout wrap justify-center>
          <v-flex xs12 md10 align-self-center>
            <p class="pageForm1">
              Payment Success
              <v-icon color="green"> mdi-check-circle-outline </v-icon>
            </p>
            <p class="pageForm1">Thank You For {{ $route.query.eventType }} {{currency}} {{ $route.query.amount }}</p>
            <a
              :href="
                'https://wtiadmin.in/donation/printreceipt?id=' +
                $route.query.id
              "
              target="blank'"
              style="
                color: #08903e !important;
                font-size: 14px !important;
                text-align: center !important;
                font-family: poppinsregular;
              "
              >Click here to download the receipt</a
            >
            <p class="pageForm1">
              Your Order ID is
              <span class="pageForm1" style="font-size: 16px !important">
                {{ $route.query.orderid }}</span
              >
            </p>
            <p>
              <v-btn @click="retpg" small color="green">
                <span class="pageForm1">Next</span></v-btn
              >
            </p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-app>
</template> -->
<template>
  <div>
    <v-layout wrap style="height:100vh" class="LexendRegular" fill-height>
      <v-flex xs12 align-self-center>
        <v-layout wrap justify-center>
          
          <v-flex xs7>
            <v-layout wrap>
              <v-flex text-right>
                <v-icon color="green" size="600%">
              
              mdi-check-circle
                          </v-icon>
              </v-flex>
              <v-flex pt-5 text-left>
                <span class="pt-12" style="color:green;text-transform: none;font-size: 40px;">
              Payment Successful !
            </span>
              </v-flex>
            </v-layout>
           
           
          </v-flex>
          <v-flex pt-5 xs12 text-center>
            <span style="text-transform: none;">Thank you ! Your payment of ₹300 has been recieved</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
  
</template>
<!-- <script>
import axios from "axios";
export default {
  name: "Success",
  data() {
    return {
      appLoading: false,
      currency: localStorage.getItem("currencySymbol"),
    };
  },
  mounted: function () {
    // this.list();
    this.home();
  },
  methods: {
    retpg() {
      this.$router.push({ path: "/" });
    },
    home: function () {
      this.appLoading = true;
      setTimeout(
        function () {
          this.appLoading = false;
          // alert('cool');
        }.bind(this),
        4000
      );
    },
    list: function () {
      axios({
        method: "GET",
        // url: "/donation/sendmail?id=" + this.$route.query.id,
       // url: "/donation/sendmail?id=" + this.$route.query.id,

      });
      // .then((response) => {})
      // .catch((e) => {});
    },
  },
};
</script> -->
<style scoped>

</style>
