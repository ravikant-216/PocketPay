import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { LoginPage, LogInProps } from '.'
import theme from '../../theme'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@emotion/react'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('LoginPage', () => {
  const defaultProps: LogInProps = {
    onSubmit: jest.fn(),
  }

  const renderUI = (props: Partial<LogInProps> = {}) =>
    renderWithTheme(<LoginPage {...defaultProps} {...props} />)

  it('should call onSubmit with email and password when form is submitted', () => {
    const onSubmit = jest.fn()
    const { getByPlaceholderText, getByText } = renderUI({ onSubmit })

    fireEvent.change(getByPlaceholderText('Enter your email address'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(getByPlaceholderText('Enter your password'), {
      target: { value: 'password' },
    })
    fireEvent.click(getByText('Sign In'))

    expect(onSubmit).toHaveBeenCalledWith('test@example.com', 'password')
  })
})
