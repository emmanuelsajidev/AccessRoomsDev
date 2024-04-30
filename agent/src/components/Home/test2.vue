<v-flex xs5 text-right align-self-center @click="toggleDropdown">
  <v-layout wrap justify-end>
    <v-flex
      xs5
      pa-1
      style="background-color: #f4f4f4; border-radius: 11px"
    >
      <v-layout wrap justify-end>
        <v-flex xs3 pa-1>
          <v-avatar v-if="img">
            <v-img contain :src="mediaUURL + img"> </v-img>
          </v-avatar>
          <v-avatar v-else>
            <v-img contain src="../../assets/headerimg.png"></v-img>
          </v-avatar>
        </v-flex>
        <v-flex x6 align-self-center text-left pl-3 pa-1>
          <span
            style="
              font-weight: 400;
              font-size: 16px;
              font-family: LexendRegular;
            "
          >
            {{ list.name }}
          </span>
          <br />
          <span
            style="
              font-weight: 400;
              font-size: 12px;
              font-family: LexendRegular;
              color: #81807f;
            "
          >
            {{ list.role }}
          </span>
        </v-flex>
        <v-icon v-if="!isDropdownVisible">mdi-chevron-down</v-icon>
        <v-icon v-else>mdi-chevron-up</v-icon>
      </v-layout>
    </v-flex>
  </v-layout>

  <!-- Dropdown content -->
  <v-slide-y-transition>
    <v-card
      v-if="isDropdownVisible"
      style="
        position: absolute;
        top: 100%;
        right: 6%;
        width: 200px;
        z-index: 3000; /* Adjusted z-index value */
        overflow: visible; /* Adjusted overflow property */
      "
    >
      <v-layout wrap justify-center>
        <!-- <v-flex xs5 pt-5 pb-6>
          <v-btn
            @click="$router.push('EditProfile')"
            block
            color="#F17343"
          >
            <span
              style="
                font-family: LexendRegular;
                color: white;
                font-size: 11px;
                text-transform: none;
              "
            >
              Edit
            </span>
            <v-icon size="120%" color="white">
              &nbsp;mdi-pencil</v-icon
            >
          </v-btn>
        </v-flex> -->
        <v-flex xs8 pt-5 pl-2 pb-6>
          <v-btn
            @click="$router.push('ViewProfile')"
            block
            color="#F17343"
          >
            <span
              style="
                font-family: LexendRegular;
                color: white;
                font-size: 11px;
                text-transform: none;
              "
            >
              View
            </span>
            &nbsp;
            <v-icon size="120%" color="white"> mdi-eye</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <!-- Dropdown content, e.g., Edit Profile button -->
    </v-card>
  </v-slide-y-transition>
</v-flex>





methods: {
    toggleDropdown() {
      // Toggle the visibility of the dropdown
      this.isDropdownVisible = !this.isDropdownVisible;
    },