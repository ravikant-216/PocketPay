import React from 'react'
import { Story, Meta } from '@storybook/react'
import PhoneNumber, { PhoneNumberProps } from '.'
import theme from '../../../theme'
import { CountryArray } from '../../../strings/constants'

export default {
  title: 'organisms/PhoneNumber',
  component: PhoneNumber,
  tags: ['autodocs'],
  argTypes: {
    country: {
      defaultValue: '',
    },
    onSubmit: {
      action: 'onSubmit',
    },
  },
} as Meta

const Template: Story<PhoneNumberProps> = (args) => (
  <PhoneNumber
    {...args}
    width={theme.spacing(129)}
    countryList={CountryArray}
  />
)

export const India = Template.bind({})
India.args = {
  country: 'India',
}
