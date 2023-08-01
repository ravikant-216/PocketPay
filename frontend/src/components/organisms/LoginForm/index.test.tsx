import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SignIn from '.'
import { ThemeProvider } from '@emotion/react'
import { WELCOME_BACK } from '../../../strings/constants'
import theme from '../../../theme'
import '@testing-library/jest-dom'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('SignIn', () => {
  it('renders correctly', () => {
    const { getByText } = renderWithTheme(<SignIn />)
    expect(getByText(WELCOME_BACK)).toBeInTheDocument()
    expect(getByText('Sign In')).toBeInTheDocument()
    expect(getByText('Remember me')).toBeInTheDocument()
    expect(getByText('Trouble logging in?')).toBeInTheDocument()
    expect(getByText('Or, Log in with')).toBeInTheDocument()
  })

  it('validates email input', () => {
    const { getByLabelText, getByText } = renderWithTheme(<SignIn />)
    const emailInput = getByLabelText('Email Address')

    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    expect(getByText('Invalid email address')).toBeInTheDocument()

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect((emailInput as HTMLInputElement).value).toBe('test@example.com')
  })

  it('validates password input', () => {
    const { getByLabelText, getByText } = renderWithTheme(<SignIn />)
    const passwordInput = getByLabelText('Password')
    fireEvent.change(passwordInput, { target: { value: '12345' } })
    expect(
      getByText('Password must be at least 6 characters')
    ).toBeInTheDocument()

    fireEvent.change(passwordInput, { target: { value: '123456' } })
    expect((passwordInput as HTMLInputElement).value).toBe('123456')
  })

  it('disables sign in button when inputs are invalid', () => {
    const { getByLabelText, getByText } = renderWithTheme(<SignIn />)
    const emailInput = getByLabelText('Email Address')
    const passwordInput = getByLabelText('Password')
    const signInButton = getByText('Sign In')

    expect(signInButton).toBeDisabled()

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    expect(signInButton).not.toBeDisabled()
  })

  it('calls onSubmit prop with entered values when sign in button is clicked', () => {
    const onSubmit = jest.fn()
    const { getByLabelText, getByText } = renderWithTheme(
      <SignIn onSubmit={onSubmit} />
    )

    const emailInput = getByLabelText('Email Address')
    const passwordInput = getByLabelText('Password')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    fireEvent.click(getByText('Sign In'))

    expect(onSubmit).toHaveBeenCalledWith('test@example.com', '123456')
  })
  test('Checkbox with label "Remember me" is checked', () => {
    renderWithTheme(<SignIn />)
    const checkbox = screen.getByRole('checkbox', { name: /remember me/i })
    expect(checkbox).toBeChecked()
  })
  it('toggles password visibility when show password button is clicked', () => {
    const { getByLabelText, getByRole } = renderWithTheme(<SignIn />)
    const passwordInput = getByLabelText('Password')
    const showPasswordButton = getByRole('button', {
      name: 'toggle password visibility',
    })

    expect((passwordInput as HTMLInputElement).type).toBe('password')
    fireEvent.click(showPasswordButton)
    expect((passwordInput as HTMLInputElement).type).toBe('text')
  })
})
