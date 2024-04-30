<template>
  <div>
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
    <v-layout wrap>
      <v-flex xs12 justify-center>
        <v-layout v-if="list.length > 0" wrap justify-center>
          <v-flex xs12>
            <v-layout wrap >
              <v-flex
                class="mainfont"
                xs12
                sm4
                lg3
                v-for="(item, i) in list"
                :key="i"
                pt-8
              >
                <v-layout wrap justify-center>
                  <v-flex xs11>
                    <v-card>
                      <v-layout wrap justify-center pb-4>
                        <v-flex xs11 pt-2>
                          <v-layout wrap justify-start>
                            <v-flex xs12>
                              <v-img
                                height="150px"
                                src="../../assets/Images/profile11.jpg"
                              ></v-img>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs11>
                          <v-layout wrap justify-start>
                            <v-flex xs11 lg11 pt-3>
                              <strong>Name:</strong> {{ item.name }}
                            </v-flex>
                            <v-flex xs11 lg11 pt-3>
                              <strong>Phone Number:</strong>
                              {{ item.phoneNumber }}
                            </v-flex>

                            <v-flex xs11 lg11 pt-3>
                              <strong>Locality:</strong> {{ item.locality }}
                            </v-flex>

                            <v-flex
                              xs11
                              lg11
                              pt-3
                              @click="
                                $router.push(
                                  '/vendordetailedview?id=' + item._id
                                )
                              "
                            >
                              <v-btn block size="90%" color="#FF681F">
                                <span
                                  style="color: white; text-transform: none"
                                >
                                  View more
                                  <v-icon color="white"
                                    >mdi-arrow-right-thin</v-icon
                                  >
                                </span>
                              </v-btn>
                            </v-flex>

                            <v-flex
                              v-if="item.verificationStatus === 'Verified'"
                              xs11
                              pt-3
                              @click="
                                (unblockDialog = true), (userId = item._id)
                              "
                            >
                              <v-btn block color="red">
                                <span
                                  style="color: white; text-transform: none"
                                >
                                  Block
                                  <v-icon color="white" size="90%"
                                    >mdi-block-helper</v-icon
                                  >
                                </span>
                              </v-btn>
                            </v-flex>
                            <v-flex
                              v-if="item.verificationStatus === 'Blocked'"
                              xs11
                              pt-3
                              @click="
                                (unblockDialog = true), (userId = item._id)
                              "
                            >
                              <v-btn block color="#3EB489">
                                <span
                                  style="color: white; text-transform: none"
                                >
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
            <v-layout wrap>
              <v-flex xs12 pt-10 pb-8  class="mainfont" align-self-end>
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
          </v-flex>
        </v-layout>
        <v-layout pt-16 v-else wrap>
          <v-flex xs12 text-center style="font-size: larger" class="mainfont">
            No data found!
          </v-flex>
        </v-layout>
      </v-flex>
      <v-dialog
        :retain-focus="true"
        persistent
        v-model="unblockDialog"
        max-width="600px"
      >
        <v-card>
          <v-layout wrap>
            <v-flex xs12>
              <v-card-title
                class="mainfont"
                style="color: black; font-size: 18px; font-weight: lighter"
              >
                Are you sure you want to unblock the Vendor?
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              text
              @click="unblockDialog = false"
              class="mainfont"
              >Cancel</v-btn
            >
            <v-btn
              color="red"
              class="mainfont"
              text
              @click="unblockVendor(userId)"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
  <script>
import axios from "axios";

export default {
  data() {
    return {
      name: null,
      subtab: null,
      appLoading: false,
      page: 1,
      pages: 0,

      unblockDialog: false,

      list: [],

      msg: null,
      currentPage: 1,

      showSnackBar: false,
      curid: [],
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
    unblockVendor(userId) {
      axios({
        method: "POST",
        url: "/vendor/unblock",
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
        url: "/vendor/blockedlist",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          status: this.status,
          categoryId: this.categoryId,
          page: this.currentPage,
          fromDate: this.fromDate,
          toDate: this.toDate,
          limit: 12,
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
  <style>
.mainbg6 {
  background-image: linear-gradient(269.6deg, #e7f1f0 -31.66%, #e7f1f0);
  padding: 5px;
}
</style>