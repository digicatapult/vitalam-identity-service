import { Controller, Get, Hidden, Route, SuccessResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { logger } from '../logger.js'
import { version } from '../version.js'

type Health = {
  version: string
  status: 'ok'
}

@Route('health')
@injectable()
export class HealthController extends Controller {
  constructor() {
    super()
  }

  @SuccessResponse(200)
  @Hidden()
  @Get('/')
  public async get(): Promise<Health> {
    logger.debug({ msg: 'new request received', controller: '/health' })

    return { version, status: 'ok' }
  }
}
