<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: 'App',

  data: () => ({
    //
  }),
  async created(){
    await this.get_user_data();
  },
  methods: {
    ...mapActions({
      get_user_data: "auth/get_user_data"
    }),
  }
};
</script>
<style>
  .v-app-bar-title__content{
    width: 10%;
  }
</style>
