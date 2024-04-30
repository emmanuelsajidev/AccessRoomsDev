<template>
    <div>
      <v-layout class="mainfont" wrap justify-center>
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
          color="#13736f"
          spinner="bar-fade-scale"
        />
        <v-flex xs12>
          <v-layout wrap justify-center>
            <v-flex xs2 pt-4 text-center>
              <span
                class="mainfont"
                style="color: black; font-size: 23px; font-weight: bolder"
              >
                Lots</span
              >
              <v-flex pl-8 xs10 align-self-center>
                <v-progress-linear
                  align-center
                  height="4"
                  color="#13736f"
                  value="100"
                  width="20%"
                ></v-progress-linear>
              </v-flex>
            </v-flex>
          </v-layout>
          <v-layout wrap pt-2>
            <v-flex xs1 style="border-bottom: 6px solid grey"></v-flex>
            <v-flex xs2 style="border-bottom: 6px solid #8bc34a"></v-flex>
            <v-flex xs6 style="border-bottom: 6px solid #13736f"></v-flex>
            <v-flex xs2 style="border-bottom: 6px solid #8bc34a"></v-flex>
            <v-flex xs1 style="border-bottom: 6px solid grey"></v-flex>
          </v-layout>
          <v-layout wrap pt-4 justify-end>
            <v-flex xs12 sm6 md3 pa-2>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    clearable
                    dense
                    outlined
                    label="From Date"
                    readonly
                    v-model="fromDate"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="from = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fromDate"
                  @change="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md3 pa-2>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    clearable
                    label="To Date"
                    readonly
                    dense
                    outlined
                    v-model="toDate"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="from = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="toDate"
                  @change="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout  justify-center wrap>
            <v-flex
              xs11
              align-self-center
          pb-10
              v-for="(item, i) in employeeList"
              :key="i"
            >
              <v-card class="bg8"    @click="$router.push('/LotDetailedview?id=' + item._id)">
                <v-layout wrap justify-center>
                  <v-flex xs2 class="custom">
                    <v-img
                   
                      style="cursor: pointer"
                      :src="mediaURL + item.categoryId.icon"
                    ></v-img>
                  </v-flex>
                  <v-flex pl-6 xs3 align-self-center>
                    <span class="mainfont" style="color: white; font-size: 16px"
                      >Lot Number
                    </span>
                    <span
                      class="mainfont"
                      style="color: white; font-size: 15px; font-weight: lighter"
                    >
                      -{{ item.lotNumber }}</span
                    >
                  </v-flex>
  
                  <v-flex xs3 align-self-center>
                    <span class="mainfont" style="color: white; font-size: 16px"
                      >Base Price
                    </span>
                    <span
                      class="mainfont"
                      style="color: white; font-size: 15px; font-weight: lighter"
                    >
                      -{{ item.expectedPrice }}</span
                    >
                  </v-flex>
  
                  <v-flex xs3 align-self-center>
                    <span class="mainfont" style="color: white; font-size: 16px"
                      >Total weight</span
                    >
                    <span
                      class="mainfont"
                      style="color: white; font-size: 15px; font-weight: lighter"
                    >
                      -{{ item.netWeight }}</span
                    >
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout pt-4 pb-12 wrap justify-center>
            <v-flex align-self-center>
              <div>
                <v-pagination
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                  :length="pages"
                  :total-visible="7"
                  v-model="currentPage"
                  color="#005f32"
                ></v-pagination>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </template>
    <script>
  //   import ImageComp from "./singleImage";
  import axios from "axios";
  export default {
    data() {
      return {
        test: null,
        showSnackBar: false,
  
        ServerError: false,
        timeout: 5000,
  
        msg: null,
        pages: 0,
        dialog: false,
        editdialog: false,
        editingitem: [],
        name: "",
        pageCount: 1,
        appLoading: false,
        editedIndex: -1,
        currentPage: 1,
        g: false,
        perPage: 4,
        totalData: 0,
  
        totalRows: 0,
        dialogDelete: false,
        search: "",
        itemname: "",
        addcat: false,
        statusList: [
          {
            name: "On Probation",
          },
          {
            name: "Confirmed",
          },
        ],
        rules: {
          required: (value) => !!value || "Required.",
        },
        employeeList: [],
        data: [],
        coverImageFile: null,
        selectedFiles: [],
        image: null,
        role: null,
        coverImageArray: [],
        formDataCover: new FormData(),
        flagg: true,
        user: {
          dob: new Date(),
          dateofjoining: new Date(),
        },
  
        menu: false,
        menu1: false,
        menu2: false,
        menu22: false,
  
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        roleRules: [(v) => !!v || "Role is required"],
        phnoRules: [
          (v) => !!v || "Phone is required",
          (v) => v.length < 11 || "Invalid Phone",
          (v) =>
            /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.test(v) ||
            "Phone is invalid",
        ],
        departmentList: [],
        projectList: null,
        positionList: null,
        project: null,
        department: null,
        empList1: null,
        empList2: null,
        toDate: null,
        fromDate: null,
        empList3: null,
        search1: null,
        search2: null,
        search3: null,
        search11: null,
        search22: null,
        searchInput: null,
        search33: null,
        keysearch: null,
        ffprojectList: null,
        picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        ffproject: null,
        ffdepartmentList: null,
        ffdepartment: null,
        ffpositionList: null,
        ffposition: null,
        moreFilter: false,
      };
    },
    components: {
      //   ImageComp,
    },
    watch: {
      currentPage() {
        this.getData();
      },
      fromDate() {
        this.currentPage = 1;
        this.getData();
      },
      toDate() {
        this.currentPage = 1;
        // if (this.fromDate)
        this.getData();
      },
    },
    computed: {},
  
    mounted() {
      // this.getUsers("");
  
      this.getData();
    },
  
    methods: {
      winStepper(window_data) {
        if (window_data.type == "coverImage") {
          this.coverImageFile = window_data.selectedFiles;
        }
      },
  
      getData() {
        this.appLoading = true;
        axios
          .get("/admin/lot/list", {
            headers: {
              token: localStorage.getItem("token"),
            },
            params: {
              keyword: this.keysearch,
              page: this.currentPage,
              fromDate: this.fromDate,
              toDate: this.toDate,
              limit: 10,
            },
          })
          .then((response) => {
            this.appLoading = false;
            this.employeeList = response.data.data;
            this.totalData = response.data.totalLength;
            this.pages = Math.ceil(this.totalData / response.data.limit);
          })
          .catch((err) => {
            this.appLoading = false;
            this.ServerError = true;
            console.log(err);
          });
      },
      dialogclose() {
        this.name = null;
        this.dialog = false;
      },
  
      uploadCoverImages(id) {
        this.flagg = false;
        this.appLoading = true;
        this.formDataCover.append("photo", this.coverImageFile);
        axios({
          method: "POST",
          url: "/employee/photo/upload/" + id,
          data: this.formDataCover,
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": localStorage.getItem("token"),
          },
        })
          .then((response) => {
            this.appLoading = false;
            if (response.data.status == true) {
              this.formDataCover = new FormData();
              this.msg = response.data.msg;
            } else {
              this.msg = "Can't Upload Profile Image.. Please Try Again Later";
              this.showSnackBar = true;
              this.formDataCover = new FormData();
            }
            this.getData();
            this.flagg = true;
          })
          .catch((err) => {
            this.appLoading = false;
            this.msg = "Can't Upload Profile Image.. Please Try Again Later";
            this.showSnackBar = true;
            console.log(err);
          });
      },
      editcat(item) {
        // this.getUsers(item._id);
        this.getUsers1();
        this.getUsers2();
        this.getUsers3();
        this.department = null;
        this.project = null;
        var deptAr = [],
          projAr = [];
        this.editingitem = item;
        if (this.editingitem.dob) {
          this.editingitem.dob = this.editingitem.dob.slice(0, 10);
  
          this.getAge(this.editingitem.dob);
        }
        if (this.editingitem.dateofjoining) {
          this.editingitem.dateofjoining = this.editingitem.dateofjoining.slice(
            0,
            10
          );
        }
        // for (let i = 0; i < this.editingitem.positionid.length; i++) {
        //   if (this.editingitem.positionid[i].type == "Department") {
        // deptAr = this.editingitem.positionid[i].department;
        //   deptAr.push(this.editingitem.positionid[i].department);
        // }
        // if (this.editingitem.positionid[i].type == "Project") {
        //   projAr.push(this.editingitem.positionid[i].project);
        // }
        // }
        this.department = deptAr;
        this.project = projAr;
        console.log("Proj", this.project);
        console.log("dept", this.department);
        this.editdialog = true;
      },
  
      validateEdit() {
        if (!this.editingitem.employeeId) {
          this.msg = "Please provide employee id";
          this.showsnackbar = true;
          return;
        } else if (!this.editingitem.name) {
          this.msg = "Please provide employee name";
          this.showsnackbar = true;
          return;
        } else if (!this.editingitem.email) {
          this.msg = "Please provide email";
          this.showsnackbar = true;
          return;
        } else if (!this.editingitem.phonenumber) {
          this.msg = "Please provide employee phone no.";
          this.showsnackbar = true;
          return;
        } else if (!this.editingitem.address) {
          this.msg = "Please provide employee address";
          this.showsnackbar = true;
          return;
        } else if (!this.editingitem.gender) {
          this.msg = "Please provide gender";
          this.showsnackbar = true;
          return;
        }
        //  else if (!this.department) {
        //    this.msg = "Please provide department";
        //    this.showsnackbar = true;
        //    return;
        //  }
        else if (!this.editingitem.positionid) {
          this.msg = "Please provide position";
          this.showsnackbar = true;
          return;
        } else {
          this.edit();
        }
      },
      edit() {
        // console.log("this.editingitem==",this.editingitem)
        this.editingitem.id = this.editingitem._id;
        // data["name"] = this.editingitem.name;
        this.editingitem.positionid = this.test;
        this.editingitem.departmentid = this.department;
        this.editingitem.role = this.role;
  
        this.editingitem.projectid = this.editingitem.projects;
        console.log("this.editingitem NEW== ", this.editingitem);
        axios({
          url: "/employee/edit/v2",
          method: "POST",
          data: this.editingitem,
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
          .then((response) => {
            this.editdialog = false;
            this.appLoading = false;
            if (response.data.status) {
              if (this.coverImageFile) {
                this.uploadCoverImages(this.editingitem._id);
              }
              this.msg = "Edited Sucessfully";
              this.showsnackbar = true;
              this.getData();
            } else {
              this.msg = response.data.msg;
              this.showsnackbar = true;
              this.getData();
            }
          })
          .catch((err) => {
            this.appLoading = false;
            this.ServerError = true;
            console.log(err);
          });
      },
    },
  };
  </script>
    