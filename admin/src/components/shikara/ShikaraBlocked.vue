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
      <v-layout wrap justify-center>
        <v-flex xs12>
          <v-layout wrap justify-center pt-6>
            <v-flex xs11 text-right>
              <v-layout wrap justify-end>
                <v-flex
            xs10
            sm8
            lg10
            pt-6
            text-left
            class="mainfont"
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
          >
            Shikara Blocked ({{ totalLength }})
          </v-flex>

          <v-flex xs12 sm4 lg2 pt-6>
            <v-text-field
              v-model="keyword"
              outlined
              dense
              hide-details
              clearable
              color="orange"
              label="Search "
              class="custom-text-field"
              style="border-radius: 0%"
            >
              <template v-slot:label>
                <span
                  class="custom-label-text mainfont"
                  style="color: black; font-size: 14px"
                  >Search
                </span>
              </template>
            </v-text-field>
          </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 v-if="list.length > 0">
          <v-layout wrap pl-4 pr-4 >
            <v-flex
              class="mainfont"
              xs12
              sm5
              md4
              lg4
              xl3
              v-for="(item, i) in list"
              :key="i"
              pt-8
            >
              <v-layout wrap justify-center>
                <v-flex xs12 lg10>
                  <v-card>
                    <v-layout wrap justify-center pt-3>
                      <v-flex xs11>
                        <v-layout wrap justify-start>
                          <v-flex xs12 v-if="item.fullImage">
                            <v-layout wrap justify-center>
                              <v-flex xs12>
                                <v-img
                                  height="150px"
                                  width="100%"
                                  :src="mediaURLnewx + item.fullImage"
                                ></v-img>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs12 v-else>
                            <v-img
                              height="150px"
                              width="100%"
                              src="../../assets/Images/noimg.png"
                            ></v-img>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm8 lg12>
                        <v-layout wrap justify-center fill-height>
                          <v-flex xs11 lg11 pt-3 align-self-center>
                            <strong>Shikara Name :</strong> {{ item.shikaraName }}
                          </v-flex>
                          <v-flex xs11 lg11 pt-3 align-self-center>
                            <strong>Total Seats:</strong> {{ item.totalSeats }}
                          </v-flex>
                          <v-flex xs11 lg11 pt-3 align-self-center>
                            <strong>Vendor Name:</strong> {{ item.userid.name }}
                          </v-flex>
  
                          <v-flex
                            xs10
                            md12
                            lg11
                            pt-5
                            align-self-center
                            @click="
                              $router.push('/approveddetailed?id=' + item._id)
                            "
                          >
                            <v-btn block color="#FF681F">
                              <span style="color: white">
                                View more
                                <v-icon color="white"
                                  >mdi-arrow-right-thin</v-icon
                                >
                              </span>
                            </v-btn>
                          </v-flex>
                          <v-flex
                            v-if="item.shikaraStatus === 'Blocked'"
                            xs10
                            md12
                            lg11
                            pb-6
                            pt-3
                            align-self-center
                            @click="(unblockdialog = true), (shikaraId = item._id)"
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
          <v-layout wrap>
            <v-flex xs12 pt-10 pb-9 class="mainfont">
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
        <v-flex xs12 v-else>
          <v-layout pt-16 wrap>
            <v-flex xs12 text-center style="font-size: larger" class="mainfont">
              No data found!
            </v-flex>
          </v-layout>
        </v-flex>
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
                  Are you sure you want to block the Shikara?
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
                @click="unblockShikara(shikaraId)"
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
        appLoading: false,
        page: 1,
        pages: 0,
        tab: null,
        unblockdialog: false,
        totalLength:"",
  
        categoryarray: [],
        list: [],
        currentpage: 1,
        keyword: null,
        msg: null,
        currentPage: 1,
        searching: false,
  
        showSnackBar: false,
        dialog2: false,
      };
    },
    mounted() {
      this.appLoading = !this.keyword;
      this.getList();
    },
    watch: {
      keyword() {
        this.searching = true;
        this.getList();
      },
      currentPage() {
        this.getList();
      },
    },
  
    methods: {
      unblockShikara(shikaraId) {
        axios({
          method: "POST",
          url: "/shikara/unblock",
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            shikaraId: shikaraId,
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
        this.appLoading = !this.searching;
  
        axios({
          method: "GET",
          url: "/shikara/blockedlist",
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            keyword: this.keyword,
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
          this.totalLength = response.data.totalLength;

            this.pages = Math.ceil(this.totalData / response.data.limit);
          })
          .catch((err) => {
            this.ServerError = true;
            console.log(err);
          })
          .finally(() => {
            this.appLoading = false;
            this.searching = false;
          });
      },
    },
  };
  </script>
      
    