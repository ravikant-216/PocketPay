import { ThemeProvider } from '@emotion/react'
import '@testing-library/jest-dom'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'
import HomePage from '.'
import theme from '../../theme'
import { baseURL } from '../../strings/constants'
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>

describe('HomePage', () => {
  it('should render the transactions when the transaction list is not empty', async () => {
    act(() => {
      axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/beneficiary`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  email: 'mario.gabriel@gmail.com',
                  account: '123456885865',
                  ifsc: 'ABFJ12929GH',
                  userId: 2,
                },
              ],
            })

          case `${baseURL}/transaction`:
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
          <MemoryRouter
            initialEntries={[
              'http://localhost:3001/dashboard',
              { state: { id: 1 } },
            ]}
          >
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      )
    })

    expect(await screen.findByTestId('transactionDetails')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('sendMoneyButton'))
  })
  it('should render the non transaction state when transaction list is empty', () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        data: [],
      })
      render(
        <ThemeProvider theme={theme}>
          <MemoryRouter
            initialEntries={[
              'http://localhost:3001/dashboard',
              { state: { id: 1, newUser: true } },
            ]}
          >
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      )
    })
    const image = screen.getByTestId('illustration')
    expect(image).toBeInTheDocument()
  }, 13000)

  it('should show the reciever name when recievr name is given', async () => {
    act(() => {
      axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/beneficiary`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  email: 'mario.gabriel@gmail.com',
                  account: '123456885865',
                  ifsc: 'ABFJ12929GH',
                  userId: 1,
                  firstName: 'Mario',
                  lastName: 'Gabriel',
                },
              ],
            })

          case `${baseURL}/transaction`:
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
          <MemoryRouter
            initialEntries={[
              'http://localhost:3001/dashboard',
              { state: { id: 1 } },
            ]}
          >
            <HomePage />
          </MemoryRouter>
        </ThemeProvider>
      )
    })

    expect(await screen.findByTestId('transactionDetails')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('sendMoneyButton'))
    expect(await screen.findByText('Mario Gabriel')).toBeInTheDocument()
  }, 13000)
})
