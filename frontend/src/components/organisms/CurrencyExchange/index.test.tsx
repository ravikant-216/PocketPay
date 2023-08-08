import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import theme from '../../../theme'
import CurrencyExchange from '.'

describe('CurrencyExchange', () => {
  it('should render the component', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange />
      </ThemeProvider>
    )

    const component = screen.getByTestId('currencyExchange')
    expect(component).toBeInTheDocument()
  })
  test('dropdown opens when sender currency arrow is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange />
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
        <CurrencyExchange />
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
        <CurrencyExchange />
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
        <CurrencyExchange />
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
        <CurrencyExchange />
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
        <CurrencyExchange />
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
        <CurrencyExchange />
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
        <CurrencyExchange />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByTestId('receiver-arrow'))
    const currencySelect = screen.getAllByRole('button')[0]
    fireEvent.mouseDown(currencySelect)
    const country = 'India'
    fireEvent.click(screen.getByText(country))
  })

  it('displays the modal content when the modal is open', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByTestId('button'))

    expect(screen.getByTestId('modalContent')).toBeInTheDocument()
  })

  it('does not display the modal content when the modal is closed', () => {
    render(
      <ThemeProvider theme={theme}>
        <CurrencyExchange />
      </ThemeProvider>
    )

    expect(screen.queryByTestId('modalContent')).not.toBeInTheDocument()
  })
})
