import { ThemeProvider } from '@emotion/react'
import '@testing-library/jest-dom'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'
import { SignUpPage } from '.'
import { BUSINESSES, DOB, baseURL } from '../../strings/constants'
import theme from '../../theme'
import { MemoryRouter } from 'react-router'
jest.mock('axios')
afterEach(cleanup)
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('SignUpPage', () => {
  it('should update the show state and render the AccountSetupPage component when the form is submitted', async () => {
    const mockOnClick = jest.fn()
    act(() => {
      mockedAxios.get.mockImplementation((url) => {
        switch (url) {
          case `${baseURL}/country`:
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

          case `${baseURL}/address`:
            return Promise.resolve({
              data: [
                {
                  id: 1,
                  name: 'Design, marketing or communication',
                },
              ],
            })
          case `${baseURL}/businessCategory`:
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

          case `${baseURL}/address`:
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
      mockedAxios.post.mockResolvedValueOnce({ data: {} })

      render(
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <SignUpPage onSubmit={mockOnClick} />
          </MemoryRouter>
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
    fireEvent.click(screen.getAllByTestId('Typography')[0])

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
    expect(screen.getByTestId('addTradingAddressButton')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Add'))
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
      target: { value: '1998-01-30' },
    })
    expect(screen.getByText('Continue')).toBeDisabled()
    fireEvent.mouseDown(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getByText('Andorra'))

    fireEvent.change(screen.getByLabelText('Home Address'), {
      target: { value: 'Nutan Nagar' },
    })
    fireEvent.click(screen.getByText('Continue'))

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${baseURL}/user`,
      await expect.objectContaining({
        first_name: 'Ravi',
        last_name: 'Kant',
        country: 'Andorra',
        address: 'Nutan Nagar',
        email: 'test@example.com',
        dob: '1998-01-30',
        account_type: 'Personal Account',
        password: 'Ravi123@',
      })
    )
  }, 20000)
})
