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
      <v-layout wrap justify-center>
        <v-flex xs12 align-self-center>
          <v-card tile class="pa-0 pa-md-4">
            <v-layout wrap>
              <v-flex xs12 class="hidden-sm-and-down" v-if="HouseboatData">
                <v-img
                  cover
                  v-if="HouseboatData.coverImage"
                  :src="mediaURLnewx + HouseboatData.coverImage"
                  contain
                  ><template v-slot:placeholder>
                    <ImageLoader />
                  </template>
                  <v-layout justify-start fill-height>
                    <v-flex xs3 md2 align-self-end mb-4 ml-8>
                      <v-card
                        class="pa-1"
                        height="110px"
                        width="150px"
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
                    </v-flex>
                    <v-flex xs8 align-self-end mb-4>
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 500;
                          font-size: 22px;
                          color: white;
                        "
                        v-if="HouseboatData.shikaraName"
                        >{{ HouseboatData.shikaraName }}</span
                      >
                    </v-flex>
                    <v-flex xs2 align-self-end text-right mb-4 pr-8>
                      <v-btn
                        style="border-radius: 2px"
                        color="#FF681F"
                        @click="
                          $router.push('/EditShikara?id=' + $route.query.id)
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
                      <v-card
                        class="pa-1"
                        height="110px"
                        width="110px"
                        v-if="HouseboatData.propertyImages"
                      >
                        <v-img
                          height="110px"
                          cover
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
                    </v-flex>
                    <v-flex xs8 align-self-end mb-4>
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 500;
                          font-size: 22px;
                          color: white;
                        "
                        v-if="HouseboatData.shikaraName"
                        >{{ HouseboatData.shikaraName }}</span
                      >
                    </v-flex>
                    <v-flex xs2 align-self-end text-right mb-4 pr-8>
                      <v-btn
                        style="border-radius: 2px"
                        color="#FF681F"
                        @click="
                          $router.push('/EditShikara?id=' + $route.query.id)
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
                  </v-layout>
                </v-img>
              </v-flex>
              <v-flex xs12 class="hidden-md-and-up" v-if="HouseboatData">
                <v-img
                  cover
                  height="200px"
                  v-if="HouseboatData.coverImage"
                  :src="mediaURLnewx + HouseboatData.coverImage"
                  ><template v-slot:placeholder>
                    <ImageLoader />
                  </template>
                  <v-layout justify-start fill-height>
                    <v-flex
                      xs3
                      sm2
                      align-self-end
                      ma-1
                      v-if="HouseboatData.propertyImages"
                    >
                      <v-card class="pa-0" height="50px" contain>
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
                    </v-flex>
                    <v-flex xs9 align-self-end mb-4>
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 500;
                          font-size: 16px;
                          color: white;
                        "
                        v-if="HouseboatData.shikaraName"
                        >{{ HouseboatData.shikaraName }}</span
                      >
                    </v-flex>
                    <v-flex xs2 align-self-end text-right mb-4 pr-8>
                      <v-btn
                        style="border-radius: 2px"
                        text
                        @click="
                          $router.push('/EditShikara?id=' + $route.query.id)
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
                  height="200px"
                  width="1251px"
                  src="./../../assets/Images/noimg.png"
                >
                  <v-layout justify-start fill-height>
                    <v-flex
                      xs3
                      sm2
                      align-self-end
                      ma-1
                      v-if="HouseboatData.propertyImages"
                    >
                      <v-card class="pa-0" height="50px" contain>
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
                        <!-- <v-img
                  v-else
                  height="100%"
                          width="100%"
                  src="./../../assets/images/noimg.png"
                > -->
                      </v-card>
                    </v-flex>
                    <v-flex xs9 align-self-end mb-4>
                      <span
                        style="
                          font-family: mainfont;
                          font-weight: 500;
                          font-size: 16px;
                          color: white;
                        "
                        v-if="HouseboatData.shikaraName"
                        >{{ HouseboatData.shikaraName }}</span
                      >
                    </v-flex>
                    <v-flex xs2 align-self-end text-right mb-4 pr-8>
                      <v-btn
                        style="border-radius: 2px"
                        text
                        @click="
                          $router.push('/EditShikara?id=' + $route.query.id)
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
              justify-space-between
              justify-sm-start
              wrap
              style="background-color: rgba(245, 242, 240, 1)"
              pa-0
              pa-sm-4
              my-4
            >
              <v-flex xs12 sm2 md6 align-self-center>
                <v-layout wrap pa-2 pa-md-0>
                  <v-flex xs6 sm12 md3 align-self-center text-center>
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      >Total Seats</span
                    >
                    <br />
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                      v-if="HouseboatData.totalSeats"
                    >
                      {{ HouseboatData.totalSeats }}</span
                    >
                  </v-flex>
                  <v-flex xs6 sm12 md3 align-self-center text-center>
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
                  <v-flex xs6 sm12 md3 align-self-center text-center>
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 600;
                        font-size: 10px;
                        color: rgba(144, 144, 144, 1);
                        text-transform: uppercase;
                      "
                      v-if="HouseboatData.location"
                      >Location</span
                    >
                    <br />
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 600;
                        font-size: 15px;
                        color: rgba(64, 64, 64, 1);
                      "
                      v-if="HouseboatData.location"
                    >
                      {{ HouseboatData.location.name }}</span
                    >
                  </v-flex>
  
                  <v-flex xs6 sm12 md3 align-self-center text-center>
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
            
              <v-flex
                xs12
                sm8
                md6
                lg4
                class="mr-2"
                align-self-center
                text-center
                v-if="OtherImgs"
              >
                <v-layout
                  justify-center
                  justify-sm-end
                  wrap
                  v-if="OtherImgs.length > 0"
                >
                  <v-flex
                    xs4
                    sm3
                    v-for="(item, i) in OtherImgs"
                    :key="i"
                    class="ma-sm-2"
                  >
                    <v-card height="90px" width="100px">
                      <v-img
                        v-if="item"
                        height="90px"
                        width="100px"
                        :src="mediaURLnewx + item"
                        ><template v-slot:placeholder> <ImageLoader /> </template
                      ></v-img>
                    </v-card> </v-flex
                ></v-layout>
              </v-flex>
              <v-flex
                xs12
                sm1
                @click="$router.push('/shikaraGallery?id=' + $route.query.id)"
                v-if="moreimg == true"
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
            <v-layout wrap>
              <v-flex xs12 lg10>
                <v-layout wrap mt-4 pl-4 v-if="FacilitiesData">
                  <v-flex
                    xs12
                    px-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 22px;
                    "
                    >Facilities</v-flex
                  >
                  <v-flex xs12 px-2 v-if="Isfacility == false"
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
                    pt-2
                    px-2
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
                          >Air conditioning</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm3 pt-2 px-2 v-if="FacilitiesData.wifi == true">
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
                    pt-2
                    px-2
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
                    pt-2
                    px-2
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
                          >Life jacket</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm3
                    pt-2
                    px-2
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
                  <v-flex xs12 sm3 pt-2 px-2 v-if="FacilitiesData.kettle == true">
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
                    pt-2
                    px-2
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
                    pt-2
                    px-2
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
                  <v-flex xs12 sm3 pt-2 px-2 v-if="FacilitiesData.towels == true">
                    <v-layout wrap>
                      <v-flex xs2>
                        <v-img
                          height="20px"
                          contain
                          src="./../../assets/icons/towel.png"
                        ></v-img>
                      </v-flex>
                      <v-flex xs10
                        ><span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 16px;
                          "
                          >Towels</span
                        ></v-flex
                      >
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm3 pt-2 px-2 v-if="FacilitiesData.toilet == true">
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
                          >Toilet</span
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
                                  class="mainfont"
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
                  <v-dialog v-model="fileUploadDialog" max-width="500">
                    <v-card>
                      <v-card-title class="mainfont">
                        <v-layout wrap>
                          <v-flex xs12 pt-1 pb-2> Edit Boat License </v-flex>
                        </v-layout>
                      </v-card-title>
                      <v-card-text>
                        <!-- File input for selecting a file -->
                        <input
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
                    <v-card class="mainfont">
                      <v-card-title class="mainfont">
                        <v-layout wrap>
                          <v-flex xs12 pt-1 pb-2> Edit Lease Proof </v-flex>
                        </v-layout>
                      </v-card-title>
                      <v-card-text class="mainfont">
                        <!-- File input for selecting a file -->
                        <input
                        class="mainfont"
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
                              <span style="color: white; text-transform: none">
                                Upload
                              </span>
                            </v-btn>
                          </v-flex>
                          <v-flex xs3 pl-3 pb-3>
                            <v-btn
                              color="rgba(255, 98, 0, 1)"
                              @click="closeFileUploadDialog2"
                            >
                              <span style="color: white; text-transform: none">
                                Close
                              </span>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout justify-start wrap px-4>
              <v-flex xs12 sm8>
                <v-layout wrap justify-start pt-2>
                  <v-flex
                    v-if="HouseboatData.addionalRules"
                    xs12
                    px-2
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 18px;
                    "
                    >Additional Rules</v-flex
                  >
                  <v-flex xs12 px-2 text-left v-if="HouseboatData.addionalRules">
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 300;
                        font-size: 16px;
                        color: black;
                      "
                    >
                      {{ HouseboatData.addionalRules }}
                    </span>
                  </v-flex>
                </v-layout>
              </v-flex></v-layout
            >
            <v-layout justify-start wrap v-if="isTrip == true" px-4>
              <v-flex xs12>
                <!-- <v-layout wrap mt-4 v-if="tripDetails.mealPlan">
                      <v-flex
                        xs12 px-2
                        style="
                          font-family: mainfont;
                          font-weight: 400;
                          font-size: 18px;
                        "
                        >Meal Plan</v-flex
                      >
                      <v-flex xs12 v-if="IsMealplan == false" pb-2 px-2
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
                        py-4
                        px-2
                        v-if="tripDetails.mealPlan.welcomeDrink == true"
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
                        py-4
                        px-2
                        v-if="tripDetails.mealPlan.lunch == true"
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
                        py-4
                        px-2
                        v-if="tripDetails.mealPlan.teaOrsnacks == true"
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
                        py-4
                        px-2
                        v-if="tripDetails.mealPlan.dinner == true"
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
                        py-4
                        px-2
                        v-if="tripDetails.mealPlan.breakfast == true"
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
                    </v-layout> -->
                <v-layout wrap justify-start>
                  <v-flex xs12 sm12 text-left>
                    <v-layout wrap v-if="tripDetails">
                      <v-flex xs12 sm2 md3 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 18px;
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
                      <!-- <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 18px;
                          "
                          >Drop location :</span
                        ><br />
                        <span
                          v-if="tripDetails.dropLocation"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ tripDetails.dropLocation }}</span
                        >
                        <span v-else>-</span>
                      </v-flex> -->
                      <v-flex xs12 sm3 md2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 18px;
                          "
                          >Max.capacity : </span
                        ><br />
                        <span
                          v-if="tripDetails.maxCapacityOfBoat"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ tripDetails.maxCapacityOfBoat }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm3 md2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 18px;
                          "
                          >Min.capacity : </span
                        ><br />
                        <span
                          v-if="tripDetails.minCapacityOfBoat"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ tripDetails.minCapacityOfBoat }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                      <v-flex xs12 sm2 align-self-center text-left px-2>
                        <span
                          style="
                            font-family: mainfont;
                            font-weight: 400;
                            font-size: 18px;
                          "
                          >Min hours :</span
                        ><br />
                        <span
                          v-if="tripDetails.minimumHour"
                          style="
                            color: black;
                            font-family: mainfont;
                            font-weight: 300;
                            font-size: 16px;
                          "
                        >
                          {{ tripDetails.minimumHour }}</span
                        >
                        <span v-else>-</span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex
                    xs12
                    sm10
                    px-2
                    align-self-center
                    style="
                      font-family: mainfont;
                      font-weight: 400;
                      font-size: 18px;
                    "
                    >Packages</v-flex
                  >
                  <!-- <v-flex xs12 sm2 py-2 pr-0 pr-md-2 align-self-end>
                    <v-btn
                      color="rgba(255, 98, 0, 1)"
                      small
                      block
                      dark
                      @click="
                        $router.push(
                          '/ShikaraSpecialRate?boatId=' +
                            $route.query.id +
                            '&&id=' +
                            tripDetails._id
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
                  <v-flex xs12 px-2 v-if="tripDetails.package">
                    <v-card
                      elevation="0"
                      pa-1
                      outlined
                      v-if="tripDetails.package.length > 0"
                    >
                      <v-simple-table
                        style="
                          font-family: mainfont;
                          font-weight: 300;
                          font-size: 16px;
                        "
                      >
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left tablefont"><b>S.No.</b></th>
                              <th class="text-left tablefont"><b>Type</b></th>
                              <th class="text-left tablefont">
                                <b>Start date</b>
                              </th>
                              <th class="text-left tablefont"><b>End date</b></th>
                              <th class="text-left tablefont">
                                <b>Customer rate (₹)</b>
                              </th>
                              <th class="text-left tablefont">
                                <b>Agent rate (₹)</b>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(value, i) in tripDetails.package"
                              :key="i"
                              class="table"
                            >
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
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 px-2 v-else>
                    <span
                      style="
                        font-family: mainfont;
                        font-weight: 400;
                        font-size: 16px;
                      "
                      >No available packages</span
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
            <v-layout justify-start wrap pl-5 v-if="isTrip == false" pt-1>
              <v-flex xs12>
                <span
                  style="font-family: mainfont; font-weight: 400; font-size: 16px"
                  >No trip added</span
                >
              </v-flex></v-layout
            >
            <v-layout wrap pl-5 justify-center justify-md-start>
              <v-flex
                xs12
                style="font-family: mainfont; font-weight: 400; font-size: 22px"
                >Photos</v-flex
              >
              <v-flex xs12 sm10 v-if="OtherImgs">
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
                    @click="$router.push('/shikaraGallery?id=' + $route.query.id)"
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
        appLoading: false,
        HouseboatData: [],
        tripDetails: [],
        tab: null,
        msg: null,
        page: 1,
        limit: 20,
        deleteialog: false,
        fileUploadDialog: false,
        fileUploadDialog2: false,
        deleteId: "",
        editialog: false,
        editItem: {},
        Item2: [],
        Item3: [],
        review:[],
  
        IsMealplan: true,
        IsMealplan2: true,
        Isfacility: true,
        FacilitiesData: {},
        OtherImgs: [],
        moreimg: false,
        isTrip: true,
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
      getData() {
        this.appLoading = true;
        axios({
          url: "/shikara/get",
          method: "GET",
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            id: this.$route.query.id,
          },
        })
          .then((response) => {
            this.review = response.data.reviews;
  
            this.appLoading = false;
            this.HouseboatData = response.data.data;
            this.tripDetails = response.data.trip;
            if (this.tripDetails.mealPlan) {
              var allFalse = Object.keys(this.tripDetails.mealPlan).every(
                function (key) {
                  return !this.tripDetails.mealPlan[key];
                },
                this
              );
  
              this.IsMealplan = !allFalse;
              console.log("IsMealplan=", this.IsMealplan);
            }
            if (Object.keys(this.tripDetails).length === 0) {
              console.log("empty trip");
              this.isTrip = false;
            }
            this.Item3 = this.tripDetails.package;
            this.OtherImgs = this.HouseboatData.propertyImages;
  
            if (this.OtherImgs && this.OtherImgs.length > 4) {
              this.OtherImgs = this.OtherImgs.slice(0, 4);
              this.moreimg = true;
            }
            this.FacilitiesData = this.HouseboatData.facilities;
            console.log("FacilitiesData=", this.FacilitiesData);
            if (this.FacilitiesData) {
              var allFalse4 = Object.values(this.FacilitiesData).every(function (
                value
              ) {
                return !value;
              });
  
              this.Isfacility = !allFalse4;
              console.log("Isfacility=", this.Isfacility);
            } else {
              // Handle the case when this.HouseboatData.facilities is undefined
              console.log("Facilities data is undefined.");
            }
          })
          .catch((err) => {
            //   this.ServerError = true;
            console.log(err);
          });
      },
      deleteBoat(id) {
        axios({
          url: "/shikara/delete",
          method: "get",
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            id: id,
          },
        })
          .then((response) => {
            if (response.data.status == true) {
              this.msg = response.data.msg;
              this.showSnackbar = true;
              this.deleteialog = false;
              this.deleteId = "";
              this.appLoading = false;
              this.getData();
            } else {
              this.msg = response.data.msg;
              this.showSnackbar = true;
            }
          })
          .catch((err) => {
            //   this.ServerError = true;
            console.log(err);
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
          url: "/admin/shikara/propertyimage/upload",
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
          url: "/admin/shikara/propertyimage/upload",
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