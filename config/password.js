const crypto = require(`crypto`);

function generatePass(password) {
  const salt = crypto.randomBytes(32).toString(`hex`);
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, `sha512`)
    .toString(`hex`);

  return {
    salt,
    hash,
  };
}

async function validatePassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, `sha512`)
    .toString(`hex`);
  return hash === hashVerify;
}

module.exports = { generatePass, validatePassword };
