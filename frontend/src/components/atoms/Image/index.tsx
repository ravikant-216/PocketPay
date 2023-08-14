import styled from '@emotion/styled'
import { Box, BoxProps } from '@mui/material'

export interface ImageProps extends BoxProps {
  alt: string
  src?: string
}

const StyledImage = styled.img`
  display: block;
  height: auto;
`
const Image: React.FC<ImageProps> = ({ sx, alt, src, ...rest }) => {
  return (
    <Box
      sx={{
        display: 'inline-block',
        width: 'fit-content',
        height: 'fit-content',
        cursor: 'pointer',
        ...sx,
      }}
      {...rest}
    >
      <StyledImage src={src} alt={alt} />
    </Box>
  )
}

export default Image
