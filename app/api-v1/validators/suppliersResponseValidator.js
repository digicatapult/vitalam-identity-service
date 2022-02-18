const OpenAPIResponseValidator = require('openapi-response-validator').default

const apiDocResponses = require('../api-doc-responses')
const apiDoc = require('../api-doc')

const suppliersResponses = {
  200: {
    description: 'Get suppliers',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: apiDoc.components.schemas.Supplier,
        },
      },
    },
  },
  default: apiDocResponses.default,
}

const validateSuppliersResponse = (statusCode, result) => {
  const responseValidator = new OpenAPIResponseValidator({ responses: suppliersResponses })

  return responseValidator.validateResponse(statusCode, result)
}

module.exports = {
  suppliersResponses,
  validateSuppliersResponse,
}
