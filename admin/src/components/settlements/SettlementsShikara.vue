<template>
  <div>
    <vue-element-loading
      :active="appLoading"
      :is-full-screen="true"
      background-color="#FFFFFF"
      color="#FF681F"
      spinner="spinner"
    />
    <ServerError v-if="ServerError" />
    <v-snackbar
      v-model="showsnackbar"
      color="rgba(0, 38, 53, 1)"
      right
      :timeout="timeout"
    >
      <v-layout wrap justify-center>
        <v-flex text-left class="align-self-center">
          <span style="color: white">
            {{ msg }}
          </span>
        </v-flex>

        <v-flex text-right>
          <v-btn small :ripple="false" text @click="showsnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap>
      <v-flex xs12>
        <v-layout wrap>
          <v-flex xs12>
            <v-layout wrap justify-center pa-0 pa-sm-4>
              <v-flex xs12>
                <v-layout wrap justify-center py-2>
                  <v-flex xs11 lg12 align-self-center text-left>
                    <span
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
                      >Shikara Settlement</span
                    >
                  </v-flex>
                  <v-flex xs12>
                    <v-layout wrap>
                      <v-flex pt-2 pl-lg-0 pl-2 xs11 sm4 lg2>
                        <v-menu
                          ref="menuvtwo"
                          v-model="menuvtwo"
                          :close-on-content-click="false"
                          :return-value.sync="fromdatecurrent"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="fromdatecurrent"
                              outlined
                              readonly
                              label=" From Date"
                              color="orange"
                              dense
                              hide-details="auto"
                              clearable
                              class="mainfont rounded-0"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="fromdatecurrent"
                            no-title
                            color="orange"
                            scrollable
                            @change="$refs.menuvtwo.save(fromdatecurrent)"
                          >
                            <v-spacer></v-spacer>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex pl-2 pt-2 xs11 sm4 lg2>
                        <v-menu
                          ref="menuvone"
                          v-model="menuvone"
                          :close-on-content-click="false"
                          :return-value.sync="todatecurrent"
                          transition="scale-transition"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="todatecurrent"
                              outlined
                              readonly
                              label=" To Date"
                              color="orange"
                              dense
                              hide-details="auto"
                              clearable
                              class="rounded-0 mainfont"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="todatecurrent"
                            no-title
                            color="orange"
                            :min="fromdatecurrent"
                            @change="$refs.menuvone.save(todatecurrent)"
                          >
                            <v-spacer></v-spacer>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs11 lg2 pt-2 pl-2>
                        <v-text-field
                          v-model="keywordcurrent"
                          outlined
                          dense
                          hide-details
                          clearable
                          color="orange"
                          label="Search "
                          class="mainfont"
                          style="border-radius: 0%"
                        >
                        </v-text-field>
                      </v-flex>
                      <v-flex xs11 sm6 md2 lg2 xl2 pl-2 pl-lg-3 pt-2 align-self-center>
                        <v-btn  class="downlink"
                  target="_blank"
                  @click="getExcel()"  color="#FF681F" block>
                          <v-icon color="white">mdi-download</v-icon>
                          <span style="color: white">Excel Report</span>
                        </v-btn>
                      </v-flex>

                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout
                  v-if="reportData.length > 0"
                  wrap
                  justify-space-around
                  pt-0
                  pt-sm-2
                >
                  <v-flex xs11 lg12 v-if="reportData">
                    <v-card tile class="pa-4 pa-sm-6">
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr class="mainfont">
                              <th class="text-left mainfont">No.</th>
                              <th class="text-left mainfont">Shikara Name</th>
                              <th class="text-left mainfont">
                                Agent/Customer Name
                              </th>
                              <th class="text-left mainfont">Booked By</th>
                              <th class="text-left mainfont">Check-In Date</th>
                              <th class="text-left mainfont">Check-In Time</th>
                              <th class="text-left mainfont">Check-Out Time</th>
                              

                              <th class="text-left mainfont">Total Amount</th>
                              <th class="text-left mainfont">
                                Shikara Total Amount
                              </th>
                              <th class="text-left mainfont">
                               Advance Amount
                              </th>
                              <th class="text-left mainfont">
                               Balance Amount
                              </th>

                              <th class="text-left mainfont">
                                Balance Amount Mode
                              </th>
                              <th class="text-left tablefont">
                                Balance Amount Status
                              </th>
                             
                              <th class="text-left tablefont">
                                Access Payment Balance
                              </th>
                              <th class="text-center mainfont">
                                Upload receipt
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(value, i) in reportData" :key="i">
                              <td class="mainfont">{{ i + 1 }}</td>
                              <td class="mainfont">
                                {{ value.shikaraid.shikaraName }}
                              </td>
                              <td class="mainfont">
                                <span v-if="value.customerDetails.name">
                                  {{ value.customerDetails.name }}
                                </span>
                                <span v-if="value.bookedbyid.companyName">
                                  ({{ value.bookedbyid.companyName }})
                                </span>
                              </td>
                              <td class="mainfont">
                                {{ value.bookedbyid.role }}
                              </td>
                              <td class="mainfont">
                                {{ formatDate(value.selectedDate) }}
                              </td>
                              <td class="mainfont">
                                {{ formatTimeNew(value.startTime) }}
                              </td>
                              <td class="mainfont">
                                {{ formatTimeNew(value.endTime) }}
                              </td>
                             

                              <td class="mainfont">Rs. {{ value.bookingTotal }}</td>

                              <td class="mainfont">
                                Rs. {{ value.vendorNetAmount }}
                              </td>
                              <td class="mainfont">
                                Rs. {{ parseInt(value.advance) }}
                              </td>
                              <td class="mainfont">
                                Rs. {{ value.postBookingamount }}
                                
                              </td>
                              

                              <td v-if="value" class="mainfont">
                                <span v-if="value.advancepaymentMode">
                                  {{ value.advancepaymentMode }}
                                </span>
                                <span v-else> Payment at Shikara </span>
                              </td>

                              <td class="mainfont" v-if="value.advancepaymentMode == 'Agent'">{{ value.balancepaymentStatus }}</td>
                              <td class="mainfont" v-else>-</td>
                              <td>
                                <span
                                  class="mainfont"
                                  v-if="value.vendorBalance"
                                >
                                  Rs. {{ value.vendorBalance }}
                                </span>
                                <span v-else class="mainfont"> 0 </span>
                              </td>

                              <td
                                v-if="value.accessPayReceipt"
                                class="mainfont"
                              >
                                <v-btn
                                  small
                                  color="#f17343"
                                  dark
                                  download
                                  target="_blank"
                                  :href="mediaURLnewx + value.accessPayReceipt"
                                >
                                  <v-icon color="white" size="140%"
                                    >mdi-eye</v-icon
                                  >
                                  <span
                                    style="
                                      font-size: 11px;
                                      text-transform: none;
                                    "
                                    >View Receipt
                                  </span>
                                </v-btn>
                              </td>
                              <td v-else>
                                <v-btn
                                  small
                                  color="#f17343"
                                  dark
                                  @click="(dialog = true), (itemid = value._id)"
                                >
                                  <v-icon color="white">mdi-upload</v-icon>
                                  <span
                                    style="
                                      font-size: 11px;
                                      text-transform: none;
                                    "
                                    >Upload Receipt
                                  </span>
                                </v-btn>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-layout wrap v-else>
                  <v-flex
                    pt-16
                    xs12
                    text-center
                    style="font-size: larger"
                    class="mainfont"
                  >
                    No data found!
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout wrap v-if="reportData">
              <v-flex xs12 pt-4 v-if="reportData.length > 0" class="mainfont">
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
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="mainfont">
            <v-card-title class="mainfont"> Upload Receipt </v-card-title>
            <v-card-text>
              <v-file-input
                label="Select a file"
                v-model="selectedFile"
              ></v-file-input>
            </v-card-text>
            <v-card-actions>
              <v-layout pb-4 wrap justify-center>
                <v-flex xs3>
                  <v-btn
                    color="primary"
                    @click="uploadReciept(itemid)"
                    style="text-transform: none"
                  >
                    Upload</v-btn
                  >
                </v-flex>
                <v-flex xs3>
                  <v-btn
                    color="red darken-1"
                    @click="closeDialog"
                    style="text-transform: none; color: antiquewhite"
                    >Cancel</v-btn
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
      showsnackbar: false,
      timeout: 2000,
      ServerError: false,
      appLoading: false,
      reportData: [],
      currentPage: 1,
      keywordcurrent: "",
      dialog: false,
      selectedFile: null,
      itemid: null,
      formData: new FormData(),

      fromdatecurrent: "",
      todatecurrent: "",
      triptype: "",

      menuvtwo: false,
      menuvone: false,

      msg: null,
      page: 1,
      limit: 20,
      deleteialog: false,
      deleteId: "",
      editialog: false,
      editItem: {},
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    currentPage() {
      this.getData();
    },
    page() {
      this.getData();
    },

    fromdatecurrent() {
      this.getData();
    },

    todatecurrent() {
      this.getData();
    },

    keywordcurrent() {
      this.getData();
    },
  },
  methods: {
    openFileDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      // Optional: Reset the selected file when the dialog is closed
      this.selectedFile = null;
    },
    uploadFile() {
      // Handle file upload logic here
      // You can use this.selectedFile to access the selected file
      console.log("File uploaded:", this.selectedFile);
      // Close the dialog
      this.closeDialog();
    },
    getExcel() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/download/excel/skbooking",
        headers: {
          token: localStorage.getItem("token"),
        },
        responseType:'blob',
        params: {
          tripType: this.triptype,
          keyword: this.keywordcurrent,
          fromDate: this.fromdatecurrent,
          toDate: this.todatecurrent,
          
        },
      })
        .then((response) => {
          this.appLoading = false;
          const url = URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.ms-excel"
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Settlement shikara.xlsx");
        document.body.appendChild(link);
        link.click();
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },
    uploadReciept(itemid) {
      this.formData.append("bookingId", itemid);
      this.formData.append("accessPayReceipt", this.selectedFile);
      axios({
        method: "POST",
        url: "/admin/upload/skaccesspayreceipt",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: this.formData,
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            this.dialog = true;
            location.reload();
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((err) => {
          this.ServerError = true;
          console.log(err);
        });
    },
    getData() {
      this.appLoading = true;
      axios({
        url: "/admin/shikara/settlement",
        method: "Post",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          limit: 12,
          tripType: this.triptype,
          keyword: this.keywordcurrent,
          fromDate: this.fromdatecurrent,
          toDate: this.todatecurrent,
          page: this.currentPage,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.reportData = response.data.data;
          this.totalData = response.data.totalLength;
          this.pages = Math.ceil(this.totalData / response.data.limit);
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    deleteBoat(id) {
      axios({
        url: "/houseboat/delete",
        method: "get",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          id: id,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.msg = response.data.msg;
            this.showsnackbar = true;
            this.deleteialog = false;
            this.deleteId = "";
            this.appLoading = false;
            this.getData();
          } else {
            this.msg = response.data.msg;
            this.showsnackbar = true;
          }
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
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
  },
};
</script>
    <style scoped>
.gr1 {
  background: linear-gradient(
    to bottom,
    rgba(255, 125, 20, 1),
    rgba(241, 115, 67, 1)
  );
}
</style>