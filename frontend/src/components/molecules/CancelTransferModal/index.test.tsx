import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import CancelTransferModal from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

describe('Testing onPositiveAction and onNegativeAction', () => {
  test('Should call onPositiveActionMock', () => {
    const onNegativeActionMock = jest.fn()
    const onPositiveActionMock = jest.fn()
    renderWithTheme(
      <CancelTransferModal
        open={true}
        onPositiveAction={onPositiveActionMock}
        onNegativeAction={onNegativeActionMock}
      />
    )
    fireEvent.click(screen.getByText('Yes'))
    expect(onPositiveActionMock).toBeCalledTimes(1)
  })

  test('Should call onNegativeActionMock', () => {
    const onNegativeActionMock = jest.fn()
    const onPositiveActionMock = jest.fn()
    renderWithTheme(
      <CancelTransferModal
        open={true}
        onPositiveAction={onPositiveActionMock}
        onNegativeAction={onNegativeActionMock}
      />
    )
    fireEvent.click(screen.getByText('No'))
    expect(onNegativeActionMock).toBeCalledTimes(1)
  })
})
