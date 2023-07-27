import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Typography from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const testId = 'Typography'

test('Should render', () => {
  render(<Typography variant="h1" />)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

test('Should render wrapper and the styles accordingly', () => {
  render(
    <ThemeProvider theme={theme}>
      <Typography component="span" variant="h1" />
    </ThemeProvider>
  )
  const component = screen.getByTestId(testId)
  // checking the wrapper
  expect(component.tagName).toBe('SPAN')
  // checking the styles
  expect(component).toHaveStyle(theme.typography.h1)
})
