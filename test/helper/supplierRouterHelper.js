/* eslint no-console: "off" */
const request = require('supertest')
const { expect } = require('chai')

const { API_MAJOR_VERSION } = require('../../app/env')

async function getSuppliersRoute({ app }, authToken) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/suppliers`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${authToken}`)
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getSuppliersErr ${err}`)
      return err
    })
}

function assertSupplier(actualResult, expectedResult) {
  expect(actualResult.name).to.equal(expectedResult.name)
  expect(actualResult.tier).to.equal(expectedResult.tier)
  expect(actualResult.addressLine1).to.equal(expectedResult.address_line_1)
  expect(actualResult.addressLine2).to.equal(expectedResult.address_line_2)
  expect(actualResult.postcode).to.equal(expectedResult.postcode)
  expect(actualResult.country).to.equal(expectedResult.country)
  expect(actualResult.sc10Certification).to.be.an('object')
  expect(actualResult.contactFirstName).to.equal(expectedResult.contact_first_name)
  expect(actualResult.contactLastName).to.equal(expectedResult.contact_last_name)
  expect(actualResult.contactEmail).to.equal(expectedResult.contact_email)
}

function assertSuppliers(actualResult, expectedResult) {
  expect(actualResult.length).to.equal(expectedResult.length)

  for (let counter = 0; counter < actualResult.length; counter++) {
    assertSupplier(actualResult[counter], expectedResult[counter])
  }
}

module.exports = {
  getSuppliersRoute,
  assertSuppliers,
}
