<template>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to leave?
        </v-card-title>
        <v-card-actions>
          <v-btn @click="confirmAndRedirect">Yes</v-btn>
          <v-btn @click="closeDialog">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialog: true,
      };
    },
    methods: {
      confirmAndRedirect() {
        this.dialog = false;
        this.$router.go(-1); // Go back to the previous page
      },
      closeDialog() {
        this.dialog = false;
      },
    },
  };
  </script>
  