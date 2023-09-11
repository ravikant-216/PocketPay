import { Button, ButtonProps, Typography, styled } from '@mui/material'

const CustomButtonStyled = styled(Button)(({ theme }) => ({
  display: 'flex',
  padding: `${theme.spacing(4)} ${theme.spacing(7.5)}`,
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: theme.spacing(33.75),
  borderRadius: theme.spacing(13),
  textTransform: 'none',
  '&.MuiButton-outlined': {
    color: theme.palette.primary[500],
    border: 'none',
    backgroundColor: theme.palette.structuralColors.white,
    boxShadow: `0px 0px ${theme.spacing(
      0.25
    )} 0px rgba(20, 20, 20, 0.12), 0px 0px ${theme.spacing(
      2
    )} 0px rgba(20, 20, 20, 0.04), 0px ${theme.spacing(2)} ${theme.spacing(
      2
    )} 0px rgba(20, 20, 20, 0.04)`,
    '&:hover': {
      backgroundColor: theme.palette.structuralColors.buttonHover,
    },
    '&.Mui-disabled': {
      opacity: 0.5,
      boxShadow: 'none',
    },
  },

  '&.MuiButton-contained': {
    color: theme.palette.structuralColors.white,
    backgroundColor: theme.palette.primary[500],
    boxShadow: `0px ${theme.spacing(2)} ${theme.spacing(
      6
    )} 0px rgba(85, 51, 255, 0.24)`,
    '&:hover': {
      backgroundColor: theme.palette.primary[300],
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.primary[100],
      boxShadow: 'none',
    },
  },
}))

const CustomButton = ({ children, ...props }: ButtonProps) => {
  return (
    <CustomButtonStyled {...props}>
      <Typography variant="body2">{children}</Typography>
    </CustomButtonStyled>
  )
}

export default CustomButton
