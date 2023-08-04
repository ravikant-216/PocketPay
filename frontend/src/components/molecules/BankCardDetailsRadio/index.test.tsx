import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import BankCardDetailsRadio from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const testId = 'BankCardDetailsRadio'

const renderWithTheme = (T: React.ReactNode) => {
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)
}

test('Should render', () => {
  renderWithTheme(
    <BankCardDetailsRadio
      value={undefined}
      title="Title"
      lastFourDigitsOfCardNumber={4546}
      expirationDate={new Date('2025/09/09')}
    />
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
  expect(screen.getByText('Title')).toBeInTheDocument()
  expect(screen.getByText('4546')).toBeInTheDocument()
  expect(screen.getByText('09/25')).toBeInTheDocument()
})

test('Should be checked on clicking', () => {
  renderWithTheme(
    <BankCardDetailsRadio
      title="Title"
      lastFourDigitsOfCardNumber={0}
      expirationDate={new Date('2025/10/09')}
      value={undefined}
    />
  )
  const component = screen.getByTestId(testId)
  // asserting radio button is not checked
  expect(component.querySelector('.Mui-checked')).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('Title'))
  // asserting radio button is checked
  expect(component.querySelector('.Mui-checked')).toBeInTheDocument()
})
