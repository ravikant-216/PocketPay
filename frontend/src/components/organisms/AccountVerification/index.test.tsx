import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import AccountVerification from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'

jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>
describe('AccountVerification', () => {
  it('should render the component', () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        data: [{ id: 1, name: 'Design, marketing or communication' }],
      })
      render(
        <ThemeProvider theme={theme}>
          <AccountVerification />
        </ThemeProvider>
      )
    })
    const component = screen.getByTestId('accountVerification')
    expect(component).toBeInTheDocument()
  })

  it('should enable the button when all the dropdowns are selected', async () => {
    act(() => {
      axiosMock.get.mockResolvedValue({
        data: [{ id: 1, name: 'Design, marketing or communication' }],
      })
      render(
        <ThemeProvider theme={theme}>
          <AccountVerification />
        </ThemeProvider>
      )
    })
    const component = screen.getByTestId('accountVerification')
    const categoryDropdown = component.querySelectorAll('.MuiInputBase-root')[0]
    const subcategoryDropdown =
      component.querySelectorAll('.MuiInputBase-root')[1]
    const businessSizeDropdown =
      component.querySelectorAll('.MuiInputBase-root')[2]
    const button = screen.getByTestId('continue')
    expect(button).toBeDisabled()
    fireEvent.click(categoryDropdown)
    fireEvent.click(
      await screen.findByText('Design, marketing or communication')
    )
    fireEvent.click(subcategoryDropdown)
    fireEvent.click(
      screen.getByText('Real estate sale, purchase and management')
    )
    fireEvent.click(businessSizeDropdown)
    fireEvent.click(screen.getByText('50-100'))
    expect(button).toBeEnabled()
  })
})
