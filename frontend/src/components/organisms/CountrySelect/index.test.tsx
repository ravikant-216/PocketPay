import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import CountrySelect from '.'
import { ENTER_PASSWORD, INVALID_PASSWORD } from '../../../strings/constants'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('CountrySelect', () => {
  const mockOnChange = jest.fn()
  it('renders select country variant correctly', () => {
    renderWithTheme(
      <CountrySelect inputVariant="country" onChange={mockOnChange} />
    )
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled()
  })

  it('renders password variant correctly', () => {
    renderWithTheme(
      <CountrySelect inputVariant="password" onChange={mockOnChange} />
    )

    expect(screen.getByText('Create your password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled()
  })

  it('Enables continue button when a Valid password is entered', () => {
    renderWithTheme(
      <CountrySelect inputVariant="password" onChange={mockOnChange} />
    )

    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'ValidPassword123@' },
    })

    expect(screen.getByRole('button', { name: 'Continue' })).not.toBeDisabled()
  })

  it('displays error message when an invalid password is entered', () => {
    renderWithTheme(
      <CountrySelect inputVariant="password" onChange={mockOnChange} />
    )

    fireEvent.change(screen.getByPlaceholderText(ENTER_PASSWORD), {
      target: { value: 'invalid' },
    })

    expect(screen.getByText(INVALID_PASSWORD)).toBeInTheDocument()
  })

  it('should render the country dropdown when inputVariant is set to country', () => {
    const onChange = jest.fn()
    const { getAllByRole } = renderWithTheme(
      <CountrySelect onChange={onChange} inputVariant="country" />
    )

    const countryDropdown = getAllByRole('button')[0]
    const countryDropdownButton = getAllByRole('button')[1]
    fireEvent.mouseDown(countryDropdown)
    fireEvent.click(screen.getByText('India'))
    fireEvent.click(countryDropdownButton)
    expect(onChange).toHaveBeenCalledWith({ country: 'India', password: '' })
  })
  it('should toggle the visibility of the password when the visibility icon is clicked', () => {
    const { getByLabelText, getByRole } = renderWithTheme(
      <CountrySelect inputVariant="password" onChange={mockOnChange} />
    )
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'ValidPassword123' },
    })
    expect(getByLabelText('Password')).toHaveAttribute('type', 'password')
    fireEvent.click(getByRole('button', { name: 'toggle password visibility' }))
    expect(getByLabelText('Password')).toHaveAttribute('type', 'text')
  })
})
