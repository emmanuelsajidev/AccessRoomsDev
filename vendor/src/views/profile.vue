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
    <v-snackbar v-model="showSnackBar" color="#ff6200" right top timeout="2000">
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showSnackBar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center pa-0 pa-sm-4>
      <v-flex xs12>
        <v-layout wrap justify-center pt-2>
          <v-flex xs6 sm4 align-self-center>
            <span
              class="title1"
              :style="{
                'font-size':
                  $vuetify.breakpoint.name == 'xs'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'sm'
                    ? '20px'
                    : $vuetify.breakpoint.name == 'md'
                    ? '25px'
                    : $vuetify.breakpoint.name == 'lg'
                    ? '25px'
                    : '30px',
              }"
              >Profile</span
            >
          </v-flex>
          <v-spacer></v-spacer>
          <!-- <v-flex xs2 align-self-center text-right>
            <v-btn small color="#f17343" dark @click="editdialogue = true"
              ><v-icon
                small
                style="
                  font-family: LexendFont;
                  font-weight: 300;
                  font-size: 14px;
                  text-transform: none;
                "
                >mdi-pencil</v-icon
              ><span
                style="
                  font-family: LexendFont;
                  font-weight: 300;
                  font-size: 14px;
                  text-transform: none;
                "
                >Edit Profile</span
              ></v-btn
            >
          </v-flex> -->
        </v-layout>
        <v-layout wrap justify-space-around>
          <v-flex xs12 v-if="myData">
            <v-card tile class="pa-4 pa-sm-6">
              <v-layout wrap justify-start>
                <v-flex xs12 text-left>
                  <span
                    style="
                      font-weight: 500;
                      font-size: 18px;
                      font-family: LexendFont;
                      text-transform: none;
                    "
                    >Personal Details
                  </span></v-flex
                >
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Name :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.name"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.name }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Category :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center v-if="myData.vendorCategory">
                      <span
                        v-for="(item, i) in myData.vendorCategory"
                        :key="i"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ item.categoryType }}
                        <span
                          v-if="
                            i < Object.keys(myData.vendorCategory).length - 1
                          "
                          >,
                        </span></span
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Email :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.email"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.email }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Phone :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.phoneNumber"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.phoneNumber }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 py-2><v-divider></v-divider></v-flex>
              </v-layout>
              <v-layout wrap justify-start>
                <v-flex xs12 text-left>
                  <span
                    style="
                      font-weight: 500;
                      font-size: 18px;
                      font-family: LexendFont;
                      text-transform: none;
                    "
                    >Bank Details
                  </span></v-flex
                >
                <v-flex
                  xs12
                  sm4
                  py-2
                  px-1
                  align-self-center
                  v-if="vendorData.bankDetails"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Name :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="vendorData.bankDetails.bankName"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ vendorData.bankDetails.bankName }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  py-2
                  px-1
                  align-self-center
                  v-if="vendorData.bankDetails"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Branch :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="vendorData.bankDetails.branchName"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ vendorData.bankDetails.branchName }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  py-2
                  px-1
                  align-self-center
                  v-if="vendorData.bankDetails"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Acc.Type :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="vendorData.bankDetails.accType"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ vendorData.bankDetails.accType }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  py-2
                  px-1
                  align-self-center
                  v-if="vendorData.bankDetails"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Acc.Holder :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="vendorData.bankDetails.accHolderName"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ vendorData.bankDetails.accHolderName }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  py-2
                  px-1
                  align-self-center
                  v-if="vendorData.bankDetails"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Acc.No :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="vendorData.bankDetails.accNo"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ vendorData.bankDetails.accNo }}</span
                      >
                      <span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  py-2
                  px-1
                  align-self-center
                  v-if="vendorData.bankDetails"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >IFSC :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="vendorData.bankDetails.ifscCode"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ vendorData.bankDetails.ifscCode }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  py-2
                  px-1
                  align-self-center
                  v-if="vendorData.bankDetails"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs4 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >UPI Id :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="vendorData.bankDetails.upiId"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ vendorData.bankDetails.upiId }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 py-2><v-divider></v-divider></v-flex>
              </v-layout>
              <v-layout wrap justify-start>
                <v-flex xs12 text-left>
                  <span
                    style="
                      font-weight: 500;
                      font-size: 18px;
                      font-family: LexendFont;
                      text-transform: none;
                    "
                    >Other Details
                  </span></v-flex
                >
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs5 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Company :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.companyName"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.companyName }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm4
                  py-2
                  px-1
                  align-self-center
                  v-if="myData.isGst == true"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs5 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Gst No :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.gstNo"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.gstNo }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs5 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Building No :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.buildingNo"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.buildingNo }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs5 align-self-center>
                      <span
                        v-if="myData.locality"
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Locality :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.locality"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.locality }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs5 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Location :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.link"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.link }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs5 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >District :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.district"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.district }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs5 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >State :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.state"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.state }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs5 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Country :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.country"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.country }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm4 py-2 px-1 align-self-center>
                  <v-layout wrap justify-start>
                    <v-flex xs5 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Pincode :
                      </span>
                    </v-flex>
                    <v-flex xs7 align-self-center>
                      <span
                        v-if="myData.pincode"
                        style="
                          font-weight: 300;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                        "
                        >{{ myData.pincode }}</span
                      ><span v-else>-</span>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 py-2><v-divider></v-divider></v-flex>
              </v-layout>
              <v-layout wrap justify-start>
                <v-flex xs12 text-left>
                  <span
                    style="
                      font-weight: 500;
                      font-size: 18px;
                      font-family: LexendFont;
                      text-transform: none;
                    "
                    >Documents
                  </span></v-flex
                >
                <v-flex xs12 sm3 py-2 px-1 align-self-center v-if="vendorData">
                  <v-layout wrap justify-start>
                    <v-flex xs12 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Company Registration :
                      </span>
                    </v-flex>
                    <v-flex
                      xs12
                      align-self-center
                      v-if="vendorData.licenseProof"
                    >
                      <v-btn
                        :disabled="vendorData.licenseProof ? false : true"
                        small
                        color="#f17343"
                        dark
                        :href="mediaUURL + vendorData.licenseProof"
                        target="_blank"
                      >
                        <v-icon
                          small
                          style="
                            font-family: LexendFont;
                            font-weight: 300;
                            font-size: 14px;
                            text-transform: none;
                          "
                          >mdi-file-document-outline</v-icon
                        ><span
                          style="
                            font-family: LexendFont;
                            font-weight: 300;
                            font-size: 14px;
                            text-transform: none;
                          "
                          >View receipt</span
                        ></v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 sm3 py-2 px-1 align-self-center v-if="vendorData">
                  <v-layout wrap justify-start>
                    <v-flex xs12 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Voter Id Proof :
                      </span>
                    </v-flex>
                    <v-flex
                      xs12
                      align-self-center
                      v-if="vendorData.voteridProof"
                    >
                      <v-btn
                        :disabled="vendorData.voteridProof ? false : true"
                        small
                        color="#f17343"
                        dark
                        :href="mediaUURL + vendorData.voteridProof"
                        target="_blank"
                      >
                        <v-icon
                          small
                          style="
                            font-family: LexendFont;
                            font-weight: 300;
                            font-size: 14px;
                            text-transform: none;
                          "
                          >mdi-file-document-outline</v-icon
                        ><span
                          style="
                            font-family: LexendFont;
                            font-weight: 300;
                            font-size: 14px;
                            text-transform: none;
                          "
                          >View receipt</span
                        ></v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-2
                  px-1
                  align-self-center
                  v-if="vendorData.bankDetails"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs12 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >QR Code :
                      </span>
                    </v-flex>
                    <v-flex
                      xs12
                      align-self-center
                      v-if="vendorData.bankDetails.qrCode"
                    >
                      <v-btn
                        :disabled="vendorData.bankDetails.qrCode ? false : true"
                        small
                        color="#f17343"
                        dark
                        :href="mediaUURL + vendorData.bankDetails.qrCode"
                        target="_blank"
                      >
                        <v-icon
                          small
                          style="
                            font-family: LexendFont;
                            font-weight: 300;
                            font-size: 14px;
                            text-transform: none;
                          "
                          >mdi-file-document-outline</v-icon
                        ><span
                          style="
                            font-family: LexendFont;
                            font-weight: 300;
                            font-size: 14px;
                            text-transform: none;
                          "
                          >View receipt</span
                        ></v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-2
                  px-1
                  align-self-center
                  v-if="vendorData.bankDetails"
                >
                  <v-layout wrap justify-start>
                    <v-flex xs12 align-self-center>
                      <span
                        style="
                          font-weight: 400;
                          font-size: 18px;
                          font-family: LexendFont;
                          text-transform: none;
                          color: #787777;
                        "
                        >Passbook :
                      </span>
                    </v-flex>
                    <v-flex
                      xs12
                      align-self-center
                      v-if="vendorData.bankDetails.passBook"
                    >
                      <v-btn
                        :disabled="
                          vendorData.bankDetails.passBook ? false : true
                        "
                        small
                        color="#f17343"
                        dark
                        :href="mediaUURL + vendorData.bankDetails.passBook"
                        target="_blank"
                      >
                        <v-icon
                          small
                          style="
                            font-family: LexendFont;
                            font-weight: 300;
                            font-size: 14px;
                            text-transform: none;
                          "
                          >mdi-file-document-outline</v-icon
                        ><span
                          style="
                            font-family: LexendFont;
                            font-weight: 300;
                            font-size: 14px;
                            text-transform: none;
                          "
                          >View receipt</span
                        ></v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>
                <!-- <v-flex xs12 py-2><v-divider></v-divider></v-flex> -->
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <v-dialog width="800px" v-model="editdialogue">
          <v-card width="800px" class="pa-4">
            <v-layout wrap justify-center>
              <v-flex xs11 text-center
                ><span
                  style="
                    color: #f17343;
                    font-weight: 400;
                    font-size: 25px;
                    font-family: LexendFont;
                    text-transform: none;
                  "
                  >Edit</span
                ></v-flex
              >
              <v-flex xs1 text-right>
                <v-icon @click="editdialogue = false" color="#f17343"
                  >mdi-close-box</v-icon
                ></v-flex
              >
              <v-flex xs8 text-center py-4>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <v-layout wrap justify-start>
              <v-flex xs12 text-left>
                <span
                  style="
                    font-weight: 500;
                    font-size: 18px;
                    font-family: LexendFont;
                    text-transform: none;
                  "
                  >Personal Details
                </span></v-flex
              >
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap px-4 py-2>
                  <v-flex xs12 text-left class="tablefont">Name</v-flex>
                  <v-flex xs12>
                    <v-text-field
                      placeholder="Name"
                      v-model="myData.name"
                      outlined
                      color="#b234a9"
                      dense
                      hide-details
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap px-4 py-2>
                  <v-flex xs12 text-left class="tablefont">Category</v-flex>
                  <v-flex xs12>
                    <v-select
                      v-model="vendorCategory"
                      hide-details="auto"
                      :items="vendorCatList"
                      :menu-props="{ maxHeight: '400' }"
                      Placeholder="Select"
                      item-text="categoryType"
                      item-value="_id"
                      multiple
                      outlined
                      persistent-hint
                      dense
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Email :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.email"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Phone :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.phoneNumber"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 py-2><v-divider></v-divider></v-flex>
            </v-layout>
            <v-layout wrap justify-start>
              <v-flex xs12 text-left>
                <span
                  style="
                    font-weight: 500;
                    font-size: 18px;
                    font-family: LexendFont;
                    text-transform: none;
                  "
                  >Bank Details
                </span></v-flex
              >
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Bank Name :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="vendorData.bankDetails.bankName"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Branch :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="vendorData.bankDetails.branchName"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Acc.Type :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="vendorData.bankDetails.accType"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Acc.Holder :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="vendorData.bankDetails.accHolderName"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Acc.No :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="vendorData.bankDetails.accNo"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >IFSC :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="vendorData.bankDetails.ifscCode"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >UPI Id :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="vendorData.bankDetails.upiId"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 py-2><v-divider></v-divider></v-flex>
            </v-layout>
            <v-layout wrap justify-start>
              <v-flex xs12 text-left>
                <span
                  style="
                    font-weight: 500;
                    font-size: 18px;
                    font-family: LexendFont;
                    text-transform: none;
                  "
                  >Other Details
                </span></v-flex
              >
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Company :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.companyName"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex
                xs12
                sm4
                py-2
                px-1
                align-self-center
                v-if="myData.isGst == true"
              >
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Gst No :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.gstNo"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Building No :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.buildingNo"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Locality :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.locality"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Location :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.link"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >District :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.district"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >State :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.state"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Country :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.country"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm4 py-2 px-1 align-self-center>
                <v-layout wrap justify-start>
                  <v-flex xs12 align-self-center>
                    <span
                      style="
                        font-weight: 400;
                        font-size: 18px;
                        font-family: LexendFont;
                        text-transform: none;
                        color: #787777;
                      "
                      >Pincode :
                    </span>
                  </v-flex>
                  <v-flex xs12 align-self-center>
                    <v-text-field
                      dense
                      outlined
                      hide-details="auto"
                      v-model="myData.pincode"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 py-2><v-divider></v-divider></v-flex>
            </v-layout>

            <v-card-actions class="pt-3">
              <v-layout wrap>
                <v-spacer></v-spacer>
                <v-flex xs2>
                  <v-btn
                    color="#f17343"
                    class="buttons1"
                    dark
                    block
                    @click="editProfile()"
                    >OK</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>
    <script>
