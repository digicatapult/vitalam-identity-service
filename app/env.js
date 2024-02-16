import envalid from 'envalid'
import dotenv from 'dotenv'

import version from './version.js'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'test/test.env' })
} else {
  dotenv.config({ path: '.env' })
}

const AUTH_ENVS = {
  NONE: {},
  JWT: {
    AUTH_JWKS_URI: envalid.url({ devDefault: 'https://inteli.eu.auth0.com/.well-known/jwks.json' }),
    AUTH_AUDIENCE: envalid.str({ devDefault: 'inteli-dev' }),
    AUTH_ISSUER: envalid.url({ devDefault: 'https://inteli.eu.auth0.com/' }),
  },
}

const { AUTH_TYPE } = envalid.cleanEnv(process.env, {
  AUTH_TYPE: envalid.str({ default: 'NONE', choices: ['NONE', 'JWT', 'EXTERNAL'] }),
})

const vars = envalid.cleanEnv(
  process.env,
  {
    ...AUTH_ENVS[AUTH_TYPE],
    SELF_ADDRESS: envalid.str({ devDefault: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty' }),
    SERVICE_TYPE: envalid.str({ default: 'sqnc-identity-service'.toUpperCase().replace(/-/g, '_') }),
    PORT: envalid.port({ default: 3002 }),
    API_HOST: envalid.host({ devDefault: 'localhost' }),
    API_PORT: envalid.port({ default: 9944 }),
    API_VERSION: envalid.str({ default: version }),
    API_MAJOR_VERSION: envalid.str({ default: 'v1' }),
    LOG_LEVEL: envalid.str({ default: 'info', devDefault: 'debug' }),
    DB_HOST: envalid.host({ devDefault: 'localhost' }),
    DB_PORT: envalid.port({ default: 5432 }),
    DB_NAME: envalid.str({ default: 'sqnc' }),
    DB_USERNAME: envalid.str({ devDefault: 'postgres' }),
    DB_PASSWORD: envalid.str({ devDefault: 'postgres' }),
    API_SWAGGER_BG_COLOR: envalid.str({ default: '#fafafa' }),
    API_SWAGGER_TITLE: envalid.str({ default: 'IdentityAPI' }),
    API_SWAGGER_HEADING: envalid.str({ default: 'IdentityService' }),
  },
  {
    strict: true,
  }
)

export default {
  ...vars,
  AUTH_TYPE,
}
