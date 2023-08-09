import React from 'react'
import { Story, Meta } from '@storybook/react'
import DetailsForm, { DetailsFormProps } from '.'

export default {
  title: 'organisms/DetailsForm',
  component: DetailsForm,
  tags: ['autodocs'],
  argTypes: {
    buttonOnClick: { action: 'buttonOnClick' },
  },
} as Meta

const Template: Story<DetailsFormProps> = (args) => <DetailsForm {...args} />

export const Default = Template.bind({})
Default.args = {
  buttonWidth: '126px',
  sx: {
    minWidth: '642px',
  },
}
