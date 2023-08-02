import { ThemeProvider } from '@mui/material'
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import theme from '../../../theme'
import TransferCancelationModal from '.'
import {
  DEBIT_CARD_2_LABEL,
  EXISITING_ACCOUNT_LABEL,
} from '../../../strings/constants'

const testId = 'TransferCancelationModal'
const transferNumber = '38678483'
const onCancelMock = jest.fn()
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(
    <TransferCancelationModal
      open={true}
      transferNumber={transferNumber}
      onCancel={onCancelMock}
    />
  )

  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

describe('Rendering cancel button', () => {
  test('Should not render cancel button initially when inputs are empty', () => {
    renderWithTheme(
      <TransferCancelationModal
        open={true}
        transferNumber={transferNumber}
        onCancel={onCancelMock}
      />
    )
    const component = screen.getByTestId(testId)
    expect(component.querySelector('button')).not.toBeInTheDocument()
  })

  test('Should not render cancel button when user selects from dropdown', () => {
    renderWithTheme(
      <TransferCancelationModal
        open={true}
        transferNumber={transferNumber}
        onCancel={onCancelMock}
      />
    )
    const component = screen.getByTestId(testId)
    expect(component.querySelector('button')).not.toBeInTheDocument()
    const [accountSelect, bankSelect] = screen.getAllByRole('button')
    fireEvent.mouseDown(accountSelect)
    const accountOption = screen.getByText(EXISITING_ACCOUNT_LABEL)
    fireEvent.click(accountOption)
    expect(component.querySelector('button')).not.toBeInTheDocument()
    expect(accountSelect).toHaveAttribute('aria-expanded', 'false')
    fireEvent.mouseDown(bankSelect)
    const bankOption = screen.getByText(DEBIT_CARD_2_LABEL)
    fireEvent.click(bankOption)
    expect(component.querySelector('button')).toBeInTheDocument()
    fireEvent.click(component.querySelector('button') as HTMLElement)
    expect(onCancelMock).toBeCalledTimes(1)
  })
})
