import { describe, before, test } from 'mocha'
import { expect } from 'chai'

import { createHttpServer } from '../../app/server.js'
import env from '../../app/env.js'
import { healthCheck } from '../helper/routeHelper.js'
import client from 'prom-client'

describe('health', function () {
  let app

  before(async function () {
    client.register.clear()
    app = await createHttpServer()
  })

  afterEach(function () {})

  test('health check', async function () {
    const expectedResult = { status: 'ok', version: env.API_VERSION }

    const actualResult = await healthCheck(app)
    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.deep.equal(expectedResult)
  })
})
