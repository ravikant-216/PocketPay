/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BusinessDetails from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import { EDIT_LABEL } from '../../../strings/constants'

const testId = 'BusinessDetails'
const onConfirmMock = jest.fn()
const renderWithTheme = (T: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{T}</ThemeProvider>)

test('Should render', () => {
  renderWithTheme(
    <BusinessDetails
      onConfirm={onConfirmMock}
      name="Zentech solutions pvt ltd"
    />
  )
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

test('Should call onConfirmMock on clicking Confirm button', () => {
  renderWithTheme(
    <BusinessDetails
      onConfirm={onConfirmMock}
      name="Zentech solutions pvt ltd"
    />
  )
  fireEvent.click(screen.getByText('Confirm'))
  expect(onConfirmMock).toBeCalledTimes(1)
})

describe('Editing business details', () => {
  test('Should display input fields to edit on clicking edit button', () => {
    renderWithTheme(
      <BusinessDetails
        onConfirm={onConfirmMock}
        name="Zentech solutions pvt ltd"
      />
    )
    const component = screen.getByTestId(testId)
    expect(component.querySelectorAll('textarea[placeholder=""]')).toHaveLength(
      0
    )
    act(() => {
      fireEvent.click(screen.getByText(EDIT_LABEL))
    })
    expect(component.querySelectorAll('textarea[placeholder=""]')).toHaveLength(
      3
    )
  })

  test('Should not display updated details on clicking cancel button', () => {
    renderWithTheme(
      <BusinessDetails
        onConfirm={onConfirmMock}
        name="Zentech solutions pvt ltd"
      />
    )
    const component = screen.getByTestId(testId)
    expect(component.querySelectorAll('textarea[placeholder=""]')).toHaveLength(
      0
    )
    act(() => {
      fireEvent.click(screen.getByText(EDIT_LABEL))
    })
    const inputFields = component.querySelectorAll('textarea[placeholder=""]')
    expect(inputFields).toHaveLength(3)
    act(() => {
      fireEvent.change(inputFields[0]!, { target: { value: 'Zemoso' } })
      fireEvent.change(inputFields[1]!, { target: { value: '398457' } })
      fireEvent.change(inputFields[2]!, { target: { value: 'Hyderabad' } })
      fireEvent.click(screen.getByText('Cancel'))
    })
    expect(screen.queryByText('Zemoso')).not.toBeInTheDocument()
    expect(screen.queryByText('398457')).not.toBeInTheDocument()
    expect(screen.queryByText('Hyderabad')).not.toBeInTheDocument()
  })
  test('Should display updated details on clicking cancel button', () => {
    renderWithTheme(
      <BusinessDetails
        onConfirm={onConfirmMock}
        name="Zentech solutions pvt ltd"
      />
    )
    const component = screen.getByTestId(testId)
    expect(component.querySelectorAll('textarea[placeholder=""]')).toHaveLength(
      0
    )
    act(() => {
      fireEvent.click(screen.getByText(EDIT_LABEL))
    })
    const inputFields = component.querySelectorAll('textarea[placeholder=""]')
    expect(inputFields).toHaveLength(3)
    act(() => {
      fireEvent.change(inputFields[0]!, { target: { value: 'Zemoso' } })
      fireEvent.change(inputFields[1]!, { target: { value: '398457' } })
      fireEvent.change(inputFields[2]!, { target: { value: 'Hyderabad' } })
      fireEvent.click(screen.getByText('Save'))
    })
    expect(screen.queryByText('Zemoso')).toBeInTheDocument()
    expect(screen.queryByText('398457')).toBeInTheDocument()
    expect(screen.queryByText('Hyderabad')).toBeInTheDocument()
  })
})
