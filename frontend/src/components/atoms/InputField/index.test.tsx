import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import InputField from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'

const testId = 'InputField'

const customRender = (T: React.ReactNode) => {
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)
}

test('Should render the component', () => {
  customRender(<InputField variant="outlined" />)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

test('Should change value and call the onChangeMock Function', () => {
  const onChangeMock = jest.fn()
  customRender(<InputField variant="outlined" onChange={onChangeMock} />)
  const component = screen.getByTestId(testId)
  expect(component).toBeInTheDocument()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const input = component.querySelector('input')!
  fireEvent.change(input, {
    target: { value: 'Hello' },
  })
  expect(onChangeMock).toBeCalled()
  expect(onChangeMock).toBeCalledTimes(1)
  expect(input.value).toBe('Hello')
})
