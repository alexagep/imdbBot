require('dotenv').config()

/**
 * @function env
 * @description gets environment variable's value
 * @param {string} name - environment variable key title
 * @return {string} environment variable value
 */
module.exports = (name) => {
  const value = process.env[name]

  if (value) return value

  throw new Error(`ENV[${name}] DOES NOT EXIST IN ENV FILE`)
}
