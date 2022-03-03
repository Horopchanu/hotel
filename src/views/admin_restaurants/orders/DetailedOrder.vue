<template>
  <div>
    <template v-if="order !== null">
      <v-btn class="primary mb-5" @click="go_back">Назад</v-btn>
      <p class="green--text" v-if="success_update">Заказ обновлен</p>
      <v-form @submit.prevent="send_form" name="save_orders">
        <div class="row">
          <div class="col-6">
            <v-text-field label="ID" v-model="order.id" disabled></v-text-field>
            <v-text-field label="Имя пользователя" v-model="order.user.first_name" disabled></v-text-field>
            <v-text-field label="Телефон" v-model="order.user.phone" disabled></v-text-field>
            <v-text-field label="Количество людей" v-model="order.people_counts"></v-text-field>
            <v-text-field label="Корпус" v-model="order.corps"></v-text-field>
            <v-text-field label="Номер комнаты" v-model="order.room_number"></v-text-field>
            <v-text-field label="Общая стоимость" v-model="order.full_price" disabled></v-text-field>

            <v-btn class="primary" :disabled="loading" @click="send_form"><span v-if="!loading">Сохранить</span>
              <v-progress-circular
                      indeterminate
                      color="primary"
                      :size="20"
                      v-else
              ></v-progress-circular>
            </v-btn>
          </div>
          <div class="col-6">
            <v-text-field label="Ресторан" v-model="order.restaurant.title" disabled></v-text-field>
            <v-textarea
                    v-model="order.comment"
                    label="Комментарий"
            ></v-textarea>

            <v-select
                    v-model="order.order_status"
                    :items="order_status_list"
                    item-text="value"
                    item-value="id"
                    label="Статус заказа"
                    return-object
                    chips
                    hint="Выберите статус заказа"
            ></v-select>
            <v-text-field label="Доставить к" v-model="order.delivery_at"></v-text-field>
            <v-select
                    v-model="order.order_type"
                    :items="order_types_list"
                    item-text="value"
                    item-value="id"
                    label="Тип заказа"
                    return-object
                    chips
                    hint="Выберите тип заказа"
            ></v-select>
            <p>Cоздан в <b>{{ parser_date(order.created_at) }}</b></p>

            <v-textarea
                    v-model="order.reject_reason"
                    label="Причина отказа"
                    v-if="order.order_status.id === 3"
            ></v-textarea>
            <p v-if="errors.reject_reason" color="red">{{ errors.reject_reason }}</p>

          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <v-simple-table >
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">
                    ID
                  </th>
                  <th class="text-left">
                    Изображение
                  </th>
                  <th class="text-left">
                    Название
                  </th>
                  <th class="text-left">
                    Вес
                  </th>
                  <th class="text-left">
                    Цена
                  </th>
                  <th class="text-left">
                    Количество
                  </th>
                  <th class="text-left">
                    Общая цена
                  </th>
                  <!--<th class="text-left">
                    Действия
                  </th>-->
                </tr>
                </thead>
                <tbody v-if="order.foods.length">
                  <tr

                    v-for="(item, index) in order.foods"
                    :key="index"

                  >
                    <td class="text-left">{{ item.food.id }}</td>
                    <td class="text-left"><img :src="item.food.preview" height="30" alt=""></td>
                    <td class="text-left"><router-link :to="'/admin-restaurant/foods/' + item.food.id">{{ item.food.title }}</router-link></td>
                    <td class="text-left">{{ item.food.weight }}</td>
                    <td class="text-left">
                      <template v-if="item.food.discount_price">
                        <span style="text-decoration: line-through">{{ item.food.price}}</span> {{ item.food.discount_price }}
                      </template>
                      <template v-else>
                        {{ item.food.price}}
                      </template>
                    </td>
                    <td class="text-left"><input type="number" style="border-bottom: 1px solid rgba(0,0,0,0.5)" v-model="item.quantity" disabled></td>
                    <td class="text-left">{{ get_full_price(index) }}</td>
<!--                    <td class="text-left"><v-btn @click="remove_food(index)" color="red"><v-icon small>mdi-delete</v-icon></v-btn></td>-->
                  </tr>
                </tbody>
                <tbody  v-else>
                  <tr>
                    <td colspan="8" class="text-center">Список пуст</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>

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
  import {send_get_request, send_put_request} from "../../../utils/Axios-common";
  import moment from "moment";
  import router from "../../../router";

  export default {
    name: "DetailedOrder",
    data: () => {
      return {
        loading: false,
        order: null,
        order_status_list: [],
        order_types_list: [],
        errors:{
          reject_reason: ''
        },
        success_update: ''
      }
    },
    async mounted() {
      this.loading = true;
      let rest_data = await send_get_request('/admin/orders/' + this.$route.params.id);
      this.order = rest_data.data.order;
      // console.log(this.order);
      this.loading = false;
      this.get_order_status_list();
      this.get_order_types_list();
    },
    methods:{
      go_back(){
        router.push('/admin-restaurant/orders');
      },

      async send_form(){
        this.errors.reject_reason = '';
        this.success_update = '';

        if(this.order.order_status.id == 3 && this.order.reject_reason == ''){
          this.errors.reject_reason = 'Укажите причину отмены'
          return;
        }

        this.loading = true;
        let res = await send_put_request('/admin/orders/' + this.order.id, this.order);
        if(res.success){
          this.success_update = 'Заказ обновлен';
        }

        this.loading = false;
      },

      async get_order_status_list(){
        let rest_data = await send_get_request('/admin/get_order_status_list');
        this.order_status_list = rest_data.data.statuses;
      },

      async get_order_types_list(){
        let rest_data = await send_get_request('/admin/get_order_types_list');
        this.order_types_list = rest_data.data.types;
      },

      get_full_price(i){
        let food = this.order.foods[i].food;
        let quantity = this.order.foods[i].quantity;
        if(food.discount_price){
          return food.discount_price * quantity;
        } else {
          return food.price * quantity;
        }
      },

      parser_date(date){
        return moment(date).format('DD.MM.YYYY, h:mm')
      },

      /*remove_food(index){
        let food = this.order.foods[index].food;
        let result = confirm('Удалить блюдо "' + food.title + '" из заказа?');

        if(result){
          this.order.foods.splice(index, 1);
        }
      },*/

      /*change_food(id){
        let rest_data = await send_get_request('/admin/change_order_food');
        this.order_status_list = rest_data.data.statuses;
      }*/
    }
  }
</script>

<style scoped>

</style>