import VerticalStepper from '.'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import { steps } from '../../../strings/constants'

describe('Vertical Stepper', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <VerticalStepper steps={steps} data-testid="vertical-stepper" />
      </ThemeProvider>
    )
    expect(getByTestId('vertical-stepper')).toBeInTheDocument()
  })
  it('checks lines poperly render or not', () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <VerticalStepper
          steps={steps}
          activeStep={2}
          data-testid="vertical-stepper"
        />
      </ThemeProvider>
    )
    const elements = getAllByTestId('vertical-stepper-connector')
    expect(elements).toHaveLength(steps.length - 1)
  })
  it('checks levels poperly render or not', () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={theme}>
        <VerticalStepper
          steps={steps}
          activeStep={2}
          data-testid="vertical-stepper"
        />
      </ThemeProvider>
    )
    const elements = getAllByTestId('vertical-stepper-lavel')
    expect(elements).toHaveLength(steps.length)
  })
  it('checks all text is coming or not', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <VerticalStepper
          steps={steps}
          activeStep={4}
          data-testid="vertical-stepper"
        />
      </ThemeProvider>
    )
    steps.forEach((step) => {
      expect(getByText(step.label)).toBeInTheDocument()
      expect(getByText(step.time)).toBeInTheDocument()
    })
  })
  it('checks active is working or not', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <VerticalStepper
          steps={steps}
          activeStep={2}
          data-testid="vertical-stepper"
        />
      </ThemeProvider>
    )
    const elements = container.querySelectorAll('.MuiStepLabel-iconContainer')
    expect(elements[0]).toHaveClass('Mui-completed')
    expect(elements[1]).toHaveClass('Mui-active')
  })
})
