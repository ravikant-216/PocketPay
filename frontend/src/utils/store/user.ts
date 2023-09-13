import { createSlice } from '@reduxjs/toolkit'

export const User = createSlice({
  name: 'user',
  initialState: { user: null, token: null },
  reducers: {
    loginUser(state, payload) {
      return { ...state, ...payload.payload }
    },
    logoutUser(state) {
      return { ...state, user: null, token: null }
    },
  },
})

export const userActions = User.actions
