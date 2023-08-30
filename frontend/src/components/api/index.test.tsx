import { cleanup } from '@testing-library/react'
import axios from 'axios'
import getCountryList from './CountryList'
jest.mock('axios')
afterEach(cleanup)
const axiosMock = axios as jest.Mocked<typeof axios>
axiosMock.get.mockResolvedValue({
  data: [
    {
      id: 1,
      name: 'Country 1',
      countryImageUrl: 'image1.jpg',
    },
    {
      id: 2,
      name: 'Country 2',
      countryImageUrl: 'image2.jpg',
    },
  ],
})
describe('getCountryList', () => {
  it('should return a list of country data', async () => {
    const result = await getCountryList()

    expect(result).toHaveLength(2)
    expect(result[0].key).toBe('Country 1')
    expect(result[0].iconTitle).toBe('Country 1')
    expect(result[0].src).toBe('image1.jpg')
    expect(result[0].alt).toBe('Country 1 Flag')
  })
})
