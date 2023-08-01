import React from 'react'
import { Meta, Story } from '@storybook/react'
import SignIn, { SignInProps } from '.'

export default {
  title: 'organisms/SignIn',
  component: SignIn,
  tags: ['autodocs'],
  argTypes: {
    bgcolor: { control: 'color' },
    boxShadow: { control: 'text' },
    borderRadius: { control: 'number' },
    padding: { control: 'text' },
    margin: { control: 'text' },
    height: { control: 'text' },
    width: { control: 'text' },
  },
} as Meta

const Template: Story<SignInProps> = (args) => <SignIn {...args} />

export const Default = Template.bind({})
