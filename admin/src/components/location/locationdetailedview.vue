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
    <v-layout class="mainfont" wrap justify-center pb-10 pt-10>
      <v-flex xs11>
        <v-card>
          <v-layout wrap justify-center pr-4>
            <v-flex xs11 lg5 pt-6>
              <v-layout wrap justify-center>
                <v-flex xs12 v-if="list.photo">
                  <v-layout wrap justify-center>
                    <v-flex xs12>
                      <v-img
                        height="100%"
                        width="100%"
                        :src="mediaURLnewx + list.photo"
                      ></v-img>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 v-else>
                  <v-img
                    height="100%"
                    width="100%"
                    src="../../assets/Images/noimg.png"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs11 lg6 pt-5 pl-4 class="mainfont">
                <v-layout wrap pt-3 pr-3 pl-3 pb-6>
                  <v-flex xs12>
                    <strong>Location Name</strong>
                    {{ list.name }}
                  </v-flex>

                  <v-flex xs12 pt-6>
                    <strong>Description</strong>
                    {{ list.description }}
                  </v-flex>

                  <v-flex xs12 pt-6>
                    <strong>Added Date</strong>
                    {{ formatDate(list.create_date) }}
                  </v-flex>
                </v-layout>
            </v-flex>
          </v-layout>
          <v-layout wrap justify-center pb-10>
            <v-flex xs11>
              <v-layout wrap >
                <v-flex xs12 pt-3>
                  <v-layout wrap justify-center>
                    <v-flex xs12 text-center pt-4>
                      <v-layout wrap justify-center>
                        <v-flex xs12 lg12 style="border: 1px solid black">
                          <strong>SUBLOCATIONS</strong>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 lg12 style="border: 1px solid black">
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th>
                                <v-layout wrap justify-center>
                                  <v-flex xs4 lg4 text-center> Name </v-flex>
                                  <v-flex xs4 lg4 text-center> Edit </v-flex>
                                  <v-flex xs4 lg4 text-center> Delete </v-flex>
                                </v-layout>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, i) in sublocation" :key="i">
                              <td>
                                <v-layout wrap justify-center>
                                  <v-flex xs4 text-center>
                                    {{ item.name }}
                                  </v-flex>
                                  <v-flex
                                    xs4
                                    text-center
                                    style="text-transform: none"
                                  >
                                    <v-btn
                                      text
                                      @click="
                                        (editdialog = true), (curid = item)
                                      "
                                    >
                                      <span style="text-transform: none">
                                        Edit </span
                                      >&nbsp;

                                      <v-icon size="100%" color="blue"
                                        >mdi-pencil</v-icon
                                      >
                                    </v-btn>
                                  </v-flex>

                                  <v-flex
                                    xs4
                                    text-center
                                    style="text-transform: none"
                                  >
                                    <v-btn
                                      text
                                      @click="
                                        (deleteDialog = true),
                                          (deleteid = item._id)
                                      "
                                    >
                                      <span style="text-transform: none">
                                        Delete
                                      </span>

                                      <v-icon size="100%" color="red"
                                        >mdi-delete</v-icon
                                      >
                                    </v-btn>
                                  </v-flex>
                                </v-layout>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="editdialog" max-width="400">
      <v-card>
        <v-layout wrap justify-center>
          <v-flex
            ><v-layout wrap justify-center pa-3>
              <v-flex xs12 text-right>
                <v-icon
                  @click="editdialog = false"
                  color="red"
                  size="150%"
                  dark
                >
                  mdi-close
                </v-icon>
              </v-flex>
              <v-flex xs10>
                <span
                  class="mainfont"
                  style="color: black; font-size: 16px; font-weight: bold"
                  >Name</span
                >
                <v-form @submit.prevent="validateInput">
                  <v-text-field
                    color="black"
                    outlined
                    background-color="white"
                    dense
                    type="text"
                    v-model="curid.name"
                    hide-details
                  >
                  </v-text-field>
                </v-form>
              </v-flex>

              <v-flex xs3 text-right pt-3>
                <v-btn
                  block
                  class="custombackground"
                  dark
                  width="100px"
                  @click="editSublocation()"
                >
                  <span class="mainfont" style="color: white; font-size: 14px">
                    Edit
                  </span>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Confirmation</v-card-title>
        <v-card-text> Are you sure you want to delete? </v-card-text>
        <v-card-actions>
          <v-layout wrap justify-center>
            <v-flex xs3>
              <v-btn text @click="deleteItem()">Yes</v-btn>
            </v-flex>
            <v-flex xs3>
              <v-btn text @click="deleteDialog = false">No</v-btn>
            </v-flex>
          </v-layout>
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
      sublocation: [],
      userProfileTabs: null,
      subtab: null,
      appLoading: false,
      id: this.$route.query.id,
      preview: null,
      tab: null,
      list: [],
      curid: [],
      approve: false,
      deleteDialog: false,
      reject: false,
      editdialog: false,
      msg: null,
      showSnackBar: false,
    };
  },

  mounted() {
    this.getList();
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
      );
      return formattedDate;
    },
    editSublocation() {
      axios({
        method: "POST",
        url: "/location/sub/edit",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          name: this.curid.name,
          id: this.curid._id,
          description: this.curid.description,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.editdialog = false;
            this.msg = response.data.msg;
            this.showSnackBar = true;
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
    deleteItem() {
      axios({
        method: "GET",
        url: "/location/sub/delete",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          id: this.deleteid,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.deleteDialog = false;
            this.msg = response.data.msg;
            this.showSnackBar = true;
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
    getList() {
      this.appLoading = true;
      axios({
        method: "GET",
        url: "/location/full/details",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          locationId: this.id,
        },
      })
        .then((response) => {
          this.list = response.data.data;
          this.sublocation = response.data.sublocation;
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