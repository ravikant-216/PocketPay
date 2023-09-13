import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { AccountDetailPage } from '.'
import theme from '../../theme'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@emotion/react'
import {
  API_URL,
  BUSINESSES,
  BUSINESSES_CATEGORY,
  DOB,
  baseURL,
} from '../../strings/constants'
import axios from 'axios'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'

jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>

describe('AccountDetailPage', () => {
  const names = [
    {
      key: 'India',
      iconTitle: 'India',
      src: '/path/to/india/flag/image',
      alt: 'India Flag',
    },
  ]
  const mockFunction = jest.fn()
  test('renders AccountVerification component after clicking on ConfirmTradingAddress', async () => {
    act(() => {
      axiosMock.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/${BUSINESSES_CATEGORY}`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  name: 'Design, marketing or communication',
                },
                {
                  id: 2,
                  name: 'Health, sports or personal care',
                },
                {
                  id: 3,
                  name: 'Real estate or construction',
                },
                {
                  id: 4,
                  name: 'Education or learning',
                },
                {
                  id: 5,
                  name: 'Others',
                },
              ],
            })

          case `${API_URL}/address`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  name: '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
                },
              ],
            })

          default:
            return Promise.resolve({})
        }
      })
      render(
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AccountDetailPage
              buttonOnClick={mockFunction}
              countryList={names}
            />
          </BrowserRouter>
        </ThemeProvider>
      )
    })

    fireEvent.mouseDown(screen.getByPlaceholderText('Select your business'))
    fireEvent.click(screen.getByText(BUSINESSES[1]))
    expect(
      screen.getByText('Confirm your business details')
    ).toBeInTheDocument()
    fireEvent.click(screen.getByAltText('back'))
    fireEvent.mouseDown(screen.getByPlaceholderText('Select your business'))
    fireEvent.click(screen.getByText(BUSINESSES[1]))
    expect(
      screen.getByText('Confirm your business details')
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    const component = await screen.findByTestId('TradingAddress')
    expect(component).toBeInTheDocument()
    expect(screen.getByText('Confirm trading address')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('confirmButton'))

    expect(
      screen.getByText('Help us verify your account faster')
    ).toBeInTheDocument()
    expect(await screen.findByTestId('accountVerification')).toBeInTheDocument()
    fireEvent.mouseDown(screen.getByPlaceholderText('Category'))
    fireEvent.click(screen.getByText('Health, sports or personal care'))
    fireEvent.mouseDown(screen.getByPlaceholderText('Subcategory'))
    fireEvent.click(screen.getByText('Healthcare services'))
    fireEvent.mouseDown(screen.getByPlaceholderText('Size of your business'))
    fireEvent.click(screen.getByText('150-200'))
    fireEvent.click(screen.getByTestId('continue'))
    expect(screen.getByText('Fill in your details')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'Ravi' },
    })
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Kant' },
    })
    fireEvent.change(screen.getByLabelText(DOB), {
      target: { value: '11/11/1999' },
    })
    expect(screen.getByTestId('continueButton')).toBeDisabled()
    const countryDropdown = screen.getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown)
    fireEvent.click(screen.getByText('India'))

    fireEvent.change(screen.getByLabelText('Home Address'), {
      target: { value: 'Nutan Nagar' },
    })
    fireEvent.change(screen.getByLabelText('City'), {
      target: { value: 'Ranchi' },
    })
    fireEvent.change(screen.getByLabelText('Postal code'), {
      target: { value: 835478 },
    })

    fireEvent.click(screen.getByTestId('continueButton'))
    expect(mockFunction).toBeCalled()
  })
})
