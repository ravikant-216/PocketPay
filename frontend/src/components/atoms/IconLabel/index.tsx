import { Box, Stack } from '@mui/material'
import Text from '../../atoms/Typography'
import theme from '../../../theme/index'
import Image, { ImageProps } from '../Image'

export interface IconLabelPropType extends ImageProps {
  iconTitle?: string
  color?: string
  variant?: 'caption' | 'body3' | 'body2'
  countryCurrencyCode?: string
  onClick?: () => void
}

const IconLabel = ({
  iconTitle,
  src,
  countryCurrencyCode,
  alt,
  variant = 'caption',
  color,
  style,
  onClick,
}: IconLabelPropType) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '98%',
        flexDirection: 'row',
      }}
    >
      <Stack
        direction="row"
        columnGap={theme.spacing(3)}
        alignItems="center"
        style={style}
        onClick={onClick}
      >
        <Image src={src} alt={alt} />
        <Text color={color} variant={variant}>
          {iconTitle}
        </Text>
      </Stack>
      {countryCurrencyCode && (
        <Text variant="body3" color="text.mediumEmphasis">
          {countryCurrencyCode}
        </Text>
      )}
    </Box>
  )
}
export default IconLabel
