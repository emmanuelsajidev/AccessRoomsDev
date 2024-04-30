<template>
  <!-- <v-footer absolute=""  color="#0C111F" style="margin-bottom: 0; position: relative;"> -->
  <div style="background-color: #0c111f">
    <v-row justify="center" class="fill-height px-5">
      <v-col cols="11" sm="10" md="10" class="pt-16 pb-10 pa-0">
        <v-row justify="space-between">
          <v-col cols="12" sm="5" md="5" class="pa-0">
            <v-row justify="start">
              <v-col cols="12">
                <span
                  style="
                    font-family: PlayfairDisplayRegular;
                    font-size: 20px;
                    color: white;
                  "
                  >ACCESS ROOMS</span
                >
              </v-col>
              <v-col cols="12">
                <span
                  style="
                    font-family: RobotoRegular;
                    font-size: 13px;
                    color: white;
                  "
                  >Whether you're an experienced consultant or just starting
                  your journey, we welcome you with open arms</span
                >
              </v-col>
              <v-col cols="2" sm="2" md="2" lg="1">
                <a href="https://www.youtube.com/@Accessroomshospitality" target="_blank">
                  <v-img
                    contain
                    height="30px"
                    src="./../assets/youtube.png"
                  ></v-img>
                  </a>
              </v-col>
              <v-col cols="2" sm="2" md="2" lg="1">
                <a href="https://www.facebook.com/accesrooms" target="_blank">
                  <v-img
                    contain
                    height="30px"
                    src="./../assets/fb.png"
                  ></v-img>
                  </a>
              </v-col>
              <v-col cols="2" sm="2" md="2" lg="1">
                <v-img
                  contain
                  height="30px"
                  src="./../assets/twitter.png"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="2" md="3" class="pa-0">
            <v-row justify="space-between">
              <v-col cols="12" align-self="end" style="line-height: 45px;">
                <span @click="$router.push('/TermsandConditions')"
                  style="
                    font-family: RobotoRegular;
                    font-size: 13px;
                    color: white;cursor:pointer;
                  "
                  >Terms & Conditions</span><br/>
                  <span  @click="$router.push('/PrivacyPolicy')"
                  style="
                    font-family: RobotoRegular;
                    font-size: 13px;
                    color: white;cursor:pointer;
                  "
                  >Privacy Policy</span><br/>
                  <span  @click="$router.push('/services')"
                  style="
                    font-family: RobotoRegular;
                    font-size: 13px;
                    color: white;cursor:pointer;
                  "
                  >Services</span><br/>
              <!-- </v-col>
              <v-col cols="12" align-self="end" style="line-height: 45px;"> -->
                <!-- <span style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;">Helplines:</span><br/>
                     <span style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;">+91 7994111694 , +919539920001</span> -->
                    </v-col>
            </v-row>
          </v-col>
          <!-- <v-spacer></v-spacer> -->
          <v-col cols="12" sm="5" md="4" lg="3" class="pa-0 pt-10">
            <v-row justify="center">
              <v-col cols="2">
                <v-icon color="white">mdi-map-marker-radius</v-icon> &nbsp;
              </v-col>
              <v-col cols="10" class="pa-0 py-2">
                <span
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;
                  "
                  >Head Office Kailasam Complex /455 Kottayam ,Kerala 686503 Helplines:+917994111694 , +919539920001
                </span>
              </v-col>
              <v-col cols="2">
                <v-icon color="white">mdi-headset</v-icon> &nbsp;
              </v-col>
              <v-col cols="10" class="pa-0 py-2">
                <span
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;
                  "
                  >Nehru Trophy Road , Near Ramada Hotel Sandeep building
                  Alappuzha , Kerala 688013</span
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-divider color="#FFFFFF"></v-divider>
      </v-col>
      <v-col cols="12" class="py-10 pa-0">
        <v-row justify="center" class="text-center px-5">
          <v-col cols="12" class="pa-0">
            <span
              style="font-family: RobotoMedium; font-size: 15px; color: #ffffff"
            >
              &copy; Accessrooms 2023 - All rights reserved
            </span>
            &nbsp;<span style="color: #ffffff">|</span> &nbsp;
            <span
              style="font-family: RobotoMedium; font-size: 15px; color: #ffffff"
            >
              Designed & Developed by
              <a
                style="text-decoration: none"
                href="https://leopardtechlabs.com/"
              >
                <span style="color: #f17343">
                  Leopard Tech Labs Pvt Ltd
                </span></a
              >
            </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
  <!-- </v-footer> -->
</template>
  <script>
export default {
  data: () => ({
  }),
};
</script>