import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import { exampleRouter } from '../../src/routes/example'

const client = testClient(exampleRouter)

describe('Example Router', () => {
  describe('GET /example', () => {
    describe('with valid parameters', () => {
      it('should return greeting with provided name', async () => {
        const response = await client.example.$get({ query: { name: 'John' } })
        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data).toEqual({ message: 'Hello, John!' })
      })

      it('should handle special characters in name', async () => {
        const response = await client.example.$get({
          query: { name: 'John Doe' }
        })
        expect(response.status).toBe(200)
        const data = await response.json()
        expect(data).toEqual({ message: 'Hello, John Doe!' })
      })
    })

    describe('with invalid parameters', () => {
      it('should return 400 when name is missing', async () => {
        // @ts-expect-error - for testing purposes we want to test the error handling
        const response = await client.example.$get({ query: {} })
        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.message).toBe('Invalid query')
      })

      it('should return 400 when name is empty', async () => {
        const response = await client.example.$get({ query: { name: '' } })
        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.message).toBe('Invalid query')
      })
    })
  })
})
