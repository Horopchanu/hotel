<template>
    <v-app-bar density="compact">
      <v-app-bar-title>Hotel-manager</v-app-bar-title>
      <v-spacer></v-spacer>
<!--      <router-link to="/admin-restaurant/restaurants">-->
<!--        <v-btn text>Рестораны</v-btn>-->
<!--      </router-link>-->
      <router-link to="/admin-restaurant/orders">
        <v-btn text>Заказы</v-btn>
      </router-link>
      |
      <a @click.prevent="logout">
        <v-btn text color="red">Выход</v-btn>
      </a>
      <!--<router-link to="/admin-restaurant/food-categories">
        <v-btn text>Категории блюд</v-btn>
      </router-link>
      <router-link to="/admin-restaurant/foods">
        <v-btn text>Блюда</v-btn>
      </router-link>
      <router-link to="/admin-restaurant/ingredients">
        <v-btn text>Ингредиенты</v-btn>
      </router-link>
      <router-link to="/admin-restaurant/statistics">
        <v-btn class="mr-3" text>Статистика</v-btn>
      </router-link>-->
    </v-app-bar>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "RestaurantsHeader",
    methods:{
      ...mapActions({
        logout: "auth/logout",
      }),
    }
  }
</script>

<style scoped>
  .header{
    display: block;
  }
</style>