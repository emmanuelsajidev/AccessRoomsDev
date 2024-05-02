<template>
  <div>
    <vue-element-loading
      :active="$store.state.appLoading"
      :is-full-screen="!!!contain"
      background-color="#FFFFFF"
      color="black"
      spinner="bar-fade-scale"
    >
    </vue-element-loading>
  </div>
</template>
<script>
export default {
  props: ["contain"],
};
</script>