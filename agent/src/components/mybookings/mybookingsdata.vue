<template>
    <div>
      <v-layout wrap class="mainfont" justify-center >
        <v-flex xs12 pt-lg-0 pt-16 pb-3>
                        <span style="font-size:30px;font-weight: 400;font-family: LexendRegular;">My Bookings</span>
                    </v-flex>
        <v-flex xs12>
          <v-layout pb-5 wrap justify-center style="background-color: white;">
            <v-flex xs5 lg3 pt-3 pr-4 pt-6>
              <v-btn
              block
                :color="selectedOption === 'all' ? '#F17343' : 'black'"
                @click="selectOption('all')"
              >
                 <span :style="{ color: selectedOption === 'all' ? 'white' : 'white' }">SHIKARA</span>
              </v-btn>
            </v-flex>
            <v-flex xs5 lg3 pt-3 pl-4 pt-6>
              <v-btn
              block
                :color="selectedOption === 'approved' ? '#F17343' : 'black'"
                @click="selectOption('approved')"
              >
                <span :style="{ color: selectedOption === 'approved' ? 'white' : 'white' }">HOUSEBOAT</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
  
      <v-layout wrap>
        <v-flex xs12>
          <agents v-if="selectedOption === 'all'"/>
          <approvedagents v-if="selectedOption === 'approved'"/>
        </v-flex>
      </v-layout>
    </div>
  </template>
  
  <script>
  import agents from "./shikarabookings.vue";
  import approvedagents from "./houseboatbookings.vue";
  
  export default {
    components: {
        agents,
      approvedagents,
    },
    data() {
      return {
        selectedOption: 'all',
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
      },
    },
  };
  </script>
  