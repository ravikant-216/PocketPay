import { ThemeProvider } from '@emotion/react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import theme from '../../theme'
import HomePage from '.'
import React from 'react'
import { TRANSACTION_LIST } from '../../strings/constants'

describe('HomePage', () => {
  it('should render the transactions when the transaction list is not empty', () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage transactionList={TRANSACTION_LIST} />
      </ThemeProvider>
    )

    expect(screen.getByText('Mario Gabriel')).toBeInTheDocument()
  })
  it('should render the non transaction state when transaction list is empty', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <HomePage transactionList={[]} />
      </ThemeProvider>
    )
    const image = getByTestId('illustration')
    expect(image).toBeInTheDocument()
  })
})
