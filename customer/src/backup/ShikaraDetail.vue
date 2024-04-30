<template>
    <div>
        <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="rgba(0, 38, 53, 1)"
      spinner="bar-fade-scale"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar
      v-model="showSnackbar"
      color="rgba(0, 38, 53, 1)"
      right
      :timeout="timeout"
    >
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: #000">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
        <v-layout wrap justify-center>
          
            <v-flex xs12 sm11 md10 style="position:relative;margin-top:-4%" pb-4>
                <v-card outlined color="white"  class="py-6 px-2 px-sm-4 px-md-14">
                  <v-layout wrap justify-start>
                    <v-flex xs12 sm6>
                        <v-layout wrap justify-center>
                        <v-flex xs12 pb-2 align-self-start> <span class="pb-2" style="font-size: 30px;font-weight:400;font-family: LexendFont;">
                       Queen of Alappy</span></v-flex>
                      <v-flex xs12> <span style="font-size: 16px;font-weight:300;font-family: LexendFont;">
                        <v-icon small>mdi-account-outline</v-icon>Shaun Thomas</span></v-flex>
                      <v-flex xs12> <span style="font-size: 16px;font-weight:300;font-family: LexendFont;">
                        <v-icon small>mdi-map-marker-outline</v-icon>Allapuzha,Building no: 37329,Kezhakambalam</span></v-flex>
                      <v-flex xs12> <span style="font-size: 16px;font-weight:300;font-family: LexendFont;">
                        <v-icon small>mdi-phone-outline</v-icon>+91 8293875698,+91 9898767542</span></v-flex>
                  
                    </v-layout>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs12 sm4 md3>
                        <v-layout wrap justify-end style="line-height: 15px;" pt-4>
                            <v-flex xs12 sm10><span style="font-size: 30px;font-weight:500;font-family: RobotoRegular;">₹1923</span>
                                <span style="font-size: 12px;font-weight:300;font-family: LexendFont;">/per head rate</span></v-flex>
                            <v-flex xs12 sm10>
                                <span style="font-size: 10px;font-weight:300;font-family: LexendFont;color:rgba(134, 134, 134, 1);">(Inclusive of all taxes)</span>
                            </v-flex>
                            <v-flex xs12 sm4 pt-8 px-1>
                                <v-btn class="px-0" text><span><v-icon small>mdi-share-outline</v-icon>Share</span></v-btn>
                            </v-flex>
                            <v-flex xs12 sm6 pt-8 px-1>
                                <v-btn dark block color="rgba(255, 98, 0, 1)" class="px-1"  @click="$router.push('/BookShikara?id='+BoatData._id)"><span>Book Now</span></v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                  </v-layout>
                    <v-layout wrap justify-center pt-4>
                 <v-flex xs12><v-card elevation="0">
                    <v-img height="300px" src="./../../assets/images/bg.png">
                        <template v-slot:placeholder>
                  <ImageLoader />
                </template>
                    </v-img>
                 </v-card></v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
  </template>
  <script>
  //   import axios from "axios";
  // import store from "./../store";
  export default {
    data() {
      return {
        showsnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      msg:"",
        FacilitiesData:{
    airCondition :true,
      kettle :true,
      parking :true,
      restrooms:true,
      lifeJacket :true,
      wifi :true,
      television :true,
      fireextinguisher :true,
      powerbackup :true,
      swimmingPool :true,
        },
        IsMealplan:true,
        Item1:{
            mealPlan:{
                welcomeDrink:true,
                lunch:true,
                teaOrsnacks:true,
                dinner:true,
                breakfast:true,
            }
        },
      };
    },
    computed: {
    SKsearchItems(){
      return this.$store.state.SKsearchItems; 
    },
    HBsearchItems(){
      return this.$store.state.HBsearchItems; 
    }
  },
    methods: { },
  };
  </script>