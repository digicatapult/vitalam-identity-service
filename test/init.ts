import 'reflect-metadata'

import { register } from 'prom-client'

beforeEach(function () {
  register.clear()
})
