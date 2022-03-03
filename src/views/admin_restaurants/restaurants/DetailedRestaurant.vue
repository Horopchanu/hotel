<template>
  <div>
    <template v-if="restaurant !== null">
      <v-form @submit.prevent="send_form" name="save_restaurants">
        <v-text-field label="ID" v-model="restaurant.id" disabled></v-text-field>
        <v-text-field label="Название" v-model="restaurant.title"></v-text-field>
        <v-text-field label="Описание" v-model="restaurant.descriptions"></v-text-field>
        <v-text-field label="Телефон" v-model="restaurant.phone"></v-text-field>
        <v-text-field label="Время открытия" v-model="restaurant.open_time"></v-text-field>
        <v-text-field label="Время закрытия" v-model="restaurant.close_time"></v-text-field>
        <v-text-field label="Время доставки" v-model="restaurant.delivery_time"></v-text-field>
        <v-text-field label="Рейтинг" v-model="restaurant.rating"></v-text-field>
        <v-select
          v-model="restaurant.cuisines"
          :items="cuisines_list"
          item-text="title"
          item-value="id"
          label="Кухни"
          multiple
          return-object
          chips
          hint="Выберите кухни"
        ></v-select>

        <v-img
          max-height="150"
          max-width="250"
          :src="restaurant.preview"
        ></v-img>

        <v-file-input
          chips
          show-size
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          small-chips
          name="preview"
          v-model="image"
          @change="log"
        ></v-file-input>

        <v-btn class="primary" :disabled="loading" @click="send_form"><span v-if="!loading">Сохранить</span>
          <v-progress-circular
                  indeterminate
                  color="primary"
                  :size="20"
                  v-else
          ></v-progress-circular>
        </v-btn>
      </v-form>
    </template>
    <template v-else>
      <div class="text-center pt-5">
        <v-progress-circular
                indeterminate
                color="primary"
                :size="50"
        ></v-progress-circular>
      </div>
    </template>
  </div>
</template>

<script>
  import { send_get_request, send_put_request } from '../../../utils/Axios-common'
  import { image_to_base64 } from "../../../utils/Img-converter";

  export default {
    name: "DetailedRestaurant",
    data: () => {
      return {
        restaurant: {
          title: null,
          cuisines: null,
          descriptions: null,
          open_time: null,
          close_time: null,
          rating: null,
          room_service: null,
          preview: null,
          active: null,
          managers: null,
          phone: null,
          delivery_time: null,
          new_image: null,
        },
        image: null,
        cuisines_list: null,
        loading: false,
      }
    },
    async mounted() {
      let restaurant_data = await send_get_request('/admin/restaurants/' + this.$route.params.id);
      this.restaurant = restaurant_data.data.restaurant;
      this.get_cuisines();
    },
    methods:{
      log(){
        console.log(this.image);
      },
      async get_cuisines(){
        let res_cuisines = await send_get_request('/admin/get_cuisines');
        this.cuisines_list = res_cuisines.data.data;
      },
      async send_form(){
        if(this.image){
          this.restaurant.new_image = await image_to_base64(this.image);
          console.log('this.restaurant.new_image', this.restaurant.new_image);
        }

         let params = this.restaurant;

         let save_res = await send_put_request('/admin/restaurants/' + this.restaurant.id, params);
         console.log('save_res', save_res);
      }
    }
  }
</script>

<style scoped>

</style>