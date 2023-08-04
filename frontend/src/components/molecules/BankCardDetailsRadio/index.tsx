import { Stack, styled } from '@mui/material'
import RadioButton, { RadioButtonProps } from '../../atoms/RadioButton'
import Typography from '../../atoms/Typography'
import InputField from '../../atoms/InputField'
import Image from '../../atoms/Image'
import CardIcon from '../../../../public/assets/icons/credit-card.svg'
import { FOUR_DIGIT_LABEL, EXPIRATION_LABEL } from '../../../strings/constants'

interface BankCardDetailsRadioProps extends Omit<RadioButtonProps, 'label'> {
  lastFourDigitsOfCardNumber: number
  expirationDate: Date
}

const StyledRadioButton = styled(RadioButton)(({ theme }) => ({
  width: theme.spacing(118),
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: theme.spacing(10),
}))

const StyledStack = styled(Stack)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  '& .cvv': {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}))

function formatMonth(month: number) {
  month++
  return month < 10 ? `0${month}` : `${month}`
}

function formatYear(year: number) {
  return year % 100
}

const BankCardDetailsRadio: React.FC<BankCardDetailsRadioProps> = (props) => {
  const expirationMonth = formatMonth(props.expirationDate.getMonth())
  const expirationYear = formatYear(props.expirationDate.getFullYear())
  const expiration = `${expirationMonth}/${expirationYear}`
  const label = (
    <StyledStack>
      <Typography variant="body2" color="text.highEmphasis">
        {props.title}
      </Typography>
      <Typography variant="body2" color="text.mediumEmphasis">
        {FOUR_DIGIT_LABEL}
        <Typography component="span" variant="body2" color="text.highEmphasis">
          {props.lastFourDigitsOfCardNumber}
        </Typography>
        {EXPIRATION_LABEL}
        <Typography component="span" variant="body2" color="text.highEmphasis">
          {expiration}
        </Typography>
      </Typography>
      <InputField
        className="cvv"
        placeholder="CVV / CVC"
        endAdornment={<Image src={CardIcon} alt="Card Icon" />}
      />
    </StyledStack>
  )
  return (
    <StyledRadioButton
      data-testid="BankCardDetailsRadio"
      value={props.value}
      label={label}
    />
  )
}

export default BankCardDetailsRadio
