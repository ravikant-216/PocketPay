import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DashboardTemplate from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const testId = 'DashboardTemplate'
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(
    <DashboardTemplate Content={<div>Content</div>} newUser={false} />
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
  expect(screen.getByText('Content')).toBeInTheDocument()
})
