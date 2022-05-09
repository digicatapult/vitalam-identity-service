const {
  memberAddressResponses,
  validateMemberAddressResponse,
} = require('../../validators/MemberAddressResponseValidator')

module.exports = function (apiService) {
  const doc = {
    GET: async function (req, res) {
      const { alias } = req.params
      const result = await apiService.getMembersByAlias(alias)

      const validationErrors = validateMemberAddressResponse(400, result)

      if (validationErrors) {
        res.status(400).json(validationErrors)
        return
      } else {
        res.status(200).json(result)
        return
      }
    },
  }

  doc.GET.apiDoc = {
    summary: 'Get member address by alias',
    responses: memberAddressResponses,
    security: [{ bearerAuth: [] }],
    tags: ['members'],
  }

  return doc
}
