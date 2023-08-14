import SearchDropdown from '../../molecules/SearchDropDown'
import Typography from '../../atoms/Typography'
import { Box } from '@mui/material'
import {
  ADDRESSES,
  SEARCH_BUSINESS,
  SELECT_BUSINESS,
  SOLO_TRADER,
} from '../../../strings/constants'
import theme from '../../../theme'

export interface SearchBusinessProps {
  onValueChange: (value: string) => void
  style?: React.CSSProperties
}

export default function SearchBusiness(props: SearchBusinessProps) {
  return (
    <Box style={props.style}>
      <Typography variant="h1" sx={{ marginBottom: theme.spacing(4) }}>
        {SEARCH_BUSINESS}
      </Typography>
      <Typography variant="body3" color="text.mediumEmphasis">
        {SOLO_TRADER}
      </Typography>
      <SearchDropdown
        onValueChange={props.onValueChange}
        sx={{ paddingTop: theme.spacing(8) }}
        options={ADDRESSES}
        placeholder={SELECT_BUSINESS}
        variant="footer"
        type="search"
      ></SearchDropdown>
    </Box>
  )
}
