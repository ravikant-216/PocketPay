import { Meta, Story } from '@storybook/react'
import SignUpForm, { SignUpWrapperProps } from '.'
import theme from '../../../theme'

export default {
  title: 'organisms/SignUpForm',
  component: SignUpForm,
  decorators: [(Story) => <Story />],
} as Meta

const template: Story<SignUpWrapperProps> = (args) => <SignUpForm {...args} />

export const SignUpFormStory = template.bind({})

SignUpFormStory.args = {
  style: {
    width: theme.spacing(129),
  },
}
