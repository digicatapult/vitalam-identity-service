const { PORT, API_VERSION, API_MAJOR_VERSION } = require('../env')

const apiDoc = {
  openapi: '3.0.3',
  info: {
    title: 'IdentityService',
    version: API_VERSION,
  },
  servers: [
    {
      url: `http://localhost:${PORT}/${API_MAJOR_VERSION}`,
    },
  ],
  components: {
    responses: {
      NotFoundError: {
        description: 'This resource cannot be found',
      },
      BadRequestError: {
        description: 'The request is invalid',
      },
      ConflictError: {
        description: 'This resource already exists',
      },
      UnauthorizedError: {
        description: 'Access token is missing or invalid',
      },
      Error: {
        description: 'An error occurred',
      },
    },
    schemas: {
      Member: {
        type: 'object',
        properties: {
          address: {
            description: 'token of the member',
            type: 'string',
          },
          alias: {
            description: 'alias of the member',
            type: 'string',
          },
        },
        required: ['address', 'alias'],
      },
      Supplier: {
        type: 'object',
        properties: {
          name: {
            description: 'Supplier',
            type: 'string',
          },
          tier: {
            description: 'Tier',
            type: 'string',
          },
          addressLine1: {
            description: 'Address line 1',
            type: 'string',
          },
          addressLine2: {
            description: 'Address line 2',
            type: 'string',
          },
          postcode: {
            description: 'Postcode',
            type: 'string',
          },
          country: {
            description: 'Country',
            type: 'string',
          },
          sc10Certification: {
            description: 'SC 10 Certification',
            type: 'string',
            format: 'binary',
          },
          contactFirstName: {
            description: 'Contact first name',
            type: 'string',
          },
          contactLastName: {
            description: 'Contact last name',
            type: 'string',
          },
          contactEmail: {
            description: 'Contact email',
            type: 'string',
          },
        },
        required: [
          'name',
          'tier',
          'addressLine1',
          'postcode',
          'country',
          'sc10Certification',
          'contactFirstName',
          'contactLastName',
          'contactEmail',
        ],
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {},
}

module.exports = apiDoc
