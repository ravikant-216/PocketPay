import IconLabel from '../components/atoms/IconLabel'
import india from '../../public/assets/icons/india.svg'
import US from '../../public/assets/icons/US.svg'
import GBP from '../../public/assets/icons/GBP.svg'
import austria from '../../public/assets/icons/austria.svg'
import andorra from '../../public/assets/icons/andorra.svg'
import CountryCurrencyCard from '../components/molecules/CountryCurrencyCard'
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
export const DOB = 'Date of birth'
export const INVALID_PASSWORD =
  'Invalid Password use min 8 letters with numbers and special character'
export const COUNTRY_REG = 'Country of registration'
export const COUNTRY_RESIDENCE = 'Country of residence'
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
export const CHOOSE_BANK = 'Choose your bank'
export const CANCEL_TRANSFER = 'Cancel the transfer'
export const PASSWORD_REGEX =
  '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'
export const DIRECTOR_MESSAGE =
  'Please confirm these details from companies house. If anyone’s missing, add them below.'
export const OWNERS_MESSAGE =
  'Please confirm these details from companies house. If anyone else controls more than 25% of your business, add them below.'
export const CONFIRM_BUSINESS = 'Confirm your business'
export const FOUR_DIGIT_LABEL = 'Last four digit '
export const EXPIRATION_LABEL = ' Expiry date '
export const ADDRESSES = [
  '1234, Street Name, Mumbai, Maharashtra, 400001',
  '5678, Avenue Road, Delhi, Delhi, 110001',
  '9876, Park Street, Kolkata, West Bengal, 700001',
  '4321, Main Road, Chennai, Tamil Nadu, 600001',
  '2468, Market Area, Bangalore, Karnataka, 560001',
  '1357, Lane No. 9, Hyderabad, Telangana, 500001',
  '8642, Gandhi Nagar, Ahmedabad, Gujarat, 380001',
  '9753, MG Road, Pune, Maharashtra, 411001',
  '7912, New Colony, Jaipur, Rajasthan, 302001',
  '4319, Beach Road, Surat, Gujarat, 395003',
]
export const BUSINESS_NOT_MESSAGE = 'Can’t find your business?'
export const ENTER_DETAIL = 'Enter your details'
export const SENDING_MONEY = 'Who are you sending money to?'
export const WHAT_TO_DO = 'What would you like to do today?'
export const CANCEL = 'Cancel'
export const RECIPIENT_DETAILS = 'Recipient Details'
export const RECIPIENT_DETAILS_CONTINUE = 'Continue'
export const USER_DETAIL = [
  {
    email: 'mario.gabriel@gmail.com',
    account: '123456885865',
    firstName: 'Mario',
    lastName: 'Gabriel',
    ifsc: 'ABFJ12929G',
  },

  {
    email: 'paul.gabriel@gmail.com',
    account: '144456885865',
    firstName: 'Paul',
    lastName: 'Gabriel',
    ifsc: 'ACFJ12929H',
  },
]
export const REVIEW_ACCOUNT = 'Review details of your transfer'

export const AMOUNT_CONVERT = 'Amount we’ll convert'
export const TRANSFER_DETAIL = 'Transfer details'

export const BUSINESS_DETAILS = 'Business details'
export const SAVE = 'Save'
export const Cancel = 'Cancel'
export const CONFIRM_BUSINESS_DETAILS_TITLE = 'Confirm your business details'
export const CONFIRM_BUSINESS_DETAILS_TITLE_CAPTION =
  'Sole trader, freelancer or not registered with Companies house?'
export const BUSINESS_DETAILS_LABEL = 'Business Details'
export const CANCEL_BUTTON_LABEL = 'Cancel'
export const SAVE_BUTTON_LABEL = 'Save'
export const CONFIRM_BUTTON_LABEL = 'Confirm'
export const EDIT_LABEL = 'edit'

interface Country {
  name: string
  code: string
  flagIconSrc: string
}

