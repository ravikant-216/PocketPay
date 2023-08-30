import React from 'react'
import { Meta, Story } from '@storybook/react'
import CountrySelect, { Props } from '.'
import theme from '../../../theme'
import { CountryArray } from '../../../strings/constants'

export default {
  title: 'organisms/CountrySelect',
  component: CountrySelect,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    onChange: { action: 'onChange' },
  },
} as Meta

const Template: Story<Props> = (args) => (
  <CountrySelect {...args} countryList={CountryArray} />
)

export const Primary = Template.bind({})
Primary.args = {
  style: {
    width: theme.spacing(129),
  },
  menuMaxHeight: theme.spacing(56),
  inputVariant: 'password',
}
export const Secondary = Template.bind({})
Secondary.args = {
  style: {
    width: theme.spacing(129),
  },
  menuMaxHeight: theme.spacing(56),
  inputVariant: 'country',
}
