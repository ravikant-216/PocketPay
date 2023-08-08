import { MenuItem, MenuItemProps, styled } from '@mui/material'
import Image from '../../atoms/Image'
import Typography from '../../atoms/Typography'

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  width: theme.spacing(128.5),
  height: theme.spacing(14),
  flexShrink: 0,

  // layout
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(6),
}))

export interface CountryCurrencCardProps extends MenuItemProps {
  countryImageSrc: string
  countryImageAlt: string
  countryCurrencyCode: string
  countryName: string
  iconTitle?: string
}

const CountryCurrencyCard: React.FC<CountryCurrencCardProps> = ({
  countryCurrencyCode,
  countryImageAlt,
  countryImageSrc,
  countryName,
  ...rest
}) => {
  return (
    <StyledMenuItem {...rest} data-testid="CountryCurrencyCard">
      <Image src={countryImageSrc} alt={countryImageAlt} />
      <Typography variant="body2">{countryName}</Typography>
      <Typography
        sx={{ marginLeft: 'auto' }}
        color="text.lowEmphasis"
        variant="body2"
      >
        {countryCurrencyCode}
      </Typography>
    </StyledMenuItem>
  )
}

export default CountryCurrencyCard
