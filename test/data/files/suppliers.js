const getSuppliers = () => {
  return [
    {
      name: 'Maher',
      tier: 'T1',
      address_line_1: '101 Euston Road',
      address_line_2: 'London',
      postcode: 'NW1 2RA',
      country: 'United Kingdom',
      sc10_certification: null,
      contact_first_name: 'Default',
      contact_last_name: 'Supplier',
      contact_email: 'default.supplier@digicatapult.org.uk',
    },
  ]
}

module.exports = {
  getSuppliers,
}
