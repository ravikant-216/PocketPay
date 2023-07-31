import { createTheme } from '@mui/material/styles'

export const defaultTheme = createTheme()

declare module '@mui/material/styles' {
  interface TypeText {
    highEmphasis?: string
    mediumEmphasis?: string
    lowEmphasis?: string
  }

  interface Palette {
    Greys: {
      stroke: string
      icon1: string
      icon2: string
    }
    structuralColors: {
      background: string
      hoverColor: string
      buttonHover: string
      white: string
      backdrop: string
    }
  }

  interface PaletteOptions {
    Greys: {
      stroke: string
      icon1: string
      icon2: string
    }
    structuralColors: {
      background: string
      hoverColor: string
      buttonHover: string
      white: string
      backdrop: string
    }
  }

  interface PaletteColor {
    '100': string
    '300': string
    '500': string
  }

  interface TypographyVariants {
    body3: React.CSSProperties
    link: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    body3: React.CSSProperties
    link: React.CSSProperties
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true
    link: true
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#7633FF',
      '100': '#E4D6FF',
      '300': '#9764FF',
      '500': '#7633FF',
    },
    text: {
      highEmphasis: '#141414',
      mediumEmphasis: '#77767A',
      lowEmphasis: '#9F9DA3',
    },
    structuralColors: {
      background: '#F8F9FA',
      white: '#FFFFFF',
      hoverColor: '#F3F2F5',
      buttonHover: '#F4EFFF',
      backdrop: '#00000080',
    },
    Greys: {
      stroke: '#E4E4E5',
      icon1: '#141414',
      icon2: '#A5A8AC',
    },
  },

  typography: {
    fontFamily: ['Gerbera'].join(','),
    h1: {
      fontFamily: 'Gerbera',
      fontSize: '24px',
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: '40px',
    },
    body1: {
      fontFamily: 'Gerbera',
      fontSize: '21px',
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: '32px',
    },
    body2: {
      fontFamily: 'Gerbera',
      fontSize: '17px',
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: '24px',
    },

    body3: {
      fontFamily: 'Gerbera',
      fontSize: '16px',
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: '24px',
    },
    caption: {
      fontFamily: 'Gerbera',
      fontSize: '14px',
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: '21px',
    },

    link: {
      fontFamily: 'Gerbera',
      fontSize: '14px',
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: '13.3px',
      textDecorationLine: 'underline',
    },
  },
  spacing: 4,
})

export default theme
