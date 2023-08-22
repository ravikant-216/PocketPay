import '@testing-library/jest-dom'
import { fireEvent, render, screen, act } from '@testing-library/react'
import ReviewTransferDetails, { Recipient, Transfer } from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import {
  CANCEL,
  CHANGE,
  CONFIRM_CONTINUE_LABEL,
  REVIEW_ACCOUNT,
  SAVE,
} from '../../../strings/constants'

const testId = 'ReviewTransferDetails'
const onConfirmAndContinueMock = jest.fn()
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)
const transfer: Transfer = {
  senderAmount: 0,
  recipientAmount: 0,
  senderCurrencyCode: 'GBP',
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
    <ReviewTransferDetails
      onConfirmAndContinue={onConfirmAndContinueMock}
      editable={false}
      data={{
        transfer: transfer,
        recipient: recipient,
      }}
    />
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

describe('Testing the flow of editing SenderDetails', () => {
  test('Should render BusinessDetailsFrom and not changing the values upon clicking Cancel button', () => {
    renderWithTheme(
      <ReviewTransferDetails
        onConfirmAndContinue={onConfirmAndContinueMock}
        editable={true}
        data={{
          transfer: transfer,
          recipient: recipient,
        }}
      />
    )
    act(() => {
      fireEvent.click(screen.getAllByText(CHANGE)[1])
    })
    expect(screen.getByText(REVIEW_ACCOUNT)).toBeInTheDocument()
    act(() => {
      fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: 'John doe' },
      })
      fireEvent.click(screen.getByText(CANCEL))
    })
    expect(screen.queryByText('John doe')).not.toBeInTheDocument()
  })
  test('Should render BusinessDetailsFrom and reflect the changes upon clicking Save button', () => {
    renderWithTheme(
      <ReviewTransferDetails
        onConfirmAndContinue={onConfirmAndContinueMock}
        editable={true}
        data={{
          transfer: transfer,
          recipient: recipient,
        }}
      />
    )
    act(() => {
      fireEvent.click(screen.getAllByText(CHANGE)[1])
    })
    expect(screen.getByText(REVIEW_ACCOUNT)).toBeInTheDocument()
    act(() => {
      fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: 'John doe' },
      })
      fireEvent.click(screen.getByText(SAVE))
    })
    expect(screen.getByText('John doe')).toBeInTheDocument()
  })
})

describe('Testing the flow of editing TransferDetails', () => {
  test('Should render TarnsferDetailsFrom and not changing the values upon clicking Cancel button', () => {
    renderWithTheme(
      <ReviewTransferDetails
        onConfirmAndContinue={onConfirmAndContinueMock}
        editable={true}
        data={{
          transfer: transfer,
          recipient: recipient,
        }}
      />
    )
    act(() => {
      fireEvent.click(screen.getAllByText(CHANGE)[0])
    })
    expect(screen.getByText(REVIEW_ACCOUNT)).toBeInTheDocument()
    expect(screen.getByLabelText('Amount')).not.toHaveValue('')
    act(() => {
      fireEvent.change(screen.getByLabelText('Amount'), {
        target: { value: '230' },
      })
      fireEvent.click(screen.getByText(CANCEL))
    })
    expect(screen.queryByText('230.00 GBP')).not.toBeInTheDocument()
  })
  test('Should render TransferDetailsFrom and reflect the changes upon clicking Save button', () => {
    renderWithTheme(
      <ReviewTransferDetails
        onConfirmAndContinue={onConfirmAndContinueMock}
        editable={true}
        data={{
          transfer: transfer,
          recipient: recipient,
        }}
      />
    )
    act(() => {
      fireEvent.click(screen.getAllByText(CHANGE)[0])
    })
    expect(screen.getByText(REVIEW_ACCOUNT)).toBeInTheDocument()
    expect(screen.getByLabelText('Amount')).not.toHaveValue('')
    act(() => {
      fireEvent.change(screen.getByLabelText('Amount'), {
        target: { value: '230' },
      })
      fireEvent.click(screen.getByText(SAVE))
    })
    expect(screen.getByText('230.00 GBP')).toBeInTheDocument()
    fireEvent.click(screen.getByText(CONFIRM_CONTINUE_LABEL))
    expect(onConfirmAndContinueMock).toBeCalledTimes(1)
  })
})
