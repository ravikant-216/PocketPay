import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import theme from '../../../theme'

export interface CheckboxLabelsProps extends CheckboxProps {
  label?: string
  checked?: boolean
  labelColor?: string
}

const CheckboxLabels = ({
  label,
  checked = true,
  labelColor = theme.palette.text.mediumEmphasis,
  ...restProps
}: CheckboxLabelsProps) => {
  return (
    <FormControlLabel
      label={label}
      labelPlacement="end"
      style={{ color: labelColor }}
      control={
        <Checkbox
          checked={checked}
          style={{ color: theme.palette.primary[500] }}
          {...restProps}
        />
      }
    />
  )
}

export default CheckboxLabels
