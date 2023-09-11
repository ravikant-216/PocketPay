import React, { useState } from 'react'
import {
  ALREADY_HAVE_AN_ACCOUNT,
  BY_REGISTERING,
  CREATE_ACCOUNT,
  ENTER_EMAIL,
  Email_REGEX,
  LOGIN,
  NEXT,
  POLICY,
  SIGNUPFORM_LOGIN_WITH,
  TERM,
} from '../../../strings/constants'
import CustomButton from '../../atoms/Button'
import Icon from '../../atoms/IconButton'
import GoogleIcon from '../../../../public/assets/icons/google.svg'
import FacebookIcon from '../../../../public/assets/icons/facebook.svg'
import AppleIcon from '../../../../public/assets/icons/apple.svg'
import InputField from '../../atoms/InputField'
import Typography from '../../atoms/Typography'
import styled from '@emotion/styled'
import { Box, Divider, Stack } from '@mui/material'
import theme from '../../../theme'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

export interface SignUpWrapperProps {
  style?: React.CSSProperties
  onSubmit?: (email: string) => void
}

const SignUpFromWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: theme.spacing(10),
  width: 'auto',
})

const IconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(23.25),
})

const InnerWrapper = styled(Stack)({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: theme.spacing(8),
  maxWidth: theme.spacing(140),
  width: '100%',
})

const TextWrapper = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: theme.spacing(10),
})

const SignUpForm = (props: SignUpWrapperProps) => {
  const [disabled, setDisabled] = useState(true)
  const [email, setEmail] = useState<string>('')

  const { loginWithRedirect } = useAuth0()

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    const regex = new RegExp(Email_REGEX)
    setEmail(value)
    setDisabled(value === '' || !regex.test(value))
  }

  return (
    <>
      <SignUpFromWrapper style={props.style} data-testid="SignUpForm">
        <InnerWrapper>
          <Typography
            variant="h1"
            sx={{ color: theme.palette.text.highEmphasis }}
          >
            {CREATE_ACCOUNT}
          </Typography>

          <InputField
            type="text"
            variant="outlined"
            placeholder={ENTER_EMAIL}
            style={{ width: 'auto' }}
            label={ENTER_EMAIL}
            onChange={handleChange}
            data-testid="email-input"
          />

          <CustomButton
            variant="contained"
            disabled={disabled}
            onClick={() => {
              if (props.onSubmit) props.onSubmit(email)
            }}
            data-testid="signUpButton"
          >
            {NEXT}
          </CustomButton>
        </InnerWrapper>

        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.mediumEmphasis }}
        >
          {SIGNUPFORM_LOGIN_WITH}
        </Typography>

        <IconBox>
          <Icon
            alt="Google Icon"
            icon={GoogleIcon}
            data-testid="google-icon"
            onClick={() => {
              loginWithRedirect({
                authorizationParams: {
                  connection: 'google-oauth2',
                },
              })
            }}
          />
          <Icon icon={FacebookIcon} data-testid="facebook-icon" />
          <Icon icon={AppleIcon} data-testid="apple-icon" />
        </IconBox>

        <TextWrapper>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.mediumEmphasis }}
          >
            {BY_REGISTERING}
            <Typography
              variant="link"
              sx={{ color: theme.palette.primary[500], cursor: 'pointer' }}
            >
              {TERM}
            </Typography>
            &nbsp;and&nbsp;
            <Typography
              variant="link"
              sx={{ color: theme.palette.primary[500], cursor: 'pointer' }}
            >
              {POLICY}
            </Typography>
          </Typography>
        </TextWrapper>
        <Divider variant="middle" sx={{ width: '100%' }} />
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.mediumEmphasis }}
        >
          {ALREADY_HAVE_AN_ACCOUNT}
          <Typography
            variant="link"
            sx={{ color: theme.palette.primary[500], cursor: 'pointer' }}
          >
            <Box
              display={'inline'}
              onClick={() => navigate('/login')}
              data-testid="login"
            >
              {LOGIN}
            </Box>
          </Typography>
        </Typography>
      </SignUpFromWrapper>
    </>
  )
}

export default SignUpForm
