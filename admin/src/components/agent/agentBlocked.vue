<template>
  <div>
    <v-layout v-if="list.length > 0" wrap>
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
      <v-flex class="mainfont" xs12 sm4  lg3 v-for="(item, i) in list" :key="i" pt-8>
        <v-layout wrap justify-center>
          <v-flex xs11>
            <v-card>
              <v-layout wrap justify-center pb-3>
                <v-flex xs11>
                  <v-layout wrap justify-center>
                    <v-flex xs12 pt-2>
                      <v-img
                        height="190px"
                        src="../../assets/Images/profile11.jpg"
                      ></v-img>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs11>
                  <v-layout wrap justify-center>
                    <v-flex xs11 pt-3>
                      <strong>Name:</strong> {{ item.name }}
                    </v-flex>
                    <v-flex xs11 pt-3>
                      <strong>Phone Number:</strong> {{ item.phoneNumber }}
                    </v-flex>

                    <v-flex xs11 pt-3>
                      <strong>User Type:</strong> {{ item.userType }}
                    </v-flex>
                    <v-flex xs11 pt-3>
                      <strong>Locality:</strong> {{ item.locality }}
                    </v-flex>

                    <v-flex
                      xs11
                      pt-3
                      @click="$router.push('/agentdetailedview?id=' + item._id)"
                    >
                      <v-btn block color="#FF681F">
                        <span style="color: white; text-transform: none">
                          View more
                          <v-icon color="white">mdi-arrow-right-thin</v-icon>
                        </span>
                      </v-btn>
                    </v-flex>
                    <v-flex
                          v-if="item.verificationStatus === 'Blocked'"
                          xs10
                          md12
                          lg11
                          pb-6
                          pt-3
                          align-self-center
                          @click="
                            (unblockdialog = true), (userId = item._id)
                          "
                        >
                          <v-btn block color="#3EB489">
                            <span style="color: white; text-transform: none">
                              Unblock
                              <v-icon color="white" size="90%"
                                >mdi-block-helper</v-icon
                              >
                            </span>
                          </v-btn>
                        </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout v-else pt-16 wrap>
      <v-flex xs12 text-center style="font-size: larger" class="mainfont">
        No data found!
      </v-flex>
    </v-layout>
    <v-layout wrap v-if="list.length > 0">
      <v-flex xs12 pt-10>
        <v-pagination
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          :length="pages"
          :total-visible="7"
          v-model="currentPage"
          color="#FF681F"
        ></v-pagination>
      </v-flex>
    </v-layout>
    <v-dialog
          :retain-focus="true"
          persistent
          v-model="unblockdialog"
          max-width="600px"
        >
          <v-card>
            <v-layout wrap>
              <v-flex xs12>
                <v-card-title
                  class="mainfont"
                  style="color: black; font-size: 18px; font-weight: lighter"
                >
                  Are you sure you want to unblock the agent?
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="black"
                text
                @click="unblockdialog = false"
                class="mainfont"
                >Cancel</v-btn
              >
              <v-btn
                color="red"
                class="mainfont"
                text
                @click="unblockAgent(userId)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </div>
</template>
  <script>
import axios from "axios";

export default {
  data() {
    return {
      unblockdialog:false,

      appLoading: false,
      page: 1,
      pages: 0,
      dialog1: false,
    
      fromDate2: null,
      toDate2: null,
      msg: null,
      currentPage: 1,

      showSnackBar: false,
      list: [],
      dialog2: false,
    };
  },

  mounted() {
    this.getList();
  },
  watch: {
    currentPage() {
      this.getList();
    },
  },

  methods: {
    unblockAgent(userId) {
      axios({
        method: "POST",
        url: "/agent/unblock",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          userId: userId,
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
    getList() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/agent/blocked/list",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          status: this.status,
          categoryId: this.categoryId,
          page: this.currentPage,
          fromDate: this.fromDate,
          toDate: this.toDate,
          limit: 10,
        },
      })
        .then((response) => {
          this.list = response.data.data;
          this.totalData = response.data.totalLength;
          this.pages = Math.ceil(this.totalData / response.data.limit);
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
      
    