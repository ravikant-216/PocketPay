import { StoryObj, Meta } from '@storybook/react'
import DatePicker from '.'
const meta: Meta<typeof DatePicker> = {
  title: 'atoms/DatePicker',
  component: DatePicker,
}

export default meta

type Story = StoryObj<typeof meta>

export const DatePickerStory: Story = {
  name: 'DatePicker',
  args: {
    label: 'date picker',
    minDate: '2020-01-01',
    maxDate: '2020-01-05',
  },
}
