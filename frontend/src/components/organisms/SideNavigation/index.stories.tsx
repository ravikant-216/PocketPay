import { StoryObj, Meta } from '@storybook/react'
import SideNavigation from '.'

const meta: Meta<typeof SideNavigation> = {
  title: 'organisms/SideNavigation',
  component: SideNavigation,
}

export default meta

type Story = StoryObj<typeof meta>

export const SideNavigationStory: Story = {
  name: 'SideNavigation',
}
