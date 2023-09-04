import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DatePicker from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const onChangeMock = jest.fn()

test('Should render', () => {
  render(
    <ThemeProvider theme={theme}>
      <DatePicker onChange={onChangeMock} label="Date of birth" />
    </ThemeProvider>
  )
  expect(screen.getByLabelText('Date of birth')).toBeInTheDocument()
})

test('Should trigger onChangeMock', () => {
  render(
    <ThemeProvider theme={theme}>
      <DatePicker
        minDate="2022-02-02"
        maxDate="2023-02-02"
        onChange={onChangeMock}
      />
    </ThemeProvider>
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  fireEvent.click(document.querySelector('.MuiIconButton-edgeEnd')!)
  fireEvent.click(screen.getByText('2'))
  expect(onChangeMock).toBeCalled()
})
