import axios from 'axios'
import { showAlert } from './alert';

// since server and client hosted on the same url, http://127.0.0.1:3000 is not needed before /api/v1/users/login, so remove it, and so removing it will act like a relative url

export const login = async (email, password) => {
 try {
  const res = await axios({
   method: 'POST',
   url: '/api/v1/users/login',
   data: {
    email,
    password
   }
  });
  console.log(res.data)

  if (res.data.status === 'success') {
   // First argument is for maniuplating Css
   showAlert('success', 'Logged In successFully')
   window.setTimeout(() => {
    location.assign('/')
   }, 1000)
  }

 } catch (error) {
  showAlert('error', error.response.data.message);
 }
}

export const logout = async () => {
 try {
  const res = await axios({
   method: 'GET',
   url: '/api/v1/users/logout'
  });

  // here reload is set to true, because it will force the reload from the server and not from browser
  if ((res.data.status = 'success')) {
   location.reload(true);
   // location.assign('/')
  }
 } catch (err) {
  console.log(err);
 }
};