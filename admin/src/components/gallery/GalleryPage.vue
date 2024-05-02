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
        <v-layout wrap pt-7 justify-center>
          <v-flex xs11>
            <v-layout wrap>
              <v-flex xs11 lg10 text-left>
                <span
                  class="mainfont"
                  style="font-size: 25px; font-weight: bolder"
                  >POPULAR DESTINATION</span
                >
              </v-flex>
              <v-flex xs11 lg2 pb-5>
                <v-btn
                  block
                  class="custombackground"
                  dark
                  width="160px"
                  @click="dialog2 = true"
                  ><span
                    style="
                      font-family: mainfont;
                      font-size: 15px;
                      color: white;
                      letter-spacing: 1px;
                      cursor: pointer;
                    "
                    >Add
                  </span>
                  <v-icon dark size="15px"> mdi-plus </v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex v-if="list.length > 0" xs12>
        <v-layout pa-4 wrap>
          <v-flex
            class="mainfont"
            xs12
            sm4
            md4
            lg4
            xl3
            pt-3
            v-for="(item, i) in list"
            :key="i"
          >
            <v-layout wrap justify-center>
              <v-flex xs12 lg10>
                <v-card>
                  <v-layout wrap justify-center pt-3>
                    <v-flex xs11>
                      <v-layout wrap justify-start>
                        <v-flex xs12 v-if="item.photo">
                          <v-layout wrap justify-center>
                            <v-flex xs12>
                              <v-img
                                height="150px"
                                width="100%"
                                :src="mediaURLnewx + item.photo"
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
                    <v-flex xs12 sm8 lg12>
                      <v-layout wrap justify-center fill-height>
                        <v-flex xs11 lg11 pt-3 align-self-center text-center>
                          <strong> Name:</strong>
                          <span style="font-size: 14px">
                            {{ item.name }}
                          </span>
                        </v-flex>
                        <v-flex xs11 lg11 pt-3 align-self-center text-center style="text-align: justify;">
                          <strong> Description:</strong>
                          <span style="font-size: 14px">
                            {{ item.description.slice(0, 200) }}
                            <span style="font-weight: 600;">
                              ........

                            </span>
                          </span>
                        </v-flex>

                        <v-flex
                          xs11
                          lg11
                          pt-1
                          
                          align-self-center
                          style="text-align: justify"
                        >
                          <v-btn
                            @click="
                              $router.push(
                                '/GalleryDetailedview?id=' + item._id
                              )
                            "
                            color="#3E69B4"
                            block
                          >
                            <span style="color: white; text-transform: none"
                              >View Details</span
                            >&nbsp;
                            <v-icon color="white">mdi-eye</v-icon>
                          </v-btn>
                        </v-flex>
                        <v-flex xs11 lg11 pt-2  pb-3 align-self-center>
                          <v-layout wrap justify-center>
                            <v-flex xs12>
                              <v-btn
                                block
                                @click="handleEditClick(item)"
                                color="#FF681F"
                              >
                                <span
                                  style="color: white; text-transform: none"
                                >
                                  Edit
                                </span>
                                &nbsp;
                                <v-icon size="100%" color="white">
                                  mdi-pencil
                                </v-icon>
                              </v-btn>
                            </v-flex>
                            <!-- <v-flex xs4>
                                <v-btn
                                  @click="
                                    (deleteDialog = true), (deleteid = item._id)
                                  "
                                  outlined
                                  color="black"
                                  rounded
                                >
                                  <span
                                    style="color: black; text-transform: none"
                                  >
                                    Delete
                                  </span>
                                  &nbsp;
                                  <v-icon size="100%" color="red">
                                    mdi-delete
                                  </v-icon>
                                </v-btn>
                              </v-flex> -->
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
      <v-flex
        pt-6
        v-else
        xs12
        text-center
        style="font-size: larger"
        class="mainfont"
      >
        No data found!
      </v-flex>
      <v-dialog class="mainfont" v-model="deleteDialog" max-width="400">
        <v-card>
          <v-card-title>
            <span class="mainfont"> Delete Confirmation </span>
          </v-card-title>
          <v-card-text>
            <span class="mainfont"> Are you sure you want to delete? </span>
          </v-card-text>
          <v-card-actions>
            <v-layout wrap justify-center>
              <v-flex xs3>
                <v-btn
                  class="mainfont"
                  style="text-transform: none"
                  text
                  @click="deleteItem()"
                  >Yes</v-btn
                >
              </v-flex>
              <v-flex xs3>
                <v-btn
                  class="mainfont"
                  style="text-transform: none"
                  text
                  @click="deleteDialog = false"
                  >No</v-btn
                >
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        :retain-focus="true"
        persistent
        v-model="editdialog"
        max-width="550px"
      >
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

                <v-flex xs10 pt-4>
                  <span
                    class="mainfont"
                    style="color: black; font-size: 16px; font-weight: bold"
                    >Description</span
                  >
                  <v-form @submit.prevent="validateInput">
                    <v-textarea
                      color="black"
                      outlined
                      background-color="white"
                      dense
                      type="text"
                      v-model="curid.description"
                      hide-details
                    >
                    </v-textarea>
                  </v-form>
                </v-flex>

                <v-flex
                  xs10
                  pt-6
                  class="mainfont"
                  style="color: black; font-size: 16px; font-weight: bold"
                >
                  <ImageComp
                    @stepper="winStepper"
                    :height="'800'"
                    :width="'1300'"
                    :heading="'Upload Image'"
                    :componentType="'topImage'"
                  />
                </v-flex>

                <v-flex xs3 text-right pt-3>
                  <v-btn
                    block
                    class="custombackground"
                    dark
                    width="100px"
                    @click="edit()"
                  >
                    <span
                      class="mainfont"
                      style="color: white; font-size: 14px"
                    >
                      Edit
                    </span>
                    <v-icon size="15px" color="white">mdi-plus</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    

      <v-dialog
        :retain-focus="true"
        persistent
        v-model="dialog2"
        max-width="550px"
      >
        <v-card>
          <v-layout wrap justify-center>
            <v-flex
              ><v-layout wrap justify-center pa-3>
                <v-flex xs12 text-right>
                  <v-icon @click="dialog2 = false" color="red" size="150%" dark>
                    mdi-close
                  </v-icon>
                </v-flex>
                <v-flex xs10>
                  <span
                    class="mainfont"
                    style="color: black; font-size: 16px; font-weight: bold"
                    >Name
                  </span>
                  <v-form @submit.prevent="validateInput">
                    <v-text-field
                      color="black"
                      outlined
                      background-color="white"
                      dense
                      type="text"
                      v-model="name"
                      hide-details
                    >
                    </v-text-field>
                  </v-form>
                </v-flex>

                <v-flex xs10 pt-4>
                  <span
                    class="mainfont"
                    style="color: black; font-size: 16px; font-weight: bold"
                    >Description</span
                  >
                  <v-form @submit.prevent="validateInput">
                    <v-textarea
                      color="black"
                      outlined
                      background-color="white"
                      dense
                      type="text"
                      v-model="description"
                      hide-details
                    >
                    </v-textarea>
                  </v-form>
                </v-flex>

                <v-flex
                  xs10
                  pt-6
                  class="mainfont"
                  style="color: black; font-size: 16px; font-weight: bold"
                >
                  <ImageComp
                    @stepper="winStepper"
                    :height="'800'"
                    :width="'1300'"
                    :heading="'Upload Image'"
                    :componentType="'topImage'"
                  />
                </v-flex>

                <v-flex xs3 text-right pt-3>
                  <v-btn
                    block
                    class="custombackground"
                    dark
                    width="100px"
                    @click="validateFields()"
                  >
                    <span
                      class="mainfont"
                      style="color: white; font-size: 14px"
                    >
                      Add
                    </span>
                    <v-icon size="15px" color="white">mdi-plus</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
  <script>
