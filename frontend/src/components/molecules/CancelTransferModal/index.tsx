import React from 'react'
import ModalBox, { ModalBoxProps } from '../ModalBox'
import { Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import Button from '../../atoms/Button'

interface CancelTransferModalProps extends ModalBoxProps {
  onPositiveAction: React.MouseEventHandler<HTMLButtonElement>
  onNegativeAction: React.MouseEventHandler<HTMLButtonElement>
  onClose?: () => void
}

const StyledStack = styled(Stack)(({ theme }) => ({
  width: theme.spacing(141),
  height: theme.spacing(83.75),

  // layout
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(6.5),

  '& .buttons': {
    display: 'flex',
    flexFlow: 'row wrap',
    gap: 10,
    marginTop: theme.spacing(19.75),
  },
}))

const CancelTransferModal: React.FC<CancelTransferModalProps> = ({
  onPositiveAction,
  onNegativeAction,
  ...props
}) => {
  return (
    <ModalBox {...props} onClose={props.onClose}>
      <StyledStack>
        <Typography variant="h1">{'Are you sure?'}</Typography>
        <Typography variant="body1" color="text.mediumEmphasis">
          {'You want to cancel this transfer'}
        </Typography>
        <Stack className="buttons">
          <Button variant="contained" onClick={onPositiveAction}>
            <Typography variant="body2">Yes</Typography>
          </Button>
          <Button variant="outlined" onClick={onNegativeAction}>
            <Typography variant="body2">No</Typography>
          </Button>
        </Stack>
      </StyledStack>
    </ModalBox>
  )
}

export default CancelTransferModal
