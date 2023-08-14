import React, { MouseEventHandler } from 'react'
import { Box, BoxProps } from '@mui/material'
import IconLabel, { IconLabelPropType } from '../../atoms/IconLabel'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import styled from '@emotion/styled'

export interface BankCardProps
  extends Omit<IconLabelPropType, 'onClick'>,
    Omit<BoxProps, 'color'> {
  onClick?: MouseEventHandler<HTMLDivElement>
}

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

const BankCard = ({
  iconTitle,
  src,
  alt,
  onClick,
  color,
  ...restProps
}: BankCardProps) => {
  return (
    <StyledBox onClick={onClick} {...restProps}>
      <IconLabel iconTitle={iconTitle} src={src} alt={alt} color={color} />
      <KeyboardArrowRightIcon />
    </StyledBox>
  )
}

export default BankCard
