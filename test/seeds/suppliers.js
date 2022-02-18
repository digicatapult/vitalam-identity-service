const fs = require('fs')

const { client } = require('../../app/db')
const { getSuppliers } = require('../data/files/suppliers')

const cleanup = async () => {
  await client('suppliers').del()
}

const seed = async () => {
  const scFile01 = fs.readFileSync('./test/data/files/sc-10-certification-01.pdf').toString('hex')

  const suppliers = getSuppliers()
  suppliers[0].sc10_certification = scFile01

  await client('suppliers').insert(suppliers)
}

module.exports = {
  cleanup,
  seed,
}
