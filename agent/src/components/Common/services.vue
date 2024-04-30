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
    <v-layout wrap justify-center style="background-color: #f9f9f9;">
      <v-flex xs11 pt-4>
        <span
          style="
          font-family:LexendRegular;

            font-size: 25px;
            color: black;
            letter-spacing: 1px;
            cursor: pointer;
          "
          >Our Services</span
        >
      </v-flex>
      <v-flex xs11 pt-6>
        <span v-html="list.content"></span>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      reg: false,
      userType: "",
      value: "",
      phoneNumber: "",
      countryCode: "",
      list:{},
      
      name: "",
      content:{},
      email: "",
      password: "",
      confirmPassword: "",
      whatsappNumber: "",
      appLoading: false,
      ServerError: false,
      snackbar: false,
      timeout: 5000,
      msg: null,
      Rules: [(v) => !!v || "Required"],
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => value.length >= 8 || "Min 8 characters",
        pincode: (value) => value.length == 6 || "Please provide valid pincode",
        otp: (value) => value.length == 4 || "Please provide valid otp",
        check: (confirmation) =>
          confirmation === this.password || "Passwords do not match",
      },
      emailRules: [
        (v) => !!v || "Email is Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },

  mounted() {
    this.getView();
  },

  methods: {
    getView() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/policy/view",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          name: "Our Services",
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.appLoading = false;
            this.list = response.data.data;
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
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
</style>
