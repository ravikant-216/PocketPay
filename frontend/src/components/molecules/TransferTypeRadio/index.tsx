import RadioButton, { RadioButtonProps } from '../../atoms/RadioButton'
import Image from '../../atoms/Image'
import { Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'

interface TransferTypeRadioProps extends Omit<RadioButtonProps, 'label'> {
  src: string
  alt: string
  title: string
  description: string
  disabled?: boolean
}

const StyledRadioButton = styled(RadioButton)(({ theme }) => ({
  width: theme.spacing(120),
  justifyContent: 'space-between',
  gap: theme.spacing(26),
}))

const StyledStack = styled(Stack)(({ theme }) => ({
  // layout
  display: 'flex',
  flexFlow: 'row nowrap',
  alignContent: 'center',
  gap: theme.spacing(5),

  '& .info': {
    display: 'flex',
    flexFlow: 'column wrap',
    gap: theme.spacing(2),
  },
}))

const TransferTypeRadio: React.FC<TransferTypeRadioProps> = (props) => {
  const label: React.ReactNode = (
    <StyledStack>
      <Image src={props.src} alt={props.alt} />
      <Stack className="info">
        <Typography variant="body3" color="text.highEmphasis">
          {props.title}
        </Typography>
        <Typography variant="caption" color="text.mediumEmphasis">
          {props.description}
        </Typography>
      </Stack>
    </StyledStack>
  )

  return (
    <StyledRadioButton
      data-testid="TransferTypeRadio"
      label={label}
      labelPlacement="start"
      value={props.value}
      disabled={props.disabled}
    />
  )
}

export default TransferTypeRadio
