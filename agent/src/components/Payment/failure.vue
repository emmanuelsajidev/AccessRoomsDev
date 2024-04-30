<template>
  <div>
    <v-layout wrap class="LexendRegular" fill-height  style="height: 100vh;">
      <v-flex xs12 align-self-center>
        <v-layout wrap justify-center>
          
          <v-flex xs7>
            <v-layout wrap>
              <v-flex text-right>
                <v-icon color="red" size="600%">
              
              mdi-close-circle-outline
                          </v-icon>
              </v-flex>
              <v-flex pt-5 text-left>
                <span class="pt-12" style="color:red;text-transform: none;font-size: 40px;">
              Payment failed !
            </span>
              </v-flex>
            </v-layout>
           
           
          </v-flex>
          <v-flex pt-5 xs12 text-center>
            <span style="text-transform: none;">Your Payment has been failed</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
  
</template>