import { describe, before, it } from 'mocha'
import { expect } from 'chai'

import { createHttpServer } from '../../app/server.js'
import { apiDocs } from '../helper/routeHelper.js'

describe('api-docs', function () {
  let app

  before(async function () {
    app = await createHttpServer()
  })

  it('should return 200', async function () {
    const actualResult = await apiDocs(app)

    expect(actualResult.status).to.equal(200)
    expect(actualResult.body).to.have.property('openapi')
    expect(actualResult.body).to.have.property('info')
  })
})
