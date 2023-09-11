/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { SxProps, Theme } from '@mui/material'
import LeftArrowIcon from '../../../../public/assets/icons/calendar-left-arrow.svg'
import RightArrowIcon from '../../../../public/assets/icons/calendar-right-arrow.svg'
import CalendarIcon from '../../../../public/assets/icons/calendar.svg'
import {
  DateValidationError,
  PickerChangeHandlerContext,
} from '@mui/x-date-pickers'
import Image from '../Image'
import dayjs from 'dayjs'
import theme from '../../../theme'
import { getWeek } from '../../../utils/helper'

interface DatePickerProps {
  sx?: SxProps<Theme>
  className?: string
  onChange: (
    value: unknown,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void
  disabled?: boolean
  label?: string
  minDate?: string
  maxDate?: string
  onError?: (error: DateValidationError, value: unknown) => void
  errorMessage?: string
}

const DatePicker: React.FC<DatePickerProps> = ({
  minDate,
  maxDate,
  errorMessage,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        slots={{
          openPickerIcon: () => (
            <Image
              src={CalendarIcon}
              alt="Date Picker Icon"
              style={{
                marginRight: theme.spacing(1),
              }}
            />
          ),
          switchViewIcon: () => <></>,
          leftArrowIcon: () => (
            <Image src={LeftArrowIcon} alt="Calendar Right Arrow" />
          ),
          rightArrowIcon: () => (
            <Image src={RightArrowIcon} alt="Calendar Right Arrow" />
          ),
        }}
        slotProps={{
          textField: {
            helperText: errorMessage,
            sx: {
              width: theme.spacing(129),
              height: theme.spacing(15),
              flexShrink: 0,

              '& label': {
                color: theme.palette.text.lowEmphasis,
                ...theme.typography.body2,
                '&.Mui-focused': {
                  color: theme.palette.primary[500],
                },
              },
              '& .MuiOutlinedInput-root': {
                color: theme.palette.text.highEmphasis,
                borderRadius: theme.spacing(2),
                ...theme.typography.body2,
                '& fieldset': {
                  border: `${theme.spacing(0.25)} solid ${
                    theme.palette.Greys.stroke
                  }`,
                },
                '&:hover fieldset, &.Mui-focused fieldset': {
                  border: `${theme.spacing(0.25)} solid ${
                    theme.palette.Greys.stroke
                  }`,
                  boxShadow: `0px ${theme.spacing(0.5)} 0px 0px ${
                    theme.palette.primary[500]
                  }`,
                },
              },
            },
          },
          calendarHeader: {
            sx: {
              alignItems: 'center',
              '& .MuiPickersCalendarHeader-labelContainer': {
                color: 'text.lowEmphasis',
                position: 'relative',
                left: theme.spacing(15.5),
              },
              '& .MuiPickersArrowSwitcher-root .MuiButtonBase-root:nth-child(1)':
                {
                  position: 'relative',
                  right: theme.spacing(61.25),
                },
            },
          },
        }}
        dayOfWeekFormatter={getWeek}
        views={['month', 'year', 'day']}
        minDate={minDate ? dayjs(minDate) : undefined}
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        {...props}
      />
    </LocalizationProvider>
  )
}

export default DatePicker