import axios from "axios";
import ImageComp from "@/components/Common/singleImage";

export default {
  components: {
    ImageComp,
  },
  data() {
    return {
      showSnackBar: false,
      deletedialog: false,
      description: "",
      sub: false,
      ServerError: false,
      deleteDialog: false,
      timeout: 5000,
      prev: null,

      msg: null,
      curid: [],
      dialog: false,
      editdialog: false,

      name: "",
      appLoading: false,
      dialogDelete: false,
      search: "",
      itemname: "",
      addcat: false,
      list: [],
      coverImageFile: null,
      selectedFiles: [],
      image: null,
      role: null,
      coverImageArray: [],
      formDataCover: new FormData(),
      flagg: true,
      subname: null,
      menu: false,
      menu1: false,
      deleteid: "",
      menu2: false,
      menu22: false,
      formData2: new FormData(),
      empList2: null,
      toDate: null,
      fromDate: null,
      formData: new FormData(),
      formData3: new FormData(),
      empList3: null,
      search1: null,
      search2: null,
      search3: null,
      search11: null,
      id: "",
      search22: null,
      topImage: null,
      copyarray: [],
      searchInput: null,
      search33: null,
      keysearch: null,
      ffprojectList: null,
      dialog2: false,
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    };
  },
  computed: {},

  mounted() {
    this.getList();
  },
  watch: {
    currentPage() {
      this.getList();
    },
  },

  methods: {
    validateFields() {
      if (!this.name) {
        this.msg = "Please enter location name";
        this.showSnackBar = true;
        return;
      } else if (!this.description) {
        this.msg = "Please enter location description";
        this.showSnackBar = true;
        return;
      } else if (!this.topImage) {
        this.msg = "Please enter location image";
        this.showSnackBar = true;
        return;
      } else {
        this.add();
      }
    },
    handleEditClick(item) {
      this.curid = item;
      console.log("data is", this.curid);
      this.topImage = this.curid.photo;
      console.log("photo", this.topImage);

      this.editdialog = true;
    },
    addSubLocation(index) {
      this.selectedItemIndex = index;
      this.sub = true;
    },

    getList() {
      this.appLoading = true;
      axios
        .get("/gallery/list", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.appLoading = false;
          this.list = response.data.data;
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },

    winStepper(window_data) {
      if (window_data.type == "topImage") {
        this.topImage = window_data.selectedFiles;
      } else if (window_data.type == "image") {
        this.image = window_data.selectedFiles;
      } else if (window_data.type == "image") {
        this.imageArray = window_data.imageArray;
        this.imageFiles.push(window_data.selectedFiles);
      } else if (window_data.type == "imageRemoval") {
        var values = this.formData.getAll("photos");
        values.splice(window_data.removalItem, 1);
        this.formData.set("photos", values);
        this.imageArray = window_data.imageArray;
      }
    },
    add() {
      axios({
        method: "POST",
        url: "/gallery/add",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          name: this.name,
          description: this.description,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.id = response.data.data._id;
            this.submit();
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
    edit() {
      axios({
        method: "POST",
        url: "/gallery/edit",
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
            this.submitEdit();
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

    submitEdit() {
      this.formData3.append("id", this.curid._id);
      if (this.topImage) {
        this.formData3.append("photo", this.topImage);
      }
      axios({
        method: "POST",
        url: "/gallery/singleimageupload",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: this.formData3,
      })
        .then((response) => {
          if (response.data.status == true) {
            this.dialog2 = false;
            this.msg = response.data.msg;
            this.showSnackBar = true;
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
    deleteItem() {
      axios({
        method: "GET",
        url: "/location/delete",
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
            // location.reload();
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
    submit() {
      this.formData.append("id", this.id);
      this.formData.append("photo", this.topImage);
      axios({
        method: "POST",
        url: "/gallery/singleimageupload",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: this.formData,
      })
        .then((response) => {
          if (response.data.status == true) {
            this.dialog2 = false;
            this.msg = response.data.msg;
            this.showSnackBar = true;
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
  },
};
</script>
  <style >
.buttongrad {
  background: linear-gradient(to right, black, black);
}

.justified-text {
  text-align: justify;
}

.cus {
  background-color: #13736f;
}

.no-uppercase {
  text-transform: none !important;
}

.cus2 {
  background: var(
    --grend,
    linear-gradient(
      252deg,
      #e4ecee 0%,
      #9bc2c2 0%,
      #6ca6a5 28%,
      #157470 88%,
      #13736f 100%
    )
  );
}
</style>