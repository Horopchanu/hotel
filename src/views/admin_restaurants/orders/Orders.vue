<template>
  <div>
    <div v-if="restaurants.length">
      <template v-for="item in restaurants">
        <v-btn class="mr-5" :key="item.id" :class="[filter.restaurant_id == item.id ? 'primary' : '']" @click="set_restaurant(item.id)">{{ item.title }}</v-btn>
      </template>
      <v-btn class="mr-5" :class="[filter.restaurant_id === 0 ? 'primary' : '']" @click="set_restaurant(0)" v-if="restaurants.length > 1">Все рестораны</v-btn>
    </div>
    <hr class="mb-5 mt-5"/>
    <v-btn class="mr-5" :class="[filter.status === 2 ? 'primary' : '']" @click="set_status(2)">Новые и принятые</v-btn>
    <v-btn class="mr-5" :class="[filter.status === 4 ? 'primary' : '']" @click="set_status(4)">Выполненные</v-btn>
    <v-btn class="mr-5" :class="[filter.status === 3 ? 'primary' : '']" @click="set_status(3)">Отказ</v-btn>
    <v-btn class="mr-5" :class="[filter.status === 5 ? 'primary' : '']" @click="set_status(5)">Все</v-btn>

    <template v-if="loading">
      <div class="v-text-field--full-width text-center mt-5">
          <v-progress-circular
                  indeterminate
                  color="primary"
                  :size="50"
          ></v-progress-circular>
      </div>
    </template>

    <template v-else-if="orders.length">
      <v-simple-table >
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Статус
            </th>
            <th class="text-left">
              Тип
            </th>
            <th class="text-left">
              Ко времени
            </th>
            <th class="text-left">
              Ресторан
            </th>
            <th class="text-left">
              Приборы
            </th>
            <th class="text-left">
              Корпус
            </th>
            <th class="text-left">
              Комната
            </th>
            <th class="text-left">
              Телефона
            </th>
            <th class="text-left">
              Дата время заказа
            </th>
            <th class="text-left">
              Действия
            </th>
          </tr>
          </thead>
          <tbody>
            <tr
                    v-for="item in orders"
                    :key="item.name"
                    :class="{'green' : item.order_status.id === 1}"
            >
              <td class="text-left">{{ item.id }}</td>
              <td class="text-left">{{ item.order_status.value }}</td>
              <td class="text-left">{{ item.order_type.value }}</td>
              <td class="text-left">{{ item.delivery_at }}</td>
              <td class="text-left"><router-link :to="'/admin-restaurant/restaurants/' + item.restaurant.id">{{ item.restaurant.title }}</router-link></td>
              <td class="text-left">{{ item.people_counts }}</td>
              <td class="text-left">{{ item.corps }}</td>
              <td class="text-left">{{ item.room_number }}</td>
              <td class="text-left">{{ item.phone }}</td>
              <td class="text-left">{{ parser_date(item.created_at) }}</td>
              <td class="text-left"><v-btn @click="$router.push('/admin-restaurant/orders/' + item.id)"><v-icon small>mdi-pencil-outline</v-icon></v-btn></td>
            </tr>
          </tbody>

        </template>
      </v-simple-table>
      <p class="mt-5 ">Показано {{ orders.length }} из {{ pagination.total }}</p>
      <div class="v-text-field--full-width text-center mt-5" v-if="orders.length < parseInt(pagination.total)">
        <vue-cli-laravel-pagination :data="pagination" align="center" :onChange="changed_value" buttonLimit="20" prevBtn="Пред." nextBtn="След."></vue-cli-laravel-pagination>
      </div>
    </template>

    <template v-else>
      <div class="v-text-field--full-width text-center mt-5">
          Список пуст
      </div>
    </template>
  </div>
</template>

<script>
  import { send_get_request } from '../../../utils/Axios-common'
  import moment from 'moment'

  export default {
    name: "Orders",
    data: () => {
      return {
        loading: false,
        orders: [],
        filter: {
          page: 1,
          status: 2,
          restaurant_id: 1,
        },
        pagination: null,
        restaurants: [],

      }
    },
    mounted() {
      this.get_restaurants()
      this.get_orders();
      let self = this;
      moment.locale('ru');
      setInterval(() => {
        self.get_orders();
      }, 10000);
    },
    methods:{
      async get_orders(){
        this.loading = true;
        let rest_data = await send_get_request('/admin/orders' + '?order_status=' + this.filter.status + '&restaurant_id=' + this.filter.restaurant_id + '&page=' + this.filter.page);
        this.pagination = rest_data.data.orders;
        this.orders = rest_data.data.orders.data;
        this.loading = false;
      },
      set_status(status_id){
        this.filter.status = status_id;
        this.get_orders();
      },
      set_restaurant(restaurant_id){
        this.filter.restaurant_id = restaurant_id;
        this.get_orders();
      },
      async get_restaurants(){
        let rest_data = await send_get_request('/admin/orders/get_restaurants_for_orders');
        this.restaurants = rest_data.data.restaurants;
        this.restaurants.length ? this.filter.restaurant_id = this.restaurants[0].id : this.filter.restaurant_id = 0
        this.get_orders();
      },
      changed_value(options){
        this.filter.page = options.page;
        this.get_orders();
      },
      parser_date(date){
        return moment(date).format('DD.MM.YYYY, h:mm')
      }
    }
  }
</script>

<style scoped>

</style>