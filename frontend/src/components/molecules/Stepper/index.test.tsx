import { render, screen } from '@testing-library/react'
import Stepper from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Stepper', () => {
  test('renders with correct labels and value', () => {
    const labels = ['Step 1', 'Step 2', 'Step 3']
    const value = 1
    render(<Stepper labels={labels} value={value} />)
    expect(
      Number(screen.getByRole('slider').getAttribute('aria-valuenow'))
    ).toEqual(value)

    expect(screen.getByText(labels[0])).toBeInTheDocument()
    expect(screen.getByText(labels[1])).toBeInTheDocument()
    expect(screen.getByText(labels[2])).toBeInTheDocument()
  })
})
