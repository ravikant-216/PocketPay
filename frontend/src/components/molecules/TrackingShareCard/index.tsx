import React from 'react'
import { Box } from '@mui/material'
import Typography from '../../atoms/Typography'
import theme from '../../../theme'
import Image from '../../atoms/Image'
import Illustration from '../../../../public/assets/icons/illlustration.svg'
import Icon from '../../atoms/IconButton'
import EmailIcon from '../../../../public/assets/icons/email.svg'
import ShareIcon from '../../../../public/assets/icons/share.svg'
import styled from '@emotion/styled'
import ModalBox from '../ModalBox'
import { Email, Share } from '../../../strings/constants'

export interface TrackingShareCardProps {
  heading?: string
  subHeading?: string
  onClickEmail?: () => void
  onClickShare?: () => void
  open?: boolean
}

const modalStyles: React.CSSProperties = {
  width: theme.spacing(137),
  height: theme.spacing(127.5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: theme.palette.structuralColors.white,
}

const IconBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  gap: theme.spacing(12.5),
})

const InnerIconWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const SubHeadingContainer = styled(Box)({
  paddingLeft: theme.spacing(9),
  paddingRight: theme.spacing(9),
})

const TrackingShareCard = (props: TrackingShareCardProps) => {
  const TrackingShareCardContent = () => {
    return (
      <>
        <Typography
          data-testid="heading"
          variant="body1"
          sx={{ color: theme.palette.text.highEmphasis }}
        >
          {props.heading}
        </Typography>

        <Image
          alt="illustration"
          src={Illustration}
          data-testid="illustration-image"
        />
        <IconBox>
          <InnerIconWrapper>
            <Icon
              icon={EmailIcon}
              borderRadius={theme.spacing(12.5)}
              borderColor={theme.palette.primary[500]}
              onclick={props.onClickEmail}
              data-testid="email-icon"
            />
            <Typography
              variant="body3"
              sx={{ color: theme.palette.primary[500] }}
              data-testid="email-text"
            >
              {Email}
            </Typography>
          </InnerIconWrapper>
          <InnerIconWrapper>
            <Icon
              icon={ShareIcon}
              borderColor={theme.palette.primary[500]}
              borderRadius={theme.spacing(12.5)}
              onclick={props.onClickShare}
              data-testid="share-icon"
            />
            <Typography
              variant="body3"
              sx={{ color: theme.palette.primary[500] }}
              data-testid="share-text"
            >
              {Share}
            </Typography>
          </InnerIconWrapper>
        </IconBox>
        <SubHeadingContainer data-testid="sub-heading">
          <Typography
            variant="body3"
            sx={{ color: theme.palette.text.mediumEmphasis }}
          >
            {props.subHeading}
          </Typography>
        </SubHeadingContainer>
      </>
    )
  }
  return (
    <ModalBox open={props.open} {...props} style={modalStyles}>
      {<TrackingShareCardContent />}
    </ModalBox>
  )
}

export default TrackingShareCard
