import axios from 'axios';
import { showAlert } from './alerts';

export async function login(email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'Success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
}

export const logout = async function () {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'Success') location.reload(true);
  } catch (error) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
