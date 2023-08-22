import { Stack, StackProps, styled } from '@mui/material'
import Payment, { ScreenType } from '../Payment'
import ReviewTransferDetails, {
  Recipient,
  Transfer,
} from '../ReviewTransferDetails'
import { useState } from 'react'
import Button from '../../atoms/Button'
import {
  CANCEL_THIS_TRANSFER,
  CONTINUE_TO_PAY_BUTTON,
} from '../../../strings/constants'
import Typography from '../../atoms/Typography'

interface ReviewTransferProps extends StackProps {
  ReviewTransferDetailsProps: {
    data: {
      transfer: Transfer
      recipient: Recipient
    }
  }
  onChooseBankTransfer: () => void
  onCompleteCardTransfer: () => void
}

const StyledStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  gap: theme.spacing(6),

  '& .enclose': {
    width: theme.spacing(118.5),
    flexShrink: 0,
    padding: `${theme.spacing(12)} ${theme.spacing(8)}`,

    display: 'flex',
    flexFlow: 'column nowrap',
    gap: theme.spacing(10),
    borderRadius: theme.spacing(4),
    border: `${theme.spacing(0.25)} solid ${theme.palette.Greys.stroke}`,
  },

  '& .floating-buttons': {
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    gap: theme.spacing(5),
    '& > *': {
      width: theme.spacing(58),
    },
  },
}))

const ReviewTransfer: React.FC<ReviewTransferProps> = ({
  onChooseBankTransfer,
  onCompleteCardTransfer,
  ReviewTransferDetailsProps,
  ...rest
}) => {
  const [userCurrentScreen, setUserCurrentScreen] = useState(
    ScreenType.CHOOSE_PAYMENT_TYPE
  )

  const [onBankTransferSelection, setOnBankTransferSelection] = useState(false)

  const onClickContinue = () => {
    if (onBankTransferSelection) {
      onChooseBankTransfer()
    } else if (userCurrentScreen === ScreenType.CHOOSE_PAYMENT_TYPE) {
      setUserCurrentScreen(ScreenType.PAY_WITH_CARD)
    } else {
      setUserCurrentScreen(ScreenType.PAYMENT_CONFIRMATION)
    }
  }

  return (
    <StyledStack data-testid="ReviewTransfer" {...rest}>
      <Payment
        userCurrentScreen={userCurrentScreen}
        onTransferOptionSelected={(e, value) => {
          setOnBankTransferSelection(value === 'bank')
        }}
        onComplete={onCompleteCardTransfer}
      />
      <Stack className="enclose">
        <ReviewTransferDetails
          data={ReviewTransferDetailsProps.data}
          sx={{ width: '100%' }}
          onConfirmAndContinue={() => ({})}
          editable={false}
        />
        {userCurrentScreen !== ScreenType.PAYMENT_CONFIRMATION && (
          <Stack className="floating-buttons">
            <Button variant="contained" onClick={onClickContinue}>
              <Typography variant="body2">{CONTINUE_TO_PAY_BUTTON}</Typography>
            </Button>
            <Button variant="outlined">
              <Typography variant="body2">{CANCEL_THIS_TRANSFER}</Typography>
            </Button>
          </Stack>
        )}
      </Stack>
    </StyledStack>
  )
}

export default ReviewTransfer
