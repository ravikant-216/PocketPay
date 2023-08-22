import { ThemeProvider } from '@emotion/react'
import { fireEvent, render, screen } from '@testing-library/react'
import theme from '../../../theme'
import PocketPayPurpose from '.'
import '@testing-library/jest-dom/extend-expect'
import { RECIPIENT_DETAILS_CONTINUE } from '../../../strings/constants'
const onClick = jest.fn()
describe('PocketPayPurpose', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PocketPayPurpose onClick={onClick} />
      </ThemeProvider>
    )

    const component = getByTestId('pocketpayPurpose')
    expect(component).toBeInTheDocument()
  })

  it('disables the button if no value is selected', () => {
    render(
      <ThemeProvider theme={theme}>
        <PocketPayPurpose onClick={onClick} />
      </ThemeProvider>
    )

    const component = screen.getByTestId('pocketpayPurpose')
    const dropdownButton = component.querySelectorAll('.MuiInputBase-root')[0]
    const button = screen.getByText(RECIPIENT_DETAILS_CONTINUE)
    expect(button).toBeDisabled()
    fireEvent.click(dropdownButton)
    fireEvent.click(
      screen.getByText('Paying rent, utilities or property charges')
    )
    expect(button).toBeEnabled()
    fireEvent.click(button)
    expect(onClick).toBeCalled()
  })
})