export const COUNTRIES: Country[] = [
  {
    name: 'United States',
    code: '13',
    flagIconSrc: US,
  },
  {
    name: 'GBP',
    code: '21',
    flagIconSrc: GBP,
  },
  {
    name: 'Andorra',
    code: '52',
    flagIconSrc: andorra,
  },
  {
    name: 'Austria',
    code: '31',
    flagIconSrc: austria,
  },
  {
    name: 'India',
    code: '91',
    flagIconSrc: india,
  },
]
export const VERIFY_PHONE = 'Verify your phone number with a code'
export const ACCOUNT_MESSAGE = 'It helps us keep your account secure.'
export const ENTER_OTP = 'Enter the 6-digit code'
export const CODE_SENT = 'We sent a code to +'
export const CODE_ENTER = 'Enter code here'
export const CODE_NOTFOUND = 'I didn’t receive a code'
export const APPROVE = 'Approve another way'
export const CODE_SEND = 'We sent it to +'
export const SMS_CODE = 'Resend code by SMS'
export const CALL_CODE = 'Send code by voice call'
export const ANOTHER_PHONE = 'Use a different phone number'
export const SUBMIT = 'Submit'
export const CONTINUE_BUTTON = 'Continue'

export const steps = [
  { time: 'Today at 6:43 pm', label: 'You set up your transfer' },
  { time: 'Today at 6:44 pm', label: 'We recieved your GBP' },
  { time: 'Today at 6:50 pm', label: 'Your money’s being processed' },
  { time: 'Tomorrow at 12:00 am', label: 'We pay out your EUR' },
  { time: 'Tomorrow at 6:00 am', label: 'George max recieves your EUR' },
]
export const CURRENCY_EXCHANGE_TRANSFER = 'How much would you like to transfer?'
import UK from '../../public/assets/icons/uk.svg'
export const SELECT_CURRENCY_ARRAY = [
  <CountryCurrencyCard
    key="Andorra"
    countryName="Andorra"
    iconTitle="Andorra"
    countryImageSrc={andorra}
    countryImageAlt="Andorra Flag"
    countryCurrencyCode="EUR"
    sx={{ width: '100%' }}
    currencyValue={90.27}
  />,
  <CountryCurrencyCard
    key="India"
    countryName="India"
    iconTitle="India"
    countryImageSrc={india}
    countryImageAlt="India Flag"
    countryCurrencyCode="INR"
    sx={{ width: '100%' }}
    currencyValue={1}
  />,
  <CountryCurrencyCard
    key="United Kingdom"
    countryName="United Kingdom"
    iconTitle="United Kingdom"
    countryImageSrc={UK}
    countryImageAlt="Uk Flag"
    countryCurrencyCode="GBP"
    sx={{ width: '100%' }}
    currencyValue={105}
  />,
  <CountryCurrencyCard
    key="United States"
    iconTitle="United States"
    countryName="United States"
    countryImageSrc={US}
    countryImageAlt="US Flag"
    countryCurrencyCode="USD"
    sx={{ width: '100%' }}
    currencyValue={83}
  />,
]
export const DEFAULT_SENDER = SELECT_CURRENCY_ARRAY[1]
export const LOW_COST_TRANSFER = 'Low cost transfer fee:'
export const TRANSFER_FEE = 'From 3.69GBP'
export const GURANTEED_RATE = 'Guaranteed rate (24 hrs):'
export const GURANTEED_RATE_VALUE = '1.20048'
export const TOTAL_AMOUNT = 'Total amount:'
export const TOTAL_AMOUNT_VALUE = ' 996.31 GBP'
export const CURRENCY_EXCHANGE_CONTINUE = 'Continue'
export const MODAL_CONTENT =
  ' We’ll apply this rate if we receive your money today.'
export const AGREE = 'OK'
export const CHOOSE_TRANSFER_TYPE_TITLE = 'Choose your transfer type'
export const FEATURE_DESCRIPTION_LABEL_1 = 'Fear and easy transfer'
export const FEATURE_DESCRIPTION_LABEL_2 = 'Low cost transfer'
export const FEATURE_DESCRIPTION_LABEL_3 = 'Advanced transfer'
export const PAY_WITH_CARD_LABEL = 'Pay with your card'
export const CONFIRM_PURCHASE_LABEL = 'Confirm your purchase'
export const GBP_LABEL = 'GBP 100.0 '
export const ENDING_CARD_LABEL = ' to PocketPay using visa card ending '
export const LAST_FOUR_CARD_NUMBER = ' 9313'
export const PAYMENT_CONFIRMATION_STEP_1 =
  'Step 1: Open and confirm the push notification we sent to your mobile.'
