<template>
    <div>
      <vue-element-loading
        :active="appLoading"
        :is-full-screen="true"
        background-color="#FFFFFF"
        color="#182444"
        spinner="bar-fade-scale"
      />
      <ServerError v-if="ServerError" />
      <v-snackbar v-model="showsnackbar" color="#182444" right timeout="2000">
        <v-layout wrap justify-center>
          <v-flex text-left class="align-self-center">
            <span style="color: white">
              {{ msg }}
            </span>
          </v-flex>
  
          <v-flex text-right>
            <v-btn small :ripple="false" text @click="showsnackbar = false">
              <v-icon style="color: #000">mdi-close</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-snackbar>
        <v-img
        src="./../assets/images/bg.png" width="100%"  :height="$vuetify.breakpoint.name == 'xs' 
                  ? '2600px' 
                  :$vuetify.breakpoint.name == 'sm'
                  ? '1500px'
                  : $vuetify.breakpoint.name == 'md'
                  ? '1000px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '1200px': '1200px'"
      >
      <v-layout wrap fill-height justify-center>
       <v-flex xs11 sm11 lg10 align-self-center>
        <v-layout wrap>
          <v-flex xs12>
            <v-layout wrap>
                <v-flex xs12 pt-4 pt-sm-8 pt-md-0 style="line-height: 30px;" data-aos="zoom-in-up" data-aos-ease="ease"
                data-aos-duration="1500" data-aos-delay="500">
                    <span style="font-family: LexendMedium;font-weight: 400;color: rgba(255, 98, 0, 1);text-transform: uppercase;"
                    :style="{'font-size': 
                   $vuetify.breakpoint.name == 'xs'
                  ? '16px'
                  : $vuetify.breakpoint.name == 'sm'
                  ? '25px'
                  : $vuetify.breakpoint.name == 'md'
                  ? '30px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '30px'
                  : '45px', }">Welcome To </span><br/>
                    <span style="font-family: LexendMedium;font-weight: 600;color: white;"
                    :style="{'font-size': 
                   $vuetify.breakpoint.name == 'xs'
                  ? '25px'
                  : $vuetify.breakpoint.name == 'sm'
                  ? '20px'
                  : $vuetify.breakpoint.name == 'md'
                  ? '40px'
                  : $vuetify.breakpoint.name == 'lg'
                  ? '40px'
                  : '50px', }">Access Rooms <br/>Book Your Houseboat/ Shikara Adventure Now!</span>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 pt-4>
          <v-card color="transparent" elevation="0">
    <v-tabs v-model="myTab"
    background-color="transparent"
    
      color="rgba(255, 98, 0, 1)"
      left data-aos="slide-down" data-aos-ease="ease"
      data-aos-duration="2500" data-aos-delay="500"
    >
      <v-tab :style="myTab==0?'background-color:rgba(255, 98, 0, 1)':'background-color:white'" style=" border-top-left-radius: 10px;" >
        <v-icon class="pr-1" :style="myTab==0?'color:white':'color:black'" >mdi-ferry</v-icon>
         <span :style="myTab==0?'color:white':'color:black'" style="font-family: RobotoBold;font-weight: 500;font-size: 14px;">Houseboat</span></v-tab>
      <v-tab :style="myTab==1?'background-color:rgba(255, 98, 0, 1)':'background-color:white'" style="border-top-right-radius: 10px;" >
      <v-icon class="pr-1" :style="myTab==1?'color:white':'color:black'" >mdi-sail-boat</v-icon>
        <span :style="myTab==1?'color:white':'color:black'" style="font-family: RobotoBold;font-weight: 500;font-size: 14px;">shikara</span></v-tab>
 
      <v-tab-item>
    <houseboatFilter />
      </v-tab-item>
      <v-tab-item>
     <shikaraFilter />
      </v-tab-item>

    </v-tabs>
  </v-card>
        </v-flex>
        </v-layout>
       </v-flex>
      </v-layout>
        </v-img>
        <v-layout wrap py-4>
          <v-flex xs12>
            <PopularDestinations />
          </v-flex>
        </v-layout>
        <v-layout wrap py-4 justify-center>
          <v-flex xs12 md10>
            <HomeSection3 />
          </v-flex>
        </v-layout>
        <v-layout wrap py-4 justify-center>
          <v-flex xs12>
            <HomeSection4 />
          </v-flex>
        </v-layout>
        <v-layout wrap py-4 justify-center>
          <v-flex xs12>
            <HomeSection5 />
          </v-flex>
        </v-layout>
        <HomeSection2 />
    </div>
</template>
<script>
import axios from "axios";
// import store from "../store";
import houseboatFilter from "./houseboatFilter";
import shikaraFilter from "./shikaraFilter";
  import PopularDestinations from "./PopularDestinations";
  import HomeSection5 from "./HomeSection5";
  import HomeSection4 from "./HomeSection4";
  import HomeSection3 from "./HomeSection3";
  import HomeSection2 from "./homeSection2";
export default {
    components: {
      houseboatFilter,
      shikaraFilter,
      PopularDestinations,
      HomeSection5,
      HomeSection4,
      HomeSection3,
      HomeSection2,
    },
  data() {
    return {
      addcat:false,
      appLoading: false,
        ServerError: false,
        showsnackbar: false,
      timeout: 5000,
      ccode:"",
      msg: null,
      show1: false,
      show2: false,
      visible: false,
      category: "",
      phoneNumber: "",
      locationList:[],
      check1:false,
      myTab:null,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      phoneRules: [
        (v) => !!v || "phone is required",
        (v) => (v && v.length <= 10) || "invalid number",
        (v) => (v && v.length >= 10) || "invalid number",
        (v) => /^\d{10}$/.test(v) || "phone number must be a number",
      ],
      pinRules: [
  (v) => !!v || "PIN is required",
  (v) => (v && v.length === 6) || "PIN must be 6 digits",
  // (v) => /^\d{4}$/.test(v) || "PIN must be a number",
],
      value: "",
      level:"",
      catList: ["Houseboat", "Shikara"],
      countryCodeArray: ["+91", "+1", "+93", "+355", "+213", "+376", "+244"],
      verificationStatus:"",
    };
  },
  computed: {
        formattedValue() {
      return "+" + this.value;
    },
    },
  mounted() {
    this.getData();
  },
  watch: {
    myTab(){
      console.log("myTab in page=",this.myTab)
      // this.$store.commit("myTab",this.myTab);
      localStorage.setItem("myTab",this.myTab);
    },
  },
  methods: {
   
      getData() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/location/list",
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            localStorage.removeItem('children');
            localStorage.removeItem('Hchildren');
            localStorage.removeItem('checkInDate');
            localStorage.removeItem('HcheckOutDate');
            localStorage.removeItem('Hroom');
            localStorage.removeItem('Htype');
            localStorage.removeItem('Hlocation');
            localStorage.removeItem('checkOutTime');
            localStorage.removeItem('Hadult');
            localStorage.removeItem('Hcategory');
            localStorage.removeItem('adult');
            localStorage.removeItem('HcheckInDate');
            localStorage.removeItem('Htriptype');
            localStorage.removeItem('location');
            localStorage.removeItem('checkInTime');
            this.locationList = response.data.data;
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          this.appLoading = false;
          console.log(err);
          this.ServerError = true;
        });
    },
},
};
</script>
 <style scoped>
 #custom-tab-items {
    background-color: red !important;
}
 </style>
 