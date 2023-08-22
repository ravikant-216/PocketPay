import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Payment, { ScreenType } from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import {
  COMPLETE_BUTTON_LABEL,
  CONFIRM_PURCHASE_LABEL,
  PAY_WITH_CARD_LABEL,
} from '../../../strings/constants'

const testId = 'Payment'
const onTransferOptionSelectedMock = jest.fn()
const onCompleteMock = jest.fn()
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(
    <Payment
      userCurrentScreen={ScreenType.CHOOSE_PAYMENT_TYPE}
      onTransferOptionSelected={onTransferOptionSelectedMock}
      onComplete={onCompleteMock}
    />
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

test('Should call onTransferOptionsSelectedMock if any transfer options selected', () => {
  renderWithTheme(
    <Payment
      userCurrentScreen={ScreenType.CHOOSE_PAYMENT_TYPE}
      onTransferOptionSelected={onTransferOptionSelectedMock}
      onComplete={onCompleteMock}
    />
  )
  const component = screen.getByTestId(testId)
  fireEvent.click(screen.getByText('Debit card'))
  expect(component.querySelector('.Mui-checked')).toBeInTheDocument()
})

test('Should display PayWithYourCard screen', () => {
  renderWithTheme(
    <Payment
      userCurrentScreen={ScreenType.PAY_WITH_CARD}
      onTransferOptionSelected={onTransferOptionSelectedMock}
      onComplete={onCompleteMock}
    />
  )
  const component = screen.getByTestId(testId)
  expect(screen.getByText(PAY_WITH_CARD_LABEL)).toBeInTheDocument()
  fireEvent.click(screen.getAllByText('EUR Credit card')[1])
  expect(component.querySelector('.Mui-checked')).toBeInTheDocument()
})

test('Should display PaymentConfirmation screen', () => {
  renderWithTheme(
    <Payment
      userCurrentScreen={ScreenType.PAYMENT_CONFIRMATION}
      onTransferOptionSelected={onTransferOptionSelectedMock}
      onComplete={onCompleteMock}
    />
  )
  expect(screen.getByText(CONFIRM_PURCHASE_LABEL)).toBeInTheDocument()
  fireEvent.click(screen.getByText(COMPLETE_BUTTON_LABEL))
  expect(onCompleteMock).toBeCalledTimes(1)
})
