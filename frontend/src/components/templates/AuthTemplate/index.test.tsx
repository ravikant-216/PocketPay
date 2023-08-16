import React from 'react'
import { render } from '@testing-library/react'
import { AuthTemplate } from '.'
import '@testing-library/jest-dom'

describe('AuthTemplate component', () => {
  const mockContent = <div>Mock Content</div>

  it('renders the AuthTemplate component', () => {
    const { getByText } = render(<AuthTemplate Content={mockContent} />)
    expect(getByText('Mock Content')).toBeInTheDocument()
  })

  it('renders the logo image', () => {
    const { getByAltText } = render(<AuthTemplate Content={mockContent} />)
    expect(getByAltText('PocketPay')).toBeInTheDocument()
  })
})
