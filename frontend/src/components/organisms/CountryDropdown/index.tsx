import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { IconLabelPropType } from '../../atoms/IconLabel'
import theme from '../../../theme'
import { SELECT_COUNTRY, COUNTRY_REG } from '../../../strings/constants'

export interface Props extends Omit<FormControlProps, 'onChange'> {
  names: React.ReactElement<IconLabelPropType>[]
  width?: string
  onChange?: (selectedValue: string) => void
  menuMaxHeight?: string
  menuWidth?: string
}

export default function CountryDropdown({
  names,
  onChange,
  menuMaxHeight,
  menuWidth,
  ...props
}: Props) {
  const [CountryName, setCountryName] = React.useState<string>('')

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCountryName(event.target.value)
    if (onChange) onChange(event.target.value)
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: menuMaxHeight || 'auto',
        width: menuWidth || 'auto',
      },
    },
  }

  return (
    <FormControl
      sx={{
        width: '100%',
      }}
      {...props}
    >
      <InputLabel sx={{ fontSize: theme.spacing(4.25) }}>
        {CountryName == '' ? SELECT_COUNTRY : COUNTRY_REG}
      </InputLabel>
      <Select
        value={CountryName}
        label="Country"
        onChange={handleChange}
        input={
          <OutlinedInput
            label={COUNTRY_REG}
            sx={{
              borderRadius: theme.spacing(2),
              fontSize: theme.spacing(4.25),
            }}
          />
        }
        MenuProps={MenuProps}
        renderValue={(selected) => selected as string}
      >
        {names.map((iconTitle) => (
          <MenuItem
            key={iconTitle.props.iconTitle}
            value={iconTitle.props.iconTitle}
          >
            {iconTitle}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
