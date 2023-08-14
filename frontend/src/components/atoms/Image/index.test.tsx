import { render } from '@testing-library/react'
import Image from './index'
import '@testing-library/jest-dom/extend-expect'
describe('Image atom', () => {
  it('should render the image', () => {
    const src = '../../../../public/assets/icons/noTransaction.svg'
    const altText = 'image'
    const className = 'img'

    const { getByRole } = render(
      <Image alt={altText} src={src} className={className} />
    )

    const imageElement = getByRole('img')

    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', src)
    expect(imageElement).toHaveAttribute('alt', altText)
  })
})
