import {
  Typography as MuiTypography,
  SxProps,
  Theme,
  styled,
} from '@mui/material'

interface TypographyProps {
  variant: 'h1' | 'body1' | 'body2' | 'body3' | 'caption' | 'link'
  children?: React.ReactNode
  sx?: SxProps<Theme>
  color?: string
  component?: string
  className?: string
}

const StyledTypography = styled(MuiTypography)(() => ({
  textTransform: 'none',
}))

const Typography: React.FC<TypographyProps> = (props) => {
  return <StyledTypography {...props} data-testid="Typography" />
}

export default Typography
