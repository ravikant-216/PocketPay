import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom/extend-expect'
import ConfirmTradingAddress from '.'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { CHANGE } from '../../../strings/constants'
import axios from 'axios'

jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>
describe('ConfirmTradingAddress', () => {
  const mockOnClick = jest.fn()
  it('renders the component', async () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        data: [
          {
            id: 1,
            name: '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
          },
        ],
      })
      render(
        <ThemeProvider theme={theme}>
          <ConfirmTradingAddress onClick={mockOnClick} />
        </ThemeProvider>
      )
    })
    const component = await screen.findByTestId('TradingAddress')
    expect(component).toBeInTheDocument()
    const confirmButton = screen.getByTestId('confirmButton')
    fireEvent.click(confirmButton)
    const modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
    const addButton = screen.getByTestId('addButton')
    fireEvent.click(addButton)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
    const overlay = screen.getByTestId('modalOverlay')
    fireEvent.click(overlay)
    expect(modal).not.toBeInTheDocument()
  })

  it('should render the input field when add address button is clicked', async () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        data: [
          {
            id: 1,
            name: '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
          },
        ],
      })
      render(
        <ThemeProvider theme={theme}>
          <ConfirmTradingAddress onClick={mockOnClick} />
        </ThemeProvider>
      )
    })
    const addTradingAddressButton = screen.getByTestId(
      'addTradingAddressButton'
    )
    const component = await screen.findByTestId('TradingAddress')
    expect(component).toBeInTheDocument()
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

  it('should render the input field when edit address button is clicked', async () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        data: [
          {
            id: 1,
            name: '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
          },
        ],
      })
      render(
        <ThemeProvider theme={theme}>
          <ConfirmTradingAddress onClick={mockOnClick} />
        </ThemeProvider>
      )
    })

    const component = await screen.findByTestId('TradingAddress')
    expect(component).toBeInTheDocument()
    const editButton = screen.getByTestId('editButton')
    const edit = screen.getByText(CHANGE)
    expect(edit).toBeInTheDocument()
    fireEvent.click(editButton)
    expect(edit).not.toBeInTheDocument()
    const input = await screen.findByLabelText('TradingAddress 1')
    expect(input).toBeInTheDocument()
    const saveButton = screen.getByTestId('saveButton')
    expect(input).toHaveValue(
      '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054'
    )
    fireEvent.change(input, { target: { value: '2024' } })
    fireEvent.click(saveButton)
    expect(input).not.toBeInTheDocument()
  })

  it('should not render the input field whem cancel button is clicked', async () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        data: [
          {
            id: 1,
            name: '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
          },
        ],
      })
      render(
        <ThemeProvider theme={theme}>
          <ConfirmTradingAddress onClick={mockOnClick} />
        </ThemeProvider>
      )
    })

    const editButton = screen.getByTestId('editButton')
    fireEvent.click(editButton)
    const input = await screen.findByLabelText('TradingAddress 1')
    expect(input).toBeInTheDocument()
    const cancelButton = screen.getByTestId('cancelButton')
    fireEvent.click(cancelButton)
    expect(input).not.toBeInTheDocument()

    const addTradingAddressButton = screen.getByTestId(
      'addTradingAddressButton'
    )
    fireEvent.click(addTradingAddressButton)
    const inputField = screen.getByLabelText('TradingAddress 2')
    fireEvent.click(cancelButton)
    expect(inputField).not.toBeInTheDocument()
  })

  it('should select a different radio button', async () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        data: [
          {
            id: 1,
            name: '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
          },
        ],
      })
      render(
        <ThemeProvider theme={theme}>
          <ConfirmTradingAddress onClick={mockOnClick} />
        </ThemeProvider>
      )
    })
    const addTradingAddressButton = await screen.findByTestId(
      'addTradingAddressButton'
    )
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