import axios from "axios";
export default {
  data() {
    return {
      showSnackBar:false,
      ServerError:false,
      msg:"",
      appLoading: false,
      myData: {},
      vendorData: {},
      editdialogue: false,
    };
  },
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    getData() {
      this.appLoading = true;
      axios({
        url: "/vendor/profile",
        method: "get",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.myData = response.data.data;
          this.vendorData = response.data.data.vendorId;
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    verify(id) {
      this.appLoading = true;
      axios({
        method: "POST",
        url: "/vendor/verify/shikara/settlement",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          bookingId: id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.snackbar = true;
            this.getData();
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
    formatDate(item) {
      var dt = new Date(item);
      var day = dt.getDate();
      var year = dt.getFullYear();
      // var hours = dt.getHours();
      // var minutes = dt.getMinutes();
      dt = dt.toString();
      // var ampm = hours >= 12 ? "pm" : "am";
      // hours = hours % 12;
      // hours = hours ? hours : 12;
      // minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = day + " " + dt.slice(4, 7) + " " + year;
      // +
      // " , " +
      // hours +
      // ":" +
      // minutes +
      // " " +
      // ampm;

      return strTime;
    },
    formatTimeNew(item) {
      var dt = new Date(item);
      // var day = dt.getDate();
      // var year = dt.getFullYear();
      var hours = dt.getHours();
      var minutes = dt.getMinutes();
      dt = dt.toString();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime =
        // day + " " + dt.slice(4, 7) + " " + year;
        // +
        // " , " +
        hours + ":" + minutes + " " + ampm;

      return strTime;
    },
  },
};
</script>
    <style scoped>
.gr1 {
  background: linear-gradient(to bottom, rgba(255, 125, 20, 1), #f17343);
}
</style>