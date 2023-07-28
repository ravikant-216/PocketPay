import { Box, Stack } from '@mui/material'
import Text from '../../atoms/Typography'
import theme from '../../../theme/index'
import Image, { ImageProps } from '../Image'

export interface IconLabelPropType extends ImageProps {
  iconTitle?: string
  color?: string
  onClick?: () => void
}

const IconLabel = ({
  iconTitle,
  src,
  alt,
  color,
  style,
  onClick,
}: IconLabelPropType) => {
  return (
    <Box>
      <Stack
        direction="row"
        gap={theme.spacing(3)}
        alignItems="center"
        style={style}
        onClick={onClick}
      >
        <Image src={src} alt={alt} />
        <Text color={color} variant="caption">
          {iconTitle}
        </Text>
      </Stack>
    </Box>
  )
}
export default IconLabel
