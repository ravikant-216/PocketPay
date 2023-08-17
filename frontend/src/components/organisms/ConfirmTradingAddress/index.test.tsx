import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom/extend-expect'
import ConfirmTradingAddress from '.'
import { fireEvent, render, screen } from '@testing-library/react'
import { CHANGE } from '../../../strings/constants'

describe('ConfirmTradingAddress', () => {
  const mockOnClick = jest.fn()
  it('renders the component', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ConfirmTradingAddress onClick={mockOnClick} />
      </ThemeProvider>
    )
    const component = getByTestId('TradingAddress')
    expect(component).toBeInTheDocument()
    const confirmButton = getByTestId('confirmButton')
    fireEvent.click(confirmButton)
    const modal = getByTestId('modal')
    expect(modal).toBeInTheDocument()
    const addButton = getByTestId('addButton')
    fireEvent.click(addButton)
    expect(mockOnClick).toHaveBeenCalledWith(
      '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054'
    )
    const overlay = getByTestId('modalOverlay')
    fireEvent.click(overlay)
    expect(modal).not.toBeInTheDocument()
  })

  it('should render the input field when add address button is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ConfirmTradingAddress onClick={mockOnClick} />
      </ThemeProvider>
    )

    const addTradingAddressButton = getByTestId('addTradingAddressButton')
    const edit = screen.getByText(CHANGE)
    expect(edit).toBeInTheDocument()
    fireEvent.click(addTradingAddressButton)
    expect(edit).not.toBeInTheDocument()
    const input = screen.getByLabelText('TradingAddress 2')
    expect(input).toBeInTheDocument()
    const saveButton = screen.getByTestId('saveButton')
    fireEvent.change(input, { target: { value: 'India' } })
    fireEvent.click(saveButton)
    expect(input).not.toBeInTheDocument()
  })

  it('should render the input field when edit address button is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ConfirmTradingAddress onClick={mockOnClick} />
      </ThemeProvider>
    )

    const editButton = getByTestId('editButton')
    const edit = screen.getByText(CHANGE)
    expect(edit).toBeInTheDocument()
    fireEvent.click(editButton)
    expect(edit).not.toBeInTheDocument()
    const input = screen.getByLabelText('TradingAddress 1')
    expect(input).toBeInTheDocument()
    const saveButton = screen.getByTestId('saveButton')
    expect(input).toHaveValue(
      '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054'
    )
    fireEvent.change(input, { target: { value: '2024' } })
    fireEvent.click(saveButton)
    expect(input).not.toBeInTheDocument()
  })

  it('should not render the input field whem cancel button is clicked', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ConfirmTradingAddress onClick={mockOnClick} />
      </ThemeProvider>
    )

    const editButton = getByTestId('editButton')
    fireEvent.click(editButton)
    const input = screen.getByLabelText('TradingAddress 1')
    expect(input).toBeInTheDocument()
    const cancelButton = screen.getByTestId('cancelButton')
    fireEvent.click(cancelButton)
    expect(input).not.toBeInTheDocument()

    const addTradingAddressButton = getByTestId('addTradingAddressButton')
    fireEvent.click(addTradingAddressButton)
    const inputField = screen.getByLabelText('TradingAddress 2')
    fireEvent.click(cancelButton)
    expect(inputField).not.toBeInTheDocument()
  })

  it('should select a different radio button', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ConfirmTradingAddress onClick={mockOnClick} />
      </ThemeProvider>
    )
    const addTradingAddressButton = getByTestId('addTradingAddressButton')
    const edit = screen.getByText(CHANGE)
    expect(edit).toBeInTheDocument()
    fireEvent.click(addTradingAddressButton)
    expect(edit).not.toBeInTheDocument()
    const input = screen.getByLabelText('TradingAddress 2')
    expect(input).toBeInTheDocument()
    const saveButton = screen.getByTestId('saveButton')
    fireEvent.change(input, { target: { value: 'India' } })
    fireEvent.click(saveButton)
    const radioButton = screen.getByTestId('radio-1')
    fireEvent.click(radioButton)
  })
})
