import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import theme from '../../../theme'
import CurrencyExchange from '.'
const data = {
  senderAmount: '',
  recipientAmount: '',
  senderCountry: 'INR',
  recipientCountry: 'USD',
}

describe('CurrencyExchange', () => {
  const mockOnClick = jest.fn()
  it('should render the component', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange
          onClick={mockOnClick}
          data={{ ...data, senderCountry: '' }}
        />
      </ThemeProvider>
    )

    const component = screen.getByTestId('currencyExchange')
    expect(component).toBeInTheDocument()
  })
  test('dropdown opens when sender currency arrow is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )
    const senderArrow = screen.getByTestId('sender-arrow')
    fireEvent.click(senderArrow)
    const countryDropdown = screen.getByTestId('country-dropdown')
    expect(countryDropdown).toBeInTheDocument()
  })
  test('dropdown opens when receiver currency arrow is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )
    const receiverArrow = screen.getByTestId('receiver-arrow')
    fireEvent.click(receiverArrow)
    const countryDropdown = screen.getByTestId('country-dropdown')
    expect(countryDropdown).toBeInTheDocument()
  })
  test('currency selection closes when button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )
    const senderArrow = screen.getByTestId('sender-arrow')
    fireEvent.click(senderArrow)

    const countryDropdown = screen.getByTestId('country-dropdown')
    expect(countryDropdown).toBeInTheDocument()

    const selectCurrencyButton = screen.getByTestId('select-currency-button')
    fireEvent.click(selectCurrencyButton)

    expect(countryDropdown).not.toBeInTheDocument()
  })
  it('should update senderCurrencyCard when a currency is selected', async () => {
    const selectedValue = 'INR'

    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )
    fireEvent.click(screen.getByTestId('sender-arrow'))
    const countryDropdown = screen.getByTestId('country-dropdown')

    fireEvent.select(countryDropdown, selectedValue)
    screen.debug(countryDropdown)

    fireEvent.click(screen.getByTestId('select-currency-button'))
    screen.getByText('INR')
  })

  it('should', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )
    const selectedValue = 'USD'
    fireEvent.click(screen.getByTestId('receiver-arrow'))
    const countryDropdown = screen.getByTestId('country-dropdown')
    fireEvent.select(countryDropdown, selectedValue)
    screen.debug(countryDropdown)

    fireEvent.click(screen.getByTestId('select-currency-button'))
    screen.getByText('USD')
  })

  it('should update', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )

    const inputField = screen.getByTestId('senderInput').querySelector('input')
    fireEvent.change(inputField as HTMLInputElement, {
      target: { value: '100' },
    })
    expect(inputField).toHaveValue(100)
  })

  it('should trigger handleChange', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByTestId('sender-arrow'))
    const currencySelect = screen.getAllByRole('button')[0]

    fireEvent.mouseDown(currencySelect)
    const country = 'India'
    fireEvent.click(screen.getByText(country))
  })
  it('should trigger handleChange', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByTestId('receiver-arrow'))
    const currencySelect = screen.getAllByRole('button')[0]
    fireEvent.mouseDown(currencySelect)
    const country = 'India'
    fireEvent.click(screen.getByText(country))
  })

  it('does not display the modal content when the modal is closed', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )

    expect(screen.queryByTestId('modalContent')).not.toBeInTheDocument()
  })
  it('calls onClick with correct data when button is clicked', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )
    const senderInput = screen.getByTestId('senderInput')
    const input = senderInput.querySelector('.senderInput')
    const continueButton = getByText('Continue')
    expect(continueButton).toBeDisabled
    fireEvent.change(input as HTMLInputElement, { target: { value: 1 } })

    fireEvent.click(continueButton)
    const modalButton = screen.getByTestId('modalButton')
    fireEvent.click(modalButton)

    expect(mockOnClick).toHaveBeenCalledWith({
      senderAmount: '1',
      recipientAmount: '0.012',
      senderCountry: 'INR',
      recipientCountry: 'USD',
    })
  })

  it('should close the modal when background is clicked', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={data} />
      </ThemeProvider>
    )
    const senderInput = screen.getByTestId('senderInput')
    const input = senderInput.querySelector('.senderInput')
    const continueButton = getByText('Continue')
    expect(continueButton).toBeDisabled()
    fireEvent.change(input as HTMLInputElement, { target: { value: 75 } })
    fireEvent.click(continueButton)

    const overlay = screen.getByTestId('modalOverlay')
    fireEvent.click(overlay)
    expect(screen.queryByTestId('modalContent')).not.toBeInTheDocument()
  })

  it('should initialize senderCurrencyCard with selected country value when senderCountry is provided with values', () => {
    const Data = {
      senderAmount: '',
      senderCountry: 'US',
    }

    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange onClick={mockOnClick} data={Data} />
      </ThemeProvider>
    )
    const countryCode = screen.getAllByTestId('Typography')[1]
    expect(countryCode).toBeInTheDocument()
  })
})
