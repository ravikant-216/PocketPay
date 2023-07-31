import React from 'react'
import { Story, Meta } from '@storybook/react'
import LabelValue, { LabelValueProps } from '.'
import theme from '../../../theme'

export default {
  title: 'Molecules/LabelValue',
  component: LabelValue,
  tags: ['autodocs'],
} as Meta

const Template: Story<LabelValueProps> = (args) => <LabelValue {...args} />
export const Primary = Template.bind({})
Primary.args = {
  info: 'Use this reference',
  description: '#356778810',
  infoColor: theme.palette.text.lowEmphasis,
  descColor: theme.palette.text.highEmphasis,
  infoVar: 'caption',
  descVar: 'body2',
  direction: 'column',
}

export const Customized = Template.bind({})
Customized.args = {
  info: 'Set up by:',
  description: 'Ross Gener (YOU)',
  infoColor: theme.palette.text.mediumEmphasis,
  descColor: theme.palette.text.highEmphasis,
  infoVar: 'body2',
  descVar: 'body2',
  direction: 'row',
  gap: theme.spacing(50),
}
