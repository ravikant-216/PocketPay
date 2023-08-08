import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Payment, { ScreenType } from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import {
  CONFIRM_PURCHASE_LABEL,
  PAY_WITH_CARD_LABEL,
} from '../../../strings/constants'

const testId = 'Payment'
const onTransferOptionSelectedMock = jest.fn()
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(
    <Payment
      userCurrentScreen={ScreenType.CHOOSE_PAYMENT_TYPE}
      onTransferOptionSelected={onTransferOptionSelectedMock}
    />
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

test('Should call onTransferOptionsSelectedMock if any transfer options selected', () => {
  renderWithTheme(
    <Payment
      userCurrentScreen={ScreenType.CHOOSE_PAYMENT_TYPE}
      onTransferOptionSelected={onTransferOptionSelectedMock}
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
    />
  )
  const component = screen.getByTestId(testId)
  expect(screen.getByText(PAY_WITH_CARD_LABEL)).toBeInTheDocument()
  fireEvent.click(screen.getAllByText('EUR Credit card')[0])
  expect(component.querySelector('.Mui-checked')).toBeInTheDocument()
})

test('Should display PaymentConfirmation screen', () => {
  renderWithTheme(
    <Payment
      userCurrentScreen={ScreenType.PAYMENT_CONFIRMATION}
      onTransferOptionSelected={onTransferOptionSelectedMock}
    />
  )
  expect(screen.getByText(CONFIRM_PURCHASE_LABEL)).toBeInTheDocument()
})
