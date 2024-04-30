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
      v-model="showSnackbar"
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
          <v-btn small :ripple="false" text @click="showSnackbar = false">
            <v-icon style="color: white">mdi-close</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-snackbar>
    <v-layout wrap justify-center class="mainfont">
      <v-flex xs12 align-self-center>
        <v-card tile class="pa-4">
          <v-layout wrap>
            <v-flex xs12 v-if="HouseboatData">
              <v-img
                cover
                height="400px"
                v-if="HouseboatData.coverImage"
                :src="mediaURLnewx + HouseboatData.coverImage"
                ><template v-slot:placeholder>
                  <ImageLoader />
                </template>
                <v-layout justify-start fill-height>
                  <v-flex xs3 sm2 align-self-end mb-4 ml-1 ml-sm-8>
                    <v-card
                      height="110px"
                      width="150px"
                      class="pa-1 hidden-sm-and-down"
                      v-if="HouseboatData.propertyImages"
                    >
                      <v-img
                        height="100%"
                        width="100%"
                        v-if="HouseboatData.propertyImages.length > 0"
                        :src="mediaURLnewx + HouseboatData.propertyImages[0]"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                      <v-img
                        height="100%"
                        v-else
                        src="./../../assets/Images/noimg.png"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                    </v-card>
                    <v-card
                      class="pa-1 hidden-md-and-up"
                      height="50px"
                      width="60px"
                      v-if="HouseboatData.propertyImages"
                    >
                      <v-img
                        height="100%"
                        width="100%"
                        v-if="HouseboatData.propertyImages.length > 0"
                        :src="mediaURLnewx + HouseboatData.propertyImages[0]"
                        contain
                      ></v-img>
                      <v-img
                        height="100%"
                        v-else
                        src="./../../assets/Images/noimg.png"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex xs7 sm8 align-self-end mb-4 pl-2 pl-sm-0>
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 500;
                        font-size: 22px;
                        color: white;
                      "
                      v-if="HouseboatData.houseBoatName"
                      >{{ HouseboatData.houseBoatName }}</span
                    >
                    <br class="hidden-sm-and-up" />
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 400;
                        font-size: 16px;
                        color: white;
                      "
                      v-if="HouseboatData.location"
                      >({{ HouseboatData.location.name }})</span
                    >
                    <br />
                    <span
                      class="px-2 py-1"
                      style="
                        border-radius: 5px;
                        font-family: mainfont;
                        font-weight: 500;
                        font-size: 10px;
                        color: white;
                        background-color: rgba(60, 187, 205, 1);
                      "
                      v-if="HouseboatData.category"
                      >{{ HouseboatData.category }}</span
                    >
                  </v-flex>
                  <v-flex xs2 align-self-end text-right mb-4 pr-8>
                    <v-btn
                      style="border-radius: 2px"
                      class="hidden-sm-and-down"
                      color="#FF681F"
                      @click="
                        $router.push('/houseboatedit?id=' + $route.query.id)
                      "
                    >
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 600;
                          font-size: 15px;
                          color: white;
                        "
                        >Edit</span
                      >
                    </v-btn>
                    <v-btn
                      class="hidden-md-and-up"
                      style="border-radius: 2px"
                      text
                      @click="
                        $router.push('/houseboatedit?id=' + $route.query.id)
                      "
                    >
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 600;
                          font-size: 15px;
                          color: white;
                        "
                        ><v-icon>mdi-pencil</v-icon></span
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-img>
              <v-img
                v-else
                width="1251px"
                :height="
                  $vuetify.breakpoint.name == 'xs' ||
                  $vuetify.breakpoint.name == 'sm'
                    ? '600px'
                    : $vuetify.breakpoint.name == 'md'
                    ? '600px'
                    : $vuetify.breakpoint.name == 'lg'
                    ? '300px'
                    : '300px'
                "
                src="./../../assets/Images/noimg.png"
              >
                <v-layout justify-start fill-height>
                  <v-flex xs12 sm2 align-self-end mb-4 ml-4>
                    <v-card class="pa-1" height="110px" width="110px">
                      <v-img
                        height="110px"
                        cover
                        v-if="HouseboatData.propertyImages"
                        :src="mediaURLnewx + HouseboatData.propertyImages[0]"
                        contain
                        ><template v-slot:placeholder>
                          <ImageLoader /> </template
                      ></v-img>
                    </v-card>
                  </v-flex>
                  <v-flex xs8 align-self-end mb-4>
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 500;
                        font-size: 22px;
                        color: white;
                      "
                      v-if="HouseboatData.houseBoatName"
                      >{{ HouseboatData.houseBoatName }}</span
                    >
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 400;
                        font-size: 16px;
                        color: white;
                      "
                      v-if="HouseboatData.location"
                      >({{ HouseboatData.location.name }})</span
                    >
                    <br />
                    <span
                      class="px-2 py-1"
                      style="
                        border-radius: 5px;
                        font-family: mainfont;
                        font-weight: 500;
                        font-size: 10px;
                        color: white;
                        background-color: rgba(60, 187, 205, 1);
                      "
                      v-if="HouseboatData.category"
                      >{{ HouseboatData.category }}</span
                    >
                  </v-flex>
                  <v-flex
                    xs12
                    class="hidden-sm-and-down"
                    sm2
                    align-self-end
                    text-left
                    text-sm-right
                    mb-4
                    pr-8
                  >
                    <v-btn
                      style="border-radius: 2px"
                      color="#FF681F"
                      @click="
                        $router.push('/houseboatedit?id=' + $route.query.id)
                      "
                    >
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 600;
                          font-size: 15px;
                          color: white;
                        "
                        >Edit</span
                      >
                    </v-btn>
                  </v-flex>
                  <v-flex
                    xs2
                    class="hidden-md-and-up"
                    align-self-end
                    text-right
                    mb-4
                    pr-8
                  >
                    <v-btn
                      style="border-radius: 2px"
                      text
                      @click="
                        $router.push('/HouseboatGallery?id=' + $route.query.id)
                      "
                    >
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 600;
                          font-size: 15px;
                          color: white;
                        "
                        ><v-icon>mdi-pencil</v-icon></span
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-img>
            </v-flex>
          </v-layout>
          <v-layout
            justify-center
            justify-sm-start
            wrap
            style="background-color: rgba(245, 242, 240, 1)"
            pa-0
            pa-sm-4
            my-4
          >
            <v-flex xs12 sm2 align-self-center text-center>
              <span
                style="
                  font-family: mainfont;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(144, 144, 144, 1);
                  text-transform: uppercase;
                "
                >Category</span
              >
              <br />
              <span
                style="
                  font-family: mainfont;
                  font-weight: 600;
                  font-size: 15px;
                  color: rgba(64, 64, 64, 1);
                "
                v-if="HouseboatData.category"
              >
                {{ HouseboatData.category }}</span
              >
            </v-flex>
            <v-flex xs12 sm2 align-self-center text-center>
              <span
                style="
                  font-family: mainfont;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(144, 144, 144, 1);
                  text-transform: uppercase;
                "
                >Total Rooms</span
              >
              <br />
              <span
                style="
                  font-family: mainfont;
                  font-weight: 600;
                  font-size: 15px;
                  color: rgba(64, 64, 64, 1);
                "
                v-if="HouseboatData.totalRooms"
              >
                {{ HouseboatData.totalRooms }}</span
              >
            </v-flex>
            <v-flex xs12 sm2 align-self-center text-center>
              <span
                style="
                  font-family: mainfont;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(144, 144, 144, 1);
                  text-transform: uppercase;
                "
                v-if="HouseboatData.expiryType == 'licenseExpiry'"
                >License expiry</span
              >
              <span
                style="
                  font-family: mainfont;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(144, 144, 144, 1);
                  text-transform: uppercase;
                "
                v-if="HouseboatData.expiryType == 'insuranceExpiry'"
                >Insurance expiry</span
              >
              <br />
              <span
                style="
                  font-family: mainfont;
                  font-weight: 600;
                  font-size: 15px;
                  color: rgba(64, 64, 64, 1);
                "
                v-if="HouseboatData.expiryDate"
              >
                {{ formatDate(HouseboatData.expiryDate) }}</span
              >
            </v-flex>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-flex
              xs4
              sm2
              md1
              class="ma-1 ma-sm-0 ma-md-1"
              align-self-center
              text-left
              text-sm-center
              v-if="HouseboatData.fullImage"
            >
              <v-img
                v-if="HouseboatData.fullImage"
                height="90px"
                width="100px"
                :src="mediaURLnewx + HouseboatData.fullImage"
                ><template v-slot:placeholder> <ImageLoader /> </template
              ></v-img>
            </v-flex>
            <v-flex
              xs4
              sm2
              md1
              class="ma-1 ma-sm-0 ma-md-1"
              align-self-center
              text-center
              v-if="HouseboatData.interiorImage"
            >
              <v-img
                v-if="HouseboatData.interiorImage"
                height="90px"
                width="100px"
                :src="mediaURLnewx + HouseboatData.interiorImage"
                ><template v-slot:placeholder> <ImageLoader /> </template
              ></v-img>
            </v-flex>
            <v-flex
              xs4
              sm2
              md1
              class="ma-1 ma-sm-0 ma-md-1"
              align-self-center
              text-center
              v-if="HouseboatData.roomImage"
            >
              <v-img
                v-if="HouseboatData.roomImage[0]"
                height="90px"
                width="100px"
                :src="mediaURLnewx + HouseboatData.roomImage[0]"
                ><template v-slot:placeholder> <ImageLoader /> </template
              ></v-img>
            </v-flex>
            <v-flex
              xs5
              sm2
              md1
              class="ma-1 ma-sm-0 ma-md-1"
              align-self-center
              text-center
              v-if="HouseboatData.upperImage"
            >
              <v-img
                v-if="HouseboatData.upperImage"
                height="90px"
                width="100px"
                :src="mediaURLnewx + HouseboatData.upperImage"
                ><template v-slot:placeholder> <ImageLoader /> </template
              ></v-img>
            </v-flex>
            <v-flex
              xs12
              sm1
              v-if="moreimg == true"
              class="mr-2"
              align-self-center
              text-center
            >
              <span
                style="
                  font-family: mainfont;
                  font-weight: 600;
                  font-size: 10px;
                  color: rgba(241, 115, 67, 1);
                  cursor: pointer;
                "
                @click="$router.push('/ImageGallery?id=' + $route.query.id)"
                >View All <v-icon small>mdi-arrow-right</v-icon></span
              ></v-flex
            >
          </v-layout>

          <v-layout wrap justify-start>
            <v-flex xs12 sm12 text-left>
              <v-layout wrap v-if="HouseboatData">
                <v-flex xs12 sm2 md3 align-self-center text-left px-2>
                  <span
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Pickup/Drop Location :</span
                  ><br />
                  <span
                    v-if="HouseboatData.startingLocation"
                    style="
                      font-family: mainfont;
                      font-weight: 300;
                      font-size: 16px;
                      color: black;
                    "
                  >
                    {{ HouseboatData.startingLocation.name }}</span
                  >
                  <span v-else>-</span>
                </v-flex>
                <v-flex xs12 sm2 md3>
                  <v-rating
                    :length="5"
                    :size="18"
                    v-model="HouseboatData.rating"
                    active-color="#ff6200"
                    color="#ff6200"
                    background-color="#ff6200"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 lg10>
              <v-layout wrap mt-2 v-if="FacilitiesData">
                <v-flex
                  xs12
                  px-0
                  px-md-2
                  style="
                    font-family: mainfont;
                    font-weight: 400;
                    font-size: 22px;
                  "
                  >Facilities</v-flex
                >
                <v-flex xs12 px-0 px-md-2 v-if="Isfacility == false"
                  ><span
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No facilities added</span
                  ></v-flex
                >
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.airCondition == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/ac.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Air condition</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.wifi == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/wifi.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Wifi</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.television == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/tv.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Smart TV</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.lifeJacket == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/lifejacket.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Life Jacket</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.swimmingPool == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/swimmingpool.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Swimming pool</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.kettle == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/kettle.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Kettle</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.parking == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/parking.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Parking</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.restrooms == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/restroom.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Restroom</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.fireextinguisher == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/fire.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Fire extinguisher</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
                <v-flex
                  xs12
                  sm3
                  py-1
                  pr-2
                  text-left
                  v-if="FacilitiesData.powerbackup == true"
                >
                  <v-layout wrap>
                    <v-flex xs2>
                      <v-img
                        height="20px"
                        contain
                        src="./../../assets/icons/battery.png"
                      ></v-img>
                    </v-flex>
                    <v-flex xs10
                      ><span
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 16px;
                        "
                        >Power backup</span
                      ></v-flex
                    >
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 lg2 align-self-start>
              <v-layout wrap justify-start justify-lg-center pl-4 pl-md-0>
                <v-flex text-center pt-4>
                  <v-card>
                    <v-layout wrap pa-1>
                      <v-flex xs12> View</v-flex>
                      <v-flex
                        xs12
                        pa-2
                        sm3
                        lg12
                        text-center
                        v-if="HouseboatData.boatLicenseProof"
                      >
                        <v-btn
                          color="rgba(255, 98, 0, 1)"
                          small
                          block
                          dark
                          download
                          :href="mediaURLnewx + HouseboatData.boatLicenseProof"
                          target="_blank"
                        >
                          <v-icon small>mdi-file-outline</v-icon
                          ><span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 16px;
                              text-transform: none;
                            "
                            >Boat License
                          </span></v-btn
                        >
                      </v-flex>

                      <v-flex
                        xs12
                        pa-2
                        sm3
                        lg12
                        text-center
                        v-if="HouseboatData.leaseProof"
                      >
                        <v-btn
                          color="rgba(255, 98, 0, 1)"
                          small
                          block
                          dark
                          download
                          :href="mediaURLnewx + HouseboatData.leaseProof"
                          target="_blank"
                        >
                          <v-icon small>mdi-file-outline</v-icon
                          ><span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 16px;
                              text-transform: none;
                            "
                            >Lease Proof</span
                          ></v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
                <v-flex text-center pt-4>
                  <v-card>
                    <v-layout wrap pa-1>
                      <v-flex xs12> Edit</v-flex>
                      <v-flex xs12 pa-2 sm3 lg12 text-center>
                        <v-btn
                          color="rgba(255, 98, 0, 1)"
                          small
                          block
                          dark
                          @click="openFileUploadDialog"
                        >
                          <v-icon small>mdi-file-upload-outline</v-icon
                          ><span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 16px;
                              text-transform: none;
                            "
                            >Boat License</span
                          ></v-btn
                        >

                        <v-dialog v-model="fileUploadDialog" max-width="500">
                          <v-card>
                            <v-card-title class="mainfont">
                              <v-layout wrap>
                                <v-flex xs12 pt-1 pb-2>
                                  Edit Boat License
                                </v-flex>
                              </v-layout>
                            </v-card-title>
                            <v-card-text>
                              <!-- File input for selecting a file -->
                              <input
                                class="mainfont"
                                type="file"
                                ref="fileInput"
                                @change="handleFileChange"
                              />
                            </v-card-text>
                            <v-card-actions class="mainfont">
                              <v-layout wrap justify-center>
                                <v-flex xs3 pr-3 pb-3>
                                  <v-btn
                                    color="rgba(255, 98, 0, 1)"
                                    block
                                    style="text-transform: none"
                                    @click="editHouseboatproof()"
                                  >
                                    <span style="color: white"> Upload </span>
                                  </v-btn>
                                </v-flex>
                                <v-flex xs3 pl-3 pb-3>
                                  <v-btn
                                    color="rgba(255, 98, 0, 1)"
                                    block
                                    style="text-transform: none"
                                    @click="closeFileUploadDialog"
                                  >
                                    <span style="color: white"> Close </span>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-dialog v-model="fileUploadDialog2" max-width="500">
                          <v-card>
                            <v-card-title class="mainfont">
                              <v-layout wrap>
                                <v-flex xs12 pt-1 pb-2>
                                  Edit Lease Proof
                                </v-flex>
                              </v-layout>
                            </v-card-title>
                            <v-card-text>
                              <!-- File input for selecting a file -->
                              <input
                                type="file"
                                ref="fileInput2"
                                @change="handleLeaseProofChange"
                              />
                            </v-card-text>
                            <v-card-actions class="mainfont">
                              <v-layout wrap justify-center>
                                <v-flex xs3 pr-3 pb-3>
                                  <v-btn
                                    color="rgba(255, 98, 0, 1)"
                                    @click="uploadLeaseProof"
                                  >
                                    <span
                                      style="color: white; text-transform: none"
                                    >
                                      Upload
                                    </span>
                                  </v-btn>
                                </v-flex>
                                <v-flex xs3 pl-3 pb-3>
                                  <v-btn
                                    color="rgba(255, 98, 0, 1)"
                                    @click="closeFileUploadDialog2"
                                  >
                                    <span
                                      style="color: white; text-transform: none"
                                    >
                                      Close
                                    </span>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-flex>

                      <v-flex
                        xs12
                        pa-2
                        sm3
                        lg12
                        text-center
                        v-if="HouseboatData.leaseProof"
                      >
                        <v-btn
                          @click="fileUploadDialog2 = true"
                          color="rgba(255, 98, 0, 1)"
                          small
                          block
                          dark
                          target="_blank"
                        >
                          <v-icon small>mdi-file-upload-outline</v-icon
                          ><span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 16px;
                              text-transform: none;
                            "
                            >Lease Proof</span
                          ></v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-tabs
            v-if="isTrip == true"
            v-model="tab"
            background-color="transparent"
            color="rgba(255, 98, 0, 1)"
            grow
          >
            <v-tab v-if="HouseboatData.isDayCriuse == true">
              <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: mainfont;
                  font-weight: 400;
                  font-size: 16px;
                "
                >Day Cruise</span
              >
            </v-tab>
            <v-tab v-if="HouseboatData.isOverNight == true">
              <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: mainfont;
                  font-weight: 400;
                  font-size: 16px;
                "
                >Over Night</span
              >
            </v-tab>
            <v-tab v-if="HouseboatData.isNightStay == true">
              <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: mainfont;
                  font-weight: 400;
                  font-size: 16px;
                "
                >Night Stay</span
              >
            </v-tab>
            <v-tab-item
              v-if="HouseboatData.isDayCriuse == true"
              style="background-color: white"
            >
              <v-card color="basil" flat>
                <!-- <v-card-text> -->
                <!-- <v-layout wrap justify-end>
                    <v-flex xs1 text-right @click="(EditTrip1=true),(editItem1=Item1)">
                      <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: mainfont;
                  font-weight: 400;
                  font-size: 16px;
                "
                ><v-icon color="rgba(255, 98, 0, 1)" small>mdi-pencil</v-icon>Edit</span
              >
                    </v-flex>
                  </v-layout> -->
                <v-layout wrap justify-start pt-4 v-if="Item1.addionalRules">
                  <v-flex
                    xs12
                    px-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Additional rules</v-flex
                  >
                  <v-flex xs12 py-1 px-2 text-left v-if="Item1.addionalRules">
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 300;
                        font-size: 16px;
                        color: black;
                      "
                    >
                      {{ Item1.addionalRules }}
                    </span>
                  </v-flex>
                </v-layout>
                <v-layout wrap mt-2 v-if="Item1.mealPlan">
                  <v-flex
                    xs12
                    px-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Meal plan</v-flex
                  >
                  <v-flex xs12 v-if="IsMealplan == false"
                    ><span
                      style="
                        font-family: mainfont;
                        font-weight: 400;
                        font-size: 16px;
                      "
                      >No meal plan added</span
                    ></v-flex
                  >

                  <v-flex
                    xs12
                    sm2
                    pt-2
                    px-2
                    v-if="Item1.mealPlan.welcomeDrink == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/welcomedrink.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Welcome drink</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    pt-2
                    px-2
                    v-if="Item1.mealPlan.lunch == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/lunch.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Lunch</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm3
                    pt-2
                    px-2
                    v-if="Item1.mealPlan.teaOrsnacks == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/food.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Tea/Coffee - Snacks</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    pt-2
                    px-2
                    v-if="Item1.mealPlan.dinner == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/dinner.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Dinner</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    pt-2
                    px-2
                    v-if="Item1.mealPlan.breakfast == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/breakfast.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Breakfast</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout wrap justify-start>
                  <v-flex xs12 sm12 text-left pt-2>
                    <v-layout wrap>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Boat type :</span
                        >
                        <v-layout
                          wrap
                          v-if="Item1.houseBoatType.length > 0"
                          pt-1
                        >
                          <v-flex
                            xs6
                            v-for="(item, i) in Item1.houseBoatType"
                            :key="i"
                          >
                            <span
                              style="
                                font-family: mainfont;
                                font-weight: 300;
                                font-size: 16px;
                                color: black;
                              "
                            >
                              {{ item }}</span
                            >
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Check in :</span
                        ><br />
                        <span
                          v-if="Item1.checkInTime"
                          class="pt-2"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item1.checkInTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Check out : </span
                        ><br />
                        <span
                          v-if="Item1.checkOutTime"
                          class="pt-2"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item1.checkOutTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Max person : </span
                        ><br />
                        <span
                          v-if="Item1.maxPersonTrip"
                          class="pt-2"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item1.maxPersonTrip }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Min person :</span
                        ><br />
                        <span
                          v-if="Item1.minPersonTrip"
                          class="pt-2"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item1.minPersonTrip }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <!-- <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Boat capacity :</span
                        ><br />
                        <span
                          v-if="Item1.maxCapacityOfBoat"
                          class="pt-2"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item1.maxCapacityOfBoat }}</span
                        >
                        <span v-else>-</span>
                      </v-flex> -->
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm10
                    pt-2
                    px-2
                    pb-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Package</v-flex
                  >
                  <!-- <v-flex xs12 sm2 py-2 pr-0 pr-md-2>
                    <v-btn
                      color="rgba(255, 98, 0, 1)"
                      small
                      block
                      dark
                      @click="
                        $router.push(
                          '/DaycruiseSpecialRate?boatId=' +
                            $route.query.id +
                            '&&id=' +
                            Item1._id
                        )
                      "
                      ><span
                        style="
                          color: white;
                          font-weight: 500;
                          font-size: 14px;
                          font-family: mainfont;
                        "
                        >Add special rate</span
                      ></v-btn
                    >
                  </v-flex> -->
                  <v-flex xs12 px-2 v-if="Item1.package.length > 0">
                    <v-card elevation="0" pa-1 outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left"><b>S.No.</b></th>
                              <th class="text-left"><b>Type</b></th>
                              <th class="text-left">
                                <b>Start date</b>
                              </th>
                              <th class="text-left">
                                <b>End date</b>
                              </th>
                              <th class="text-left">
                                <b>Customer rate (₹)</b>
                              </th>
                              <!-- <th class="text-left "><b>Extra Person rate (₹)</b></th> -->
                              <th class="text-left">
                                <b>Agent rate (₹)</b>
                              </th>
                              <!-- <th class="text-left "><b>Agent Extra Rate</b></th> -->
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(value, i) in Item1.package"
                              :key="i"
                              class="table"
                            >
                              <!-- <td>{{ i + 1 }}</td> -->
                              <td>
                                <span v-if="page == 1">
                                  {{ i + 1 }}
                                </span>
                                <span v-else>
                                  {{ i + 1 + 20 * (page - 1) }}
                                </span>
                              </td>
                              <td>
                                <span v-if="value.packageType">{{
                                  value.packageType
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.startDate">{{
                                  formatDate(value.startDate)
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.endDate">{{
                                  formatDate(value.endDate)
                                }}</span>
                                <span v-else>-</span>
                              </td>

                              <td>
                                <span v-if="value.customerRate"
                                  >{{ value.customerRate }} ({{
                                    value.customerRateCommission
                                  }})</span
                                >
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.agentRate"
                                  >{{ value.agentRate }} ({{
                                    value.agentRateCommission
                                  }})</span
                                >
                                <span v-else>-</span>
                              </td>
                              <!-- <td class="text-center">
                        <v-layout wrap>
                          <v-flex xs6>
                            <v-icon
                              size="18"
                              color="#182444"
                              style="cursor: pointer"
                              @click="
                                (deletedialog = true), (DeleteId = value._id)
                              "
                              >mdi-delete</v-icon
                            >
                          </v-flex>
                          <v-flex xs6>
                            <v-icon
                              size="18"
                              color="#182444"
                              style="cursor: pointer"
                              @click="calledit(value)"
                              >mdi-pencil</v-icon
                            >
                          </v-flex>
                        </v-layout>
                      </td> -->
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-flex>
                </v-layout>

                <!-- </v-card-text> -->
              </v-card>
            </v-tab-item>
            <v-tab-item
              v-if="HouseboatData.isOverNight == true"
              style="background-color: white"
            >
              <v-card color="basil" flat>
                <!-- <v-card-text> -->
                <!-- <v-layout wrap justify-end>
                    <v-flex xs1 text-right @click="(EditTrip1=true),(editItem1=Item1)">
                      <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: mainfont;
                  font-weight: 400;
                  font-size: 16px;
                "
                ><v-icon color="rgba(255, 98, 0, 1)" small>mdi-pencil</v-icon>Edit</span
              >
                    </v-flex>
                  </v-layout> -->
                <v-layout wrap justify-start pt-4 v-if="Item2.addionalRules">
                  <v-flex
                    xs12
                    px-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Additional rules</v-flex
                  >
                  <v-flex xs12 py-1 px-2 text-left v-if="Item2.addionalRules">
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 300;
                        font-size: 16px;
                        color: black;
                      "
                    >
                      {{ Item2.addionalRules }}
                    </span>
                  </v-flex>
                </v-layout>
                <v-layout wrap mt-4 v-if="Item2.mealPlan">
                  <v-flex
                    xs12
                    px-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Meal Plan</v-flex
                  >
                  <v-flex xs12 v-if="IsMealplan == false"
                    ><span
                      style="
                        font-family: mainfont;
                        font-weight: 400;
                        font-size: 16px;
                      "
                      >No meal plan added</span
                    ></v-flex
                  >

                  <v-flex
                    xs12
                    sm2
                    py-1
                    px-2
                    v-if="Item2.mealPlan.welcomeDrink == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/welcomedrink.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Welcome drink</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    py-1
                    px-2
                    v-if="Item2.mealPlan.lunch == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/lunch.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Lunch</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm3
                    py-1
                    px-2
                    v-if="Item2.mealPlan.teaOrsnacks == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/food.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Tea/Coffee - Snacks</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    py-1
                    px-2
                    v-if="Item2.mealPlan.dinner == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/dinner.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Dinner</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    py-1
                    px-2
                    v-if="Item2.mealPlan.breakfast == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/breakfast.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Breakfast</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout wrap justify-start>
                  <v-flex xs12 sm12 text-left pt-2>
                    <v-layout wrap>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Boat type :</span
                        >
                        <v-layout wrap v-if="Item2.houseBoatType.length > 0">
                          <v-flex
                            xs6
                            v-for="(item, i) in Item2.houseBoatType"
                            :key="i"
                          >
                            <span
                              style="
                                font-family: mainfont;
                                font-weight: 300;
                                font-size: 16px;
                                color: black;
                              "
                            >
                              {{ item }}</span
                            >
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Check in :</span
                        ><br />
                        <span
                          v-if="Item2.checkInTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.checkInTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Check out : </span
                        ><br />
                        <span
                          v-if="Item2.checkOutTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.checkOutTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Max capacity : </span
                        ><br />
                        <span
                          v-if="Item2.maxCapacityOfBoat"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.maxCapacityOfBoat }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Min capacity :</span
                        ><br />
                        <span
                          v-if="Item2.minCapacityOfBoat"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.minCapacityOfBoat }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>

                      <v-flex xs12 sm2 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Day 1 Trip start Time :</span
                        ><br />
                        <span
                          v-if="Item2.firstDayStartTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.firstDayStartTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Day 1 Trip End Time :</span
                        ><br />
                        <span
                          v-if="Item2.firstDayEndTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.firstDayEndTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Day 2 Trip start Time :</span
                        ><br />
                        <span
                          v-if="Item2.secondDayStartTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.secondDayStartTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Day 2 Trip end Time :</span
                        ><br />
                        <span
                          v-if="Item2.secondDayEndTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.secondDayEndTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm3 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Max.Person / room :</span
                        ><br />
                        <span
                          v-if="Item2.maxPersonPerRoom"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.maxPersonPerRoom }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm3 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Extra.Person / room :</span
                        ><br />
                        <span
                          v-if="Item2.extraPersonPerRoom"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item2.extraPersonPerRoom }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <!-- <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Boat type
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.houseBoatType"
                            style="
                              font-family: mainfont;
                              font-weight: 300;
                              font-size: 16px;
                              color: black;
                            "
                          >
                            : {{ Item1.houseBoatType }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Check in time
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.checkInTime"
                            style="
                              color: black;
                              font-family: mainfont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.checkInTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Check out time
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.checkOutTime"
                            style="
                              color: black;
                              font-family: mainfont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.checkOutTime }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max person
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.maxPersonTrip"
                            style="
                              color: black;
                              font-family: mainfont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.maxPersonTrip }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Min person
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.minPersonTrip"
                            style="
                              color: black;
                              font-family: mainfont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.minPersonTrip }}</span
                          >
                          <span v-else>-</span>
                        </v-flex>
                        <v-flex xs6 py-1>
                          <span
                            style="
                              font-family: mainfont;
                              font-weight: 400;
                              font-size: 17px;
                              color: black;
                            "
                            >Max boat capacity
                          </span>
                        </v-flex>
                        <v-flex xs4 py-1>
                          <span
                            v-if="Item1.maxCapacityOfBoat"
                            style="
                              color: black;
                              font-family: mainfont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                            : {{ Item1.maxCapacityOfBoat }}</span
                          >
                          <span v-else>-</span>
                        </v-flex> -->
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm10
                    pt-2
                    px-2
                    pb-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Package</v-flex
                  >
                  <!-- <v-flex xs12 sm2 py-2 pr-0 pr-md-2>
                    <v-btn
                      color="rgba(255, 98, 0, 1)"
                      small
                      block
                      dark
                      @click="
                        $router.push(
                          '/OvernightSpecialRate?boatId=' +
                            $route.query.id +
                            '&&id=' +
                            Item2._id
                        )
                      "
                      ><span
                        style="
                          color: white;
                          font-weight: 500;
                          font-size: 14px;
                          font-family: mainfont;
                        "
                        >Add special rate</span
                      ></v-btn
                    >
                  </v-flex> -->
                  <v-flex xs12 px-2 v-if="Item2.package.length > 0">
                    <v-card elevation="0" pa-1 outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left"><b>S.No.</b></th>
                              <th class="text-left"><b>Type</b></th>
                              <th class="text-left">
                                <b>Start date</b>
                              </th>
                              <th class="text-left">
                                <b>End date</b>
                              </th>
                              <th class="text-left">
                                <b>Customer rate (₹)</b>
                              </th>
                              <th class="text-left">
                                <b>Extra person rate (₹)</b>
                              </th>
                              <th class="text-left">
                                <b>Agent rate (₹)</b>
                              </th>
                              <th class="text-left">
                                <b>Agent Extra rate (₹)</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(value, i) in Item2.package"
                              :key="i"
                              class="table"
                            >
                              <!-- <td>{{ i + 1 }}</td> -->
                              <td>
                                <span v-if="page == 1">
                                  {{ i + 1 }}
                                </span>
                                <span v-else>
                                  {{ i + 1 + 20 * (page - 1) }}
                                </span>
                              </td>
                              <td>
                                <span v-if="value.packageType">{{
                                  value.packageType
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.startDate">{{
                                  formatDate(value.startDate)
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.endDate">{{
                                  formatDate(value.endDate)
                                }}</span>
                                <span v-else>-</span>
                              </td>

                              <td>
                                <span v-if="value.customerRate"
                                  >{{ value.customerRate }} ({{
                                    value.customerRateCommission
                                  }})</span
                                >
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.customerExtraRate">{{
                                  value.customerExtraRate
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.agentRate"
                                  >{{ value.agentRate }} ({{
                                    value.agentRateCommission
                                  }})</span
                                >
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.agentExtraRate">{{
                                  value.agentExtraRate
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <!-- <td class="text-center">
                        <v-layout wrap>
                          <v-flex xs6>
                            <v-icon
                              size="18"
                              color="#182444"
                              style="cursor: pointer"
                              @click="
                                (deletedialog = true), (DeleteId = value._id)
                              "
                              >mdi-delete</v-icon
                            >
                          </v-flex>
                          <v-flex xs6>
                            <v-icon
                              size="18"
                              color="#182444"
                              style="cursor: pointer"
                              @click="calledit(value)"
                              >mdi-pencil</v-icon
                            >
                          </v-flex>
                        </v-layout>
                      </td> -->
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-flex>
                </v-layout>

                <!-- </v-card-text> -->
              </v-card>
            </v-tab-item>
            <v-tab-item
              v-if="HouseboatData.isNightStay == true"
              style="background-color: white"
            >
              <v-card color="basil" flat>
                <!-- <v-card-text> -->
                <!-- <v-layout wrap justify-end>
                    <v-flex xs1 text-right @click="(EditTrip1=true),(editItem1=Item1)">
                      <span
                style="
                  color: rgba(255, 98, 0, 1);
                  font-family: mainfont;
                  font-weight: 400;
                  font-size: 16px;
                "
                ><v-icon color="rgba(255, 98, 0, 1)" small>mdi-pencil</v-icon>Edit</span
              >
                    </v-flex>
                  </v-layout> -->
                <v-layout wrap justify-start pt-4 v-if="Item3.addionalRules">
                  <v-flex
                    xs12
                    px-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Additional rules</v-flex
                  >
                  <v-flex xs12 py-1 px-2 text-left v-if="Item3.addionalRules">
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 300;
                        font-size: 16px;
                        color: black;
                      "
                    >
                      {{ Item3.addionalRules }}
                    </span>
                  </v-flex>
                </v-layout>
                <v-layout wrap mt-2 v-if="Item3.mealPlan">
                  <v-flex
                    xs12
                    px-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Meal Plan</v-flex
                  >
                  <v-flex xs12 px-2 v-if="IsMealplan == false"
                    ><span
                      style="
                        font-family: mainfont;
                        font-weight: 400;
                        font-size: 16px;
                      "
                      >No meal plan added</span
                    ></v-flex
                  >

                  <v-flex
                    xs12
                    sm2
                    py-2
                    px-2
                    v-if="Item3.mealPlan.welcomeDrink == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/welcomedrink.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Welcome drink</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    py-2
                    px-2
                    v-if="Item3.mealPlan.lunch == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/lunch.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Lunch</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm3
                    py-2
                    px-2
                    v-if="Item3.mealPlan.teaOrsnacks == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/food.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Tea/Coffee - Snacks</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    py-2
                    px-2
                    v-if="Item3.mealPlan.dinner == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/dinner.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Dinner</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm2
                    py-2
                    px-2
                    v-if="Item3.mealPlan.breakfast == true"
                  >
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/breakfast.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Breakfast</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout wrap justify-start>
                  <v-flex xs12 sm12 text-left>
                    <v-layout wrap>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Boat type :</span
                        ><br />
                        <v-layout wrap v-if="Item3.houseBoatType.length > 0">
                          <v-flex
                            xs6
                            v-for="(item, i) in Item3.houseBoatType"
                            :key="i"
                          >
                            <span
                              style="
                                font-family: mainfont;
                                font-weight: 300;
                                font-size: 16px;
                                color: black;
                              "
                            >
                              {{ item }}</span
                            >
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Check in :</span
                        ><br />
                        <span
                          v-if="Item3.checkInTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item3.checkInTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Check out : </span
                        ><br />
                        <span
                          v-if="Item3.checkOutTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item3.checkOutTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Max capacity : </span
                        ><br />
                        <span
                          v-if="Item3.maxCapacityOfBoat"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item3.maxCapacityOfBoat }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Min capacity :</span
                        ><br />
                        <span
                          v-if="Item3.minCapacityOfBoat"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item3.minCapacityOfBoat }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>

                      <!-- <v-flex xs12 sm2 align-self-center text-left pl-2 pt-2>
                          <span
                          style="
                        font-family: mainfont;
                        font-weight: 400;
                        font-size: 16px;
                      ">Day 1 start Time :</span><br />
              <span
                            v-if="Item3.firstDayStartTime"
                            style="
                              color: black;
                              font-family: mainfont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                             {{ Item3.firstDayStartTime }}</span
                          >
                          <span v-else>-</span>
            </v-flex>
            <v-flex xs12 sm2 align-self-center text-left pl-2 pt-2>
                          <span
                          style="
                        font-family: mainfont;
                        font-weight: 400;
                        font-size: 16px;
                      ">Day 1 end Time :</span><br />
              <span
                            v-if="Item3.firstDayEndTime"
                            style="
                              color: black;
                              font-family: mainfont;
                              font-weight: 300;
                              font-size: 16px;
                            "
                          >
                             {{ Item3.firstDayEndTime }}</span
                          >
                          <span v-else>-</span>
            </v-flex> -->
                      <v-flex xs12 sm2 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Day 2 Trip start Time :</span
                        ><br />
                        <span
                          v-if="Item3.secondDayStartTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item3.secondDayStartTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Day 2 Trip end Time :</span
                        ><br />
                        <span
                          v-if="Item3.secondDayEndTime"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item3.secondDayEndTime }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm3 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Max.Person / room :</span
                        ><br />
                        <span
                          v-if="Item3.maxPersonPerRoom"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item3.maxPersonPerRoom }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm3 align-self-center text-left pl-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Extra.Person / room :</span
                        ><br />
                        <span
                          v-if="Item3.extraPersonPerRoom"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ Item3.extraPersonPerRoom }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm10
                    pt-2
                    px-2
                    pb-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >Package</v-flex
                  >
                  <!-- <v-flex xs12 sm2 py-2 pr-0 pr-md-2>
                    <v-btn
                      color="rgba(255, 98, 0, 1)"
                      small
                      block
                      dark
                      @click="
                        $router.push(
                          '/NightstaySpecialRate?boatId=' +
                            $route.query.id +
                            '&&id=' +
                            Item3._id
                        )
                      "
                      ><span
                        style="
                          color: white;
                          font-weight: 500;
                          font-size: 14px;
                          font-family: mainfont;
                        "
                        >Add special rate</span
                      ></v-btn
                    >
                  </v-flex> -->
                  <v-flex xs12 px-2 v-if="Item3.package.length > 0">
                    <v-card elevation="0" pa-1 outlined>
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left"><b>S.No.</b></th>
                              <th class="text-left"><b>Type</b></th>
                              <th class="text-left">
                                <b>Start date</b>
                              </th>
                              <th class="text-left">
                                <b>End date</b>
                              </th>
                              <th class="text-left">
                                <b>Customer rate (₹)</b>
                              </th>
                              <th class="text-left">
                                <b>Extra person rate (₹)</b>
                              </th>
                              <th class="text-left">
                                <b>Agent rate (₹)</b>
                              </th>
                              <th class="text-left">
                                <b>Agent Extra rate (₹)</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(value, i) in Item3.package"
                              :key="i"
                              class="table"
                            >
                              <!-- <td>{{ i + 1 }}</td> -->
                              <td>
                                <span v-if="page == 1">
                                  {{ i + 1 }}
                                </span>
                                <span v-else>
                                  {{ i + 1 + 20 * (page - 1) }}
                                </span>
                              </td>
                              <td>
                                <span v-if="value.packageType">{{
                                  value.packageType
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.startDate">{{
                                  formatDate(value.startDate)
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.endDate">{{
                                  formatDate(value.endDate)
                                }}</span>
                                <span v-else>-</span>
                              </td>

                              <td>
                                <span v-if="value.customerRate"
                                  >{{ value.customerRate }} ({{
                                    value.customerRateCommission
                                  }})</span
                                >
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.customerExtraRate">{{
                                  value.customerExtraRate
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.agentRate"
                                  >{{ value.agentRate }}({{
                                    value.agentRateCommission
                                  }})</span
                                >
                                <span v-else>-</span>
                              </td>
                              <td>
                                <span v-if="value.agentExtraRate">{{
                                  value.agentExtraRate
                                }}</span>
                                <span v-else>-</span>
                              </td>
                              <!-- <td class="text-center">
                        <v-layout wrap>
                          <v-flex xs6>
                            <v-icon
                              size="18"
                              color="#182444"
                              style="cursor: pointer"
                              @click="
                                (deletedialog = true), (DeleteId = value._id)
                              "
                              >mdi-delete</v-icon
                            >
                          </v-flex>
                          <v-flex xs6>
                            <v-icon
                              size="18"
                              color="#182444"
                              style="cursor: pointer"
                              @click="calledit(value)"
                              >mdi-pencil</v-icon
                            >
                          </v-flex>
                        </v-layout>
                      </td> -->
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-flex>
                </v-layout>

                <!-- </v-card-text> -->
              </v-card>
            </v-tab-item>
          </v-tabs>
          <v-layout wrap>
            <v-flex
              xs12
              px-0
              px-md-2
              pt-2
              style="font-family: mainfont; font-weight: 400; font-size: 22px"
              >Photos</v-flex
            >
            <v-flex px-0 px-md-2 xs12 sm10 v-if="OtherImgs">
              <v-layout wrap v-if="OtherImgs.length > 0">
                <v-flex
                  xs12
                  sm4
                  md3
                  v-for="(item, i) in OtherImgs"
                  :key="i"
                  class="pa-1"
                >
                  <img
                    :src="mediaURLnewx + item"
                    style="object-fit: cover"
                    height="200px"
                    width="200px"
                  />
                </v-flex>
                <v-flex
                  @click="
                    $router.push('/HouseboatGallery?id=' + $route.query.id)
                  "
                  xs12
                  sm1
                  class="mr-2"
                  align-self-center
                  text-center
                >
                  <span
                    style="
                      font-family: mainfont;
                      font-weight: 600;
                      font-size: 10px;
                      color: rgba(241, 115, 67, 1);
                      cursor: pointer;
                    "
                    >View All <v-icon small>mdi-arrow-right</v-icon></span
                  ></v-flex
                >
              </v-layout>
              <v-layout wrap v-else>
                <v-flex xs12>
                  <span
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 16px;
                    "
                    >No images found</span
                  >
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs12>
                      <v-layout wrap>
                        <v-flex xs12 pl-lg-2 pb-lg-4>
                          <span
                            style="
                              font-weight: 400;
                              font-size: 18px;
                              font-family: mainfont;
                            "
                            >Reviews</span
                          ></v-flex
                        >
                        <v-flex xs12 lg4 v-for="(item, i) in review" :key="i">
                          <v-layout wrap justify-center>
                            <v-flex xs11>
                              <v-card
                                height="260px"
                                style="
                                  border-radius: 15px;
                                  background-color: #fafafa;
                                "
                              >
                                <v-layout wrap justify-center>
                                  <v-flex
                                    xs9
                                    pt-3
                                    style="
                                      font-weight: 400;
                                      font-size: 18px;
                                      font-family: mainfont;
                                    "
                                  >
                                    {{ item.user.name }}
                                  </v-flex>

                                  <v-flex xs10 pl-lg-1 pt-3>
                                    <v-rating
                                      :length="5"
                                      :size="18"
                                      v-model="item.rating"
                                      active-color="#ff6200"
                                      color="#ff6200"
                                      background-color="#ff6200"
                                    />
                                  </v-flex>

                                  <v-flex xs9 pt-3 style="text-align: justify">
                                    <span
                                      style="
                                        font-weight: 400;
                                        font-size: 15px;
                                        font-family: mainfont;
                                      "
                                    >
                                      {{ item.comment }}
                                    </span>
                                  </v-flex>
                                </v-layout>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-flex>

                        <v-flex xs12 pt-lg-3 v-if="review.length === 0" text-center>
  <span  style="
                              font-weight: 400;
                              font-size: 18px;
                              font-family: mainfont;
                            ">No reviews found!</span>
