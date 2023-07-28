import styled from '@emotion/styled'

export interface ImageProps {
  style?: React.CSSProperties
  alt: string
  src?: string
  className?: string
}

const StyledImage = styled.img`
  display: 'block';
  height: 'auto';
`
const Image = (props: ImageProps) => {
  return (
    <StyledImage
      src={props.src}
      alt={props.alt}
      className={props.className}
      style={props.style}
    />
  )
}

export default Image
