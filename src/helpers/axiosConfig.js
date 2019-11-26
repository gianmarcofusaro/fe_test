import Axios from 'axios'


const axios = Axios.create({
  baseURL: `https://frontend-test-api-server.herokuapp.com/`
})


export const { get, post } = axios
