import { ThemeProvider } from '@emotion/react'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import theme from '../../../theme'
import axios from 'axios'
import CurrencyExchange from '.'
const data = {
  senderAmount: '',
  recipientAmount: '',
  senderCountry: 'INR',
  recipientCountry: 'USD',
}
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
jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>
axiosMock.get.mockResolvedValue({
  data: currencyDetails,
})
const renderWithTheme = (T: React.ReactNode) => {
  act(() => {
    axiosMock.get.mockResolvedValue({
      data: currencyDetails,
    })

    render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)
  })
}
describe('CurrencyExchange', () => {
  const mockOnClick = jest.fn()
  it('should render the component', async () => {
    act(() => {
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })

    const component = await screen.findByTestId('currencyExchange')
    expect(component).toBeInTheDocument()
  })
  test('dropdown opens when sender currency arrow is clicked', () => {
    act(() => {
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })
    const senderArrow = screen.getByTestId('sender-arrow')
    fireEvent.click(senderArrow)
    const countryDropdown = screen.getByTestId('country-dropdown')
    expect(countryDropdown).toBeInTheDocument()
  })
  test('dropdown opens when receiver currency arrow is clicked', () => {
    act(() => {
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })
    const receiverArrow = screen.getByTestId('receiver-arrow')
    fireEvent.click(receiverArrow)
    const countryDropdown = screen.getByTestId('country-dropdown')
    expect(countryDropdown).toBeInTheDocument()
  })
  test('currency selection closes when button is clicked', () => {
    act(() => {
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })
    const senderArrow = screen.getByTestId('sender-arrow')
    fireEvent.click(senderArrow)

    const countryDropdown = screen.getByTestId('country-dropdown')
    expect(countryDropdown).toBeInTheDocument()

    const selectCurrencyButton = screen.getByTestId('select-currency-button')
    fireEvent.click(selectCurrencyButton)

    expect(countryDropdown).not.toBeInTheDocument()
  })

  it('should update', () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        object: currencyDetails,
      })
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })

    const inputField = screen.getByTestId('senderInput').querySelector('input')
    fireEvent.change(inputField as HTMLInputElement, {
      target: { value: '100' },
    })
    expect(inputField).toHaveValue(100)
  })

  it('should trigger handleChange', async () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        object: currencyDetails,
      })
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })

    fireEvent.click(screen.getByTestId('sender-arrow'))
    const currencySelect = screen.getAllByRole('button')[0]

    fireEvent.mouseDown(currencySelect)
    const country = 'India'
    fireEvent.click(await screen.findByText(country))
  })
  it('should trigger handleChange', async () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        object: currencyDetails,
      })
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })

    fireEvent.click(screen.getByTestId('receiver-arrow'))
    const currencySelect = screen.getAllByRole('button')[0]
    fireEvent.mouseDown(currencySelect)
    const country = 'India'
    fireEvent.click(await screen.findByText(country))
  })

  it('does not display the modal content when the modal is closed', () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        object: currencyDetails,
      })
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })
    expect(screen.queryByTestId('modalContent')).not.toBeInTheDocument()
  })
  it('calls onClick with correct data when button is clicked', () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        object: currencyDetails,
      })
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })
    const senderInput = screen.getByTestId('senderInput')
    const input = senderInput.querySelector('.senderInput')
    const continueButton = screen.getByText('Continue')
    expect(continueButton).toBeDisabled
    fireEvent.change(input as HTMLInputElement, { target: { value: 1 } })

    fireEvent.click(continueButton)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should close the modal when background is clicked', () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        object: currencyDetails,
      })
      renderWithTheme(
        <ThemeProvider theme={theme}>
          <CurrencyExchange
            onClick={mockOnClick}
            data={{ ...data, senderCountry: '' }}
          />
        </ThemeProvider>
      )
    })
    const senderInput = screen.getByTestId('senderInput')
    const input = senderInput.querySelector('.senderInput')
    const continueButton = screen.getByTestId('button')
    expect(continueButton).toBeDisabled()
    fireEvent.change(input as HTMLInputElement, { target: { value: 75 } })
    fireEvent.click(screen.getByTestId('guranteedRate'))
    const overlay = screen.getByTestId('modalOverlay')
    fireEvent.click(overlay)
    expect(screen.queryByTestId('modalContent')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('guranteedRate'))
    fireEvent.click(screen.getByText('OK'))
    expect(screen.queryByText('OK')).not.toBeInTheDocument()
  })

  it('should initialize senderCurrencyCard with selected country value when senderCountry is provided with values', async () => {
    const Data = {
      senderAmount: '0',
      senderCountry: 'India',
    }

    renderWithTheme(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={Data} />
      </ThemeProvider>
    )
    const countryCode = screen.getAllByTestId('Typography')[1]
    expect(countryCode).toBeInTheDocument()
  })
})
