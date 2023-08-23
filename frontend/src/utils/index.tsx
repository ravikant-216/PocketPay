import axios from 'axios'
import { baseURL } from '../strings/constants'

const API = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default API
