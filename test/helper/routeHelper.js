/* eslint no-console: "off" */
import request from 'supertest'

import env from '../../app/env.js'

const { API_MAJOR_VERSION } = env

export async function apiDocs({ app }) {
  return request(app)
    .get(`/api-docs`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`apiDocs ${err}`)
      return err
    })
}

export async function healthCheck({ app }) {
  return request(app)
    .get('/health')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`healthCheckErr ${err}`)
      return err
    })
}

export async function getMembersRoute({ app }) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/members`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getMembersErr ${err}`)
      return err
    })
}

export async function getMemberByAliasOrAddressRoute({ app }, aliasOrAddress) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/members/${aliasOrAddress}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getMembersErr ${err}`)
      return err
    })
}

export async function putMemberAliasRoute({ app }, address, { alias }) {
  return request(app)
    .put(`/${API_MAJOR_VERSION}/members/${address}`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ alias })
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`putMemberErr ${err}`)
      return err
    })
}

export async function getSelfAddress({ app }) {
  return request(app)
    .get(`/${API_MAJOR_VERSION}/self`)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.error(`getSelfAddressError: ${err}`)
      return err
    })
}
