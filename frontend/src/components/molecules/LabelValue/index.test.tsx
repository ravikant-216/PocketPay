import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LabelValue from '.'

describe('LabelValue Component', () => {
  it('should render the component with the provided props', () => {
    const info = 'Info Text'
    const description = 'Description Text'
    const infoColor = 'blue'
    const descColor = 'green'
    const infoVar = 'body2'
    const descVar = 'caption'

    render(
      <LabelValue
        info={info}
        description={description}
        infoColor={infoColor}
        descColor={descColor}
        infoVar={infoVar}
        descVar={descVar}
      />
    )
    expect(screen.getByText(info)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })
})
