const capitalize = (str) =>
  str.replace(str.charAt(0), str.charAt(0).toUpperCase())

function getModelNameFromURL(baseUrl) {
  return capitalize(baseUrl.replace('/api/', ''))
}

module.exports = {
  capitalize,
  getModelNameFromURL,
}
