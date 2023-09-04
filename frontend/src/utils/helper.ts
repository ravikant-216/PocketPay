export const getWeek = (week: string) => {
  switch (week) {
    case 'Su':
      return 'SUN'
    case 'Mo':
      return 'MON'
    case 'Tu':
      return 'TUE'
    case 'We':
      return 'WED'
    case 'Th':
      return 'THU'
    case 'Fr':
      return 'FRI'
    default:
      return 'SAT'
  }
}
