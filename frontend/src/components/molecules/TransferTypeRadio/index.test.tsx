import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import TransferTypeRadio from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import CardIcon from '../../../../public/assets/icons/atm-card.svg'

const testId = 'TransferTypeRadio'

const renderWithTheme = (T: React.ReactNode) => {
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)
}

test('Should render', () => {
  renderWithTheme(
    <TransferTypeRadio
      src={CardIcon}
      alt="Card Icon"
      description="description"
      value={undefined}
      title="Title"
    />
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
  expect(screen.getByAltText('Card Icon')).toBeInTheDocument()
  expect(screen.getByText('Title')).toBeInTheDocument()
  expect(screen.getByText('description')).toBeInTheDocument()
})

test('Should be checked on clicking', () => {
  renderWithTheme(
    <TransferTypeRadio
      src=""
      alt=""
      description=""
      value={undefined}
      title="title"
    />
  )
  const component = screen.getByTestId(testId)
  // asserting radio button is not checked
  expect(component.querySelector('.Mui-checked')).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('title'))
  // asserting radio button is checked
  expect(component.querySelector('.Mui-checked')).toBeInTheDocument()
})
