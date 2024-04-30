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
        <v-layout wrap justify-center class="mainfont">
          <v-flex
            xs10
            sm4
            lg5
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
            HouseBoat Approved  ({{ totalLength }})
          </v-flex>
          <v-flex xs11 sm4 lg2 pt-6 pr-2>
            <v-autocomplete
              flat
              dense
              outlined
              :items="vendorlist"
              v-model="vendorname"
              item-text="name"
              label="Vendor"
              item-value="_id"
              style="border-radius: 0%"
              color="orange"
              class="custom-text-field"
              item-color="#FF1313"
              hide-details="auto"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs11 sm4 lg2 pt-6 pr-2>
            <v-autocomplete
              flat
              dense
              outlined
              :items="['Private', 'Sharing']"
              v-model="tripType"
              item-text="name"
              label="Trip Type"
              style="border-radius: 0%"
              color="orange"
              class="custom-text-field"
              item-color="#FF1313"
              hide-details="auto"
            ></v-autocomplete>
          </v-flex>
          <v-flex xs11 sm4 lg2 pt-6>
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
    <v-layout wrap>
      <v-flex xs12 v-if="list.length > 0">
        <v-layout wrap>
          <v-flex
            class="mainfont"
            xs12
            sm4
            md4
            lg4
            xl3
            v-for="(item, i) in list"
            :key="i"
            pt-5
          >
            <v-layout wrap justify-center pa-3>
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
                              >
                                <template v-slot:placeholder>
                                  <ImageLoader />
                                </template>
                              </v-img>
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
                    <v-flex style="font-size: 14px" xs12 sm12 lg12>
                      <v-layout wrap justify-center fill-height>
                        <v-flex xs11 lg11 pt-3 align-self-center>
                          <strong>House Boat Name:</strong>
                          {{ item.houseBoatName }}
                        </v-flex>
                        <v-flex xs11 lg11 pt-3 align-self-center>
                          <strong>Total Rooms:</strong> {{ item.totalRooms }}
                        </v-flex>

                        <v-flex xs11 lg11 pt-3 align-self-center v-if="item">
                          <span v-if="item.userid">
                            <strong>Vendor Name :</strong>
                            {{ item.userid.name }}
                          </span>
                        </v-flex>

                        <v-flex
                          xs11
                          md11
                          lg11
                          pt-5
                          align-self-center
                          @click="
                            (editcommisionDialog = true),
                              (comm = item.commissionPercentage),
                              (houseBoatId = item._id)
                          "
                        >
                          <v-btn block color="#FF681F">
                            <span style="color: white; text-transform: none">
                              Edit Commission Percentage

                              <v-icon color="white" size="90%"
                                >mdi-pencil
                              </v-icon>
                            </span>
                          </v-btn>
                        </v-flex>

                        <v-flex
                          xs11
                          md11
                          lg11
                          pt-5
                          align-self-center
                          @click="
                            $router.push(
                              '/houseboatapproveddetailed?id=' + item._id
                            )
                          "
                        >
                          <v-btn block color="#FF681F">
                            <span style="color: white; text-transform: none">
                              View more
                              <v-icon color="white"
                                >mdi-arrow-right-thin</v-icon
                              >
                            </span>
                          </v-btn>
                        </v-flex>

                        <v-flex xs11 md11 lg11 align-self-center>
                          <v-layout wrap>
                            <v-flex
                              pr-3
                              v-if="item.houseBoatStatus === 'Approved'"
                              xs6
                              pb-3
                              pt-3
                              align-self-center
                              @click="
                                (blockdialog = true), (houseBoatId = item._id)
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
                              pl-3
                              v-if="item.houseBoatStatus === 'Approved'"
                              xs6
                              pb-3
                              pt-3
                              align-self-center
                              @click="
                                (deletedialog = true), (houseBoatId = item._id)
                              "
                            >
                              <v-btn block color="red">
                                <span
                                  style="color: white; text-transform: none"
                                >
                                  Delete
                                  <v-icon color="white" size="90%"
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
                  Are you sure you want to block this houseboat?
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
                style="text-transform: none"
                >Cancel</v-btn
              >
              <v-btn
                color="red"
                class="mainfont"
                text
                style="text-transform: none"
                @click="blockHouseboat(houseBoatId)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          :retain-focus="true"
          persistent
          v-model="editcommisionDialog"
          max-width="450px"
        >
          <v-card>
            <v-layout wrap justify-center>
              <v-flex pt-2 xs10 text-center>
                <span style="font-family: mainfont"
                  >Edit Commision Percentage</span
                >
              </v-flex>
              <v-flex xs10 pt-4>
                <v-text-field
                  dense
                  v-model="comm"
                  hide-details="true"
                  outlined
                  class="mainfont"
                  style="color: black; font-size: 18px; font-weight: lighter"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="black"
                text
                style="text-transform: none"
                @click="editcommisionDialog = false"
                class="mainfont"
                >Cancel</v-btn
              >
              <v-btn
                color="red"
                class="mainfont"
                text
                style="text-transform: none"
                @click="editCommisionPercentage(houseBoatId)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          :retain-focus="true"
          persistent
          v-model="deletedialog"
          max-width="600px"
        >
          <v-card>
            <v-layout wrap>
              <v-flex xs12>
                <v-card-title
                  class="mainfont"
                  style="color: black; font-size: 18px; font-weight: lighter"
                >
                  Are you sure you want to delete this houseboat?
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="black"
                text
                style="text-transform: none"
                @click="deletedialog = false"
                class="mainfont"
                >Cancel</v-btn
              >
              <v-btn
                color="red"
                class="mainfont"
                text
                style="text-transform: none"
                @click="deleteHouseboat(houseBoatId)"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      comm: null,
      totalLength:"",
      editcommisionDialog: false,
      categoryarray: [],
      vendorlist: [],
      list: [],
      currentPage: this.getLocalStoragePage() || 1,
      keyword: null,
      msg: null,
      // currentPage: 1,
      vendorname: "",
      searching: false,
      blockdialog: false,
      tripType: "",
      showSnackBar: false,
      deletedialog: false,
      dialog2: false,
    };
  },
  mounted() {
    this.getVendor();
    this.appLoading = !this.keyword;
    this.getList();
    const storedPage = localStorage.getItem("paginationPage");
    if (storedPage) {
      this.currentPage = parseInt(storedPage, 10);
    }
  },
  watch: {
    vendorname() {
      this.searching = true;
      this.currentPage = 1; // Reset currentPage to 1 when keyword changes
      this.getList();
    },
    tripType() {
      this.searching = true;
      this.currentPage = 1; // Reset currentPage to 1 when keyword changes
      this.getList();
    },
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
    getVendor() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/vendor/name/list",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.vendorlist = response.data.data;
          this.appLoading = false;
        })

        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },

    getLocalStoragePage() {
      return localStorage.getItem("paginationPage");
    },
    setLocalStoragePage(value) {
      localStorage.setItem("paginationPage", value);
    },
    deleteHouseboat(houseBoatId) {
      axios({
        method: "GET",
        url: "admin/houseboat/delete",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          id: houseBoatId,
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

    editCommisionPercentage(houseBoatId) {
      axios({
        method: "POST",
        url: "houseboat/commission/edit",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          houseBoatId: houseBoatId,
          commissionPercentage: this.comm,
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
    blockHouseboat(houseBoatId) {
      axios({
        method: "POST",
        url: "/houseboat/block",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          houseBoatId: houseBoatId,
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
        url: "/houseboat/approvedlist",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          name: this.vendorname,
          houseBoatType: this.tripType,
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
this.totalLength = response.data.totalLength;
          this.totalData = response.data.totalLength;
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
    
  