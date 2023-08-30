import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import SearchDropdown, { SearchDropdownProps } from '.'

import theme from '../../../theme'
import { BUSINESSES } from '../../../strings/constants'

export default {
  title: 'Molecules/SearchDropdown',
  component: SearchDropdown,
  argTypes: {
    onValueChange: { action: 'Selected value:' },
  },
} as Meta

const Template: Story<SearchDropdownProps> = (args) => (
  <SearchDropdown {...args} />
)

export const WithFooter = Template.bind({})
WithFooter.args = {
  style: {
    width: theme.spacing(129),
  },
  options: BUSINESSES,
  label: 'Select Address',
  placeholder: 'Select Address',
  variant: 'footer',
  minHeight: theme.spacing(75),
}

export const WithoutFooter = Template.bind({})
WithoutFooter.args = {
  style: {
    width: theme.spacing(129),
  },
  options: BUSINESSES,
  label: 'Select Address',
  placeholder: 'Select Address',
  minHeight: theme.spacing(100),
}
