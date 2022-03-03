import { _axios } from "../utils/Axios-common";

export { signIn }


async function signIn(params) {
  let response_data = {
    success: false,
    data: ''
  }

  await _axios.post('/sign_in', params).then(response => {
    response_data.success = true;
    response_data.data = response.data;
  }).catch(errors=>{
    response_data.success = false;
    response_data.data = errors.response.data;
  });

  if((response_data.success) && (response_data.data.user.users_role_id === 4)){
    response_data.success = false;
    response_data.data.message = 'У вас нет доступа к административной панели';
  }

  return response_data;
}

