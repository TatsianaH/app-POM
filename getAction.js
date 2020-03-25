import axios from 'axios';

export default async function checkUrl(url) {
  return axios({
    method: 'GET',
    url,
  })
    .then(res => {
      return res.status;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}