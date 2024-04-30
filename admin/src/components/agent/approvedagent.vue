<template>
  <div>
    <v-layout justify-center wrap>
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
        <v-layout pa-4 wrap justify-center class="mainfont">
          <v-flex
            xs10
            sm8
            lg10
            pt-6
            text-left
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
            Approved Agent&nbsp;({{ totalData }})
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
        <v-layout wrap v-if="list.length > 0" pa-2 justify-ceanter>
          <v-flex xs12>
            <v-layout wrap>
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
                      <v-layout wrap justify-center pb-3>
                        <v-flex xs12>
                          <v-layout wrap justify-center>
                            <v-flex xs11 pt-2>
                              <v-img
                                height="150px"
                                src="../../assets/Images/profile11.jpg"
                              ></v-img>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                        <v-flex xs12>
                          <v-layout wrap justify-center>
                            <v-flex xs11 pt-3>
                              <strong>Name:</strong> {{ item.name }}
                            </v-flex>
                            <v-flex xs11 pt-3>
                              <strong>Phone Number:</strong>
                              {{ item.phoneNumber }}
                            </v-flex>
                            <v-flex xs11>
                              <v-layout wrap justify-center>
                                <v-flex
                                  xs6
                                  pr-3
                                  pt-3
                                  @click="
                                    $router.push(
                                      '/agentdetailedview?id=' + item._id
                                    )
                                  "
                                >
                                  <v-btn block outlined color="#FF681F">
                                    <span
                                      style="
                                        color: #ff681f;
                                        text-transform: none;
                                        font-size: 12px;
                                      "
                                    >
                                      View
                                      <v-icon color="#FF681F"
                                        >mdi-arrow-right-thin</v-icon
                                      >
                                    </span>
                                  </v-btn>
                                </v-flex>
                                <v-flex
                                  pl-3
                                  xs6
                                  pt-3
                                  @click="
                                    $router.push('/agentedit?id=' + item._id)
                                  "
                                >
                                  <v-btn block outlined color="#FF681F">
                                    <span
                                      style="
                                        color: #ff681f;
                                        text-transform: none;
                                        font-size: 12px;
                                      "
                                    >
                                      Edit
                                      <v-icon size="90%" color="#FF681F"
                                        >mdi-pencil</v-icon
                                      >
                                    </span>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                            <v-flex xs11>
                              <v-layout wrap>
                                <v-flex
                                  v-if="item.verificationStatus === 'Verified'"
                                  xs6
                                  pr-3
                                  pt-3
                                  @click="
                                    (blockdialog = true), (userId = item._id)
                                  "
                                >
                                  <v-btn block outlined color="red">
                                    <span
                                      style="
                                        color: red;
                                        text-transform: none;
                                        font-size: 12px;
                                      "
                                    >
                                      Block
                                      <v-icon size="90%" color="red"
                                        >mdi-block-helper</v-icon
                                      >
                                    </span>
                                  </v-btn>
                                </v-flex>

                                <v-flex
                                  v-if="item.verificationStatus === 'Verified'"
                                  xs6
                                  pl-3
                                  pt-3
                                  @click="
                                    (deleteit = true), (userId = item._id)
                                  "
                                >
                                  <v-btn block outlined color="red">
                                    <span
                                      style="
                                        color: red;
                                        text-transform: none;
                                        font-size: 12px;
                                      "
                                    >
                                      Delete
                                      <v-icon size="90%" color="red"
                                        >mdi-delete</v-icon
                                      >
                                    </span>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-flex>
                </v-layout>
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
    </v-layout>

    <v-layout wrap v-if="list.length > 0">
      <v-flex xs12 pt-10 class="mainfont">
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
      v-model="blockdialog"
      max-width="600px"
    >
      <v-card>
        <v-layout wrap>
          <v-flex xs12>
            <v-card-title
              class="mainfont"
              style="color: black; font-size: 18px; font-weight: lighter"
            >
              Are you sure you want to block the Agent?
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            text
            @click="blockdialog = false"
            class="mainfont"
            >Cancel</v-btn
          >
          <v-btn color="red" class="mainfont" text @click="blockAgent(userId)"
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
              Are you sure you want to delete this agent?
            </v-card-title>
          </v-flex>
        </v-layout>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="deleteit = false" class="mainfont"
            >Cancel</v-btn
          >
          <v-btn color="red" class="mainfont" text @click="deleteAgent(userId)"
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
      blockdialog: false,
      appLoading: false,
      page: 1,
      pages: 0,
      dialog1: false,
      preview: null,
      deleteit: false,
      tab: null,
      barlist1: [],
      dialog3: false,
      deletedialog: false,
      minAmount: null,
      password: null,
      categoryarray: [],
      list: [],

      msg: null,
      currentPage: parseInt(this.getLocalStoragePage(), 10) || 1,
      keyword: "",

      showSnackBar: false,
      curid: [],
      dialog2: false,
    };
  },

  mounted() {
    this.getList();
  },
  watch: {
    keyword() {
      this.searching = true;
      this.currentPage = 1; // Reset currentPage to 1 when keyword changes
      this.getList();
    },
    currentPage(newPage) {
      this.setLocalStoragePage(newPage);
      this.getList();
    },
  },

  methods: {
    getLocalStoragePage() {
      return localStorage.getItem("paginationPage3");
    },
    setLocalStoragePage(value) {
      localStorage.setItem("paginationPage3", value);
    },
    deleteAgent(userId) {
      axios({
        method: "POST",
        url: "/agent/delete",
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
    blockAgent(userId) {
      axios({
        method: "POST",
        url: "/agent/block",
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
        url: "/agent/approveall",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          status: this.status,
          categoryId: this.categoryId,
          page: this.currentPage,
          fromDate: this.fromDate,
          toDate: this.toDate,
          keyword: this.keyword,

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
    
  