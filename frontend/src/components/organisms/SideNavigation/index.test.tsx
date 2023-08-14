import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SideNavigation from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import { NAVITEM_BALANCE_LABEL } from '../../../strings/constants'

const testId = 'SideNavigation'
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(<SideNavigation newUser={false} />)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

describe('Should toggle displaying balances items on newUser prop', () => {
  test('Should display when newUser is true', () => {
    renderWithTheme(<SideNavigation newUser={true} />)
    expect(screen.queryByText(NAVITEM_BALANCE_LABEL)).not.toBeInTheDocument()
  })

  test('Should not display when newUser is false', () => {
    renderWithTheme(<SideNavigation newUser={false} />)
    expect(screen.getByText(NAVITEM_BALANCE_LABEL)).toBeInTheDocument()
  })
})
