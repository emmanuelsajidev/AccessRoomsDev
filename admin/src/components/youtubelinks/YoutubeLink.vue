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
    <v-layout wrap pb-9 justify-center class="mainfont">
      <v-flex xs12>
        <v-layout wrap pr-1 pt-7 justify-center>
          <v-flex xs11 sm8 lg11 text-left>
            <span class="mainfont" style="font-size: 25px; font-weight: bolder"
              >YOUTUBE LINKS</span
            >
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 pt-5>
        <v-card>
          <v-layout wrap justify-center pa-4>
            <v-flex xs11>
              <span>Link</span>
              <v-text-field
                color="black"
                outlined
                background-color="white"
                dense
                type="text"
                v-model="list.link"
                hide-details
              >
              </v-text-field>
            </v-flex>

            <v-flex xs11 pt-7>
              <span>Heading</span>

              <v-text-field
                color="black"
                outlined
                background-color="white"
                dense
                type="text"
                v-model="list.name"
                hide-details
              >
              </v-text-field>
            </v-flex>

            <v-flex xs11 pt-7>
              <span>Content</span>

              <v-textarea
                color="black"
                outlined
                background-color="white"
                dense
                type="text"
                v-model="list.content"
                hide-details
              >
              </v-textarea>
            </v-flex>
            <v-flex xs12 sm11 lg2 pt-3>
              <v-btn
                block
                class="custombackground"
                dark
                width="160px"
                @click="add()"
                ><span
                  style="
                    font-family: mainfont;
                    font-size: 15px;
                    color: white;
                    letter-spacing: 1px;
                    cursor: pointer;
                  "
                  >SUBMIT
                </span>
                <v-icon dark size="15px"> mdi-plus </v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
  <script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      link: "",
      showSnackBar: false,
      deletedialog: false,
      content: "",

      ServerError: false,
      deleteDialog: false,
      timeout: 5000,

      msg: null,
      curid: [],
      dialog: false,
      editdialog: false,

      name: "",
      appLoading: false,
      dialogDelete: false,

      list: [],

      dialog2: false,
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
        this.msg = "Please enter  Heading";
        this.showSnackBar = true;
        return;
      } else if (!this.content) {
        this.msg = "Please enter  Content";
        this.showSnackBar = true;
        return;
      } else if (!this.link) {
        this.msg = "Please enter Link";
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
    addsub() {
      const selectedItem = this.list[this.selectedItemIndex];
      if (selectedItem) {
        axios({
          method: "POST",
          url: "/location/sub/add",
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            name: this.subname,
            locationId: selectedItem._id,
          },
        })
          .then((response) => {
            if (response.data.status == true) {
              location.reload();
            } else {
              this.msg = response.data.msg;
              this.showSnackBar = true;
            }
          })

          .catch((error) => {
            console.error("Error adding sublocation:", error);
          });
      }
    },

    getList() {
      this.appLoading = true;
      axios
        .get("/homepage/videolink/list", {
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

    add() {
      axios({
        method: "POST",
        url: "/homepage/videolink/add/edit",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          name: this.list.name,
          content: this.list.content,
          link: this.list.link,
        },
      })
        .then((response) => {
          if (response.data.status == true) {
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
    edit() {
      axios({
        method: "POST",
        url: "/homepage/videolink/edit",
        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          name: this.curid.name,
          id: this.curid._id,
          linkn: this.curid.link,

          content: this.curid.content,
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
        url: "/homepage/videolink/delete",
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