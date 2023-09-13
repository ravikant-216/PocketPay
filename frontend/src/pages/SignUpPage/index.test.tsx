import { ThemeProvider } from '@emotion/react'
import '@testing-library/jest-dom'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'
import { SignUpPage } from '.'
import {
  API_URL,
  AUTH_LOGIN_API,
  AUTH_SIGNUP_API,
  BUSINESSES,
  BUSINESSES_CATEGORY,
  COUNTRIES_API,
  DOB,
  baseURL,
} from '../../strings/constants'
import theme from '../../theme'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from '../../utils/store'

jest.mock('axios')
afterEach(cleanup)
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('SignUpPage', () => {
  it('should update the show state and render the AccountSetupPage component when the form is submitted', async () => {
    const mockOnClick = jest.fn()
    act(() => {
      mockedAxios.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/${COUNTRIES_API}`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  name: 'Andorra',
                  currencyCode: 'EUR',
                  countryCode: '+376',
                  currencyRate: 90.27,
                  countryImageUrl:
                    'static/media/public/assets/icons/andorra.svg',
                },
              ],
            })

          case `${API_URL}/address`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  name: 'Design, marketing or communication',
                },
              ],
            })
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

      mockedAxios.post.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/${AUTH_SIGNUP_API}`:
            return Promise.resolve({
              data: {
                email: 'test@example.com',
                password: '1234567',
              },
            })
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
            <MemoryRouter>
              <SignUpPage onSubmit={mockOnClick} />
            </MemoryRouter>
          </Provider>
        </ThemeProvider>
      )
    })

    fireEvent.change(screen.getByLabelText('Enter your email address'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByAltText('back'))
    fireEvent.change(screen.getByLabelText('Enter your email address'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.click(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getAllByTestId('custom-box')[1])

    const countryDropdown1 = screen.getAllByRole('button')[0]
    const countryDropdownButton = screen.getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown1)
    fireEvent.click(await screen.findByText('Andorra'))
    fireEvent.click(countryDropdownButton)
    //
    const countryDropdown = screen.getByTestId('downButton')
    fireEvent.click(countryDropdown)
    expect(screen.getByTestId('Typography')).toBeInTheDocument
    const countryDropdown2 = screen.getAllByRole('button')[0]
    const countryDropdownButton2 = screen.getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown2)
    fireEvent.click(screen.getAllByTestId('Typography')[0])
    fireEvent.click(countryDropdownButton2)

    //
    fireEvent.change(screen.getByLabelText('Mobile Number'), {
      target: { value: '1234567890' },
    })
    fireEvent.click(screen.getByText('Continue'))
    fireEvent.click(screen.getByAltText('back'))
    fireEvent.click(screen.getByText('Continue'))
    fireEvent.click(
      screen.getByRole('button', { name: 'I didn’t receive a code' })
    )
    fireEvent.click(screen.getByAltText('back'))
    fireEvent.change(screen.getByLabelText('Enter code here'), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByText('Submit'))
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'Ravi123@' },
    })
    fireEvent.click(screen.getByText('Continue'))
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
    fireEvent.click(await screen.findByText('Health, sports or personal care'))
    fireEvent.mouseDown(screen.getByPlaceholderText('Subcategory'))
    fireEvent.click(screen.getByText('Healthcare services'))
    fireEvent.mouseDown(screen.getByPlaceholderText('Size of your business'))
    fireEvent.click(screen.getByText('150-200'))
    fireEvent.click(screen.getByText('Continue'))
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
    const countryDropdown111 = screen.getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown111)
    fireEvent.click(screen.getByText('Andorra'))

    fireEvent.change(screen.getByLabelText('Home Address'), {
      target: { value: 'Nutan Nagar' },
    })
    fireEvent.change(screen.getByLabelText('City'), {
      target: { value: 'Ranchi' },
    })
    fireEvent.change(screen.getByLabelText('Postal code'), {
      target: { value: 835478 },
    })
    fireEvent.click(screen.getByText('Continue'))
  }, 30000)
})
