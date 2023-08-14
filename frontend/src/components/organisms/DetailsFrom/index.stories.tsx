import React from 'react'
import { Story, Meta } from '@storybook/react'
import DetailsForm, { DetailsFormProps } from '.'
import theme from '../../../theme'

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
  buttonWidth: theme.spacing(31.5),
  sx: {
    minWidth: theme.spacing(160.5),
    width: theme.spacing(129),
  },
}
