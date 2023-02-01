const dirtyToken = require('./token.json');
let fs = require('fs');


const clearToken = (token) => {
  const newToken = {};
  Object.entries(token).forEach(([key, value]) => {
    if (value.value) {
      newToken[key] = value.value;
    } else {
      newToken[key] = clearToken(value);
    }
  });
  return newToken;
}

const getValueFromObject = (object, variable) => {
  if (typeof object === 'undefined') {
    return object;
  }
  const positonPoint = variable.indexOf(".");
  if (positonPoint > -1) {
    return getValueFromObject(
      object[variable.substring(0, positonPoint)],
      variable.substring(positonPoint + 1)
    );
  }
  return object[variable];
}


const getValue = (tokens, value) => {
  if (!/^{.+}$/.test(value)) {
    return value;
  }
  const variable = value.replace(/(\{|\})/g, '');
  return getValueFromObject(tokens, variable)
}

const replaceVariables = (tokenOriginal, copyToken) => {
  Object.entries(copyToken).forEach(([key, value]) => {
    if (typeof value === 'object') {
      replaceVariables(tokenOriginal, value);
    } else {
      copyToken[key] = getValue(tokenOriginal, value);
    }
  });
};


let tokens = clearToken(dirtyToken.Global);
replaceVariables(tokens, tokens);

fs.writeFile(
  './script/clear-token.json',
  JSON.stringify(tokens),
  'utf-8',
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`clear token: success`)
    }
  });



