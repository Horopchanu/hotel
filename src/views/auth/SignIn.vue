<template>
  <div>
    <v-app-bar>
      <v-app-bar-title>Hotel-Manager</v-app-bar-title>
    </v-app-bar>
    <v-container>
      <v-row justify="space-around">
        <v-col
          cols="12"
          md="3"
          class="mt-14"
        >
          <v-sheet
            class="pa-5"
            color="lighten-3"
            elevation="12"
          >
            <h2>Авторизация</h2>
            <v-text-field
              :label="'Логин(email или телефон)'"
              v-model="form.login"
              :placeholde="'Email или телефон'"
            >
            </v-text-field>

            <v-text-field
                    :label="'Пароль'"
                    :type="'password'"
                    v-model="form.password"
                    :placeholde="'Email или телефон'"
            >
            </v-text-field>
            <span class="red--text" v-if="errors">{{ errors }}</span>
            <v-spacer></v-spacer>
            <v-btn class="primary" :disabled="loading" @click="send_form"><span v-if="!loading">Вход</span>
              <v-progress-circular
                      indeterminate
                      color="primary"
                      :size="20"
                      v-else
              ></v-progress-circular>
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { signIn } from '../../utils/Auth-api'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: "SignIn",
    data(){
      return {
        form: {
          login: '',
          password: '',
        },
        loading: false,
        errors: ''
      }
    },
    computed:{
      ...mapGetters({
        token: "auth/token",
        user: "auth/user"
      })
    },
    mounted(){
      this.get_user_data();
      if(this.token){
        this.$router.push('/admin-restaurant/orders')
      }
      window.addEventListener('keyup', this.register_enter);
    },
    methods:{
      ...mapActions({
        set_user_data: "auth/set_user_data",
        get_user_data: "auth/get_user_data"
      }),
      register_enter(e){
        if (e.keyCode === 13) {
          this.send_form();
        }
      },
      async send_form(){
        this.errors = '';
        this.loading = true;

        let params = {
          login: this.form.login,
          password: this.form.password
        }
        let res = await signIn(params);

        if(res.success){
          this.set_user_data(res.data)
          this.$router.push('/admin-restaurant/orders')
        } else {
          this.errors = res.data.message;
        }

        this.loading = false;
      }
    }

  }
</script>

<style scoped>

</style>