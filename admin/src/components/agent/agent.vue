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
            Pending Agent&nbsp;({{totalData}})
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
      <v-flex xs12 v-if="list.length > 0">
        <v-layout wrap >
          <v-flex class="mainfont" xs12 sm4 lg3 v-for="(item, i) in list" :key="i" pt-8>
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
                          @click="
                            $router.push('/agentdetailedview?id=' + item._id)
                          "
                        >
                          <v-btn block color="#FF681F">
                            <span style="color: white;text-transform: none;">
                              View more
                              <v-icon color="white"
                                >mdi-arrow-right-thin</v-icon
                              >
                            </span>
                          </v-btn>
                        </v-flex>
                        <v-flex
                          xs11
                          pt-3
                          @click="
                                    (deleteit = true), (userId = item._id)
                                  "
                        >
                          <v-btn block color="red">
                            <span style="color: white;text-transform: none;">
                              Delete
                              <v-icon color="white" size="110%"
                                >mdi-delete</v-icon
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
          <v-flex xs12 pt-10  class="mainfont">
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
      <v-layout pt-16 v-else wrap>
        <v-flex xs12 text-center style="font-size: larger" class="mainfont">
          No data found!
        </v-flex>
      </v-layout>
    </v-layout>
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
      name: null,
      agentid:"",
      barlist: [],
      userProfileTabs: null,
      subtab: null,
      appLoading: false,
      page: 1,
      totalData:"",
      pages: 0,
      deleteit: false,
      preview: null,
      tab: null,
      keyword: "",

      barlist1: [],
      dialog3: false,
      deletedialog: false,
      minAmount: null,
      password: null,
      categoryarray: [],
      list: [],
      flag: false,
      flag2: false,
      auctionbased: [],
      currentpage: 1,
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      fromDate: null,
      toDate: null,
      fromDate2: null,
      toDate2: null,
      msg: null,
      currentPage: parseInt(this.getLocalStoragePage(), 10) || 1,


      showSnackBar: false,
      curid: [],
      dialog2: false,
    };
  },

  mounted() {
    this.getList();
  },
  
  watch: {
    currentPage(newPage) {
      this.setLocalStoragePage(newPage);
      this.getList();

    },
    keyword() {
      this.searching = true;
      this.currentPage = 1; // Reset currentPage to 1 when keyword changes
      this.getList();
    },
  },

  methods: {
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
    getLocalStoragePage() {
      return localStorage.getItem('paginationPage5');
    },
    setLocalStoragePage(value) {
      localStorage.setItem('paginationPage5', value);
    },
    getList() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/agent/pendingall",
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
    
  