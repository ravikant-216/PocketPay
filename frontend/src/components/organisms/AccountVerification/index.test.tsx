import { fireEvent, render, screen } from '@testing-library/react'
import AccountVerification from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'
import '@testing-library/jest-dom/extend-expect'
describe('AccountVerification', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <AccountVerification />
      </ThemeProvider>
    )

    const component = getByTestId('accountVerification')
    expect(component).toBeInTheDocument()
  })

  it('should enable the button when all the dropdowns are selected', () => {
    render(
      <ThemeProvider theme={theme}>
        <AccountVerification />
      </ThemeProvider>
    )
    const component = screen.getByTestId('accountVerification')
    const categoryDropdown = component.querySelectorAll('.MuiInputBase-root')[0]
    const subcategoryDropdown =
      component.querySelectorAll('.MuiInputBase-root')[1]
    const businessSizeDropdown =
      component.querySelectorAll('.MuiInputBase-root')[2]
    const button = screen.getByTestId('continue')
    expect(button).toBeDisabled()
    fireEvent.click(categoryDropdown)
    fireEvent.click(screen.getByText('Design, marketing or communication'))
    fireEvent.click(subcategoryDropdown)
    fireEvent.click(
      screen.getByText('Real estate sale, purchase and management')
    )
    fireEvent.click(businessSizeDropdown)
    fireEvent.click(screen.getByText('50-100'))
    expect(button).toBeEnabled()
  })
})
