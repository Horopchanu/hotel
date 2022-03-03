<template>
  <div>
    <RestaurantsHeader />
    <v-container class="mt-5">
        <router-view />
    </v-container>
  </div>
</template>

<script>
  import RestaurantsHeader from "../../components/layouts/RestaurantsHeader";

  export default {
    name: "Index",
    components: {
      RestaurantsHeader
    }
  }
</script>

<style scoped>
  .wrapper{
    width: 100%;
  }
  
</style>