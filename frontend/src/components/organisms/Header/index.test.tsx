import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import Header from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const testId = 'Header'
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(<Header />)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

test('Should open profile menu on clicking avatar', async () => {
  renderWithTheme(<Header />)
  const component = screen.getByTestId(testId)
  expect(screen.queryByTestId('ProfileMenu')).not.toBeInTheDocument()
  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(component.querySelector('.MuiAvatar-root')!)
  })
  // profile menu popped up
  expect(screen.getByTestId('ProfileMenu')).toBeInTheDocument() // passed
  // For coverage
  fireEvent.click(screen.getByText('Logout'))
  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.click(screen.getByRole('presentation').firstChild!)
  })
  // testing profile menu not present
  setTimeout(
    () => expect(screen.queryByTestId('ProfileMenu')).not.toBeInTheDocument(),
    700
  ) // pass
})
