import axios from 'axios'
import store from '../store'
import router from "../router";

export { _axios, send_get_request, send_post_request, send_put_request }

const _axios = axios.create({
  baseURL:  process.env.API_URL ? process.env.API_URL : 'https://hotel-manager.ru/api',
  // baseURL:  process.env.API_URL ? process.env.API_URL : 'http://127.0.0.1:8000/api',
  withCredentials: false,
  headers: {
    Accept: "application/json"
  }
})

async function send_get_request(url) {
  let response_data = {
    success: false,
    data: ''
  }

  await _axios.get(url,{
    headers: {
      Authorization: 'Bearer ' + store.state.auth.token
    }
  }).then(response => {
    response_data.success = true;
    response_data.data = response.data;
  }).catch(errors=>{
    response_data.success = false;
    response_data.data = errors.response.data;
    if(response_data.response.status === 401){
      router.push('/sign_in');
    }
  });

  if((url === '/profile') && (response_data.success) && (response_data.data.user.users_role_id === 4)){
    response_data.success = false;
    response_data.data.message = 'У вас нет доступа к административной панели';
  }

  return response_data;
}

async function send_post_request(url, params) {
  let response_data = {
    success: false,
    data: ''
  }

  await _axios.post(url, params,{
    headers: {
      Authorization: 'Bearer ' + store.state.auth.token
    }
  }).then(response => {
    response_data.success = true;
    response_data.data = response.data;
  }).catch(errors=>{
    response_data.success = false;
    response_data.data = errors.response.data;
  });

  return response_data;
}

async function send_put_request(url, params) {
  let response_data = {
    success: false,
    data: ''
  }

  await _axios.put(url, params,{
    headers: {
      Authorization: 'Bearer ' + store.state.auth.token
    }
  }).then(response => {
    response_data.success = true;
    response_data.data = response.data;
  }).catch(errors=>{
    response_data.success = false;
    response_data.data = errors.response.data;
  });


  return response_data;
}

