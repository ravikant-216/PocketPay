import { Box, Stack, styled } from '@mui/material'
import IconLabel, { IconLabelPropType } from '../../atoms/IconLabel'
import Typography from '../../atoms/Typography'
import theme from '../../../theme'

export interface OptionCardProps extends IconLabelPropType {
  caption?: string
  onclick?: () => void
  width?: string
  height?: string
}

const CustomBox = styled(Box)((props: OptionCardProps) => ({
  border: `1px solid ${theme.palette.Greys.stroke}`,
  borderRadius: theme.spacing(2),
  width: props.width ?? 'auto',
  height: props.height ?? 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
}))

const IconLabelWrapper = styled(Stack)(
  ({ captionSpacing }: { captionSpacing: number }) => ({
    paddingLeft: theme.spacing(5),
    paddingTop: theme.spacing(3.25),
    paddingBottom: theme.spacing(captionSpacing),
  })
)

const TextWrapper = styled(Stack)`
  padding-left: ${theme.spacing(16.8)};
  padding-bottom: ${theme.spacing(4)};
`
const OptionCard = (props: OptionCardProps) => {
  const captionSpacing = props.caption ? 1 : 4
  return (
    <>
      <CustomBox onClick={props.onclick} {...props} data-testid="custom-box">
        <IconLabelWrapper captionSpacing={captionSpacing}>
          <IconLabel
            src={props.src}
            alt={props.alt}
            iconTitle={props.iconTitle}
          />
        </IconLabelWrapper>
        {props.caption && (
          <TextWrapper position={'relative'} bottom={10}>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.lowEmphasis }}
            >
              {props.caption}
            </Typography>
          </TextWrapper>
        )}
      </CustomBox>
    </>
  )
}

export default OptionCard
