import { IconLabelPropType } from '../atoms/IconLabel'
import { countryList } from '../../utils/type'
import axios from 'axios'
import { baseURL } from '../../strings/constants'

async function getCountryList(): Promise<IconLabelPropType[]> {
  const response = await axios.get(`${baseURL}/country`)
  const countries = response.data
  const countryArray: IconLabelPropType[] = countries.map(
    (country: countryList) => ({
      key: country.name,
      iconTitle: country.name,
      src: country.countryImageUrl,
      alt: `${country.name} Flag`,
    })
  )

  return countryArray
}

export default getCountryList
