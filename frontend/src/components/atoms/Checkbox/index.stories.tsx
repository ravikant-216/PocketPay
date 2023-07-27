import React from 'react'
import { Meta, Story } from '@storybook/react'
import CheckboxLabels, { CheckboxLabelsProps } from './'
import theme from '../../../theme'

export default {
  title: 'Atoms/Checkbox',
  component: CheckboxLabels,
  tags: ['autodocs'],
} as Meta

const Template: Story<CheckboxLabelsProps> = (args) => (
  <CheckboxLabels {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  label: 'I know their bank details',
  checked: true,
}
export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Remember me',
  labelColor: theme.palette.text.highEmphasis,
  checked: true,
}
