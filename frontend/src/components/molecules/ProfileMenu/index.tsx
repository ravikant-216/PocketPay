import {
  Divider,
  Menu,
  MenuItem,
  MenuProps,
  Stack,
  styled,
} from '@mui/material'
import Typography from '../../atoms/Typography'
import Image from '../../atoms/Image'
import ProfileIcon from '../../../../public/assets/icons/profile.svg'
import SettingsIcon from '../../../../public/assets/icons/settings.svg'
import HelpIcon from '../../../../public/assets/icons/help.svg'
import LogoutIcon from '../../../../public/assets/icons/logout.svg'
import {
  DETAILS_LABEL,
  HELP_CENTER_LABEL,
  LOGOUT_LABEL,
  SETTINGS_LABEL,
  USER_ID,
  USER_NAME,
} from '../../../strings/constants'

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: theme.spacing(57.25),
    height: theme.spacing(77.25),
    borderRadius: theme.spacing(2),
    backgroundColor: 'white',
    boxShadow: `0px ${theme.spacing(0.5)} ${theme.spacing(
      2.5
    )} 0px rgba(0, 0, 0, 0.10)`,
    flexShrink: 0,
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  width: theme.spacing(57.25),
  height: theme.spacing(14),
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(3),
}))

interface ProfileMenuProps extends MenuProps {
  onLogout: React.MouseEventHandler<HTMLLIElement>
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onLogout, ...props }) => {
  const menuItems = [
    {
      icon: ProfileIcon,
      alt: 'ProfileIcon',
      label: DETAILS_LABEL,
    },
    {
      icon: SettingsIcon,
      alt: 'SettingsIcon',
      label: SETTINGS_LABEL,
    },
    {
      icon: HelpIcon,
      alt: 'HelpIcon',
      label: HELP_CENTER_LABEL,
    },
    {
      icon: LogoutIcon,
      alt: 'LogoutIcon',
      label: LOGOUT_LABEL,
      onClick: onLogout,
    },
  ]

  function getAllMenuItems() {
    return menuItems.map((item) => (
      <StyledMenuItem key={item.label} onClick={item.onClick}>
        <Image src={item.icon} alt={item.alt} />
        <Typography variant="body2">{item.label}</Typography>
      </StyledMenuItem>
    ))
  }

  return (
    <StyledMenu {...props} data-testid="ProfileMenu">
      <MenuItem>
        <Stack>
          <Typography variant="body2">{USER_NAME}</Typography>
          <Typography variant="caption" color="text.lowEmphasis">
            {USER_ID}
          </Typography>
        </Stack>
      </MenuItem>
      <Divider />
      {getAllMenuItems()}
    </StyledMenu>
  )
}

ProfileMenu.defaultProps = {
  open: false,
}

export default ProfileMenu
