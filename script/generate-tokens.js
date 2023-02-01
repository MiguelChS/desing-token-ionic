let tokens = require('./clear-token.json');
let fs = require('fs');

const generateTokens = (tokens) => {
  let textScss = `(`
  Object.entries(tokens).forEach(([key, value], index, list) => {
    if (typeof value === 'object') {
      textScss += `${key.replace(/\$/g, '')}: ${generateTokens(value)}`
    } else {
      textScss += `${key.replace(/\$/g, '')}: ${value}`
    }
    if (index !== list.length - 1) {
      textScss += ','
    }
  })
  textScss += ')';
  return textScss;
}

fs.writeFile(
  './src/theme/token.scss',
  `$tokens: ${generateTokens(tokens)};`,
  'utf-8',
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`tokens: success`)
    }
  });

