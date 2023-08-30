import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import IconLabel, { IconLabelPropType } from '../../atoms/IconLabel'
import { styled } from '@mui/material/styles'
import theme from '../../../theme'
import { SELECT_COUNTRY, COUNTRY_REG } from '../../../strings/constants'
import { Stack } from '@mui/material'
import Image from '../../atoms/Image'
import ExpandIcon from '../../../../public/assets/icons/expand.svg'

export interface Props extends Omit<FormControlProps, 'onChange'> {
  width?: string
  placeHolder?: string
  country?: string
  label?: string
  countryList: IconLabelPropType[]
  onChange?: (selectedValue: string) => void
  menuMaxHeight?: string
  menuWidth?: string
}
const CustomFormControl = styled(FormControl)(() => ({
  '&.Mui': {
    color: theme.palette.text.lowEmphasis,
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.highEmphasis,
    borderRadius: theme.spacing(2),
    '&.Mui-focused fieldset': {
      border: `${theme.spacing(0.25)} solid ${theme.palette.Greys.stroke}`,
      borderBottom: 'none',
      borderBottomRightRadius: '0',
      borderBottomLeftRadius: '0',
    },
    '&.Mui-focused .search': {
      display: 'none',
    },
    '& .search': {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(5),
    },
  },
  width: '100%',
}))

function Icon() {
  return (
    <Stack alignItems="center" justifyContent="center">
      <Image src={ExpandIcon} alt="" className="search"></Image>
    </Stack>
  )
}

export default function CountryDropdown({
  onChange,
  placeHolder = SELECT_COUNTRY,
  label = COUNTRY_REG,
  menuMaxHeight,
  country = '',
  countryList,
  menuWidth,
  ...props
}: Props) {
  const [CountryName, setCountryName] = React.useState<string>(country)

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCountryName(event.target.value)
    if (onChange) onChange(event.target.value)
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: menuMaxHeight,
        width: menuWidth,
      },
    },
  }

  return (
    <CustomFormControl {...props}>
      <InputLabel
        sx={{ fontSize: theme.spacing(4.25) }}
        className="placeholder"
      >
        {CountryName == '' ? placeHolder : label}
      </InputLabel>
      <Select
        label="Country"
        value={CountryName}
        IconComponent={Icon}
        onChange={handleChange}
        input={
          <OutlinedInput
            label={COUNTRY_REG}
            sx={{
              borderRadius: theme.spacing(2),
              fontSize: theme.spacing(4.25),
              '&:hover fieldset': {
                border: `1px solid ${theme.palette.Greys.stroke} !important`,
                borderBottom: `${theme.spacing(0.625)} solid ${
                  theme.palette.primary[500]
                } !important`,
              },
              '&.placeholder fieldset': {
                color: 'text.lowEmphasis',
              },
              '& fieldset': {
                border: `1px solid ${theme.palette.Greys.stroke} !important`,
                borderRadius: `${theme.spacing(2)} !important`,
              },
            }}
          />
        }
        MenuProps={MenuProps}
        renderValue={(selected) => selected}
      >
        {countryList.map((iconTitle) => (
          <MenuItem key={iconTitle.iconTitle} value={iconTitle.iconTitle}>
            {<IconLabel {...iconTitle} />}
          </MenuItem>
        ))}
      </Select>
    </CustomFormControl>
  )
}
