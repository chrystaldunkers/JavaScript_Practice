const { randomUUID } = require('node:crypto');

function createDriver(overrides = {}) {
  const id = randomUUID();
  return {
    name: 'Day 39 QA ' + id.slice(0, 8),
    email: 'day39.' + id + '@example.com',
    age: '35',
    yearsLicensed: '10',
    licenseState: 'TX — Texas',
    creditTier: 'Good',
    accidents: '0',
    violations: '0',
    ...overrides
  };
}

module.exports = { createDriver };
