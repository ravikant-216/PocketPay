import { act, fireEvent, render, screen } from '@testing-library/react'
import ChooseBank from '.'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'

test('updates bank list on input change', async () => {
  render(
    <ThemeProvider theme={theme}>
      <ChooseBank onClickHandler={undefined} />
    </ThemeProvider>
  )

  const inputElement = screen.getByPlaceholderText('Start typing to search')

  await act(async () => {
    fireEvent.change(inputElement, { target: { value: 'L' } })
  })

  const lloydsBank = screen.queryByText('LLOYDS')
  const axisBank = screen.queryByText('AXIS')
  expect(lloydsBank).toBeInTheDocument()
  expect(axisBank).not.toBeInTheDocument()

  await act(async () => {
    fireEvent.change(inputElement, { target: { value: '' } })
  })

  expect(screen.queryByText('LLOYDS')).toBeInTheDocument()
  expect(screen.queryByText('AXIS')).toBeInTheDocument()
})

it('should call onClickHandler when Lloyds bank card is clicked', async () => {
  const onClickHandler = jest.fn()

  const { getByTestId } = render(
    <ThemeProvider theme={theme}>
      <ChooseBank onClick={onClickHandler} />
    </ThemeProvider>
  )

  expect(getByTestId('ChooseBank')).toBeInTheDocument()

  const lloydsBankCard = screen.findByText('LLOYDS')

  fireEvent.click(await lloydsBankCard)

  expect(onClickHandler).toHaveBeenCalledTimes(1)
})
