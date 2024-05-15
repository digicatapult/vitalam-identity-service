import { ApiPromise, WsProvider } from '@polkadot/api'

import { Logger } from 'pino'
import { injectable, singleton } from 'tsyringe'
import { z } from 'zod'

import { Env } from './env.js'
import { logger } from './logger.js'

const listParser = z.array(z.string())

@singleton()
@injectable()
export default class ChainNode {
  private provider: WsProvider
  private api: ApiPromise

  private logger: Logger

  constructor(private env: Env) {
    this.logger = logger.child({ module: 'ChainNode' })
    this.provider = new WsProvider(`ws://${this.env.get('API_HOST')}:${this.env.get('API_PORT')}`)
    this.api = new ApiPromise({ provider: this.provider })

    this.api.isReadyOrError.catch(() => {
      // prevent unhandled promise rejection errors
    })

    this.api.on('disconnected', () => {
      this.logger.warn(`Disconnected from substrate node at ${this.env.get('API_HOST')}:${this.env.get('API_PORT')}`)
    })

    this.api.on('connected', () => {
      this.logger.info(`Connected to substrate node at ${this.env.get('API_HOST')}:${this.env.get('API_PORT')}`)
    })

    this.api.on('error', (err) => {
      this.logger.error(`Error from substrate node connection. Error was ${err.message || JSON.stringify(err)}`)
    })
  }

  async getMembers() {
    await this.api.isReady
    const members = (await this.api.query.membership.members()).toJSON()
    return listParser.parse(members)
  }
}
