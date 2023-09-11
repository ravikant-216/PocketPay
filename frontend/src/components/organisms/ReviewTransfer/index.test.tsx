import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import ReviewTransfer from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import { CONTINUE_TO_PAY_BUTTON } from '../../../strings/constants'
import { Recipient, Transfer } from '../ReviewTransferDetails'

const testId = 'ReviewTransfer'
const onChooseBankTransfer = jest.fn()
const onCompleteCardTransfer = jest.fn()
const onCancelTransfer = jest.fn()
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)
const transfer: Transfer = {
  senderAmount: 0,
  recipientAmount: 0,
  senderCurrencyCode: '',
  recipientCurrencyCode: '',
  rate: 1.14,
  conversionAmount: 70.1,
  fee: 0,
}
const recipient: Recipient = {
  name: '',
  email: '',
  accountNumber: '',
  accountType: 'Checking',
  ifsc: '',
}

test('Should render', () => {
  renderWithTheme(
    <ReviewTransfer
      ReviewTransferDetailsProps={{
        data: { transfer: transfer, recipient: recipient },
      }}
      onChooseBankTransfer={onChooseBankTransfer}
      onCompleteCardTransfer={onCompleteCardTransfer}
      onCancelTransfer={onCancelTransfer}
    />
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

test('Should call onChooseBankTransfer on selecting bank transfer option and clicking continue to pay', () => {
  renderWithTheme(
    <ReviewTransfer
      ReviewTransferDetailsProps={{
        data: { transfer: transfer, recipient: recipient },
      }}
      onChooseBankTransfer={onChooseBankTransfer}
      onCompleteCardTransfer={onCompleteCardTransfer}
      onCancelTransfer={onCancelTransfer}
    />
  )
  act(() => {
    fireEvent.click(screen.getByText('Transfer from your bank account'))
    fireEvent.click(screen.getByText(CONTINUE_TO_PAY_BUTTON))
  })
  expect(onChooseBankTransfer).toBeCalledTimes(1)
})
