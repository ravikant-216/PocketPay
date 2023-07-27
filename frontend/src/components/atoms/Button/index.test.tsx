import { fireEvent, render } from '@testing-library/react'
import CustomButton from '.'
import '@testing-library/jest-dom/extend-expect'
describe('CustomButton', () => {
  it('should render the text', () => {
    const { getByText } = render(<CustomButton label="continue" />)
    const label = getByText('continue')
    expect(label).toBeInTheDocument
  })

  it('should call onclick event when clicked', () => {
    const onclick = jest.fn()
    const { getByRole } = render(<CustomButton onClick={onclick} />)
    const button = getByRole('button')
    fireEvent.click(button)
    expect(onclick).toHaveBeenCalledTimes(1)
  })

  it('should have color red', () => {
    const style = { color: 'red' }
    const { getByRole } = render(<CustomButton style={style} />)
    const button = getByRole('button')
    expect(button).toHaveStyle('color: red;')
  })

  it('should be deisabled when disabled is set true', () => {
    const { getByRole } = render(<CustomButton disabled={true} />)
    const button = getByRole('button')
    expect(button).toBeDisabled()
  })
})
