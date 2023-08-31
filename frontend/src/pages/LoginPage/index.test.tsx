import React from 'react'
import { render, fireEvent, cleanup, act, screen } from '@testing-library/react'
import { LoginPage } from '.'
import theme from '../../theme'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '../../strings/constants'
import { Provider } from 'react-redux'
import { store } from '../../utils/store'

jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>

describe('LoginPage', () => {
  it('should call onSubmit with email and password when form is submitted', () => {
    act(() => {
      axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/user`:
            return Promise.resolve({
              data: [
                {
                  first_name: 'Ross',
                  last_name: 'Gener',
                  country: 'Andorra',
                  address: '122-Baker street',
                  email: 'ross.gener@gmail.com',
                  dob: '2023-08-03',
                  account_type: 'Personal Account',
                  password: '12345678',
                  id: 1,
                },
              ],
            })

          default:
            return Promise.resolve([{}])
        }
      })
      render(
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <LoginPage />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      )
    })

    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'rss.gener@gmail.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: '12345678' },
    })
    fireEvent.click(screen.getByText('Sign In'))

    expect(screen.getByPlaceholderText('Enter your email address')).toHaveValue(
      'rss.gener@gmail.com'
    )
  })

  it('should call onSubmit with email and password when form is submitted', () => {
    act(() => {
      axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/user`:
            return Promise.resolve({
              data: [
                {
                  first_name: 'Ross',
                  last_name: 'Gener',
                  country: 'Andorra',
                  address: '122-Baker street',
                  email: 'ross.gener@gmail.com',
                  dob: '2023-08-03',
                  account_type: 'Personal Account',
                  password: '12345678',
                  id: 1,
                },
              ],
            })

          default:
            return Promise.resolve([{}])
        }
      })
      render(
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <LoginPage />
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      )
    })

    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'ross.gener@gmail.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: '12345678' },
    })
    fireEvent.click(screen.getByText('Sign In'))

    expect(screen.getByPlaceholderText('Enter your email address')).toHaveValue(
      'ross.gener@gmail.com'
    )
  })
})
