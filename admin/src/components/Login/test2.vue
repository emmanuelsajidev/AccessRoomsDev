<v-flex xs12 pl-4>
    <v-layout wrap justify-center>
      <v-flex xs12 pt-8 text-left>
        <span style="font-size: 25px; font-weight: bolder"
          >DASHBOARD</span
        >
      </v-flex>
      <v-flex xs11 lg12 pt-3>
        <v-layout wrap justify-center>
          <v-flex
            xs11
            sm5
            md4
            lg3
            pt-3
            pr-4
            style="cursor: pointer"
            @click="$router.push('/approvedagent')"
          >
            <v-card elevation="0" class="pa-3" height="120px">
              <v-layout wrap fill-height justify-center align-center>
                <v-flex xs8>
                  <v-layout wrap>
                    <v-flex xs12 pt-3>
                      <span style="font-size: 16px; font-weight: bold"
                        >AGENT COUNT</span
                      >
                    </v-flex>
                    <v-flex xs6 pt-1 pl-1>
                      <span style="font-size: 23px; font-weight: bold">
                        {{ list.agentCount }}</span
                      >
                    </v-flex>
                    <v-flex xs6 pt-3>
                      <v-icon color="#FF681F">mdi-arrow-right</v-icon>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex pt-3 pb-3 xs3 text-right>
                  <v-img
                    height="40px"
                    contain
                    src="../../assets/Images/vendor.png"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex
            @click="$router.push('/approvedvendor')"
            style="cursor: pointer"
            xs11
            sm5
            md4
            lg3
            pr-4
            pt-4
            pt-lg-3
          >
            <v-card elevation="0" class="pa-3" height="120px">
              <v-layout wrap fill-height justify-center align-center>
                <v-flex xs8>
                  <v-layout wrap>
                    <v-flex xs12 pt-3>
                      <span style="font-size: 16px; font-weight: bold"
                        >VENDOR COUNT</span
                      >
                    </v-flex>
                    <v-flex xs4 xs6 pt-1 pl-1>
                      <span style="font-size: 23px; font-weight: bold">
                        {{ list.vendorCount }}</span
                      >
                    </v-flex>
                    <v-flex xs6 pt-3>
                      <v-icon color="#FF681F">mdi-arrow-right</v-icon>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex pt-3 pb-3 xs3 text-right>
                  <v-img
                    height="40px"
                    contain
                    src="../../assets/Images/users1.png"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex style="cursor: pointer" xs11 sm5 md4 lg3 pt-3 pr-4>
            <v-card elevation="0" class="pa-3" height="120px">
              <v-layout wrap fill-height justify-center align-center>
                <v-flex xs8>
                  <v-layout wrap>
                    <v-flex xs12 pt-3>
                      <span style="font-size: 16px; font-weight: bold">
                        RESERVATION
                      </span>
                    </v-flex>
                    <v-flex xs6 pt-1 pl-1>
                      <span style="font-size: 23px; font-weight: bold">
                        {{ list.reservationcount }}</span
                      >
                    </v-flex>
                    <v-flex xs6 pt-3>
                      <v-icon color="#FF681F">mdi-arrow-right</v-icon>
                    </v-flex>
                    <v-flex 7 style="font-size: 13px">
                      Houseboat
                      {{ list.HBreservcount }}&nbsp; Shikara
                      {{ list.SKreservcount }}
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex pt-3 pb-3 xs3 text-right>
                  <v-img
                    height="40px"
                    contain
                    src="../../assets/Images/acco.png"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs11 sm5 md4 lg3 pt-3 pr-4 style="cursor: pointer">
            <v-card elevation="0" class="pa-3" height="120px">
              <v-layout wrap fill-height justify-center align-center>
                <v-flex xs8>
                  <v-layout wrap>
                    <v-flex xs12 pt-3>
                      <span style="font-size: 16px; font-weight: bold"
                        >TOTAL BOOKINGS
                      </span>
                    </v-flex>
                    <v-flex xs6 pt-1 pl-1>
                      <span style="font-size: 23px; font-weight: bold">
                        {{ list.totalbooking }}</span
                      >
                    </v-flex>
                    <v-flex xs6 pt-3>
                      <v-icon color="#FF681F">mdi-arrow-right</v-icon>
                    </v-flex>
                    <v-flex 7 style="font-size: 13px">
                      Houseboat
                      {{ list.hbbookigCount }}&nbsp; Shikara
                      {{ list.shikarabookCount }}
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex pt-3 pb-3 xs3 text-right>
                  <v-img
                    height="40px"
                    contain
                    src="../../assets/Images/advb.png"
                  ></v-img>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>





  getGraph() {
      this.appLoading = true;
      this.flag = false;
      axios({
        method: "POST",
        url: "/dashboard/graph",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.status == true) {
            this.barlist = response.data.data;
            this.chartOptions.xaxis.categories = [];
            const bookingsData = [];

            for (let i = 0; i < this.barlist.length; i++) {
              this.chartOptions.xaxis.categories.push(this.barlist[i].month);
              bookingsData.push(this.barlist[i].bookings);
            }
            this.series6 = [
              {
                name: "Bookings",
                data: bookingsData,
              },
            ];

            this.flag = true;
          }
          this.appLoading = false;
        })
        .catch((err) => {
          this.appLoading = false;
          this.ServerError = true;
          console.log(err);
        });
    },