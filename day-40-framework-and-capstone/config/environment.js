function required(name) {
  const value = process.env[name];
  if (value === undefined || value === '') {
    throw new Error('Missing ' + name + '. Add your approved value to private .env.');
  }
  return value;
}

function getCredentials() {
  return {
    email: required('MERIDIAN_EMAIL').trim(),
    password: required('MERIDIAN_PASSWORD')
  };
}

function getOwnedPolicy() {
  const number = required('MERIDIAN_POLICY_NUMBER').trim();
  if (!/^POL-[A-Z0-9]+$/.test(number)) {
    throw new Error('MERIDIAN_POLICY_NUMBER must be an owned POL- identifier.');
  }
  return { number };
}

module.exports = { getCredentials, getOwnedPolicy };
