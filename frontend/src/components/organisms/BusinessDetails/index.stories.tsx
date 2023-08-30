import { StoryObj, Meta } from '@storybook/react'
import BusinessDetails from '.'

const meta: Meta<typeof BusinessDetails> = {
  title: 'organisms/BusinessDetails',
  component: BusinessDetails,
}

export default meta

type Story = StoryObj<typeof meta>

export const BusinessDetailsStory: Story = {
  name: 'BusinessDetails',
  args: { name: 'Zentech solutions pvt ltd' },
}
