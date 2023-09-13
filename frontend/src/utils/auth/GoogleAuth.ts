import { User } from '@auth0/auth0-react'
import axios from 'axios'
import {
  AUTH_LOGIN_API,
  AUTH_SIGNUP_API,
  USER_API,
  baseURL,
} from '../../strings/constants'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const loginWithGoogleAuth = async (user: User) => {
  let d = null
  try {
    const { data } = await axios.get(
      `${baseURL}/${USER_API}?email=${user.email}`
    )
    d = data
  } catch (err) {
    console.log(err)
    const newUser = {
      firstName: user.given_name,
      lastName: user.family_name,
      address: '122-Baker street',
      email: user.email,
      dateOfBirth: '2002-08-03',
      accountType: 'Business Account',
      password: user.email,
    }
    const { data } = await axios.post(`${baseURL}/${AUTH_SIGNUP_API}`, newUser)
    d = data
  }

  const response = await axios.post(`${baseURL}/${AUTH_LOGIN_API}`, {
    email: d.email,
    password: d.email,
  })
  return { user: d, token: response.data.token }
}
