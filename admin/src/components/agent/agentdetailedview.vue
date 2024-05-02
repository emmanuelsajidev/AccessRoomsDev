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
          <v-flex xs11 pt-10 pb>
            <v-card style="border-radius: 0%" elevation="0">
              <v-layout wrap justify-start pa-4>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Name</strong>: {{ list.name }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Phone Number</strong>: {{ list.phoneNumber }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Email</strong>: {{ list.email }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Whatsapp Number</strong>: {{ list.whatsappNumber }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>User Type</strong>: {{ list.userType }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Locality</strong>: {{ list.locality }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Pincode</strong>: {{ list.pincode }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>District</strong>: {{ list.district }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>State</strong>: {{ list.state }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Country</strong>: {{ list.country }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Building No</strong>: {{ list.buildingNo }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Company Name</strong>: {{ list.companyName }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Gst No</strong>: {{ list.gstNo }}
                </v-flex>
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Level</strong>: {{ list.level }}
                </v-flex>
                <!-- <v-flex xs11     lg3 pt-5>
  <strong>location</strong>: {{ list.location }}
</v-flex> -->
                <v-flex xs11 sm4 lg3 pt-5>
                  <strong>Role</strong>: {{ list.role }}
                </v-flex>
                <v-flex xs11 lg3 pt-5>
                  <strong>Verification Status</strong>:
                  {{ list.verificationStatus }}
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- <v-flex xs12 v-if="list.verificationStatus !== 'Pending'">
        <v-layout justify-center class="mainfont">
          <v-flex xs11 pt-10>
            <v-card style="border-radius: 0%" elevation="0">
              <v-layout wrap justify-start pa-4>
                <v-flex xs6 sm3 lg2>
                  <v-btn
                    v-if="list.verificationStatus !== 'Blocked'"
                    @click="block = true"
                    color="green"
                  >
                    <span style="color: aliceblue"> Block </span>
                  </v-btn>
                  <v-btn v-else @click="unblock = true" color="#3EB489">
                    <span style="color: aliceblue"> Unblock </span>
                  </v-btn>
                </v-flex>
                <v-flex xs6 sm3 lg2>
                  <v-btn color="red" @click="deleteit = true">
                    <span style="color: aliceblue"> Delete </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-dialog
            :retain-focus="true"
            persistent
            v-model="unblock"
            max-width="600px"
          >
            <v-card>
              <v-layout wrap>
                <v-flex xs12>
                  <v-card-title
                    class="mainfont"
                    style="color: black; font-size: 18px; font-weight: lighter"
                  >
                    Are you sure you want to unblock?
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="black"
                  text
                  @click="unblock = false"
                  class="mainfont"
                  >Cancel</v-btn
                >
                <v-btn color="red" class="mainfont" text @click="unblockAgent()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            :retain-focus="true"
            persistent
            v-model="block"
            max-width="600px"
          >
            <v-card>
              <v-layout wrap>
                <v-flex xs12>
                  <v-card-title
                    class="mainfont"
                    style="color: black; font-size: 18px; font-weight: lighter"
                  >
                    Are you sure you want to Block?
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="black"
                  text
                  @click="block = false"
                  class="mainfont"
                  >Cancel</v-btn
                >
                <v-btn color="red" class="mainfont" text @click="blockAgent()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            :retain-focus="true"
            persistent
            v-model="deleteit"
            max-width="600px"
          >
            <v-card>
              <v-layout wrap>
                <v-flex xs12>
                  <v-card-title
                    class="mainfont"
                    style="color: black; font-size: 18px; font-weight: lighter"
                  >
                    Are you sure you want to Delete?
                  </v-card-title>
                </v-flex>
              </v-layout>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="black"
                  text
                  @click="deleteit = false"
                  class="mainfont"
                  >Cancel</v-btn
                >
                <v-btn color="red" class="mainfont" text @click="deleteAgent()"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-flex> -->
      <v-flex xs12 pb-16>
        <v-layout justify-center class="mainfont">
          <v-flex xs11 pt-10>
            <v-card style="border-radius: 0%" elevation="0" v-if="list">
              <v-layout wrap justify-start pa-4 v-if="list.agentId">
                <v-flex xs12 sm4 lg4 v-if="list.agentId.agentGSTProof">
                  <v-layout wrap>
                    <v-flex xs12 lg8 text-center> ID PROOF  </v-flex>
                    <v-flex xs12 lg8 pt-4>
                      <v-btn
                        color="rgba(255, 98, 0, 1)"
                        small
                        block
                        dark
                        download
                        :href="mediaURLnewx + list.agentId.agentGSTProof"
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
                <v-flex  xs12 sm4 lg4 v-if="list.agentId.agentIdProofBack">
                  <v-layout wrap>
                    <v-flex xs12 lg8 text-center> ID PROOF BACK </v-flex>
                    <v-flex xs12 lg8 pt-4>
                      <v-btn
                        color="rgba(255, 98, 0, 1)"
                        small
                        block
                        dark
                        download
                        :href="mediaURLnewx + list.agentId.agentIdProofBack"
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
                <v-flex xs12 sm4 lg4  v-if="list.agentId.agentIdProofFront">
                  <v-layout wrap justify-center>
                    <v-flex xs12 lg8 text-center> ID PROOF FRONT </v-flex>
                    <v-flex xs12 lg8 pt-4>
                      <v-btn
                        color="rgba(255, 98, 0, 1)"
                        small
                        block
                        dark
                        download
                        :href="mediaURLnewx + list.agentId.agentIdProofFront"
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
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex
        xs12
        v-if="
          list.verificationStatus !== 'Verified' &&
          list.verificationStatus !== 'Blocked'
        "
      >
        <v-layout justify-center class="mainfont" v-if="list.level === 4">
          <v-flex xs11 pt-10>
            <v-card style="border-radius: 0%" elevation="0">
              <v-layout wrap justify-start pa-4>
                <v-flex xs6 sm3 lg2 >
                  <v-btn  @click="approve = true" color="green">
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
      deleteit: false,
      userProfileTabs: null,
      subtab: null,
      appLoading: false,
      unblock: false,
      id: this.$route.query.id,
      block: false,
      deletetit: false,
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
    url: "/agent/approve",
    headers: {
      token: localStorage.getItem("token"),
    },
    data: {
      userid: this.id,
    },
  })
    .then((response) => {
      if (response.data.status === true) {
        this.msg = response.data.msg;
        this.showSnackBar = true;
        this.$router.push("/approvedagent");
      } else {
        this.msg = response.data.msg;
        this.showSnackBar = true;
        this.approve = false;
      }
    })
    .catch((err) => {
      this.ServerError = true;
      console.error(err);
    });
},

    unblockAgent() {
      axios({
        method: "POST",
        url: "/agent/unblock",
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
            location.reload();
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    blockAgent() {
      axios({
        method: "POST",
        url: "/agent/block",
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
            location.reload();
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    deleteAgent() {
      axios({
        method: "POST",
        url: "/agent/approve",
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
            this.$router.push("/agent");
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
        url: "/agent/reject",
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
            this.$router.push("/agent");
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
        url: "/agent/info",
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