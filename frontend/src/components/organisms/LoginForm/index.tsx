import * as React from 'react'
import { useEffect, useState } from 'react'
import CustomButton from '../../atoms/Button'
import Checkbox from '../../atoms/Checkbox'
import Typography from '../../atoms/Typography'
import theme from '../../../theme'
import TextField from '../../atoms/InputField'
import {
  Stack,
  Link,
  Box,
  BoxProps,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Icon from '../../atoms/IconButton'
import styled from '@emotion/styled'
import {
  Email_REGEX,
  WELCOME_BACK,
  SIGN_IN,
  TROUBLE_LOGIN,
} from '../../../strings/constants'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import GoogleIcon from '../../../../public/assets/icons/google.svg'
import FacebookIcon from '../../../../public/assets/icons/facebook.svg'
import AppleIcon from '../../../../public/assets/icons/apple.svg'
import { User, useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { loginWithGoogleAuth } from '../../../utils/auth/GoogleAuth'
import { useDispatch } from 'react-redux'
import { userActions } from '../../../utils/store/user'

const ButtonStyles = styled(CustomButton)`
  color: ${theme.palette.structuralColors.white};
  background-color: ${theme.palette.primary[500]};
  border-radius: ${theme.spacing(14)};
  padding: ${theme.spacing(4)} ${theme.spacing(7)};
  margin-top: ${theme.spacing(5)};
  margin-bottom: ${theme.spacing(5)};
  &:disabled {
    color: ${theme.palette.structuralColors.white};
    background-color: ${theme.palette.primary[500]};
    opacity: 0.5;
  }
`

export interface SignInProps extends Omit<BoxProps, 'onSubmit'> {
  onSubmit?: (email: string, password: string) => void
  authenticated?: boolean
}

export default function SignIn({
  onSubmit,
  authenticated = true,
  ...props
}: SignInProps) {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const createUserWithGoogleAuth = async (user: User) => {
    const userResponse = await loginWithGoogleAuth(user)
    dispatch(userActions.loginUser(userResponse))
    navigate('/dashboard', { state: { id: userResponse.id } })
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      createUserWithGoogleAuth(user)
    }
  }, [isAuthenticated, user])

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmail(value)
    const regex = new RegExp(Email_REGEX)

    if (!regex.test(value)) {
      setEmailError('Invalid email address')
    } else {
      setEmailError('')
    }
  }
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)

    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters')
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(email, password)
    } else {
      setPasswordError('Invalid password')
      setEmailError('Invalid email')
    }
  }

  return (
    <Box {...props}>
      <Stack>
        <Typography component="h1" variant="h1">
          {WELCOME_BACK}
        </Typography>
        <TextField
          margin="normal"
          variant="outlined"
          label="Email Address"
          placeholder="Enter your email address"
          name="email"
          sx={{ width: 'auto', borderRadius: theme.spacing(2) }}
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          error={Boolean(emailError) || !authenticated}
          helperText={!authenticated ? 'User does not exist' : emailError}
        />
        <TextField
          margin="normal"
          variant="outlined"
          name="password"
          placeholder="Enter your password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          sx={{ width: 'auto' }}
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
          error={Boolean(passwordError) || !authenticated}
          helperText={!authenticated ? 'invalid password' : passwordError}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <ButtonStyles
          variant="contained"
          fullWidth
          disabled={
            !email || !password || Boolean(emailError) || Boolean(passwordError)
          }
          onClick={handleSubmit}
        >
          {SIGN_IN}
        </ButtonStyles>
        <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
          <Checkbox label="Remember me" />
          <Link href="#" variant="caption" marginTop={theme.spacing(2.5)}>
            {TROUBLE_LOGIN}
          </Link>
        </Stack>
      </Stack>
      <Box
        sx={{
          textAlign: 'center',
          marginTop: theme.spacing(5),
          marginBottom: theme.spacing(5),
        }}
      >
        <Typography variant="caption">Or, Log in with</Typography>
      </Box>
      <Stack direction={'row'} justifyContent="space-around">
        <Icon
          data-testid="google"
          icon={GoogleIcon}
          alt="Google Icon"
          height={theme.spacing(7)}
          width={theme.spacing(7)}
          onClick={() => {
            loginWithRedirect({
              authorizationParams: {
                connection: 'google-oauth2',
              },
            })
          }}
        ></Icon>
        <Icon
          height={theme.spacing(7)}
          icon={FacebookIcon}
          width={theme.spacing(7)}
        />
        <Icon
          height={theme.spacing(7)}
          icon={AppleIcon}
          width={theme.spacing(7)}
        />
      </Stack>
    </Box>
  )
}
