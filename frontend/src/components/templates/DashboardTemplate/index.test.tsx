import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DashboardTemplate from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import { BrowserRouter } from 'react-router-dom'

const testId = 'DashboardTemplate'
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(
    <BrowserRouter>
      <DashboardTemplate Content={<div>Content</div>} newUser={false} />
    </BrowserRouter>
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
  expect(screen.getByText('Content')).toBeInTheDocument()
})
