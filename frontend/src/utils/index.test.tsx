import API from '.'
import '@testing-library/jest-dom'
import { baseURL } from '../strings/constants'
describe('API Instance Configuration', () => {
  it('should have the correct baseURL', () => {
    expect(API.defaults.baseURL).toBe(baseURL)
  })

  it('should have default headers', () => {
    expect(API.defaults.headers['Content-Type']).toBe('application/json')
  })

  it('should have a timeout of 10000', () => {
    expect(API.defaults.timeout).toBe(10000)
  })
})
