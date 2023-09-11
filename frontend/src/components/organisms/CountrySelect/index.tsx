import * as React from 'react'
import { useState } from 'react'
import { BoxProps, IconButton, InputAdornment, Box } from '@mui/material'
import Image from '../../atoms/Image'
import eyeOff from '../../../../public/assets/icons/eyeOff.svg'
import eye from '../../../../public/assets/icons/eye.svg'
import theme from '../../../theme'
import TextField from '../../atoms/InputField'
import {
  PASSWORD_REGEX,
  CREATE_PASSWORD,
  COUNTRY_REG,
  ENTER_PASSWORD,
  CountryArrayList,
  INVALID_PASSWORD,
} from '../../../strings/constants'
import Typography from '../../atoms/Typography'
import CustomButton from '../../atoms/Button'
import CountryDropdown from '../CountryDropdown'
import { IconLabelPropType } from '../../atoms/IconLabel'

export interface Props extends Omit<BoxProps, 'onChange'> {
  width?: string
  country?: string
  countryList?: IconLabelPropType[]
  onChange: (selectedValue: { country: string; password: string }) => void
  menuMaxHeight?: string
  inputVariant: 'password' | 'country'
  size?: 'small' | 'medium'
}

const CountrySelect = ({
  onChange,
  country = '',
  countryList = CountryArrayList,
  menuMaxHeight,
  inputVariant,
  ...props
}: Props) => {
  const [countryName, setCountryName] = useState<string>(country)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
    const regex = new RegExp(PASSWORD_REGEX)

    if (!regex.test(value)) {
      setPasswordError(INVALID_PASSWORD)
    } else {
      setPasswordError('')
    }
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  return (
    <Box
      {...props}
      sx={{ display: 'flex', alignItems: 'flex-end', ...props.sx }}
    >
      <Box sx={{ width: '100%' }} minHeight={theme.spacing(131)}>
        <Typography variant="h1" sx={{ marginBottom: theme.spacing(8) }}>
          {inputVariant === 'country' ? COUNTRY_REG : CREATE_PASSWORD}
        </Typography>
        {inputVariant === 'country' ? (
          <CountryDropdown
            data-testid="country-button"
            onChange={setCountryName}
            countryList={countryList}
            country={countryName}
            size={props.size}
            role="option"
            menuMaxHeight={menuMaxHeight}
          />
        ) : (
          <TextField
            variant="outlined"
            placeholder={ENTER_PASSWORD}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            sx={{
              width: '100%',
            }}
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <Image alt="eye" src={eye} />
                  ) : (
                    <Image alt="eyeOff" src={eyeOff} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      </Box>
      <CustomButton
        variant="contained"
        data-testid="country-button"
        disabled={
          (inputVariant === 'country' && !countryName) ||
          (inputVariant === 'password' &&
            (!password ||
              passwordError === INVALID_PASSWORD ||
              passwordError == null))
        }
        onClick={() => onChange({ country: countryName, password })}
      >
        Continue
      </CustomButton>
    </Box>
  )
}
export default CountrySelect
