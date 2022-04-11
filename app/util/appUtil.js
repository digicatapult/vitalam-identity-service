const { ApiPromise, WsProvider } = require('@polkadot/api')
const types = require('@digicatapult/dscp-node')

const { API_HOST, API_PORT } = require('../env')
const logger = require('../logger')
const { getMemberAliasesDb } = require('../db')

const provider = new WsProvider(`ws://${API_HOST}:${API_PORT}`)
const apiOptions = {
  provider,
  types,
}

const api = new ApiPromise(apiOptions)

api.on('disconnected', () => {
  logger.warn(`Disconnected from substrate node at ${API_HOST}:${API_PORT}`)
})

api.on('connected', () => {
  logger.info(`Connected to substrate node at ${API_HOST}:${API_PORT}`)
})

api.on('error', (err) => {
  logger.error(`Error from substrate node connection. Error was ${err.message || JSON.stringify(err)}`)
})

async function membershipReducer(members) {
  members = members.toJSON() || []

  const memberAliases = await getMemberAliasesDb(members)

  return members.reduce((acc, item) => {
    const memberAlias = memberAliases.find(({ address }) => address === item) || null

    acc.push({ address: item, alias: memberAlias ? memberAlias[0].alias : memberAlias })

    return acc
  }, [])
}

async function getMembers() {
  await api.isReady

  return api.query.membership.members()
}

const utf8ToUint8Array = (str, len) => {
  const arr = new Uint8Array(len)
  try {
    arr.set(Buffer.from(str, 'utf8'))
  } catch (err) {
    if (err instanceof RangeError) {
      throw new Error(`${str} is too long. Max length: ${len} bytes`)
    } else throw err
  }
  return arr
}

module.exports = {
  getMembers,
  membershipReducer,
  utf8ToUint8Array,
}
