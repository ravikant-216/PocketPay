import IconLabel from '../components/atoms/IconLabel'
import india from '../../public/assets/icons/india.svg'
import US from '../../public/assets/icons/US.svg'
import GBP from '../../public/assets/icons/GBP.svg'
import austria from '../../public/assets/icons/austria.svg'
import andorra from '../../public/assets/icons/andorra.svg'

export const USER_NAME = 'Ross Gener'
export const USER_ID = 'P44561754'
export const DETAILS_LABEL = 'Your details'
export const SETTINGS_LABEL = 'Settings'
export const HELP_CENTER_LABEL = 'Help center'
export const LOGOUT_LABEL = 'Logout'
export const NAVITEM_HOME_LABEL = 'Home'
export const NAVITEM_CARDS_LABEL = 'Cards'
export const NAVITEM_RECIPIENTS_LABEL = 'Recipients'
export const NAVITEM_TEAM_LABEL = 'Team'
export const NAVITEM_ACCOUNT_LABEL = 'Account'
export const NAVITEM_INVITE_GIFT_LABEL = 'Invite & earn 150 GBP'
export const NAVITEM_OPEN_BALANCE_LABEL = 'Open a balance'
export const NAVITEM_BALANCE_LABEL = 'Balances'
export const NAVITEM_GBP_LABEL = '1200 GBP'
export const NAVITEM_INDIA_LABEL = '10,000.00 INR'
export const NAVITEM_USD_LABEL = '192.00 USD'
export const NAVITEM_JAR_LABEL = 'Home'
export const Share = 'Copy'
export const Email = 'Email'
export const ALREADY_HAVE_AN_ACCOUNT = 'Already have an account ?'
export const BY_REGISTERING = 'By registering, you accept our'
export const CREATE_ACCOUNT = 'Create your PocketPay account'
export const ENTER_EMAIL = 'Enter your email address'
export const Email_REGEX = '^[\\w.-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,}$'
export const LOGIN = 'Log in'
export const POLICY = 'Privacy Policy'
export const TERM = 'Terms of use '
export const WELCOME_BACK = 'Welcome Back'
export const SIGN_IN = 'Sign In'
export const TROUBLE_LOGIN = 'Trouble logging in?'
export const AMOUNT = '100.00 GBP'
export const CODE = '24-14-70'
export const ACCOUNT_NUMBER = '729019188810'
export const ADDRESS =
  'TransferWise 56 ShoreDitch High Street London E16JJ United Kingdom'
export const LLOYDS_ONLINE_BANK =
  'Next, go to your Lloyds’s online banking and make a payment'
export const BANK_INTRO_MESSAGE = 'Our bank details for payments in GBP'
export const PAYEE_NAME = 'Mario Gabriel'
export const REFERENCE = '#356778810'
export const BANK_INTRO_CAPTION =
  'Below are the bank details for this payment. Please only send the money from an account in your name'
export const ONLINE_BANK = 'online banking'
export const NEXT = 'Next'
export const OR_LOGIN = ' or log in with'
export const CANCEL_TRANSFER_TITLE =
  'Where would you like us to refund the money?'
export const EXISITING_ACCOUNT_LABEL = 'An existing account'
export const NEW_ACCOUNT_LABEL = 'New account'
export const ACCOUNT_NUMBER_1 = 4656
export const DEBIT_CARD_1_LABEL = 'Ending in ' + ACCOUNT_NUMBER_1
export const ACCOUNT_NUMBER_2 = 4252
export const DEBIT_CARD_2_LABEL = 'Ending in ' + ACCOUNT_NUMBER_2
export const COUNTRY_ARRAY = [
  <IconLabel
    key="United States"
    iconTitle="United States"
    src={US}
    alt="US Flag"
  />,
  <IconLabel
    key="United Kingdom"
    iconTitle="United Kingdom"
    src={GBP}
    alt="UK Flag"
  />,
  <IconLabel key="India" iconTitle="India" src={india} alt="India Flag" />,
  <IconLabel
    key="Andorra"
    iconTitle="Andorra"
    src={andorra}
    alt="Andorra Flag"
  />,
  <IconLabel
    key="Austria"
    iconTitle="Austria"
    src={austria}
    alt="Austria Flag"
  />,
]
export const SELECT_COUNTRY = 'Select  Your  Country'
export const CREATE_PASSWORD = 'Create your password'
export const ENTER_PASSWORD = 'Enter your password'
export const INVALID_PASSWORD =
  'Invalid Password use min 8 letters with numbers and special character'
export const COUNTRY_REG = 'Country of registration'
export const TRUST_LIST = [
  { list: 'We’ll use an encrypted end to end connection.' },
  {
    list: 'Your bank will not share your login details with PocketPay or anyone else.',
  },
]
export const SAFE_SECURE = 'Safe and Secure'
export const PAY_FROM = 'Pay from your Lloyds account'
export const REDIRECTED =
  'You’ll be redirected to Lloyds, where you can securely log in to your own'
export const CONTINUE = 'Continue to pay'
export const PAY_MANUALLY = 'Pay manually'
export const APPROVE_PAYMENT = 'account and approve the payment for your'
export const PASSWORD_REGEX =
  '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'
