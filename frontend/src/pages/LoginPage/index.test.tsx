import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  act,
  screen,
  waitFor,
} from '@testing-library/react'
import { LoginPage } from '.'
import theme from '../../theme'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { AUTH_LOGIN_API, USER_API, baseURL } from '../../strings/constants'
import { store } from '../../utils/store'
import { userActions } from '../../utils/store/user'
import { useDispatch, Provider } from 'react-redux'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

const mockDispatch = jest.fn()
;(useDispatch as jest.Mock).mockReturnValue(mockDispatch)

jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

describe('LoginPage', () => {
  it('should call handleLogin with email and password when form is submitted', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        firstName: 'Ross',
        lastName: 'Gener',
        address: '122-Baker street',
        email: 'ross.gener@gmail.com',
        dateOfBirth: '2023-08-03',
        account_type: 'Personal Account',
        password: 'ross@12345',
        id: 1,
      },
    })

    axiosMock.post.mockImplementation((url) => {
      switch (url) {
        case `${baseURL}/${AUTH_LOGIN_API}`:
          return Promise.resolve({
            data: {
              token: 'token',
            },
          })

        default:
          return Promise.resolve({})
      }
    })

    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    )

    fireEvent.change(getByPlaceholderText('Enter your email address'), {
      target: { value: 'ross.gener@gmail.com' },
    })
    fireEvent.change(getByPlaceholderText('Enter your password'), {
      target: { value: 'ross@12345' },
    })
    fireEvent.click(getByText('Sign In'))

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        userActions.loginUser({
          user: {
            firstName: 'Ross',
            lastName: 'Gener',
            address: '122-Baker street',
            email: 'ross.gener@gmail.com',
            dateOfBirth: '2023-08-03',
            account_type: 'Personal Account',
            password: 'ross@12345',
            id: 1,
          },
          token: 'token',
        })
      )
    })
  })

  it('should call onSubmit with email and password when form is submitted', () => {
    act(() => {
      axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/${USER_API}?email=ross.gener@gmail.com`:
            return Promise.resolve({
              data: [
                {
                  firstName: 'Ross',
                  lastName: 'Gener',
                  address: '122-Baker street',
                  email: 'ross.gener@gmail.com',
                  dateOfBirth: new Date('2023-08-03T00:00:00.000Z'),
                  accountType: 'Personal Account',
                  password: 'ross@12345',
                  id: 1,
                },
              ],
            })

          default:
            return Promise.resolve([{}])
        }
      })
      axiosMock.post.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/${AUTH_LOGIN_API}`:
            return Promise.resolve({
              data: {
                token: 'token',
              },
            })

          default:
            return Promise.resolve({})
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
      target: { value: 'ross@12345' },
    })
    fireEvent.click(screen.getByText('Sign In'))

    expect(screen.getByPlaceholderText('Enter your email address')).toHaveValue(
      'rss.gener@gmail.com'
    )
  })
})
