import axios from 'axios';

function login(body) {
  return axios.post('/validate/authenticate', body)
          .then((response) => ({ response }))
          .catch((error) => ({ error }));
}

function apiValidate(body) {
  return axios.post('/validate/validate', body)
          .then((response) => ({ response }))
          .catch((error) => ({ error }));
}

// AXIOS CONFIG

function setupAuth(token) {
  setToken(token);
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  console.info("Axios has been setup");
}

function setToken(token) {
  localStorage.setItem('TOKEN', token)
}

function getToken() {
  return localStorage.getItem('TOKEN');
}

function removeToken() {
  localStorage.removeItem('TOKEN');
  axios.defaults.headers.common.Authorization = null;
  console.info("Axios has been removing token");
}

export { login, apiValidate, setupAuth, getToken, removeToken };