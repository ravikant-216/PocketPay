import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen } from '@testing-library/react'
import theme from '../../../theme'
import PocketPayPurpose from '.'
import '@testing-library/jest-dom/extend-expect'
import { RECIPIENT_DETAILS_CONTINUE } from '../../../strings/constants'
describe('PocketPayPurpose', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PocketPayPurpose />
      </ThemeProvider>
    )

    const component = getByTestId('pocketpayPurpose')
    expect(component).toBeInTheDocument()
  })

  it('disables the button if no value is selected', () => {
    render(
      <ThemeProvider theme={theme}>
        <PocketPayPurpose />
      </ThemeProvider>
    )

    const dropdownButton = screen.getAllByRole('button')[0]
    const button = screen.getByText(RECIPIENT_DETAILS_CONTINUE)
    expect(button).toBeDisabled()
    fireEvent.click(dropdownButton)
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(button).toBeEnabled()
  })
})
