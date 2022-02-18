const logger = require('../../logger')
const { suppliersResponses, validateSuppliersResponse } = require('../validators/suppliersResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      try {
        const result = await apiService.findSuppliers()

        const validationErrors = validateSuppliersResponse(400, result)

        if (validationErrors) {
          res.status(400).json(validationErrors)
          return
        } else {
          res.status(200).json(result)
          return
        }
      } catch (err) {
        logger.error(`Error getting suppliers. Error was ${err.message || JSON.stringify(err)}`)
        if (!res.headersSent) {
          res.status(500).send(`Error getting suppliers`)
          return
        }
      }
    },
  }

  doc.GET.apiDoc = {
    summary: 'Get suppliers',
    responses: suppliersResponses,
    security: [{ bearerAuth: [] }],
    tags: ['suppliers'],
  }

  return doc
}
