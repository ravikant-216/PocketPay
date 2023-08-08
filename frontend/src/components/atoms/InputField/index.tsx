import { OutlinedTextFieldProps, TextField, styled } from '@mui/material'
import CalendarIcon from '../../../../public/assets/icons/calendar.svg'
import DownIcon from '../../../../public/assets/icons/down.svg'
import Image from '../Image'

interface TextFieldProps extends Partial<OutlinedTextFieldProps> {
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  style?: React.CSSProperties
}

const CustomDropdowmIcon = () => (
  <Image style={{ marginRight: 16 }} src={DownIcon} alt="down icon" />
)

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: theme.spacing(129),
  height: theme.spacing(15),
  flexShrink: 0,
  borderRadius: theme.spacing(2),
  "input[type='date']:in-range::-webkit-datetime-edit-year-field,input[type='date']:in-range::-webkit-datetime-edit-month-field,input[type='date']:in-range::-webkit-datetime-edit-day-field,input[type='date']:in-range::-webkit-datetime-edit-text":
    {
      color: 'transparent',
    },

  // removed arrows for input type = number
  '& input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
    {
      '-webkit-appearance': 'none',
      margin: 0,
    },

  // changed date picker indicator
  '& input[type="date"]::-webkit-calendar-picker-indicator': {
    display: 'block',
    background: `url(${CalendarIcon}) no-repeat`,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },

  '& label': {
    color: theme.palette.text.lowEmphasis,
    ...theme.typography.body2,
    '&.Mui-focused': {
      color: theme.palette.primary[500],
    },
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.text.highEmphasis,
    ...theme.typography.body2,
    '& fieldset': {
      border: `${theme.spacing(0.25)} solid ${theme.palette.Greys.stroke}`,
    },
    '&:hover fieldset, &.Mui-focused fieldset': {
      border: `${theme.spacing(0.25)} solid ${theme.palette.Greys.stroke}`,
      borderBottom: `${theme.spacing(0.5)} solid ${theme.palette.primary[500]}`,
    },
  },
}))

const InputField: React.FC<TextFieldProps> = ({
  startAdornment,
  endAdornment,
  SelectProps,
  ...props
}) => {
  return (
    <StyledTextField
      data-testid="InputField"
      SelectProps={{
        IconComponent: CustomDropdowmIcon,
        ...SelectProps,
      }}
      {...props}
      InputProps={{
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
      variant="outlined"
    />
  )
}

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
}

export default InputField
