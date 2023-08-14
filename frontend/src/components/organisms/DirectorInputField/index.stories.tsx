import React from 'react'
import { Story, Meta } from '@storybook/react'
import DirectorInputField, { DirectorInputFieldProps } from '.'
import theme from '../../../theme'

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
  buttonWidth: theme.spacing(31.5),
  sx: {
    minWidth: theme.spacing(160.5),
    width: theme.spacing(129),
  },
  variant: 'director',
}