export const PAYMENT_CONFIRMATION_STEP_2 =
  'Step 2: Return to this screen and press the button below to finish your purchase.'
export const COMPLETE_BUTTON_LABEL = 'Complete'
export const FILL_DETAIL = 'Fill in your details'
export const ACCOUNT_OPEN =
  'Since you’re opening the account, we need to know a bit more about you.'
export const POCKEY_PAY_PURPOSE = [
  'Paying rent, utilities or property charges',
  'Paying suppliers/contractors/employees',
  'Paying for goods or services abroad',
  'Paying tax on profit or property',
]
export const POCKEY_PAY_PURPOSE_HEADING =
  'What’s the purpose for using PocketPay?'
export const POCKEY_PAY_PURPOSE_SUB_HEADING =
  'To help us keep PocketPay safe and secure, please tell us what you’re using PocketPay for'
export const POCKEY_PAY_PURPOSE_PLACEHOLDER =
  'Tell us what you’re using PocketPay for'
export const ACCOUNT_VERIFICATION_CATEGORY = {
  category: [
    'Design, marketing or communication',
    'Health, sports or personal care',
    'Real estate or construction',
    'Education or learning',
    'Others',
  ],

  subcategory: [
    'Real estate sale, purchase and management',
    'Healthcare services',
    'Digital marketing',
    'Fitness and wellness coaching',
    'Language education',
    'Financial consulting',
  ],

  businessSize: [
    '1-50',
    '50-100',
    '100-150',
    '150-200',
    '200-350',
    '350-400',
    '400-450',
  ],
}
export const ACCOUNT_VERIFICATION_HEADING = 'Help us verify your account faster'
export const ACCOUNT_VERIFICATION_SUBHEADING =
  'Without this information we can’t verify your account'
export const SEARCH_BUSINESS = 'Search for your business'
export const SOLO_TRADER =
  'Sole trader, freelancer or not registered with Companies house?'
export const SELECT_BUSINESS = 'Select your business'
export const REVIEW_TRANSFER_DETAILS_TITLE = 'Review details of your transfer'
export const TRANSFER_DETAILS_LABEL = 'Transfer details:'
export const RECIEPIENT_DETAILS_LABEL = 'Sender details:'
export const SCHEDULE_DETAILS_LABEL = 'Schedule details:'
export const EDIT = 'Edit'
export const CHANGE = 'Change'
export const CONFIRM_CONTINUE_LABEL = 'Confirm and continue'
export const TERMS_AND_CONDITIONS_LABEL =
  'When you press "Confirm" you agree with Wise Terms & Conditions'
export const TRANSACTION_DETAILS_EXISTING_USER_OPTIONS = [
  `<div>Ross Gener<div>`,
]
export const TRANSFER_SHARE_MODAL_HEADING = 'Share tracking link'
export const TRANSFER_SHARE_MODAL_SUBHEADING =
  'Share the link above, and they can securely track this transfer.'
export const TRANSACTION_DETAIL_CANCEL_HEADING = 'Your money will be refunded'
export const TRANSACTION_DETAIL_CANCEL_SUBHEADING =
  'When we receive your money, we’ll give you a refund. Refunds usually take 3-5 working days.'
export const TRANSFER_NUMBER = 'Transfer number:'
export const GENERAL = 'General'
export const SET_UP_BY = 'Set up by:'

export const TRADING_ADDRESS_HEADING = 'Confirm trading address'
export const TRADING_ADDRESS_SUBHEADING =
  'Your trading address is usually the place you work every day. If thebusiness has multiple trading addresses, add as many as possible'
export const TRADING_ADDRESS = [
  {
    address:
      '#2097, Triveni Main Rd, Gokula 1st Stage, Nanjappa Reddy Colony, Yeswanthpur, Bengaluru, Karnataka 560054',
  },
]
export const TRADING_ADDRESSES = 'Trading addresses'
export const ADD_TRADING_ADDRESS = 'Add trading Address'
export const ADD = 'Add'
