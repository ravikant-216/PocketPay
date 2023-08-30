import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import HomePage from './pages/HomePage'

import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import SendMoneyPage from './pages/SendMoneyPage'
import RequireAuth from './utils/auth/RequireAuth'
import {
  HOME_PAGE,
  LOGIN_PAGE,
  SEND_MONEY_PAGE,
  SIGNUP_PAGE,
} from './strings/constants'

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={SIGNUP_PAGE} element={<SignUpPage />} />
          <Route path={LOGIN_PAGE} element={<LoginPage />} />

          <Route
            path={HOME_PAGE}
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path={SEND_MONEY_PAGE}
            element={
              <RequireAuth>
                <SendMoneyPage />
              </RequireAuth>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  )
}
