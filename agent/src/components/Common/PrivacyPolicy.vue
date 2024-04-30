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
          >Privacy Policy</span
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
  
  metaInfo() {
    return {
      title: 'Privacy Policy - Access Rooms',
      meta: [
        { name: 'description', content: 'The premier online portal for houseboat and shikara bookings in Keralas enchanting backwaters. Explore Alappuzha, Kollam, Poovar, and Kumarakom with ease. Reserve your serene getaway today!' },
        { name: 'keywords', content: 'Shikara bookings in alleppey, Shikara bookings in Kollam, Shikara bookings in Poovar, Shikara bookings in Alappuzha, Shikara bookings in Kumarakom, Houseboat bookings in alleppey, Houseboat bookings in Kollam, Houseboat bookings in Poovar, Houseboat bookings in Alappuzha, Houseboat bookings in Kumarakom, houseboats, shikara rides, deluxe houseboat, premium houseboat, luxuary housboat, houseboat bookings, shikara bookings, alapuzha houseboat bookings, alapuzha shikaa bookings, poovar houseboat bookings, poovar shikaa bookings,  kollam houseboat bookings, kollam shikaa bookings,  kumarakom houseboat bookings, kumarakom shikaa bookings, floating accommodations, waterfront stays, houseboat bookings, shikara bookings, lake cruises, backwater experiences, boathouse rentals, water retreats, floating hotels, serene waterways, traditional boat stays, luxury houseboats, romantic getaways, houseboat vacations, Dal Lake, Kerala backwaters, Alleppey houseboats, Kashmir shikara rides, waterborne holidays, scenic boat trips, aquatic lodgings, lakeview stays, hotel rooms, accommodations, lodging, travel, booking, vacation stay, hospitality, boutique hotels, budget hotels, luxury stays, online reservations, travel deals, room amenities, holiday lodging, city hotels, beach resorts, business travel, family vacations, pet-friendly hotels, bed and breakfast, travel planning, hotel reviews, discount accommodations, hospitality consulting, tourism industry expertise, concept development services, market research solutions, hospitality strategy, travel business consulting, tourism market trends, strategic planning, online booking platform, houseboat reservations, shikara boat bookings, waterfront accommodations, travel technology, tourism consultancy, property management, customer experience, online travel solutions, tourist attractions, leisure travel, travel planning services, tourism development, scenic boat rides, hospitality industry insights' },
      ],
    };
  },
  data() {
    return {
      reg: false,
      userType: "",
      value: "",
      phoneNumber: "",
      countryCode: "",
      name: "",
      email: "",
      content:{},
      list:{},
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
          name: "Privacy Policy",
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
