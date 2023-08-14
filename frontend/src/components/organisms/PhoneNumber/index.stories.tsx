import React from 'react'
import { Story, Meta } from '@storybook/react'
import PhoneNumber, { PhoneNumberProps } from '.'
import theme from '../../../theme'

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

const Template: Story<PhoneNumberProps> = (args) => <PhoneNumber {...args} />

export const India = Template.bind({})
India.args = {
  country: 'India',
  style: {
    width: theme.spacing(129),
  },
}

export const USA = Template.bind({})
USA.args = {
  country: 'United States',
  style: {
    width: theme.spacing(129),
  },
}
