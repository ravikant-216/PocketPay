import { render, screen } from '@testing-library/react'
import ModalBox, { ModalBoxProps } from '.'
import '@testing-library/jest-dom/extend-expect'

jest.mock('../../../theme', () => ({
  palette: {
    structuralColors: {
      white: '#fff',
    },
  },
  spacing: (val: number) => `${val}px`,
}))

describe('ModalBox', () => {
  const mockChildren = <div>Modal Content</div>
  const mockProps: ModalBoxProps = {
    open: true,
    children: mockChildren,
    width: '400px',
    height: '300px',
  }

  it('renders the modal box content when open is true', () => {
    render(<ModalBox {...mockProps} />)
    const modalContent = screen.getByText('Modal Content')
    expect(modalContent).toBeInTheDocument()
  })

  it('does not render the modal box content when open is false', () => {
    render(<ModalBox {...mockProps} open={false} />)
    const modalContent = screen.queryByText('Modal Content')
    expect(modalContent).not.toBeInTheDocument()
  })
})
