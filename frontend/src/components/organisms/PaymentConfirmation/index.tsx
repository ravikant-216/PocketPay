import Typography from '../../atoms/Typography'
import theme from '../../../theme'
import LabelValue from '../../molecules/LabelValue'
import CustomButton from '../../atoms/Button'
import { Stack, Box, StackProps } from '@mui/material'
import Icon from '../../atoms/IconButton'
import horse from '../../../../public/assets/icons/horse.svg'
import styled from '@emotion/styled'
import {
  ACCOUNT_NUMBER,
  ADDRESS,
  AMOUNT,
  PAYEE_NAME,
  REFERENCE,
  BANK_INTRO_MESSAGE,
  CODE,
  BANK_INTRO_CAPTION,
  LLOYDS_ONLINE_BANK,
  ONLINE_BANK,
} from '../../../strings/constants'

export interface PaymentConfirmationProps extends StackProps {
  payeeName?: string
  reference?: string
  amount?: string
  code?: string
  accountNumber?: string
  address?: string
  onClick?: () => void
}
const OuterStyledBox = styled(Box)`
  border-radius: ${theme.spacing(4)};
  border: 1px solid ${theme.palette.Greys.stroke};
  padding-right: ${theme.spacing(8)};
  padding-left: ${theme.spacing(8)};
  padding-top: ${theme.spacing(4)};
  margin-top: ${theme.spacing(4)};
`

const ButtonBox = styled(Box)`
  display: flex;
  width: 100%;
  min-width: ${theme.spacing(54.5)};
  justify-content: center;
  padding-right: ${theme.spacing(29.25)};
  padding-left: ${theme.spacing(29.25)};
  margin-top: ${theme.spacing(5)};
  margin-bottom: ${theme.spacing(5)};
  flex-direction: column;
  gap: ${theme.spacing(4)};
`

export default function PaymentConfirmation({
  payeeName = `${PAYEE_NAME}`,
  reference = `${REFERENCE}`,
  amount = `${AMOUNT}`,
  code = `${CODE}`,
  accountNumber = `${ACCOUNT_NUMBER}`,
  address = `${ADDRESS}`,
  onClick,
  ...props
}: PaymentConfirmationProps) {
  return (
    <Stack rowGap={theme.spacing(4)} {...props}>
      <Typography variant="h1">{LLOYDS_ONLINE_BANK}</Typography>

      <OuterStyledBox>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: theme.spacing(4),
          }}
        >
          <Icon
            borderRadius={theme.spacing(12.5)}
            height={theme.spacing(7)}
            icon={horse}
            width={theme.spacing(7)}
          />
        </Box>
        <Stack gap={theme.spacing(3)}>
          <Typography variant="body1" color="text.highEmphasis">
            {BANK_INTRO_MESSAGE}
          </Typography>
          <Typography variant="caption" color="text.mediumEmphasis">
            {BANK_INTRO_CAPTION}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            marginTop={theme.spacing(7)}
          >
            <LabelValue
              descColor={theme.palette.text.highEmphasis}
              descVar="body2"
              description={payeeName}
              direction="column"
              info="Payee name"
              infoColor={theme.palette.text.lowEmphasis}
              infoVar="caption"
            />
            <LabelValue
              descColor={theme.palette.text.highEmphasis}
              descVar="body2"
              description={reference}
              direction="column"
              info="Use this reference"
              infoColor={theme.palette.text.lowEmphasis}
              infoVar="caption"
            />
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            marginTop={theme.spacing(10)}
          >
            <LabelValue
              descColor={theme.palette.text.highEmphasis}
              descVar="body2"
              description={amount}
              direction="column"
              info="Amount to send"
              infoColor={theme.palette.text.lowEmphasis}
              infoVar="caption"
            />
            <LabelValue
              descColor={theme.palette.text.highEmphasis}
              descVar="body2"
              description={code}
              direction="column"
              info="UK Sort code"
              infoColor={theme.palette.text.lowEmphasis}
              infoVar="caption"
            />
          </Stack>
          <Stack marginTop={theme.spacing(10)}>
            <LabelValue
              descColor={theme.palette.text.highEmphasis}
              descVar="body2"
              description={accountNumber}
              direction="column"
              info="Account number"
              infoColor={theme.palette.text.lowEmphasis}
              infoVar="caption"
            />
          </Stack>
          <Stack marginTop={theme.spacing(10)} maxWidth={theme.spacing(56.5)}>
            <LabelValue
              descColor={theme.palette.text.highEmphasis}
              descVar="body2"
              description={address}
              direction="column"
              info="Our bank address"
              infoColor={theme.palette.text.lowEmphasis}
              infoVar="caption"
            />
          </Stack>
          <Stack marginTop={theme.spacing(10)}>
            <Typography variant="caption" color="text.lowEmphasis">
              You can use your Lloyds{' '}
              <Typography variant="link" color="primary.500">
                {' '}
                {ONLINE_BANK}
              </Typography>{' '}
              or mobile app to make your bank transfer to Wise
            </Typography>
          </Stack>
          <ButtonBox minWidth={theme.spacing(54.5)}>
            <CustomButton variant="contained" onClick={onClick}>
              Continue
            </CustomButton>
            <CustomButton variant="outlined" onClick={onClick}>
              Cancel this transfer
            </CustomButton>
          </ButtonBox>
        </Stack>
      </OuterStyledBox>
    </Stack>
  )
}
