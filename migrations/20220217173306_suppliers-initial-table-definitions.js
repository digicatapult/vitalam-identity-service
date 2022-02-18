exports.up = async (knex) => {
  // check extension is not installed
  const [extInstalled] = await knex('pg_extension').select('*').where({ extname: 'uuid-ossp' })

  if (!extInstalled) {
    await knex.raw('CREATE EXTENSION "uuid-ossp"')
  }

  const uuidGenerateV4 = () => knex.raw('uuid_generate_v4()')
  const now = () => knex.fn.now()

  await knex.schema.createTable('suppliers', (def) => {
    def.uuid('id').defaultTo(uuidGenerateV4())
    def.string('name', 50).unique().notNullable()
    def.string('tier', 50).notNullable()
    def.string('address_line_1', 50).notNullable()
    def.string('address_line_2', 50).nullable()
    def.string('postcode', 50).notNullable()
    def.string('country', 50).notNullable()
    def.binary('sc10_certification').notNullable()
    def.string('contact_first_name', 50).notNullable()
    def.string('contact_last_name', 50).notNullable()
    def.string('contact_email', 50).notNullable()
    def.datetime('created_at').notNullable().default(now())
    def.datetime('updated_at').notNullable().default(now())

    def.primary(['id'])
    def.index(['name'])
    def.index(['tier'])
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('suppliers')
  await knex.raw('DROP EXTENSION "uuid-ossp"')
}
