import { render, fireEvent, screen } from '@testing-library/react'
import PhoneNumber from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('PhoneNumber', () => {
  const names = [
    {
      key: 'India',
      iconTitle: 'India',
      src: '/path/to/india/flag/image',
      alt: 'India Flag',
    },
  ]
  it('renders the first step correctly', () => {
    renderWithTheme(<PhoneNumber countryList={[]} />)

    expect(
      screen.getByText('Verify your phone number with a code')
    ).toBeInTheDocument()
    expect(
      screen.getByText('It helps us keep your account secure.')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Mobile Number')).toBeInTheDocument()
  })

  it('renders the second step correctly', () => {
    renderWithTheme(<PhoneNumber countryList={[]} />)

    fireEvent.change(screen.getByLabelText('Mobile Number'), {
      target: { value: '1234567890' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByText('Enter the 6-digit code')).toBeInTheDocument()
    expect(screen.getByLabelText('Enter code here')).toBeInTheDocument()
  })

  it('renders the third step correctly', () => {
    const handlePhoneStep = jest.fn()
    renderWithTheme(
      <PhoneNumber handlePhoneStep={handlePhoneStep} countryList={[]} />
    )

    fireEvent.change(screen.getByLabelText('Mobile Number'), {
      target: { value: '1234567890' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(handlePhoneStep).toHaveBeenCalled()
    fireEvent.click(
      screen.getByRole('button', { name: 'I didn’t receive a code' })
    )

    expect(screen.getByText('Approve another way')).toBeInTheDocument()
  })

  it('calls the onSubmit function when the submit button is clicked', () => {
    const onSubmit = jest.fn()
    renderWithTheme(<PhoneNumber onSubmit={onSubmit} countryList={[]} />)

    fireEvent.change(screen.getByLabelText('Mobile Number'), {
      target: { value: '1234567890' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    fireEvent.change(screen.getByLabelText('Enter code here'), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(onSubmit).toHaveBeenCalled()
  })
  it('updates the phone number input value correctly', () => {
    const handlePhoneStep = jest.fn()
    renderWithTheme(
      <PhoneNumber handlePhoneStep={handlePhoneStep} countryList={[]} />
    )

    const phoneNumberInput = screen.getByLabelText('Mobile Number')

    fireEvent.change(phoneNumberInput, { target: { value: 1234567890 } })

    expect(phoneNumberInput).toHaveValue(1234567890)
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    fireEvent.click(
      screen.getByRole('button', { name: 'I didn’t receive a code' })
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Use a different phone number' })
    )
    expect(handlePhoneStep).toHaveBeenCalled()
    expect(phoneNumberInput).toHaveValue()
  })

  it('updates the country code and flag when a country is selected', () => {
    const mockFunction = jest.fn()
    renderWithTheme(
      <PhoneNumber onCountrySelect={mockFunction} countryList={names} />
    )

    const countrySelect = screen.getAllByAltText('')
    fireEvent.click(countrySelect[0])
    expect(
      screen.getByText('Verify your phone number with a code')
    ).toBeInTheDocument()
    const countryDropdown = screen.getByTestId('downButton')
    fireEvent.click(countryDropdown)
    expect(mockFunction).toHaveBeenCalled()
    expect(screen.getByTestId('Typography')).toBeInTheDocument
    const countryDropdown2 = screen.getAllByRole('button')[0]
    const countryDropdownButton2 = screen.getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown2)
    fireEvent.click(screen.getByText('India'))
    fireEvent.click(countryDropdownButton2)
    const list = screen.getAllByAltText('')
    expect(list[2]).toBeInTheDocument()
  })
})
