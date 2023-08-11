import styled from '@emotion/styled'
import { Box } from '@mui/material'

export interface ImageProps {
  style?: React.CSSProperties
  alt: string
  src?: string
  className?: string
  onClick?: () => void
}

const StyledImage = styled.img`
  display: 'block';
  height: 'auto';
`
const Image = (props: ImageProps) => {
  return (
    <Box onClick={props.onClick} sx={{ cursor: 'pointer' }}>
      <StyledImage
        src={props.src}
        alt={props.alt}
        className={props.className}
        style={props.style}
      />
    </Box>
  )
}

export default Image
