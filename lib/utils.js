function isObject(candidate) {
  return typeof candidate === 'object' && candidate !== null;
}

function isFunction(candidate) {
  return typeof candidate === 'function';
}

module.exports.isObject = isObject;
module.exports.isFunction = isFunction;