var utils = require('../lib/utils.js');

describe("isFunction", function() {

  var isFunction = utils.isFunction;

  it("should return false for string", function() {
    var result = isFunction("test string");
    expect(result).toBe(false);
  });

  it("should return false for object", function() {
    var result = isFunction({foo: 1, bar: 2});
    expect(result).toBe(false);
  });

  it("should return true for function", function() {
    var result = isFunction(function(){});
    expect(result).toBe(true);
  });

});

describe("isObject", function() {

  var isObject = utils.isObject;

  it("should return false for string", function() {
    var result = isObject("test string");
    expect(result).toBe(false);
  });

  it("should return true for object", function() {
    var result = isObject({foo: 1, bar: 2});
    expect(result).toBe(true);
  });

  it("should return false for null", function() {
    var result = isObject(null);
    expect(result).toBe(false);
  });

  it("should return false for undefined", function() {
    var result = isObject(undefined);
    expect(result).toBe(false);
  });

});