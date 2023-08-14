import { Divider, Stack, styled } from '@mui/material'
import Image from '../../atoms/Image'
import IconLabel, { IconLabelPropType } from '../../atoms/IconLabel'
import PocketPayLogo from '../../../../public/assets/icons/pocketpay.svg'
import HomeIcon from '../../../../public/assets/icons/nav_home.svg'
import CardIcon from '../../../../public/assets/icons/nav_card.svg'
import PeopleIcon from '../../../../public/assets/icons/nav_people.svg'
import TeamIcon from '../../../../public/assets/icons/nav_team.svg'
import AccountIcon from '../../../../public/assets/icons/nav_account.svg'
import GiftIcon from '../../../../public/assets/icons/nav_gift.svg'
import AddIcon from '../../../../public/assets/icons/add.svg'
import IndiaFlag from '../../../../public/assets/icons/india.svg'
import USAFlag from '../../../../public/assets/icons/US.svg'
import GBPFlag from '../../../../public/assets/icons/GBP.svg'
import Typography from '../../atoms/Typography'
import {
  NAVITEM_ACCOUNT_LABEL,
  NAVITEM_BALANCE_LABEL,
  NAVITEM_CARDS_LABEL,
  NAVITEM_GBP_LABEL,
  NAVITEM_HOME_LABEL,
  NAVITEM_INDIA_LABEL,
  NAVITEM_INVITE_GIFT_LABEL,
  NAVITEM_JAR_LABEL,
  NAVITEM_OPEN_BALANCE_LABEL,
  NAVITEM_RECIPIENTS_LABEL,
  NAVITEM_TEAM_LABEL,
  NAVITEM_USD_LABEL,
} from '../../../strings/constants'

const StyledStack = styled(Stack)(({ theme }) => ({
  width: theme.spacing(57.5),
  height: '100vh',
  maxWidth: theme.spacing(57.5),

  // layout
  flexShrink: 0,
  flexFlow: 'column nowrap',
  gap: theme.spacing(5),
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(8.5),

  // box shadow
  boxShadow: `0px ${theme.spacing(0.25)} ${theme.spacing(
    2
  )} 0px rgba(0, 0, 0, 0.05)`,

  '& .nav-items-group': {
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: theme.spacing(4),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(4.5),
  },

  '& .sp-label': {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    gap: theme.spacing(6.25),
  },

  '& .chip': {
    display: 'flex',
    width: theme.spacing(15.75),
    height: theme.spacing(6.5),
    padding: `${theme.spacing(1)} ${theme.spacing(3)} ${theme.spacing(
      0.5
    )} ${theme.spacing(3)}`,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2.5),
    flexShrink: 0,
    borderRadius: theme.spacing(4),
    background: theme.palette.structuralColors.buttonHover,
    color: theme.palette.primary[500],
  },

  '& .logo': {
    margin: '0 auto',
    marginBottom: theme.spacing(9.25),
    width: theme.spacing(25.75),
    height: theme.spacing(5.5),
    flexShrink: 0,
  },
}))

interface SideNavigationProps {
  newUser: boolean
}

const SideNavigation: React.FC<SideNavigationProps> = ({ newUser }) => {
  const navItems: IconLabelPropType[] = [
    {
      src: HomeIcon,
      iconTitle: NAVITEM_HOME_LABEL,
      alt: 'Home icon',
      color: 'primary.500',
    },
    {
      src: CardIcon,
      iconTitle: NAVITEM_CARDS_LABEL,
      alt: 'Card Icon',
    },
    {
      src: PeopleIcon,
      iconTitle: NAVITEM_RECIPIENTS_LABEL,
      alt: 'People',
    },
    {
      src: TeamIcon,
      iconTitle: NAVITEM_TEAM_LABEL,
      alt: 'Teams icon',
    },
    {
      src: AccountIcon,
      iconTitle: NAVITEM_ACCOUNT_LABEL,
      alt: 'Account Icon',
    },
    {
      src: GiftIcon,
      iconTitle: NAVITEM_INVITE_GIFT_LABEL,
      alt: 'Gift Icon',
    },
  ]

  const balanceItems: IconLabelPropType[] = [
    {
      src: IndiaFlag,
      iconTitle: NAVITEM_INDIA_LABEL,
      alt: 'India Flag Icon',
    },
    {
      src: GBPFlag,
      iconTitle: NAVITEM_GBP_LABEL,
      alt: 'GBP',
    },
    {
      src: USAFlag,
      iconTitle: NAVITEM_USD_LABEL,
      alt: 'USA flag',
    },
    {
      src: AddIcon,
      iconTitle: NAVITEM_OPEN_BALANCE_LABEL,
      alt: 'Add Icon',
    },
  ]

  function renderItems(items: IconLabelPropType[]) {
    return items.map((item) => (
      <IconLabel color="text.mediumEmphasis" key={item.alt} {...item} />
    ))
  }

  return (
    <StyledStack data-testid="SideNavigation">
      <Image className="logo" src={PocketPayLogo} alt="Pocket Pay Logo" />
      <Stack className="nav-items-group">{renderItems(navItems)}</Stack>
      {!newUser && (
        <>
          <Divider />
          <Stack className="nav-items-group">
            <Typography variant="caption" color="text.mediumEmphasis">
              {NAVITEM_BALANCE_LABEL}
            </Typography>
            {renderItems(balanceItems)}
          </Stack>
          <Divider />
          <Stack className="nav-items-group">
            <Typography variant="caption" color="text.mediumEmphasis">
              {NAVITEM_JAR_LABEL}
            </Typography>
            <IconLabel
              iconTitle="Open a jar"
              src={AddIcon}
              alt="Add Icon"
              color="text.mediumEmphasis"
            />
          </Stack>
        </>
      )}
    </StyledStack>
  )
}

export default SideNavigation
