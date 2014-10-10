var utils = require('./utils.js');

var parameterRegexp = /\{([\s\S]+?)\}/g;

function isRequired(parameter) {
  return parameter.charAt(1) !== "?";
}

function digest(routesObj, routerCallback) {

  var apiHelpers = {};
  var value;

  for (var endpointName in routesObj) {

    (function() {

      var endpointDetails = routesObj[endpointName];
      var params = endpointDetails.url.match(parameterRegexp);

      apiHelpers[endpointName] = function() {
        var url = endpointDetails.url;
        var method = endpointDetails.method;
        var data;
        var callback;
        var args = arguments;
        var isValid = true;
        var missing = [];
        var errorMessage;

        if (utils.isFunction(args[args.length - 1])) {
          callback = Array.prototype.pop.call(arguments);
        }

        if (utils.isObject(args[args.length - 1])) {
          data = Array.prototype.pop.call(arguments);
        }

        if (params) params.forEach(function(parameter, i) {
          var parameterValue = args[i];
          if (isRequired(parameter) && parameterValue === undefined) {
            missing.push(parameter);
            isValid = false;
          }
          url = url.replace(parameter, args[i] || '');

        });

        if (isValid) {
          routerCallback(null, url, method, data, callback);
        } else {
          errorMessage = new Error('Missing parameters: ' + missing.join(",") + '. Correct syntax is: ' + endpointDetails.url);
          routerCallback(errorMessage);
        }

      };

    })();

  }

  return apiHelpers;

}

module.exports.digest = digest;