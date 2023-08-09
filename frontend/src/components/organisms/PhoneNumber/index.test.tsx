import { render, fireEvent, screen } from '@testing-library/react'
import PhoneNumber from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('PhoneNumber', () => {
  it('renders the first step correctly', () => {
    renderWithTheme(<PhoneNumber />)

    expect(
      screen.getByText('Verify your phone number with a code')
    ).toBeInTheDocument()
    expect(
      screen.getByText('It helps us keep your account secure.')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Mobile Number')).toBeInTheDocument()
  })

  it('renders the second step correctly', () => {
    renderWithTheme(<PhoneNumber />)

    fireEvent.change(screen.getByLabelText('Mobile Number'), {
      target: { value: '1234567890' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByText('Enter the 6-digit code')).toBeInTheDocument()
    expect(screen.getByLabelText('Enter code here')).toBeInTheDocument()
  })

  it('renders the third step correctly', () => {
    renderWithTheme(<PhoneNumber />)

    fireEvent.change(screen.getByLabelText('Mobile Number'), {
      target: { value: '1234567890' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    fireEvent.click(
      screen.getByRole('button', { name: 'I didn’t receive a code' })
    )

    expect(screen.getByText('Approve another way')).toBeInTheDocument()
  })

  it('calls the onSubmit function when the submit button is clicked', () => {
    const onSubmit = jest.fn()
    renderWithTheme(<PhoneNumber onSubmit={onSubmit} />)

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
    renderWithTheme(<PhoneNumber />)

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
    expect(phoneNumberInput).toHaveValue()
  })
})
