<template>
  <div>
    <v-layout wrap>
      <v-snackbar v-model="showSnackBar" color="black">
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
      <vue-element-loading
        :active="appLoading"
        :is-full-screen="true"
        background-color="#FFFFFF"
        color="#FF681F"
        spinner="spinner"
      />
      <v-flex xs12>
        <v-layout justify-center class="mainfont">
          <v-flex xs11 pt-10>
            <v-card style="border-radius: 0%" elevation="0">
              <v-layout wrap justify-start pa-4>
                <v-flex xs6 sm4 lg3 pt-3>
                  <strong>Name</strong>: {{ list.name }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-3>
                  <strong>Phone Number</strong>: {{ list.phoneNumber }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-3>
                  <strong>Email</strong>: {{ list.email }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-3>
                  <strong>Whatsapp Number</strong>: {{ list.whatsappNumber }}
                </v-flex>
                <!-- <v-flex xs6  sm4   lg3 pt-5>
                                    <strong>User Type</strong>: {{ list.userType }}
                                </v-flex> -->
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>Locality</strong>: {{ list.locality }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>Pincode</strong>: {{ list.pincode }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>District</strong>: {{ list.district }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>State</strong>: {{ list.state }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>Country</strong>: {{ list.country }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>Building No</strong>: {{ list.buildingNo }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>Company Name</strong>: {{ list.companyName }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>Gst No</strong>: {{ list.gstNo }}
                </v-flex>
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>Level</strong>: {{ list.level }}
                </v-flex>
                <!-- <v-flex xs6     lg3 pt-5>
  <strong>location</strong>: {{ list.location }}
</v-flex> -->
                <v-flex xs6 sm4 lg3 pt-5>
                  <strong>Role</strong>: {{ list.role }}
                </v-flex>
                <v-flex xs6 lg3 pt-5>
                  <strong>Verification Status</strong>:
                  {{ list.verificationStatus }}
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-layout justify-center class="mainfont">
          <v-flex xs11 pt-10>
            <v-card style="border-radius: 0%" elevation="0">
              <v-layout wrap justify-start pa-4>
                <v-flex
                  xs6
                  sm4
                  lg3
                  pt-3
                  v-if="list && list.vendorId && list.vendorId.bankDetails"
                >
                  <strong>Account Holder Name</strong>:
                  {{ list.vendorId.bankDetails.accHolderName }}
                </v-flex>
                <v-flex
                  xs6
                  sm4
                  lg3
                  pt-3
                  v-if="list && list.vendorId && list.vendorId.bankDetails"
                >
                  <strong>Account No</strong>:
                  {{ list.vendorId.bankDetails.accNo }}
                </v-flex>
                <v-flex
                  xs6
                  sm4
                  lg3
                  pt-3
                  v-if="list && list.vendorId && list.vendorId.bankDetails"
                >
                  <strong>Account Type</strong>:
                  {{ list.vendorId.bankDetails.accType }}
                </v-flex>
                <v-flex
                  xs6
                  sm4
                  lg3
                  pt-3
                  v-if="list && list.vendorId && list.vendorId.bankDetails"
                >
                  <strong>Bank Name</strong>:{{
                    list.vendorId.bankDetails.bankName
                  }}
                </v-flex>
                <v-flex
                  xs6
                  sm4
                  lg3
                  pt-5
                  v-if="list && list.vendorId && list.vendorId.bankDetails"
                >
                  <strong>Branch Name</strong>:{{
                    list.vendorId.bankDetails.branchName
                  }}
                </v-flex>
                <v-flex
                  xs6
                  sm4
                  lg3
                  pt-5
                  v-if="list && list.vendorId && list.vendorId.bankDetails"
                >
                  <strong>Ifsc Code</strong>:
                  {{ list.vendorId.bankDetails.ifscCode }}
                </v-flex>
                <v-flex
                  xs6
                  sm4
                  lg3
                  pt-5
                  v-if="list && list.vendorId && list.vendorId.bankDetails"
                >
                  <strong>Upi Id</strong>: {{ list.vendorId.bankDetails.upiId }}
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 pb-16>
        <v-layout justify-center class="mainfont">
          <v-flex xs11 pt-10>
            <v-card
              class="pb-6"
              style="border-radius: 0%"
              elevation="0"
              v-if="list"
            >
              <v-layout wrap justify-start pa-4 v-if="list.vendorId">
                <v-flex xs12 sm4 lg3 v-if="list.vendorId.voteridProof">
                  <v-layout wrap>
                    <v-flex xs12 text-center> Voter Id </v-flex>
                    <v-flex xs12 pt-4>
                      <v-btn
                        color="rgba(255, 98, 0, 1)"
                        small
                        block
                        dark
                        download
                        :href="mediaURLnewx + list.vendorId.voteridProof"
                        target="_blank"
                      >
                        <v-icon>mdi-file-document-outline</v-icon
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                            text-transform: none;
                          "
                          >View</span
                        ></v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12 pl-4 sm4 lg3 v-if="list.vendorId.licenseProof">
                  <v-layout wrap>
                    <v-flex xs12 text-center> License </v-flex>
                    <v-flex xs12 pt-4>
                      <v-btn
                        color="rgba(255, 98, 0, 1)"
                        small
                        block
                        dark
                        download
                        :href="mediaURLnewx + list.vendorId.licenseProof"
                        target="_blank"
                      >
                        <v-icon>mdi-file-document-outline</v-icon
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                            text-transform: none;
                          "
                          >View
                        </span></v-btn
                      >
                      <!-- <v-img :src="mediaURLnewx + list.vendorId.licenseProof"></v-img> -->
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 pl-4 sm4 lg3>
                  <v-layout wrap>
                    <v-flex xs12 text-center> Passbook </v-flex>
                    <v-flex xs12 pt-4 v-if="list.vendorId && list.vendorId.bankDetails && list.vendorId.bankDetails.passBook">
                      <v-btn
                        color="rgba(255, 98, 0, 1)"
                        small
                        block
                        dark
                        download
                        :href="
                          mediaURLnewx + list.vendorId.bankDetails.passBook
                        "
                        target="_blank"
                      >
                        <v-icon>mdi-file-document-outline</v-icon
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                            text-transform: none;
                          "
                          >View</span
                        ></v-btn
                      >
                      <!-- <v-img :src="mediaURLnewx + list.vendorId.bankDetails.passBook"></v-img> -->
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 pl-4 sm4 lg3>
                  <v-layout wrap>
                    <v-flex xs12 text-center> Qr-Code </v-flex>
                    <v-flex xs12 pt-4 v-if="list.vendorId && list.vendorId.bankDetails && list.vendorId.bankDetails.qrCode">
                      <v-btn
                        color="rgba(255, 98, 0, 1)"
                        small
                        block
                        dark
                        download
                        :href="mediaURLnewx + list.vendorId.bankDetails.qrCode"
                        target="_blank"
                      >
                        <v-icon>mdi-file-document-outline</v-icon
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                            text-transform: none;
                          "
                          >View</span
                        ></v-btn
                      >
                    </v-flex>
                  </v-layout>
                </v-flex>

                <!-- <v-flex pl-4 xs12 sm4 lg4 v-if="list.vendorId.agentIdProofBack">
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            DOCUMENT FRONT
                                        </v-flex>
                                        <v-flex xs12 pt-4>
                                            <v-img :src="mediaURLnewx + list.agentId.agentIdProofBack"></v-img>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 sm4 lg4 pl-4 v-if="list.agentId.agentIdProofFront">
                                    <v-layout wrap>
                                        <v-flex xs12 text-left>
                                            DOCUMENT BACK
                                        </v-flex>
                                        <v-flex xs12 pt-4>
                                            <v-img :src="mediaURLnewx + list.agentId.agentIdProofFront"></v-img>
                                        </v-flex>
                                    </v-layout>
                                </v-flex> -->
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 pb-10 v-if="list.verificationStatus !== 'Verified'">
        <v-layout justify-center class="mainfont">
          <v-flex xs11 pt-10 v-if="list.verificationStatus !== 'Blocked'">
            <v-card style="border-radius: 0%" elevation="0">
              <v-layout wrap justify-start pa-4>
                <v-flex xs6 sm3 lg2>
                  <v-btn @click="approve = true" color="green">
                    <span style="color: aliceblue"> Approve </span>
                  </v-btn>
                </v-flex>
                <v-flex xs6 sm3 lg2>
                  <v-btn color="red" @click="reject = true">
                    <span style="color: aliceblue"> Reject </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-dialog
            :retain-focus="true"
            persistent
            v-model="approve"
            max-width="600px"
          >
            <v-card>
              <v-layout wrap>
                <v-flex xs12>
                  <v-card-title
                    class="mainfont"
                    style="color: black; font-size: 18px; font-weight: lighter"
                  >
                    Are you sure you want to Approve?
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="black"
                  text
                  @click="approve = false"
                  class="mainfont"
                  >Cancel</v-btn
                >
                <v-btn
                  color="red"
                  class="mainfont"
                  text
                  @click="userAction('Active')"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            :retain-focus="true"
            persistent
            v-model="reject"
            max-width="600px"
          >
            <v-card>
              <v-layout wrap>
                <v-flex xs12>
                  <v-card-title
                    class="mainfont"
                    style="color: black; font-size: 18px; font-weight: lighter"
                  >
                    Are you sure you want to Reject?
                  </v-card-title>
                </v-flex>
              </v-layout>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="black"
                  text
                  @click="reject = false"
                  class="mainfont"
                  >Cancel</v-btn
                >
                <v-btn
                  color="red"
                  class="mainfont"
                  text
                  @click="userAction2('Active')"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: null,
      barlist: [],
      userProfileTabs: null,
      subtab: null,
      appLoading: false,
      id: this.$route.query.id,
      preview: null,
      tab: null,
      list: [],
      approve: false,
      reject: false,
      auctionbased: [],
      msg: null,
      showSnackBar: false,
    };
  },

  mounted() {
    this.getList();
  },
  methods: {
    userAction() {
      // this.appLoading = true;
      axios({
        method: "POST",
        url: "/vendor/approve",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          userid: this.id,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            this.$router.push("/approvedvendor");
          }
          else{
            this.msg = response.data.msg;
            this.showSnackBar = true;
            this.approve =  false;

          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    userAction2() {
      axios({
        method: "POST",
        url: "/vendor/reject",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          userid: this.id,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            this.$router.push("/approvedvendor");
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    getList() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/vendor/info",

        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          id: this.id,
        },
      })
        .then((response) => {
          this.list = response.data.data;
          this.appLoading = false;
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
  },
};
</script>