import { render, screen, fireEvent } from '@testing-library/react'
import { AccountDetailPage } from '.'
import theme from '../../theme'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@emotion/react'
import { DOB } from '../../strings/constants'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('AccountDetailPage', () => {
  const mockFunction = jest.fn()
  test('renders AccountVerification component after clicking on ConfirmTradingAddress', () => {
    renderWithTheme(<AccountDetailPage buttonOnClick={mockFunction} />)
    fireEvent.mouseDown(screen.getByPlaceholderText('Select your business'))
    fireEvent.click(
      screen.getByText('7912, New Colony, Jaipur, Rajasthan, 302001')
    )
    expect(
      screen.getByText('Confirm your business details')
    ).toBeInTheDocument()
    fireEvent.click(screen.getByAltText('back'))
    fireEvent.mouseDown(screen.getByPlaceholderText('Select your business'))
    fireEvent.click(
      screen.getByText('7912, New Colony, Jaipur, Rajasthan, 302001')
    )
    expect(
      screen.getByText('Confirm your business details')
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText('Confirm trading address')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('confirmButton'))
    expect(screen.getByTestId('addTradingAddressButton')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Add'))
    expect(
      screen.getByText('Help us verify your account faster')
    ).toBeInTheDocument()
    fireEvent.mouseDown(screen.getByPlaceholderText('Category'))
    fireEvent.click(screen.getByText('Health, sports or personal care'))
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
    const countryDropdown = screen.getAllByRole('button')[0]
    fireEvent.mouseDown(countryDropdown)
    fireEvent.click(screen.getByText('India'))

    fireEvent.change(screen.getByLabelText('Home Address'), {
      target: { value: 'Nutan Nagar' },
    })
    fireEvent.click(screen.getByText('Continue'))
    expect(mockFunction).toBeCalled()
  })
})
