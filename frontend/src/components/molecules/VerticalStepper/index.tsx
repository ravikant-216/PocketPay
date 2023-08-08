import {
  Box,
  Step,
  StepLabel,
  Stepper as MuiStepper,
  styled,
  StepConnector,
  type StepIconProps,
  stepConnectorClasses,
  stepLabelClasses,
  Stack,
} from '@mui/material'
import React from 'react'
import theme from '../../../theme'
import Typography from '../../atoms/Typography'

interface Content {
  time: string
  label: string
}
interface StepperProps {
  steps: Content[]
  activeStep?: number
}

const StyledStepLevel = styled(StepLabel)(() => ({
  margin: 0,
  padding: 0,
  marginTop: '-8px',
  marginBottom: '-8px',
  color: theme.palette.text.mediumEmphasis,
  [`.${stepLabelClasses.label}.${stepLabelClasses.active}`]: {
    margin: 0,
    padding: 0,
  },
  [`.${stepLabelClasses.label}.${stepLabelClasses.completed}`]: {
    margin: 0,
    padding: 0,
  },
}))

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  width: '100%',
  marginLeft: '10.28rem',
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 15px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.dark,
      height: '100%',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.dark,
      height: '100%',
    },
  },
  [`& .${stepConnectorClasses.lineVertical}`]: {
    borderColor: theme.palette.text.lowEmphasis,
    borderTopWidth: 3,
    borderRadius: 2,
    height: '100%',
    marginLeft: '5rem',
  },
}))

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.text.mediumEmphasis,
    ...(ownerState.active && {
      color: theme.palette.text.mediumEmphasis,
    }),
    '& .QontoStepIcon-completedIcon': {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    '& .QontoStepIcon-pending': {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.text.lowEmphasis,
    },
    width: '500px',
    display: 'flex',
    justifyContent: 'center',
  })
)

const QontoStepIcon = (props: StepIconProps & Content) => {
  const { active, className, completed, label, time } = props
  const getCorrectColor = () => {
    if (completed) {
      return theme.palette.text.highEmphasis
    }
    if (active) {
      return theme.palette.primary.main
    }
    return theme.palette.text.lowEmphasis
  }
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        gap={4}
      >
        <Stack alignItems="flex-end" width="200px">
          <Typography variant="caption" color={getCorrectColor()}>
            {time}
          </Typography>
        </Stack>
        <Stack justifyContent="center">
          {active || completed ? (
            <div className="QontoStepIcon-circle QontoStepIcon-completedIcon" />
          ) : (
            <div className="QontoStepIcon-circle QontoStepIcon-pending" />
          )}
        </Stack>
        <Stack width="210px">
          <Typography
            color={getCorrectColor()}
            variant="caption"
            sx={{ alignItems: 'flex-start' }}
          >
            {label}
          </Typography>
        </Stack>
      </Stack>
    </QontoStepIconRoot>
  )
}

const VerticalStepper = ({
  steps,
  activeStep = 1,
  ...props
}: StepperProps): React.JSX.Element => {
  const renderIcons = (stepProps: StepIconProps, content: Content) => {
    return <QontoStepIcon {...stepProps} {...content} />
  }
  return (
    <Box sx={{ width: '100%' }} {...props}>
      <MuiStepper
        activeStep={activeStep - 1}
        orientation="vertical"
        connector={<QontoConnector data-testid="vertical-stepper-connector" />}
      >
        {steps.map((content: Content) => {
          return (
            <Step key={content.label}>
              <StyledStepLevel
                data-testid="vertical-stepper-lavel"
                StepIconComponent={(stepProps: StepIconProps) =>
                  renderIcons(stepProps, content)
                }
              />
            </Step>
          )
        })}
      </MuiStepper>
    </Box>
  )
}

export default VerticalStepper
