/* eslint no-console: "off" */
const request = require('supertest')
const { expect } = require('chai')

const { API_MAJOR_VERSION } = require('../../app/env')

async function getMembersRoute({ app }, authToken) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/members`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${authToken}`)
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getMembersErr ${err}`)
      return err
    })
}

async function putMemberAliasRoute({ app }, authToken, address, { alias }) {
  return request(app)
    .put(`/${API_MAJOR_VERSION}/members/${address}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${authToken}`)
    .send({ alias })
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`putMemberErr ${err}`)
      return err
    })
}

module.exports = {
  getMembersRoute,
  putMemberAliasRoute,
}
