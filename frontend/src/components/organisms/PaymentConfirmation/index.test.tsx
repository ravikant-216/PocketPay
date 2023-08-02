import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PaymentConfirmation from '.'
import '@testing-library/jest-dom'
import theme from '../../../theme'
import { ThemeProvider } from '@emotion/react'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('PaymentConfirmation', () => {
  test('renders PaymentConfirmation component with default props', () => {
    const { getByText } = renderWithTheme(<PaymentConfirmation />)

    expect(
      getByText(/Our bank details for payments in GBP/i)
    ).toBeInTheDocument()
    expect(
      getByText(
        /Below are the bank details for this payment. Please only send the money from an account in your name/i
      )
    ).toBeInTheDocument()
    expect(getByText(/Payee name/i)).toBeInTheDocument()
    expect(getByText(/Use this reference/i)).toBeInTheDocument()
    expect(getByText(/Amount to send/i)).toBeInTheDocument()
    expect(getByText(/UK Sort code/i)).toBeInTheDocument()
    expect(getByText(/Account number/i)).toBeInTheDocument()
    expect(getByText(/Our bank address/i)).toBeInTheDocument()
  })

  test('renders PaymentConfirmation component with custom props', () => {
    const props = {
      payeeName: 'Mario Gabriel',
      reference: '#356778810',
      amount: '100.00 GBP',
      code: '24-14-70',
      accountNumber: '729019188810',
      address:
        'TransferWise 56 ShoreDitch High Street London E16JJ United Kingdom',
    }
    const { getByText } = renderWithTheme(<PaymentConfirmation {...props} />)

    expect(getByText(props.payeeName)).toBeInTheDocument()
    expect(getByText(props.reference)).toBeInTheDocument()
    expect(getByText(props.amount)).toBeInTheDocument()
    expect(getByText(props.code)).toBeInTheDocument()
    expect(getByText(props.accountNumber)).toBeInTheDocument()
    expect(getByText(props.address)).toBeInTheDocument()
  })

  test('calls onClick handler when Continue button is clicked', () => {
    const onClick = jest.fn()
    const { getByText } = renderWithTheme(
      <PaymentConfirmation onClick={onClick} />
    )

    fireEvent.click(getByText(/Continue/i))
    expect(onClick).toHaveBeenCalled()
  })
})
