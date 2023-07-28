import { Meta, Story } from '@storybook/react'
import Icon, { IconProps } from '.'
import SocialIcon1 from '../../../../public/assets/icons/google.svg'
import SocialIcon2 from '../../../../public/assets/icons/facebook.svg'

import SocialIcon3 from '../../../../public/assets/icons/apple.svg'
import ShareIcon from '../../../../public/assets/icons/share.svg'

import EmailIcon from '../../../../public/assets/icons/email.svg'
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

export const FacebookIcon = template.bind({})

FacebookIcon.args = {
  icon: SocialIcon2,
  width: theme.spacing(7),
  height: theme.spacing(7),
}

export const AppleIcon = template.bind({})

AppleIcon.args = {
  icon: SocialIcon3,
  width: theme.spacing(7),
  height: theme.spacing(7),
}

export const SecondaryEmail = template.bind({})

SecondaryEmail.args = {
  icon: EmailIcon,
  width: theme.spacing(7),
  height: theme.spacing(7),
  borderRadius: theme.spacing(12.5),
  borderColor: theme.palette.primary[500],
}

export const SecondaryShare = template.bind({})

SecondaryShare.args = {
  icon: ShareIcon,
  width: theme.spacing(7),
  height: theme.spacing(7),
  borderRadius: theme.spacing(12.5),
  borderColor: theme.palette.primary[500],
}
