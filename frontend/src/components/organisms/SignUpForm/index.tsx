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

export interface SignUpWrapperProps {
  sx?: React.CSSProperties
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
  gap: theme.spacing(12.5),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    const regex = new RegExp(Email_REGEX)

    setDisabled(value === '' || !regex.test(value))
  }

  return (
    <>
      <SignUpFromWrapper {...props} data-testid="SignUpForm">
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

          <CustomButton variant="contained" disabled={disabled}>
            {NEXT}
          </CustomButton>
        </InnerWrapper>

        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.mediumEmphasis }}
        >
          or log in with
        </Typography>

        <IconBox>
          <Icon icon={GoogleIcon} data-testid="google-icon" />
          <Icon icon={FacebookIcon} data-testid="facebook-icon" />
          <Icon icon={AppleIcon} data-testid="apple-icon" />
        </IconBox>

        <TextWrapper>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.mediumEmphasis }}
          >
            {BY_REGISTERING}{' '}
            <Typography
              variant="link"
              sx={{ color: theme.palette.primary[500], cursor: 'pointer' }}
            >
              {TERM}
            </Typography>
            <Typography
              variant="link"
              sx={{ color: theme.palette.primary[500], cursor: 'pointer' }}
            >
              {POLICY}
            </Typography>
          </Typography>

          <Divider variant="middle" />
        </TextWrapper>

        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.mediumEmphasis }}
        >
          {ALREADY_HAVE_AN_ACCOUNT}{' '}
          <Typography
            variant="link"
            sx={{ color: theme.palette.primary[500], cursor: 'pointer' }}
          >
            {LOGIN}
          </Typography>
        </Typography>
      </SignUpFromWrapper>
    </>
  )
}

export default SignUpForm
