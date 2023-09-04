import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom/extend-expect'
import ConfirmTradingAddress from '.'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { EDIT } from '../../../strings/constants'
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
    const addTradingAddressButton = screen.getByTestId(
      'addTradingAddressButton'
    )
    fireEvent.click(addTradingAddressButton)
    const modal = screen.getByTestId('modal')
    expect(modal).toBeInTheDocument()
    const confirmButton = screen.getByTestId('confirmButton')
    fireEvent.click(confirmButton)
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
    const edit = screen.getByText(EDIT)
    expect(edit).toBeInTheDocument()
    fireEvent.click(edit)
    expect(edit).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Save'))
    fireEvent.click(addTradingAddressButton)

    const input = screen.getByPlaceholderText('trading address 2')
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'India' } })
    fireEvent.click(screen.getByTestId('addButton'))
    expect(input).not.toBeInTheDocument()
    fireEvent.click(addTradingAddressButton)
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.click(screen.getByTestId('addButton'))
    const edit2 = screen.getByText(EDIT)
    fireEvent.click(edit2)
    const editInput = screen.getByPlaceholderText('TradingAddress 1')
    fireEvent.change(editInput, { target: { value: 'India' } })
    fireEvent.click(screen.getByTestId('cancelButton'))
    expect(editInput).not.toBeInTheDocument()
    const edit3 = screen.getByText(EDIT)
    fireEvent.click(edit3)
    fireEvent.click(screen.getByText('Save'))
    expect(editInput).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('radio-1'))
  })
})
