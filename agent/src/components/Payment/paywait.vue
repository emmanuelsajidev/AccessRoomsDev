<template>
  <v-app class="pay">
    <v-layout wrap justify-center>
      <v-flex xs12 text-center align-self-center>
        <vue-element-loading
          :active="appLoading"
          color="#68D389"
          spinner="bar-fade-scale"
        >
        </vue-element-loading>
        <span style="font-size: 18px">
          Please don't go back or refresh the page, while we redirect you..
        </span>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  props: ["paymentId", "orderid"],
  data() {
    return {
      appLoading: true,
    };
  },
  created() {
    this.paymentStatus();
  },
  methods: {
    paymentStatus() {
      axios({
        method: "POST",
        url: "/purchase/razorpay/checkstatus",
        data: {
          id: this.paymentId,
          orderid: this.orderid,
        },
      })
        .then((response) => {
          var PaymentData = null;
          PaymentData = response.data.data;
          if (PaymentData.payment_status === "success") {
            // location.href = "http://localhost:8081/PaymentSuccess/"+this.paymentId;
            location.href = "https://www.parambikulam.org/PaymentSuccess"+this.paymentId;
          } else if (PaymentData.payment_status === "failure") {
            // location.href = "http://localhost:8081/PaymentFailure";
            location.href = "https://www.parambikulam.org/PaymentFailure";
          }
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
};
</script>
<style>
.pay {
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  background-color: white;
  overflow-x: hidden;
}
</style>