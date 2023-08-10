import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TransferDetailsForm from '.'
import '@testing-library/jest-dom'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import { AMOUNT_CONVERT } from '../../../strings/constants'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('TransferDetailsForm', () => {
  it('renders the form with the provided values', () => {
    renderWithTheme(
      <TransferDetailsForm
        amount="1000"
        fee="10"
        amountRate="990"
        guaranteedRate="1.5"
      />
    )

    expect(
      screen.getByText('Review details of your transfer')
    ).toBeInTheDocument()
    expect(screen.getByText('Transfer details')).toBeInTheDocument()
    expect(screen.getByLabelText('Amount')).toHaveValue(1000)
    expect(screen.getByLabelText('Fee')).toHaveValue('10')
    expect(screen.getByLabelText(AMOUNT_CONVERT)).toHaveValue('990')
    expect(screen.getByLabelText('Guaranteed rate')).toHaveValue('1.5')
  })

  it('calls the saveOnClick prop with the form values when the Save button is clicked', () => {
    const saveOnClick = jest.fn()
    renderWithTheme(
      <TransferDetailsForm
        amount="1000"
        fee="10"
        amountRate="990"
        guaranteedRate="1.5"
        saveOnClick={saveOnClick}
      />
    )

    fireEvent.click(screen.getByText('Save'))

    expect(saveOnClick).toHaveBeenCalledWith({
      amount: '1000',
      fee: '10',
      amountRate: '990',
      guaranteedRate: '1.5',
    })
  })

  it('updates the Amount value when the Amount field is changed', () => {
    const saveOnClick = jest.fn()
    renderWithTheme(
      <TransferDetailsForm
        amount=""
        fee="10"
        amountRate="990"
        guaranteedRate="1.5"
        saveOnClick={saveOnClick}
      />
    )

    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '2000' },
    })

    expect(screen.getByLabelText('Amount')).toHaveValue(2000)
  })
})
