import { type StoryObj, type Meta } from '@storybook/react'
import VerticalStepper from '.'
import { steps } from '../../../strings/constants'

const meta: Meta<typeof VerticalStepper> = {
  title: 'molecules/VerticalStepper',
  component: VerticalStepper,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof VerticalStepper>

export const Default: Story = {
  args: {
    steps,
    activeStep: 2,
  },
}
