import '@testing-library/jest-dom'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react/pure'
import SendMoneyPage from '.'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from '../../theme'
import { CANCEL_TRANSFER, DOB, baseURL } from '../../strings/constants'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const currencyDetails = [
  {
    id: 1,
    name: 'Andorra',
    currencyCode: 'EUR',
    countryCode: '+376',
    currencyRate: 90.27,
    countryImageUrl: '/static/media/public/assets/icons/andorra.svg',
  },
  {
    id: 2,
    name: 'United Kingdom',
    currencyCode: 'GBP',
    countryCode: '+44',
    currencyRate: 105.73,
    countryImageUrl: '/static/media/public/assets/icons/UK.svg',
  },
  {
    id: 3,
    name: 'Austria',
    currencyCode: 'EUR',
    countryCode: '+43',
    currencyRate: 90.06,
    countryImageUrl: '/static/media/public/assets/icons/austria.svg',
  },
  {
    id: 4,
    name: 'India',
    currencyCode: 'INR',
    countryCode: '+91',
    currencyRate: 1,
    countryImageUrl: '/static/media/public/assets/icons/india.svg',
  },
  {
    id: 5,
    name: 'United States',
    currencyCode: 'USD',
    countryCode: '+1',
    currencyRate: 83,
    countryImageUrl: '/static/media/public/assets/icons/US.svg',
  },
]

const renderWithThemeAndRouter = (T: React.ReactNode) => {
  act(() => {
    mockedAxios.post.mockImplementation((url, data) => {
      return Promise.resolve({
        data: data,
      })
    })

    mockedAxios.get.mockImplementation((url) => {
      switch (url) {
        case `${baseURL}/country`:
          return Promise.resolve({ data: currencyDetails })
        case `${baseURL}/beneficiary?email=${input.email}`:
          return Promise.resolve({
            data: [
              {
                id: 1,
                email: 'mario.gabriel@gmail.com',
                account: '123456885865',
                firstName: 'Mario',
                lastName: 'Gabriel',
                ifsc: 'ABFJ12929GH',
                accountType: 'Checking',
              },
            ],
          })
      }
      return Promise.resolve({
        data: [],
      })
    })

    render(
      <MemoryRouter
        initialEntries={[`${baseURL}/sendMoneyPage`, { state: { id: 1 } }]}
      >
        <ThemeProvider theme={theme}>{T}</ThemeProvider>
      </MemoryRouter>
    )
  })
}

const input = {
  email: 'test@example.com',
  account: '123456789012',
  firstName: 'Johny',
  lastName: 'Michael',
  ifsc: 'ABCD1234567',
  accountType: 'Checking',
}

