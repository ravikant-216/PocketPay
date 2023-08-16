import { Meta, Story } from '@storybook/react'
import Icon, { IconProps } from '.'
import SocialIcon1 from '../../../../public/assets/icons/google.svg'
import theme from '../../../theme'
export default {
  title: 'atoms/IconButton',
  component: Icon,
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
} as Meta

const template: Story<IconProps> = (args) => <Icon {...args} />

export const GoogleIcon = template.bind({})

GoogleIcon.args = {
  icon: SocialIcon1,
  width: theme.spacing(7),
  height: theme.spacing(7),
}
