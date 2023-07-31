import { Stack, StackProps } from '@mui/material'
import Text from '../../atoms/Typography'

export interface LabelValueProps extends StackProps {
  info: string
  description: string
  infoColor: string
  descColor: string
  infoVar: 'body2' | 'caption'
  descVar: 'body2' | 'caption'
}

const LabelValue = ({
  info,
  description,
  infoColor,
  descColor,
  direction,
  descVar,
  infoVar,
  ...restProps
}: LabelValueProps) => {
  return (
    <Stack {...restProps} direction={direction}>
      <Text variant={infoVar} color={infoColor}>
        {info}
      </Text>
      <Text variant={descVar} color={descColor}>
        {description}
      </Text>
    </Stack>
  )
}

export default LabelValue
