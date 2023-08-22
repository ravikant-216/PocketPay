import * as React from 'react'
import Slider from '@mui/material/Slider'
import theme from '../../../theme'
import { SliderProps, styled } from '@mui/material'

export interface Props extends SliderProps {
  labels: string[]
  value: number | undefined
}

const NewStepper = styled(Slider)(() => ({
  cursor: 'inherit',
  '& .MuiSlider-thumb': {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    color: theme.palette.primary[300],
  },
  '& .MuiSlider-rail': {
    color: theme.palette.structuralColors.background,
  },
  '& .MuiSlider-track': {
    color: theme.palette.primary[100],
  },
  '& .MuiSlider-markLabelActive': {
    color: theme.palette.primary[500],
  },
}))

const Stepper: React.FC<Props> = ({ labels, value, ...restProps }) => {
  const marks = labels.map((label, index) => ({
    value: index,
    label: label,
  }))

  return (
    <NewStepper
      value={value}
      step={1}
      disabled={true}
      marks={marks}
      max={labels.length - 1}
      {...restProps}
    />
  )
}

export default Stepper
