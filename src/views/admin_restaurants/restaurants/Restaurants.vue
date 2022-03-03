<template>
  <div>
    <v-simple-table >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Название
            </th>
            <th class="text-left">
              Время работы
            </th>
            <th class="text-left">
              Рейтинг
            </th>
            <th class="text-left">
              Активен
            </th>
            <th class="text-left">
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
        <template v-if="loading">
          <tr>
            <td colspan="6" class="text-center pt-5">
              <v-progress-circular
                      indeterminate
                      color="primary"
                      :size="50"
              ></v-progress-circular>
            </td>
          </tr>
        </template>

        <template v-else-if="restaurants.length">
          <tr
            v-for="item in restaurants"
            :key="item.name"
          >
            <td class="text-left">{{ item.id }}</td>
            <td class="text-left">{{ item.title }}</td>
            <td class="text-left">{{ item.open_time }} - {{ item.close_time }}</td>
            <td class="text-left">{{ item.rating }}</td>
            <td class="text-left">{{ item.active }}</td>
            <td class="text-left"><v-btn @click="$router.push('/admin-restaurant/restaurants/' + item.id)"><v-icon small>mdi-pencil-outline</v-icon></v-btn></td>
          </tr>
        </template>

        <template v-else>
          <tr>
            <td colspan="6">
              Список пуст
            </td>
          </tr>
        </template>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
  import { send_get_request } from '../../../utils/Axios-common'

  export default {
    name: "Restaurants",
    data: () => {
      return {
        loading: false,
        restaurants: [],
      }
    },
    async mounted() {
      this.loading = true;
      let rest_data = await send_get_request('/admin/restaurants');
      this.restaurants = rest_data.data.data;
      this.loading = false;
    }
  }
</script>

<style scoped>
</style>