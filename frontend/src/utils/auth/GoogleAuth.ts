import { User } from '@auth0/auth0-react'
import axios from 'axios'
import { baseURL } from '../../strings/constants'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const loginWithGoogleAuth = async (user: User) => {
  try {
    const { data } = await axios.get(`${baseURL}/user?email=${user.email}`)
    if (data.length !== 0) {
      return data[0]
    } else {
      const newUser = {
        first_name: user.given_name,
        last_name: user.family_name,
        country: 'India',
        address: '122-Baker street',
        email: user.email,
        dob: '2002-08-03',
        account_type: 'Personal Account',
        password: user.email,
      }
      const { data } = await axios.post(`${baseURL}/user`, newUser)
      return data
    }
  } catch (err) {
    console.log(err)
  }
}
