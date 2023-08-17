import React from 'react'
import { render } from '@testing-library/react'
import { SignUpPage } from './index'
import theme from '../../theme'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@emotion/react'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('SignUpPage', () => {
  it('should render the SignUpForm component', () => {
    const { getByTestId } = renderWithTheme(<SignUpPage />)
    expect(getByTestId('SignUpForm')).toBeInTheDocument()
  })
})
