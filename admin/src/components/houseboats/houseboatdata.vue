<template>
    <div>
      <v-layout wrap class="mainfont" justify-center pt-6>
        <v-flex xs11>
          <v-layout pb-5 wrap justify-center style="background-color: white;">
            <v-flex xs5 lg3 pt-3 pr-4 pt-6>
              <v-btn
              block
                :color="selectedOption === 'all' ? 'green' : 'grey'"
                @click="selectOption('all')"
              >
                <span :style="{ color: selectedOption === 'all' ? 'white' : 'white' }">PENDING</span>
              </v-btn>
            </v-flex>
            <v-flex xs5 lg3 pt-3 pl-4 pt-6>
              <v-btn
              block
                :color="selectedOption === 'approved' ? 'green' : 'grey'"
                @click="selectOption('approved')"
              >
                <span :style="{ color: selectedOption === 'approved' ? 'white' : 'white' }">APPROVED</span>
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
  import agents from "./houseboatpending.vue";
  import approvedagents from "./houseboatapproved.vue";
  
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
  