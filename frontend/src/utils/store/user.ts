import { createSlice } from '@reduxjs/toolkit'

export const User = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    loginUser(state, payload) {
      return { ...state, user: payload.payload }
    },
    logoutUser(state) {
      return { ...state, user: null }
    },
  },
})

export const userActions = User.actions