</v-flex>

                      </v-layout>
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
  data() {
    return {
      showSnackbar: false,
      timeout: 2000,
      ServerError: false,
      fileUploadDialog2: false,
      appLoading: false,
      HouseboatData: [],
      boatLicenseProof: "",
      attachments: null,
      leaseProof: "",
      attachments2: null,
      formData: new FormData(),
      formData2: new FormData(),

      menu2: false,
      menu: false,
      tripDetails: [],
      tab: null,
      fileUploadDialog: false,
      selectedFile: null,
      msg: null,
      page: 1,
      limit: 20,
      deleteialog: false,
      review:[],
      deleteId: "",
      editDialog: false,
      EditTrip1: false,
      editItem1: {},
      EditTrip2: false,
      editItem2: {},
      curItem: {},
      Item1: [],
      Item2: [],
      Item3: [],
      IsMealplan: true,
      IsMealplan2: true,
      Isfacility: true,
      FacilitiesData: {},
      OtherImgs: [],
      moreimg: false,
      DaySeasonedit: {},
      DayoffSeasonedit: {},
      isTrip: false,
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",

        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      phoneRules: [
        (v) => !!v || "phone is required",
        (v) => (v && v.length <= 10) || "invalid number",
        (v) => (v && v.length >= 10) || "invalid number",
        (v) => /^\d{10}$/.test(v) || "phone number must be a number",
      ],
      menu4: false,
      menu3: false,
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    page() {
      this.getData();
    },
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.$el.querySelector("input").click();
    },
    openFileInput2() {
      this.$refs.fileInput2.$el.querySelector("input").click();
    },
    getFiles() {
      var selectedFiles = this.boatLicenseProof;
      if (this.boatLicenseProof) {
        this.msg = null;
        this.attachments = selectedFiles;
      }
    },
    getFiles2() {
      var selectedFiles2 = this.leaseProof;
      if (this.leaseProof) {
        this.msg = null;
        this.attachments2 = selectedFiles2;
      }
    },

    openFileUploadDialog() {
      this.fileUploadDialog = true;
    },
    closeFileUploadDialog() {
      this.fileUploadDialog = false;
      // Reset the selected file when closing the dialog
      this.selectedFile = null;
      // Optionally, you can reset the file input as well
      this.$refs.fileInput.value = null;
    },
    handleFileChange(event) {
      // Handle the file selection
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      // Perform the file upload to the backend
      // You can use axios or another HTTP library to send the file to the server
      // For example:
      // const formData = new FormData();
      // formData.append('file', this.selectedFile);
      // axios.post('/api/upload', formData).then(response => {
      //   console.log('File uploaded successfully', response);
      // }).catch(error => {
      //   console.error('File upload failed', error);
      // });
      // After successful upload, close the dialog
      this.closeFileUploadDialog();
    },
    getData() {
      this.appLoading = true;
      axios({
        url: "/houseboat/get",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          id: this.$route.query.id,
        },
      })
        .then((response) => {
          this.appLoading = false;
          this.review = response.data.reviews;

          this.HouseboatData = response.data.data;
          this.OtherImgs = this.HouseboatData.propertyImages;

          if (this.OtherImgs && this.OtherImgs.length > 4) {
            this.OtherImgs = this.OtherImgs.slice(0, 4);
            this.moreimg = true;
          }
          this.FacilitiesData = this.HouseboatData.facilities;
          if (this.FacilitiesData) {
            var allFalse4 = Object.values(this.FacilitiesData).every(function (
              value
            ) {
              return !value;
            });

            this.Isfacility = !allFalse4;
            console.log("Isfacility=", this.Isfacility);
          } else {
            console.log("Facilities data is undefined.");
          }
          this.tripDetails = response.data.trip;
          if (this.tripDetails) {
            if (this.tripDetails.length > 0) {
              this.isTrip = true;
              for (var i = 0; i < this.tripDetails.length; i++) {
                if (this.tripDetails[i].tripType == "DayCruise") {
                  this.Item1 = this.tripDetails[i];
                  console.log("item1=", this.Item1);
                  if (this.Item1.mealPlan) {
                    var allFalse = Object.keys(this.Item1.mealPlan).every(
                      function (key) {
                        return !this.Item1.mealPlan[key];
                      },
                      this
                    );

                    this.IsMealplan = !allFalse;
                    console.log("IsMealplan=", this.IsMealplan);
                  }
                }
                if (this.tripDetails[i].tripType == "OverNight") {
                  this.Item2 = this.tripDetails[i];
                  console.log("Item2=", this.Item2);

                  if (this.Item2.mealPlan) {
                    var allFalse2 = Object.keys(this.Item2.mealPlan).every(
                      function (key) {
                        return !this.Item2.mealPlan[key];
                      },
                      this
                    );

                    this.IsMealplan2 = !allFalse2;
                    console.log("IsMealplan2=", this.IsMealplan2);
                  }
                }
                if (this.tripDetails[i].tripType == "NightStay") {
                  this.Item3 = this.tripDetails[i];

                  console.log("Item3=", this.Item3);
                }
              }
            } else {
              this.isTrip = false;
            }
          }
        })
        .catch((err) => {
          //   this.ServerError = true;
          console.log(err);
        });
    },
    editHouseboat() {
      this.appLoading = true;
      var facilities = {};
      facilities.airCondition = this.curItem.facilities.airCondition;
      facilities.kettle = this.curItem.facilities.kettle;
      facilities.parking = this.curItem.facilities.parking;
      facilities.restrooms = this.curItem.facilities.restrooms;
      facilities.lifeJacket = this.curItem.facilities.lifeJacket;
      facilities.wifi = this.curItem.facilities.wifi;
      facilities.television = this.curItem.facilities.television;
      facilities.swimmingPool = this.curItem.facilities.swimmingPool;

      axios({
        method: "POST",
        url: "/houseboat/edit",
        data: {
          houseBoatName: this.curItem.houseBoatName,
          totalRooms: this.curItem.totalRooms,
          category: this.curItem.category,
          addionalRules: this.curItem.addionalRules,
          // expiryType: this.curItem.expiryType,
          expiryDate: this.curItem.expiryDate,
          facilities: facilities,
          id: this.curItem._id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      }).then((response) => {
        this.appLoading = false;
        if (response.data.status) {
          this.msg = response.data.msg;
          this.showSnackBar = true;
          this.curItem = {};
          this.editDialog = false;
          this.getData();
        } else {
          this.msg = response.data.msg;
          this.showSnackBar = true;
        }
      });
      // }
    },
    // TripEdit() {
    //   // var mealPlan = {};
    //   // mealPlan.welcomeDrink = this.welcomeDrink;
    //   // mealPlan.lunch = this.lunch;
    //   // mealPlan.teaOrsnacks = this.teaOrsnacks;
    //   // mealPlan.dinner = this.dinner;
    //   // mealPlan.breakfast = this.breakfast;

    //   var Newarr = [this.DaySeasonedit, this.DayoffSeasonedit];
    //   axios({
    //     method: "POST",
    //     url: "/houseboat/trip/edit",
    //     data: {
    //       checkInTime: this.editItem1.checkInTime,
    //       checkOutTime: this.editItem1.checkOutTime,
    //       maxCapacityOfBoat: this.editItem1.maxCapacityOfBoat,
    //       maxPersonTrip: this.editItem1.maxPersonTrip,
    //       minPersonTrip: this.editItem1.minPersonTrip,
    //       houseBoatType: this.editItem1.houseBoatType,
    //       // mealPlan: mealPlan,
    //       tripId: this.editItem1._id,
    //       tripType: "DayCriuse",
    //       packageDetails: Newarr,
    //     },
    //     headers: {
    //       token: localStorage.getItem("token"),
    //     },
    //   }).then((response) => {
    //     if (response.data.status) {
    //       this.msg = response.data.msg;
    //       this.snackbar = true;
    //       var tripId = response.data.data._id;
    //       console.log("tripId=", tripId);
    //       this.$router.push('/AddDaycruiseSeasonalRate?name='+this.$route.query.name+'&&id=' + tripId);
    //     } else {
    //       this.msg = response.data.msg;
    //       this.snackbar = true;
    //     }
    //   });
    //   // }
    // },
    editHouseboatproof() {
      if (!this.selectedFile) {
        console.error("No file selected for upload");
        return;
      }

      const formData = new FormData();
      formData.append("boatLicenseProof", this.selectedFile);
      formData.append("id", this.HouseboatData._id);

      axios({
        method: "POST",
        url: "admin/houseboat/proofupload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            location.reload();
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((error) => {
          console.error("Error during file upload", error);
          // Handle the error, show a message, etc.
        });
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
    openFileUploadDialog2() {
      this.fileUploadDialog2 = true;
    },
    closeFileUploadDialog2() {
      this.fileUploadDialog2 = false;
      // Reset the selected leaseProof file when closing the dialog
      this.selectedLeaseProof = null;
      // Optionally, you can reset the file input as well
      this.$refs.fileInput2.value = null;
    },
    handleLeaseProofChange(event) {
      // Handle the leaseProof file selection
      this.selectedLeaseProof = event.target.files[0];
    },
    uploadLeaseProof() {
      if (!this.selectedLeaseProof) {
        console.error("No leaseProof file selected for upload");
        return;
      }

      const formData = new FormData();
      formData.append("leaseProof", this.selectedLeaseProof);
      formData.append("id", this.HouseboatData._id);

      axios({
        method: "POST",
        url: "admin/houseboat/proofupload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.appLoading = false;
          if (response.data.status) {
            this.msg = response.data.msg;
            this.showSnackBar = true;
            location.reload();
          } else {
            this.msg = response.data.msg;
            this.showSnackBar = true;
          }
        })
        .catch((error) => {
          console.error("Error during leaseProof upload", error);
          // Handle the error, show a message, etc.
        })
        .finally(() => {
          this.closeFileUploadDialog2();
        });
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
.gr2 {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}
/* .basil {
  background-color: #FFFBE6 !important;
} */
.basil--text {
  color: #356859 !important;
}
</style>