const testId = 'SendMoneyPage'
test('Should render', () => {
  renderWithThemeAndRouter(<SendMoneyPage />)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

describe('Testing whole flow of the page', () => {
  afterAll(() => {
    cleanup()
  })

  test('Going back', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(document.querySelector('.back-icon')!)
  })

  test('OnClicking Send Money option it navigates to currency Exchange', () => {
    renderWithThemeAndRouter(<SendMoneyPage />)
    fireEvent.click(screen.getAllByText('Send money')[0])
    screen.getByTestId('currencyExchange')
  })

  test('Entering Currency to transfer information', () => {
    const senderValue = 'INR'
    fireEvent.click(screen.getByTestId('sender-arrow'))
    const senderCountryDropdown = screen.getByTestId('country-dropdown')

    fireEvent.select(senderCountryDropdown, senderValue)
    screen.debug(senderCountryDropdown)

    fireEvent.click(screen.getByTestId('select-currency-button'))
    expect(screen.getByText('INR')).toBeInTheDocument()

    const recipientValue = 'EUR'
    fireEvent.click(screen.getByTestId('receiver-arrow'))
    const countryDropdown = screen.getByTestId('country-dropdown')
    fireEvent.select(countryDropdown, recipientValue)
    screen.debug(countryDropdown)

    fireEvent.click(screen.getByTestId('select-currency-button'))
    expect(screen.getByText('EUR')).toBeInTheDocument()

    const senderInput = screen.getByTestId('senderInput')
    const input = senderInput.querySelector('.senderInput')
    const continueButton = screen.getByTestId('button')
    fireEvent.change(input as HTMLInputElement, { target: { value: 75 } })
    fireEvent.click(continueButton)
  })

  test('Choosing business or charity option for transfer', () => {
    fireEvent.click(screen.getByText(/Business or Charity/))
    expect(screen.getByTestId('recipientDetails')).toBeInTheDocument()
  })

  test('Entering recipient details', () => {
    const component = screen.getByTestId('recipientDetails')
    const emailInput = screen.getByLabelText('Email')
    const accountInput = screen.getByLabelText('Account number')
    const firstNameInput = screen.getByLabelText('First name')
    const lastNameInput = screen.getByLabelText('Last name')
    const ifscInput = screen.getByLabelText('IFSC code')
    const continueButton = screen.getByTestId('continueButton')
    const accountType = screen.getByLabelText('Account Type')
    fireEvent.change(emailInput, {
      target: { name: 'email', value: input.email },
    })
    fireEvent.change(accountInput, {
      target: { name: 'account', value: input.account },
    })
    fireEvent.change(firstNameInput, {
      target: { name: 'firstName', value: input.firstName },
    })
    fireEvent.change(lastNameInput, {
      target: { name: 'lastName', value: input.lastName },
    })
    fireEvent.change(ifscInput, {
      target: { name: 'ifsc', value: input.ifsc },
    })
    fireEvent.mouseDown(accountType)
    fireEvent.click(component.querySelectorAll('.MuiButtonBase-root')[0])

    expect(emailInput.getAttribute('value')).toBe(input.email)
    expect(accountInput.getAttribute('value')).toBe(input.account)
    expect(firstNameInput.getAttribute('value')).toBe(input.firstName)
    expect(lastNameInput.getAttribute('value')).toBe(input.lastName)
    expect(ifscInput.getAttribute('value')).toBe(input.ifsc)
    expect(continueButton).toBeEnabled()
    fireEvent.click(continueButton)
    expect(screen.getByTestId('pocketpayPurpose')).toBeInTheDocument()
  })

  test('Entering pocket pay purpose', () => {
    const component = screen.getByTestId('pocketpayPurpose')
    const dropdownButton = component.querySelectorAll('.MuiInputBase-root')[0]
    const button = screen.getByTestId('continueButton')
    expect(button).toBeDisabled()
    fireEvent.click(dropdownButton)
    fireEvent.click(
      screen.getByText('Paying rent, utilities or property charges')
    )
    expect(button).toBeEnabled()
    fireEvent.click(button)
  })

  test('Entering directors details', () => {
    const firstNameInput = screen.getByPlaceholderText('First Name')
    fireEvent.change(firstNameInput, { target: { value: 'John' } })

    const lastNameInput = screen.getByPlaceholderText('Last Name')
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })

    fireEvent.change(screen.getByLabelText(DOB), {
      target: { value: '11/11/1999' },
    })

    const countryDropdown = screen.getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown)
    fireEvent.click(screen.getByText('India'))

    const button = screen.getByTestId('continueButton')
    fireEvent.click(button)
  })

  test('Entering Owners details', () => {
    const firstNameInput = screen.getByPlaceholderText('First Name')
    fireEvent.change(firstNameInput, { target: { value: 'John' } })

    const lastNameInput = screen.getByPlaceholderText('Last Name')
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })

    fireEvent.change(screen.getByLabelText(DOB), {
      target: { value: '11/11/1999' },
    })

    const button = screen.getByTestId('continueButton')
    fireEvent.click(button)
  })

  test('Confirming the details', () => {
    expect(screen.queryByText(input.email)).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('continueButton'))
  })

  test('Choosing the bank option', () => {
    fireEvent.click(screen.getByText('Transfer from your bank account'))
    fireEvent.click(screen.getByTestId('continueButton'))
  })

  test('Choosing the bank', async () => {
    expect(screen.getByTestId('ChooseBank')).toBeInTheDocument()
    const lloydsBankCard = screen.findByText('LLOYDS')
    fireEvent.click(screen.getByText(CANCEL_TRANSFER))
    fireEvent.click(screen.getByText('Yes'))
    fireEvent.click(screen.getByText('No'))
    fireEvent.click(await lloydsBankCard)
  })

  test('Confirmation from Lloyds', () => {
    expect(screen.getByTestId('LloydsConfirmation')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('continueButton'))
  })

  test('Clicking on continue', () => {
    fireEvent.click(screen.getByText(/Continue/i))
  })

  test('Going back', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    mockedAxios.get.mockResolvedValueOnce({
      data: [{}],
    })
    fireEvent.click(screen.getByText(/Continue/i))
  })

  test('Going back', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    mockedAxios.post.mockRejectedValue({ data: {} })
    fireEvent.click(screen.getByText(/Continue/i))
  })

  test('Going back', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(document.querySelector('.back-icon')!)
  })
})
