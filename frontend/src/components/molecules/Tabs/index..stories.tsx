import { Meta, Story } from '@storybook/react'
import TabsComponent, { CustomTabsProps } from '.'

export default {
  title: 'molecules/Tabs',
  component: TabsComponent,
  decorators: [(Story) => <Story />],
} as Meta

const template: Story<CustomTabsProps> = (args) => <TabsComponent {...args} />

export const TabsStory = template.bind({})

TabsStory.args = {
  tabs: [
    { label: 'Updates', content: <div>Update Tab</div> },
    { label: 'check', content: 'Checks Tab' },
  ],
}
