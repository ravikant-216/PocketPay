import { Box } from '@mui/system'
import CheckboxLabels from '../../atoms/Checkbox'
import InputField from '../../atoms/InputField'
import Typography from '../../atoms/Typography'
import styled from '@emotion/styled'
import CustomButton from '../../atoms/Button'
import theme from '../../../theme'
import {
  Email_REGEX,
  RECIPIENT_DETAILS,
  RECIPIENT_DETAILS_CONTINUE,
  USER_DETAIL,
} from '../../../strings/constants'
import { useState } from 'react'

interface UserDetails {
  account: string
  firstName: string
  lastName: string
  ifsc: string
}

export interface RecipientDetailsProps {
  style?: React.CSSProperties
  onClick: (form: UserDetails) => void
}
const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(5),
  width: '100%',
})

const OuterContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '650px',
})

const ButtonWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
})

interface UserDetails {
  account: string
  firstName: string
  lastName: string
  ifsc: string
}

const RecipientDetails = (props: RecipientDetailsProps) => {
  const [details, setDetails] = useState<UserDetails | undefined>({
    account: '',
    firstName: '',
    lastName: '',
    ifsc: '',
  })

  const initalValues = {
    email: '',
    account: '',
    firstName: '',
    lastName: '',
    ifsc: '',
  }

  const [values, setValues] = useState(initalValues)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValues({ ...values, [name]: value })

    if (name === 'email') {
      const data = USER_DETAIL.find((item) => item.email === value)
      if (data) {
        setDetails(data)
        setValues(data)
      } else {
        setDetails(undefined)
      }
    }

    if (name === 'email' && value == '') {
      setValues(initalValues)
    }
  }

  const validateFields = () => {
    return (
      new RegExp(Email_REGEX).test(values.email) &&
      values.account.length == 12 &&
      values.firstName.length >= 3 &&
      values.lastName.length >= 3 &&
      values.ifsc.length == 11
    )
  }

  return (
    <OuterContainer style={props.style} data-testid="recipientDetails">
      <StyledContainer>
        <Typography variant="h1" color="text.highEmphasis">
          Send to Someone
        </Typography>

        <InputField
          variant="outlined"
          type="text"
          placeholder="Email"
          label="Email"
          sx={{ width: '100%' }}
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        <CheckboxLabels label="I know their bank details" checked={true} />
        <Typography variant="body3" color="text.highEmphasis">
          {RECIPIENT_DETAILS}
        </Typography>
        <InputField
          variant="outlined"
          type="number"
          placeholder="Account number"
          label="Account number"
          sx={{ width: '100%' }}
          name="account"
          onChange={handleChange}
          value={details ? details.account : values.account}
        />
        <InputField
          variant="outlined"
          type="text"
          placeholder="First name"
          label="First name"
          sx={{ width: '100%' }}
          name="firstName"
          onChange={handleChange}
          value={details ? details.firstName : values.firstName}
        />
        <InputField
          variant="outlined"
          type="text"
          placeholder="Last name"
          label="Last name"
          sx={{ width: '100%' }}
          name="lastName"
          onChange={handleChange}
          value={details ? details.lastName : values.lastName}
        />

        <InputField
          variant="outlined"
          type="text"
          placeholder="IFSC code"
          label="IFSC code"
          sx={{ width: '100%' }}
          name="ifsc"
          onChange={handleChange}
          value={details ? details.ifsc : values.ifsc}
        />
      </StyledContainer>
      <ButtonWrapper>
        <CustomButton
          variant="contained"
          disabled={(details ? false : !validateFields()) || values.email == ''}
          onClick={() => {
            props.onClick(values)
          }}
        >
          {RECIPIENT_DETAILS_CONTINUE}
        </CustomButton>
      </ButtonWrapper>
    </OuterContainer>
  )
}

export default RecipientDetails
