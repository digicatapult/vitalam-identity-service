const createJWKSMock = require('mock-jwks').default
const { describe, test, before } = require('mocha')
const { expect } = require('chai')
const nock = require('nock')

const { createHttpServer } = require('../../app/server')
const { AUTH_ISSUER, AUTH_AUDIENCE } = require('../../app/env')
const { cleanup, seed } = require('../seeds/suppliers')
const { getSuppliers } = require('../data/files/suppliers')
const { getSuppliersRoute, assertSuppliers } = require('../helper/supplierRouterHelper')

describe.only('supplier routes', function () {
  before(async () => {
    nock.disableNetConnect()
    nock.enableNetConnect((host) => host.includes('127.0.0.1') || host.includes('localhost'))
  })

  afterEach(() => {
    nock.abortPendingRequests()
    nock.cleanAll()
  })

  describe('authenticated routes', function () {
    let app
    let jwksMock
    let authToken

    before(async function () {
      await cleanup()
      await seed()

      app = await createHttpServer()

      jwksMock = createJWKSMock(AUTH_ISSUER)
      jwksMock.start()
      authToken = jwksMock.token({
        aud: AUTH_AUDIENCE,
        iss: AUTH_ISSUER,
      })
    })

    after(async function () {
      await jwksMock.stop()
    })

    test('return suppliers', async function () {
      const expectedResult = getSuppliers()

      const res = await getSuppliersRoute(app, authToken)

      expect(res.status).to.equal(200)

      assertSuppliers(res.body, expectedResult)
    })
  })
})
