import Vue from 'vue'
import Index from "../views/Index";
import VueRouter from 'vue-router'
import AdminRestaurants from "../views/admin_restaurants/Index";
import FoodCategoryIndex from "../views/admin_restaurants/food-categories/Index";
import FoodsIndex from "../views/admin_restaurants/foods/Index";
import IngredientsIndex from "../views/admin_restaurants/ingredients/Index";
import OrdersIndex from "../views/admin_restaurants/orders/Index";
import RestaurantsListIndex from "../views/admin_restaurants/restaurants/Index";
import Restaurants from "../views/admin_restaurants/restaurants/Restaurants";
import FoodCategories from "../views/admin_restaurants/food-categories/FoodCategories";
import Statistics from "../views/admin_restaurants/Statistics";
import Foods from "../views/admin_restaurants/foods/Foods";
import Ingredients from "../views/admin_restaurants/ingredients/Ingredients";
import Orders from "../views/admin_restaurants/orders/Orders";
import DetailedFoodCategory from "../views/admin_restaurants/food-categories/DetailedFoodCategory";
import DetailedFood from "../views/admin_restaurants/foods/DetailedFood";
import DetailedIngredient from "../views/admin_restaurants/ingredients/DetailedIngredient";
import DetailedOrder from "../views/admin_restaurants/orders/DetailedOrder";
import DetailedRestaurant from "../views/admin_restaurants/restaurants/DetailedRestaurant";
import SignIn from "../views/auth/SignIn";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/sign_in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/admin-restaurant',
    name: 'AdminRestaurants',
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: AdminRestaurants,
    children: [
      {
        path: 'restaurants',
        component: RestaurantsListIndex,
        children: [
          {
            path: '', component: Restaurants,
          },
          {
            path: ':id', component: DetailedRestaurant,
          }
        ]
      },
      {
        path: 'food-categories',
        component: FoodCategoryIndex,
        children: [
          {
            path: '', component: FoodCategories,
          },
          {
            path: ':id', component: DetailedFoodCategory,
          }
        ]
      },
      {
        path: 'foods',
        component: FoodsIndex,
        children: [
          {
            path: '', component: Foods,
          },
          {
            path: ':id', component: DetailedFood,
          }
        ]
      },
      {
        path: 'ingredients',
        component: IngredientsIndex,
        children: [
          {
            path: '', component: Ingredients,
          },
          {
            path: ':id', component: DetailedIngredient,
          }
        ]
      },
      {
        path: 'orders',
        component: OrdersIndex,
        children: [
          {
            path: '', component: Orders,
          },
          {
            path: ':id', component: DetailedOrder,
          }
        ]
      },
      {
        path: 'statistics', component: Statistics,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
