import axios from 'axios'

const request = axios.create({
  baseURL: "https://62238cbc3af069a0f9a5013b.mockapi.io/onoffshop/",
});

export default request