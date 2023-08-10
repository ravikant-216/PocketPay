import '@testing-library/jest-dom'
import { fireEvent, render, screen, act } from '@testing-library/react'
import ReviewTransferDetails from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import {
  CANCEL,
  CHANGE,
  EDIT,
  REVIEW_ACCOUNT,
  SAVE,
} from '../../../strings/constants'

const testId = 'ReviewTransferDetails'
const onConfirmAndContinueMock = jest.fn()
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(
    <ReviewTransferDetails onConfirmAndContinue={onConfirmAndContinueMock} />
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

describe('Testing the flow of editing SenderDetails', () => {
  test('Should render BusinessDetailsFrom and not changing the values upon clicking Cancel button', () => {
    renderWithTheme(
      <ReviewTransferDetails onConfirmAndContinue={onConfirmAndContinueMock} />
    )
    act(() => {
      fireEvent.click(screen.getAllByText(CHANGE)[0])
    })
    expect(screen.getByText(REVIEW_ACCOUNT)).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).not.toHaveValue('')
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
      <ReviewTransferDetails onConfirmAndContinue={onConfirmAndContinueMock} />
    )
    act(() => {
      fireEvent.click(screen.getAllByText(CHANGE)[0])
    })
    expect(screen.getByText(REVIEW_ACCOUNT)).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).not.toHaveValue('')
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
      <ReviewTransferDetails onConfirmAndContinue={onConfirmAndContinueMock} />
    )
    act(() => {
      fireEvent.click(screen.getByText(EDIT))
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
      <ReviewTransferDetails onConfirmAndContinue={onConfirmAndContinueMock} />
    )
    act(() => {
      fireEvent.click(screen.getAllByText(EDIT)[0])
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
  })
})
