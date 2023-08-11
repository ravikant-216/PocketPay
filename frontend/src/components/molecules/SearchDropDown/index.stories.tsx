import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import SearchDropdown, { SearchDropdownProps } from '.'
import { ADDRESSES } from '../../../strings/constants'

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
  options: ADDRESSES,
  label: 'Select Address',
  placeholder: 'Select Address',
  variant: 'footer',
}

export const WithoutFooter = Template.bind({})
WithoutFooter.args = {
  options: ADDRESSES,
  label: 'Select Address',
  placeholder: 'Select Address',
}
export const WithSearch = Template.bind({})
WithSearch.args = {
  options: ADDRESSES,
  label: 'Select Address',
  placeholder: 'Select Address',
  variant: 'footer',
  type: 'search',
}
