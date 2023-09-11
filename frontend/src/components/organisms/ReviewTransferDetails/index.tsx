import { Box, Stack, StackProps, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import {
  CHANGE,
  CONFIRM_CONTINUE_LABEL,
  RECIEPIENT_DETAILS_LABEL,
  REVIEW_TRANSFER_DETAILS_TITLE,
  SCHEDULE_DETAILS_LABEL,
  TERMS_AND_CONDITIONS_LABEL,
  TRANSFER_DETAILS_LABEL,
} from '../../../strings/constants'
import LabelValue from '../../molecules/LabelValue'
import LeftArrow from '../../../../public/assets/icons/left-arrow.svg'
import Button from '../../atoms/Button'
import Image from '../../atoms/Image'
import { useState } from 'react'
import TransferDetailsForm from '../TransferDetailsForm'
import BusinessDetailsForm from '../BusinessDetailsForm'

export interface Transfer {
  senderAmount: number
  recipientAmount: number
  senderCurrencyCode: string
  recipientCurrencyCode: string
  fee: number
  conversionAmount: number
  rate: number
}

export interface Recipient {
  firstName?: string
  lastName?: string
  name: string
  email: string
  accountNumber: string
  accountType: string
  ifsc?: string
}

export interface ReviewTransferDetailsProps extends StackProps {
  onConfirmAndContinue: (trasnfer: Transfer, recipient: Recipient) => void
  data: {
    transfer: Transfer
    recipient: Recipient
  }
  editable: boolean
}

enum ScreenType {
  TRANSFER_DETAILS_EDITING,
  RECIPIENT_DETAILS_EDITING,
  REVIEW_DETAILS,
}

const StyledLabelValue = styled(LabelValue)(() => ({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

StyledLabelValue.defaultProps = {
  infoColor: 'text.mediumEmphasis',
}

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',

  // layout
  display: 'flex',
  flexFlow: 'column wrap',
  gap: theme.spacing(8),

  '& .details': {
    display: 'flex',
    flexFlow: 'column wrap',
    gap: theme.spacing(4),
  },

  '& .options': {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '& .edit-or-change-typo:hover': {
    cursor: 'pointer',
  },
  '& .footer': {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(8),
  },
}))

const ReviewTransferDetails: React.FC<ReviewTransferDetailsProps> = ({
  onConfirmAndContinue,
  editable,
  data,
  ...rest
}) => {
  const [userCurrentScreen, setUserCurrentScreen] = useState(
    ScreenType.REVIEW_DETAILS
  )

  const [transferDetails, setTransferDetails] = useState<Transfer>(
    data.transfer
  )

  const [recipientDetails, setRecipientsDetails] = useState<Recipient>(
    data.recipient
  )

  const scheduleDetails = {
    sending: 'Now',
    arriveDate: new Date('2023/04/28'),
    repeats: 'Never',
  }

  const transferDetailsLabelvalues = [
    {
      info: 'Fee:',
      description: `${transferDetails.fee} ${transferDetails.senderCurrencyCode}`,
    },
    {
      info: "Amount we'll convert:",
      description: `${transferDetails.conversionAmount} ${transferDetails.recipientCurrencyCode}`,
    },
    {
      info: 'Guranteed rate:',
      description: `1 ${transferDetails.senderCurrencyCode} = ${transferDetails.rate} ${transferDetails.recipientCurrencyCode}`,
    },
  ]

  const recipientDetailsLabelvalues = [
    {
      info: 'Name:',
      description: recipientDetails.name,
    },
    {
      info: 'Email:',
      description: recipientDetails.email,
    },
    {
      info: 'Account number:',
      description: recipientDetails.accountNumber,
    },
    {
      info: 'Account type:',
      description: recipientDetails.accountType,
    },
  ]

  const scheduleDetailsLabelvalues = [
    {
      info: 'Sending:',
      description: scheduleDetails.sending,
    },
    {
      info: 'Should arrive:',
      description: `by ${getMonthName(
        scheduleDetails.arriveDate.getMonth()
      )} ${scheduleDetails.arriveDate.getDate()}`,
    },
    {
      info: 'Repeats:',
      description: scheduleDetails.repeats,
    },
  ]

  const renderLabeValuesOf = (items: typeof transferDetailsLabelvalues) =>
    items.map((item) => (
      <StyledLabelValue
        key={item.info}
        infoVar="body2"
        descVar="body2"
        {...item}
      />
    ))

  const onClickEdit = () => {
    setUserCurrentScreen(ScreenType.TRANSFER_DETAILS_EDITING)
  }

  const onClickChange = () => {
    setUserCurrentScreen(ScreenType.RECIPIENT_DETAILS_EDITING)
  }

  const onSaveRecipientsDetails = (data: typeof recipientDetails) => {
    setRecipientsDetails(data)
    setUserCurrentScreen(ScreenType.REVIEW_DETAILS)
  }

  const onCancelEditing = () => {
    setUserCurrentScreen(ScreenType.REVIEW_DETAILS)
  }

  if (userCurrentScreen === ScreenType.RECIPIENT_DETAILS_EDITING) {
    return (
      <BusinessDetailsForm
        {...recipientDetails}
        cancelOnClick={onCancelEditing}
        saveOnClick={onSaveRecipientsDetails}
      />
    )
  } else if (userCurrentScreen === ScreenType.TRANSFER_DETAILS_EDITING) {
    return (
      <TransferDetailsForm
        amount={transferDetails.senderAmount.toString()}
        fee={transferDetailsLabelvalues[0].description}
        senderCountryCode={transferDetails.senderCurrencyCode}
        amountRate={transferDetailsLabelvalues[1].description}
        guaranteedRate={transferDetailsLabelvalues[2].description}
        cancelOnClick={onCancelEditing}
        saveOnClick={(data) => {
          setTransferDetails({
            ...transferDetails,
            senderAmount: Number(data.amount),
            recipientAmount: Number(data.amount) * transferDetails.rate,
          })
          onCancelEditing()
        }}
        sx={{ width: '100%' }}
      />
    )
  }

  const senderAmountLabel =
    transferDetails.senderAmount.toFixed(2) +
    ' ' +
    transferDetails.senderCurrencyCode
  const recieverAmountLabel =
    transferDetails.recipientAmount.toFixed(2) +
    ' ' +
    transferDetails.recipientCurrencyCode

  return (
    <StyledStack data-testid="ReviewTransferDetails" {...rest}>
      {editable && (
        <Typography variant="h1">{REVIEW_TRANSFER_DETAILS_TITLE}</Typography>
      )}
      <Stack className="details">
        <Stack className="options">
          <Typography variant="caption" color="text.lowEmphasis">
            {TRANSFER_DETAILS_LABEL}
          </Typography>
          <Box onClick={onClickEdit}>
            {editable && (
              <Typography
                className="edit-or-change-typo"
                variant="link"
                color="primary.500"
              >
                {CHANGE}
              </Typography>
            )}
          </Box>
        </Stack>
        <Stack direction="row" gap={2}>
          <Typography variant="body2">{senderAmountLabel}</Typography>
          <Image src={LeftArrow} alt="left Arrow" />
          <Typography variant="body2">{recieverAmountLabel}</Typography>
        </Stack>
        {renderLabeValuesOf(transferDetailsLabelvalues)}
      </Stack>
      <Stack className="details">
        <Stack className="options">
          <Typography variant="caption" color="text.lowEmphasis">
            {RECIEPIENT_DETAILS_LABEL}
          </Typography>
          <Box onClick={onClickChange}>
            {editable && (
              <Typography
                className="edit-or-change-typo"
                variant="link"
                color="primary.500"
              >
                {CHANGE}
              </Typography>
            )}
          </Box>
        </Stack>

        {renderLabeValuesOf(recipientDetailsLabelvalues)}
      </Stack>
      {editable && (
        <Stack className="details">
          <Stack className="options">
            <Typography variant="caption" color="text.lowEmphasis">
              {SCHEDULE_DETAILS_LABEL}
            </Typography>
            <Typography
              className="edit-or-change-typo"
              variant="link"
              color="primary.500"
            >
              {CHANGE}
            </Typography>
          </Stack>
          {renderLabeValuesOf(scheduleDetailsLabelvalues)}
        </Stack>
      )}
      {editable && (
        <Stack className="footer">
          <Typography variant="body3" color="text.lowEmphasis">
            {TERMS_AND_CONDITIONS_LABEL}
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              onConfirmAndContinue(transferDetails, recipientDetails)
            }
            data-testid="continueButton"
          >
            {CONFIRM_CONTINUE_LABEL}
          </Button>
        </Stack>
      )}
    </StyledStack>
  )
}

export default ReviewTransferDetails

function getMonthName(monthIdx: number) {
  const monthnames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return monthnames[monthIdx]
}
