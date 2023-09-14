import { ThemeProvider } from '@emotion/react'
import '@testing-library/jest-dom'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'
import HomePage from '.'
import theme from '../../theme'
import {
  BENEFICIARY_API,
  TRANSACTION_API,
  USER_API,
  baseURL,
} from '../../strings/constants'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../utils/store'

jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>
jest.useFakeTimers()
describe('HomePage', () => {
  it('should render the transactions when the transaction list is not empty', async () => {
    act(() => {
      axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/${BENEFICIARY_API}`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  email: 'mario.gabriel@gmail.com',
                  accountNumber: '123456885865',
                  ifsc: 'ABFJ12929GH',
                  userId: 2,
                },
              ],
            })

          case `${baseURL}/${TRANSACTION_API}`:
            return Promise.resolve({
              data: [
                {
                  referenceNumber: '78436875346',
                  status: 'PENDING',
                  time: '2023-08-28T09:33:21.086Z',
                  sendingAmount: 11,
                  recievingAmount: 12.884,
                  sendingCurrencyCode: 'GBP',
                  recievingCurrencyCode: 'EUR',
                  userId: 1,
                  recipientId: 1,
                  id: 2,
                },
              ],
            })
          case `${baseURL}/${USER_API}/1`:
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
            <MemoryRouter
              initialEntries={[
                'http://localhost:3001/dashboard',
                { state: { id: 1 } },
              ]}
            >
              <HomePage />
            </MemoryRouter>
          </Provider>
        </ThemeProvider>
      )
    })

    jest.advanceTimersByTime(2500)
    expect(await screen.findByTestId('transactionDetails')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('sendMoneyButton'))
  })

  it('should render the non-transaction state when the transaction list is empty', async () => {
    act(() => {
      axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/${BENEFICIARY_API}`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  email: 'mario.gabriel@gmail.com',
                  accountNumber: '123456885865',
                  ifsc: 'ABFJ12929GH',
                  userId: 1,
                  firstName: 'Mario',
                  lastName: 'Gabriel',
                },
              ],
            })

          case `${baseURL}/${TRANSACTION_API}`:
            return Promise.resolve({
              data: [],
            })
          case `${baseURL}/${USER_API}/1`:
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
            <MemoryRouter
              initialEntries={[
                'http://localhost:3001/dashboard',
                { state: { id: 1, newUser: true } },
              ]}
            >
              <HomePage />
            </MemoryRouter>
          </Provider>
        </ThemeProvider>
      )
    })

    jest.advanceTimersByTime(4000)
    const image = await screen.findByTestId('illustration')
    expect(image).toBeInTheDocument()
  }, 13000)

  it('should show the receiver name when receiver name is given', async () => {
    act(() => {
      axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/${BENEFICIARY_API}`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  email: 'mario.gabriel@gmail.com',
                  accountNumber: '123456885865',
                  ifsc: 'ABFJ12929GH',
                  userId: 1,
                  firstName: 'Mario',
                  lastName: 'Gabriel',
                },
              ],
            })

          case `${baseURL}/${TRANSACTION_API}`:
            return Promise.resolve({
              data: [
                {
                  referenceNumber: '78436875346',
                  status: 'PENDING',
                  time: '2023-08-28T09:33:21.086Z',
                  sendingAmount: 11,
                  recievingAmount: 12.884,
                  sendingCurrencyCode: 'GBP',
                  recievingCurrencyCode: 'EUR',
                  userId: 1,
                  recipientId: 1,
                  id: 2,
                },
              ],
            })
          case `${baseURL}/${USER_API}/1`:
            return Promise.resolve({
              data: [
                {
                  firstName: 'Ross',
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
            <MemoryRouter
              initialEntries={[
                'http://localhost:3001/dashboard',
                { state: { id: 1 } },
              ]}
            >
              <HomePage />
            </MemoryRouter>
          </Provider>
        </ThemeProvider>
      )
    })

    jest.advanceTimersByTime(4000)

    expect(await screen.findByTestId('transactionDetails')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('sendMoneyButton'))
  }, 13000)
})
