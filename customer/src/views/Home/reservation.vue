<template>
    <div>
        <v-layout wrap>
            <v-flex xs12>
                <DatePicker />
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import DatePicker from "./datePicker";
export default {
  components: {
    DatePicker,
  },
};
</script>