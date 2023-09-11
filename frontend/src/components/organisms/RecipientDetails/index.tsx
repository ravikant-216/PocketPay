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
  baseURL,
} from '../../../strings/constants'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem'
import { SelectChangeEvent } from '@mui/material'

interface UserDetails {
  email: string
  account: string
  firstName: string
  lastName: string
  ifsc: string
  accountType: string
}

export interface RecipientDetailsProps {
  data: UserDetails
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
  marginBottom: theme.spacing(-8),
  flexDirection: 'column',
})

interface Beneficiary {
  account: string
  firstName: string
  lastName: string
  ifsc: string
  email: string
  id: number
  accountType: string
}
const ACCOUNT_NUMBER_LENGTH = 12
const IFSC_CODE_LENGTH = 11
const MIN_NAME_LENGTH = 3

const RecipientDetails = (props: RecipientDetailsProps) => {
  const [disabled, setDisabled] = useState(false)
  const initalValues = {
    email: '',
    account: '',
    firstName: '',
    lastName: '',
    ifsc: '',
    accountType: '',
  }

  const [values, setValues] = useState(props.data)
  const [userDetails, setUserDetails] = useState<Beneficiary[]>([])
  const [accountError, setAccountError] = useState('')
  const [ifscError, setIfscError] = useState('')
  const [emailError, setEmailError] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'account') {
      const isAccountValid = value.length === ACCOUNT_NUMBER_LENGTH
      setAccountError(isAccountValid ? '' : 'Invalid account number')
    }
    if (name == 'ifsc') {
      const isIfscValid = value.length === IFSC_CODE_LENGTH
      setIfscError(isIfscValid ? '' : 'Invalid ifsc code')
    }
    setValues({ ...values, [name]: value })

    if (name === 'email') {
      const isEmailValid = new RegExp(Email_REGEX).test(value)
      setEmailError(isEmailValid ? '' : 'Invalid email address')
      const data = userDetails.find((item) => item.email === value)
      if (data) {
        setValues(data)
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }

    if (name === 'email' && value == '') {
      setValues(initalValues)
    }
  }

  const handleValueChange = (event: SelectChangeEvent<unknown>) => {
    console.log(event.target.value)
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  const validateFields = () => {
    return (
      new RegExp(Email_REGEX).test(values.email) &&
      values.account.length === ACCOUNT_NUMBER_LENGTH &&
      values.firstName.length >= MIN_NAME_LENGTH &&
      values.lastName.length >= MIN_NAME_LENGTH &&
      values.ifsc.length === IFSC_CODE_LENGTH &&
      values.accountType.length >= MIN_NAME_LENGTH
    )
  }

  const fetchBeneficiaryList = async () => {
    const response = await axios.get(`${baseURL}/beneficiary`)
    console.log(response.data)
    const data: Beneficiary[] = response.data
    setUserDetails(data)
  }

  useEffect(() => {
    fetchBeneficiaryList()
  }, [])

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
          error={Boolean(emailError)}
          helperText={emailError}
        />
        <CheckboxLabels label="I know their bank details" checked={true} />
        <Typography variant="body3" color="text.highEmphasis">
          {RECIPIENT_DETAILS}
        </Typography>
        <InputField
          variant="outlined"
          type="number"
          disabled={disabled}
          placeholder="Account number"
          label="Account number"
          sx={{ width: '100%' }}
          name="account"
          onChange={handleChange}
          value={values.account}
          error={Boolean(accountError)}
          helperText={accountError}
        />
        <InputField
          variant="outlined"
          type="text"
          placeholder="First name"
          disabled={disabled}
          label="First name"
          sx={{ width: '100%' }}
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
        />
        <InputField
          variant="outlined"
          type="text"
          placeholder="Last name"
          disabled={disabled}
          label="Last name"
          sx={{ width: '100%' }}
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
        />

        <InputField
          variant="outlined"
          type="text"
          placeholder="IFSC code"
          disabled={disabled}
          label="IFSC code"
          sx={{ width: '100%' }}
          name="ifsc"
          onChange={handleChange}
          value={values.ifsc}
          error={Boolean(ifscError)}
          helperText={ifscError}
        />

        <InputField
          value={values.accountType}
          select
          label="Account Type"
          SelectProps={{ onChange: handleValueChange }}
          name="accountType"
          disabled={disabled}
        >
          <MenuItem value={'Saving'}>Saving</MenuItem>
          <MenuItem value={'Checking'}>Checking</MenuItem>
        </InputField>
      </StyledContainer>
      <ButtonWrapper>
        <CustomButton
          variant="contained"
          disabled={!validateFields() || values.email == ''}
          onClick={() => {
            props.onClick(values)
          }}
          data-testid="continueButton"
        >
          {RECIPIENT_DETAILS_CONTINUE}
        </CustomButton>
      </ButtonWrapper>
    </OuterContainer>
  )
}

export default RecipientDetails
