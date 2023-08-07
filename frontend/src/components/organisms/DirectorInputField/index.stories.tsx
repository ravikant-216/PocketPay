import React from 'react'
import { Story, Meta } from '@storybook/react'
import DirectorInputField, { DirectorInputFieldProps } from '.'

export default {
  title: 'organisms/DirectorInputField',
  component: DirectorInputField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['director', 'owner'],
      control: { type: 'radio' },
    },
    buttonOnClick: { action: 'buttonOnClick' },
  },
} as Meta

const Template: Story<DirectorInputFieldProps> = (args) => (
  <DirectorInputField {...args} />
)

export const Default = Template.bind({})
Default.args = {
  buttonWidth: '126px',
  sx: {
    minWidth: '642px',
  },
  variant: 'director',
}
