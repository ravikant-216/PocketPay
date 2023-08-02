import { Box, MenuItem, Stack, styled } from '@mui/material'
import ModalBox, { ModalBoxProps } from '../../molecules/ModalBox'
import Typography from '../../atoms/Typography'
import InputField from '../../atoms/InputField'
import {
  ACCOUNT_NUMBER_1,
  ACCOUNT_NUMBER_2,
  CANCEL_TRANSFER_TITLE,
  DEBIT_CARD_1_LABEL,
  DEBIT_CARD_2_LABEL,
  EXISITING_ACCOUNT_LABEL,
  NEW_ACCOUNT_LABEL,
  USER_NAME,
} from '../../../strings/constants'
import Button from '../../atoms/Button'
import { useState } from 'react'

interface TransferCancelationModalProps extends ModalBoxProps {
  transferNumber: string
  onCancel: React.MouseEventHandler<HTMLButtonElement>
}

const StyledStack = styled(Stack)(({ theme }) => ({
  minWidth: theme.spacing(141),
  flexShrink: 0,
  borderRadius: theme.spacing(4),
  padding: theme.spacing(6),
  background: theme.palette.structuralColors.white,

  // layout
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'flex-start',
  aliginItems: 'center',
  gap: theme.spacing(10),

  '& .form': {
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: theme.spacing(6),
    '& .caption': {
      position: 'relative',
      top: theme.spacing(1),
    },
  },
  '& .MuiMenuItem-root': {
    height: theme.spacing(14),
    paddingX: theme.spacing(6),
    paddingY: theme.spacing(3),
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  height: theme.spacing(14),
  paddingX: theme.spacing(6),
  paddingY: theme.spacing(3),
}))

interface Option {
  value: number
  label: React.ReactNode
}

const TransferCancelationModal: React.FC<TransferCancelationModalProps> = ({
  transferNumber,
  onCancel,
  ...rest
}) => {
  const [accountSelected, setAccountSelected] = useState<boolean>(false)
  const [bankSelected, setBankSelected] = useState<boolean>(false)

  const accountOptions: Option[] = [
    {
      value: 0,
      label: <Typography variant="body2">{EXISITING_ACCOUNT_LABEL}</Typography>,
    },
    {
      value: 1,
      label: <Typography variant="body2">{NEW_ACCOUNT_LABEL}</Typography>,
    },
  ]

  const bankOptions = [
    {
      value: 0,
      label: (
        <Stack>
          <Typography variant="body2">{USER_NAME}</Typography>
          <Typography variant="caption" color="text.mediumEmphasis">
            {DEBIT_CARD_1_LABEL}
          </Typography>
        </Stack>
      ),
      accountNumber: ACCOUNT_NUMBER_1,
    },
    {
      value: 1,
      label: (
        <Stack>
          <Typography variant="body2">{USER_NAME}</Typography>
          <Typography variant="caption" color="text.mediumEmphasis">
            {DEBIT_CARD_2_LABEL}
          </Typography>
        </Stack>
      ),
      accountNumber: ACCOUNT_NUMBER_2,
    },
  ]

  const createOptions = (options: Option[]) => {
    return options.map((opt) => (
      <StyledMenuItem key={opt.value} value={opt.value}>
        {opt.label}
      </StyledMenuItem>
    ))
  }

  const transferNumberLabel = `Cancel transfer #${transferNumber}`

  return (
    <ModalBox {...rest}>
      <StyledStack data-testid="TransferCancelationModal">
        <Typography variant="body1">{transferNumberLabel}</Typography>
        <Stack className="form">
          <Typography
            className="caption"
            variant="caption"
            color="text.mediumEmphasis"
          >
            {CANCEL_TRANSFER_TITLE}
          </Typography>
          <InputField
            id="account-input"
            select
            onChange={() => setAccountSelected(true)}
            label="Select account"
          >
            {createOptions(accountOptions)}
          </InputField>
          <InputField
            id="bank-input"
            select
            onChange={() => setBankSelected(true)}
            label="Select an option"
            SelectProps={{
              renderValue: (selected) => {
                if (typeof selected == 'number') {
                  return (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">{USER_NAME}</Typography>
                      <Typography variant="caption">
                        {`xxxx xxxx ${bankOptions[selected].accountNumber}`}
                      </Typography>
                    </Stack>
                  )
                }
              },
            }}
          >
            {createOptions(bankOptions)}
          </InputField>
        </Stack>
        {bankSelected && accountSelected && (
          <Box sx={{ alignSelf: 'center' }}>
            <Button variant="contained" onClick={onCancel}>
              <Typography variant="body2">Cancel transfer</Typography>
            </Button>
          </Box>
        )}
      </StyledStack>
    </ModalBox>
  )
}

export default TransferCancelationModal
