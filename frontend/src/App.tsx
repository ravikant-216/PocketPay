import { Route, Routes } from 'react-router-dom'
import './App.css'

import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import { SignUpPage } from './pages/SignUpPage'
import { LoginPage } from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SendMoneyPage from './pages/SendMoneyPage'

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/sendMoney" element={<SendMoneyPage />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}
