import 'reflect-metadata'

import { Express } from 'express'
import { container } from 'tsyringe'

import { Env } from './env.js'
import Server from './server.js'

import { logger } from './logger.js'

const app: Express = await Server()
const env = container.resolve(Env)

app.listen(env.get('PORT'), () => {
  logger.info(`sqnc-identity-service listening on ${env.get('PORT')} port`)
})
