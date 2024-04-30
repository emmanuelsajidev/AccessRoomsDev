<template>
  <div>
    <v-layout wrap>
      <v-flex xs12>
        <Main />
      </v-flex>
      <v-flex xs12>
        <router-view />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Main from "./Search.vue";

export default {
  components: {
    Main,
  },
  data() {
    return {};
  },
 
};
</script>
