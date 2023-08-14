import { Meta, Story } from '@storybook/react'
import TrackingShareCard, { TrackingShareCardProps } from '.'

export default {
  title: 'molecules/TrackingShareCard',
  component: TrackingShareCard,

  decorators: [(Story) => <Story />],
} as Meta

const template: Story<TrackingShareCardProps> = (args) => (
  <TrackingShareCard {...args} />
)

export const TrackingShareCardStory = template.bind({})

TrackingShareCardStory.args = {
  heading: 'Share tracking link',
  subHeading:
    'Share the link above, and they can securely track this transfer.',
  open: true,
}
