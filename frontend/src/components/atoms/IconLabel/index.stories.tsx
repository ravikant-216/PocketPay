import React from 'react'
import { Story, Meta } from '@storybook/react'
import IconLabel, { IconLabelPropType } from '.'
import homeIcon from '../../../../public/assets/icons/home.svg'
import theme from '../../../theme/index'

export default {
  title: 'Atoms/IconLabel',
  component: IconLabel,
  tags: ['autodocs'],
} as Meta

const Template: Story<IconLabelPropType> = (args) => <IconLabel {...args} />

export const Primary = Template.bind({})
Primary.args = {
  iconTitle: 'Home',
  src: homeIcon,
  alt: 'home',
  color: theme.palette.primary[500],
}
