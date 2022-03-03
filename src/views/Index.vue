<template>
  <div>
    <MainHeader />
    <v-container class="mt-5">
      <v-row justify="space-between" class="mr-auto ml-auto">
        <router-link to="/admin-restaurant/orders"><v-btn class="primary">Рестораны</v-btn></router-link>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import MainHeader from "../components/layouts/MainHeader";
  export default {
    name: "Index",
    components: {MainHeader}
  }
</script>

<style scoped>
  
</style>