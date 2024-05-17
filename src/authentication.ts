import type express from 'express'
import type * as jwt from 'jsonwebtoken'

import mkExpressAuthentication, { AuthOptions } from '@digicatapult/tsoa-oauth-express'
import { container } from 'tsyringe'

import { Env } from './env.js'
const env = container.resolve(Env)

const exampleOptions: AuthOptions = {
  verifyOptions: {},
  jwksUri: () => Promise.resolve(`${env.get('IDP_INTERNAL_URL_PREFIX')}${env.get('IDP_JWKS_PATH')}`),
  getAccessToken: (req: express.Request) => Promise.resolve(req.headers['authorization']?.substring('bearer '.length)),
  getScopesFromToken: async (decoded: string | jwt.JwtPayload) => {
    const scopes = ((decoded as jwt.JwtPayload).scopes as string) || ''
    return scopes.split(' ')
  },
  tryRefreshTokens: (_req: express.Request) => Promise.resolve(false),
}

export const expressAuthentication = mkExpressAuthentication(exampleOptions)
