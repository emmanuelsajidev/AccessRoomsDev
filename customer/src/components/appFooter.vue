<template>
  <!-- <v-footer absolute=""  color="#0C111F" style="margin-bottom: 0; position: relative;"> -->
  <div style="background-color: #0c111f">
    <v-layout wrap justify-center fill-height>
      <v-flex xs11 sm10 md10 pt-16 pb-10 pa-0>
        <v-layout wrap justify-space-between>
          <v-flex xs12 sm5 md5 pa-0>
            <v-layout wrap justify-start>
              <v-flex xs12 pb-0>
                <span
                  style="
                    font-family: LexendRegular;
                    font-size: 20px;
                    color: white;
                  "
                  >ACCESS ROOMS</span
                >
              </v-flex>
              <v-flex xs12 pb-1 pt-2>
                <span
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;
                  "
                  >Shikara boat bookings in Alappuzha, Kollam, Poovar, Kumarakom. Houseboat bookings in Alappuzha, Kollam, Poovar, Kumarakom | India's first online platform for houseboat and shikara bookings.</span
                >
              </v-flex>
              <v-flex xs12 pt-0 pb-2>
                <span
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;
                  "
                  ><a href="https://vendor.accessrooms.com/" target="_blank" >
                    
                    Accessrooms Vendor  
                  </a></span><br/>
                  <span
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;
                  "
                  ><a href="https://agent.accessrooms.com/" target="_blank">Accessrooms Agent</a></span>
              </v-flex>
              <v-flex xs2 sm2 md2 lg1>
                <a href="https://www.instagram.com/accessrooms.828/?igsh=Z2RiY2txczE3cXdp" target="_blank">
                <v-img
                  contain
                  height="30px"
                  src="./../assets/ig.png"
                ></v-img>
              </a>
              </v-flex>
              <v-flex xs2 sm2 md2 lg1>
                <a href="https://www.youtube.com/@Accessroomshospitality" target="_blank">
                <v-img
                  contain
                  height="30px"
                  src="./../assets/youtube.png"
                ></v-img>
                </a>
              </v-flex>
              <v-flex xs2 sm2 md2 lg1>
                <a href="https://www.facebook.com/accesrooms" target="_blank">
                <v-img
                  contain
                  height="30px"
                  src="./../assets/fb.png"
                ></v-img>
                </a>
              </v-flex>
              <v-flex xs2 sm2 md2 lg1>
                <v-img
                  contain
                  height="30px"
                  src="./../assets/twitter.png"
                ></v-img>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm2 md3 pa-0>
            <v-layout wrap justify="space-between">
              <v-flex xs12 align-self-end style="line-height: 25px;">
                <span @click="$router.push('/TermsandConditions')"
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;cursor:pointer;
                  "
                  >Terms & Conditions</span><br/>
                  <span  @click="$router.push('/PrivacyPolicy')"
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;cursor:pointer;
                  "
                  >Privacy Policy</span><br/>
                  <span  @click="$router.push('/services')"
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;cursor:pointer;
                  "
                  >Services</span><br/>
              <!-- </v-flex>
              <v-flex xs12 align-self-end style="line-height: 45px;"> -->
                <!-- <span style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;">Helplines:</span><br/>
                     <span style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;">+91 7994111694 , +919539920001</span> -->
                    <span
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;
                  "
                  > Helplines:
                  <!-- +917994111694 , +919539920001 -->
                  9539920001 , 7994111694 <br/>
                  Info@accessrooms.com <br/>
sales@accessrooms.com
                </span>
                    </v-flex>
            </v-layout>
          </v-flex>
          <!-- <v-spacer></v-spacer> -->
          <v-flex xs12 sm5 md4 lg3 pa-0 pt-2>
            <v-layout wrap justify-center>
              <v-flex xs2>
                <v-icon color="white">mdi-map-marker-radius</v-icon> &nbsp;
              </v-flex>
              <v-flex xs10 pa-0 py-2>
                <span
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;
                  "
                  >Head Office Kailasam Complex /455 Kottayam ,Kerala 686503 <br/>
                  <!-- Helplines: -->
                  <!-- +917994111694 , +919539920001 -->
                  <!-- 9539920001 , 7994111694 <br/>
                  Info@accessrooms.com <br/>
sales@accessrooms.com -->
                </span>
              </v-flex>
              <v-flex xs2>
                <v-icon color="white">mdi-headset</v-icon> &nbsp;
              </v-flex>
              <v-flex xs10 pa-0 py-2>
                <span
                  style="
                    font-family: LexendRegular;
                    font-size: 13px;
                    color: white;
                  "
                  >Nehru Trophy Road , Near Ramada Hotel Sandeep building
                  Alappuzha , Kerala 688013</span
                >
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 pa-0>
        <v-divider color="#FFFFFF"></v-divider>
      </v-flex>
      <v-flex xs12 py-6 pa-0 align-self-start style="background-color: #0c111f">
        <v-layout wrap justify-center px-5 class="text-center">
          <v-flex xs12 pa-0>
            <span
              style="font-family: LexendRegular; font-size: 15px; color: #ffffff"
            >
              &copy; Accessrooms 2023 - All rights reserved
            </span>
            &nbsp;<span style="color: #ffffff">|</span> &nbsp;
            <span
              style="font-family: LexendRegular; font-size: 15px; color: #ffffff"
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
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
  <!-- </v-footer> -->
</template>
  <script>
export default {
  data: () => ({
  }),
};
</script>