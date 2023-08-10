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
    const categoryDropdown = screen.getAllByRole('button')[0]
    const subcategoryDropdown = screen.getAllByRole('button')[1]
    const businessSizeDropdown = screen.getAllByRole('button')[2]
    const button = screen.getByTestId('continue')
    expect(button).toBeDisabled
    fireEvent.click(categoryDropdown)
    fireEvent.click(screen.getAllByRole('option')[0])
    fireEvent.click(subcategoryDropdown)
    fireEvent.click(screen.getAllByRole('option')[0])
    fireEvent.click(businessSizeDropdown)
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(button).toBeEnabled
  })
})
