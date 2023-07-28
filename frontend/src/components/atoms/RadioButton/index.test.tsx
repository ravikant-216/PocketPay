import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import RadioButton from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const testId = 'RadioButton'

const renderWithTheme = (T: React.ReactNode) => {
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)
}

test('Should render', () => {
  renderWithTheme(<RadioButton value={'value'} label={'label'} />)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
  expect(screen.getByText('label')).toBeInTheDocument()
})

test('Should be checked on clicking', () => {
  renderWithTheme(<RadioButton value={'value'} label={'label'} />)
  const component = screen.getByTestId(testId)
  // asserting radio button is not checked
  expect(component.querySelector('.Mui-checked')).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('label'))
  // asserting radio button is checked
  expect(component.querySelector('.Mui-checked')).toBeInTheDocument()
})
