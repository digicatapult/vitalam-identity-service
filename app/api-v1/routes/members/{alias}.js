const {
  memberAddressResponses,
  validateMemberAddressResponse,
} = require('../../validators/validateMemberAddressResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const { alias } = req.params
      const { memberAddress } = await apiService.getMemberByAlias(alias)

      const validationErrors = validateMemberAddressResponse(400, { memberAddress })

      if (validationErrors) {
        res.status(statusCode).json(validationErrors)
        return
      } else {
        res.status(statusCode).json(result)
        return
      }
    },
  }

  doc.GET.apiDoc = {
    summary: 'Get member address by alias',
    responses: membersResponses,
    security: [{ bearerAuth: [] }],
    tags: ['members'],
  }

  return doc
}
