import { testClient } from 'hono/testing'
import { describe, expect, it } from 'vitest'
import { app } from '../../src/index'

const client = testClient(app)

describe('App Router', () => {
  describe('Base Setup', () => {
    it('should be a valid Hono app', () => {
      expect(app).toBeDefined()
      expect(app.get).toBeInstanceOf(Function)
      expect(app.post).toBeInstanceOf(Function)
      expect(app.route).toBeInstanceOf(Function)
    })
  })

  describe('Health Check', () => {
    it('should return 200 and ok status', async () => {
      const response = await client.api['health-check'].$get()
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data).toEqual({ status: 'ok' })
    })
  })
})
