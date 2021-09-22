import axios from 'axios';

function getFamilyUserList() {
  return axios.get('/api/familyUsers')
          .then((response) => ({ response }))
          .catch((error) => ({ error }));
}

function updateFamilyUser(body) {
  return axios.put('/api/familyUsers', body)
          .then((response) => ({ response }))
          .catch((error) => ({ error }));
}

function activateFamilyUser(body) {
  return axios.post('/misc/activateUser', body)
          .then((response) => ({ response }))
          .catch((error) => ({ error }));
}

export { getFamilyUserList, updateFamilyUser, activateFamilyUser }