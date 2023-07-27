import styled from '@emotion/styled'
import { Button, ButtonProps as MuiButtonProps } from '@mui/material'

export interface CustomButtonProps extends MuiButtonProps {
  style?: React.CSSProperties
  label?: string
  onClick?: () => void

  disabled?: boolean
}

const CustomButtonStyled = styled(Button)(
  ({ style, disabled }: CustomButtonProps) => ({
    textTransform: 'none',
    opacity: disabled ? 0.5 : 1,
    ...style,
  })
)

const CustomButton = ({ ...props }: CustomButtonProps) => {
  return <CustomButtonStyled {...props}>{props.label}</CustomButtonStyled>
}

export default CustomButton
