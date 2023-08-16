import styled from '@emotion/styled'
import { Box, Paper } from '@mui/material'
import theme from '../../../theme'

export interface ModalBoxProps {
  open?: boolean
  children?: React.ReactNode
  width?: string
  height?: string
  style?: React.CSSProperties
  onClose?: () => void
}

const ModalOverlay = styled(Paper)({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  backgroundColor: theme.palette.structuralColors.backdrop,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 10,
})
const Modal = styled(Box)(
  ({ width, height }: { width?: string; height?: string }) => ({
    backgroundColor: theme.palette.structuralColors.white,
    maxWidth: '90vw',
    width: width,
    height: height,
    borderRadius: theme.spacing(4),
  })
)

const ModalBox = (props: ModalBoxProps) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }
  return (
    <>
      {props.open && (
        <ModalOverlay onClick={props.onClose} data-testid="modalOverlay">
          <Modal {...props} sx={props.style} onClick={handleClick}>
            {props.children}
          </Modal>
        </ModalOverlay>
      )}
    </>
  )
}

export default ModalBox
