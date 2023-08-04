import React from 'react'
import { Meta, Story } from '@storybook/react'
import CountrySelect, { Props } from '.'
import theme from '../../../theme'

export default {
  title: 'organisms/CountrySelect',
  component: CountrySelect,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    onChange: { action: 'onChange' },
  },
} as Meta

const Template: Story<Props> = (args) => <CountrySelect {...args} />

export const Primary = Template.bind({})
Primary.args = {
  menuMaxHeight: theme.spacing(56),
  inputVariant: 'password',
}
export const Secondary = Template.bind({})
Secondary.args = {
  menuMaxHeight: theme.spacing(56),
  inputVariant: 'country',
}
