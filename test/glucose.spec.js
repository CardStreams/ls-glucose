var glucose = require('../lib/glucose.js');

describe("API tests", function() {

  var routes;
  var mock;
  var api;

  beforeEach(function() {

    routes = {
      'getUserList': {
        url: '/users/list',
        method: 'GET'
      },
      'createUser': {
        url: '/user/create/{userName}',
        method: 'POST'
      },
      'dummyMethod': {
        url: '/{1}/{2}/{3}/{4}/{5}',
        method: 'POST'
      },
      'methodWithOptionalParams': {
        url: '/{1}/{2}/{?3}',
        method: 'POST'
      }
    }

    mock = {
      routerCallback: function(url, method, data, callback) {}
    }

    spyOn(mock, 'routerCallback');
    api = glucose.digest(routes, mock.routerCallback);
  })

  it("should call a router callback", function() {
    api.getUserList();
    expect(mock.routerCallback).toHaveBeenCalled();
  });

  it("should pass a simple url to the router callback", function() {
    api.getUserList();
    expect(mock.routerCallback.calls.mostRecent().args[1]).toEqual('/users/list');
  });

  it("should pass null as a first argument if there's no error", function() {
    api.getUserList();
    expect(mock.routerCallback.calls.mostRecent().args[0]).toBeNull();
  });

  it("should pass a method to the router callback", function() {
    api.getUserList();
    expect(mock.routerCallback.calls.mostRecent().args[2]).toEqual('GET');
  });

  it("should pass a callback to the router callback", function() {
    var cb = function(){};
    api.getUserList(cb);
    expect(mock.routerCallback.calls.mostRecent().args[4]).toEqual(cb);
  });

  it("should input parameters into the url", function() {
    api.createUser('wildcard');
    expect(mock.routerCallback.calls.mostRecent().args[1]).toEqual('/user/create/wildcard');
  });

  it("should replace all parameters of the url", function() {
    api.dummyMethod('a', 'b', 'c', 'd', 'e');
    expect(mock.routerCallback.calls.mostRecent().args[1]).toEqual('/a/b/c/d/e');
  });

  it("should correctly pick data object when callback function is not present", function() {
    var postData = {
      foo: 1,
      bar: 2
    }
    api.dummyMethod('a', 'b', 'c', 'd', 'e', postData);
    expect(mock.routerCallback.calls.mostRecent().args[3]).toEqual(postData);
  });

  it("should correctly pick data object when callback function is present", function() {
    var cb = function(){};
    var postData = {
      foo: 1,
      bar: 2
    }
    api.dummyMethod('a', 'b', 'c', 'd', 'e', postData, cb);
    expect(mock.routerCallback.calls.mostRecent().args[3]).toEqual(postData);
  });

  it("should correctly pick callback function when data object is present", function() {
    var cb = function(){};
    var postData = {
      foo: 1,
      bar: 2
    }
    api.dummyMethod('a', 'b', 'c', 'd', 'e', postData, cb);
    expect(mock.routerCallback.calls.mostRecent().args[4]).toEqual(cb);
  });

  it("should correctly pick callback function when data object is not present", function() {
    var cb = function(){};
    var postData = {
      foo: 1,
      bar: 2
    }
    api.dummyMethod('a', 'b', 'c', 'd', 'e', cb);
    expect(mock.routerCallback.calls.mostRecent().args[4]).toEqual(cb);
  });

  it("should pass an error to the router callback when required parameters are not provided", function() {
    api.createUser();
    expect(mock.routerCallback.calls.mostRecent().args[0]).toEqual(jasmine.any(Error));
  });

  it("should replace all optional parameters of the url", function() {
    api.methodWithOptionalParams('a', 'b', 'c');
    expect(mock.routerCallback.calls.mostRecent().args[1]).toEqual('/a/b/c');
  });

  it("should replace not provided optional parameters with empty string", function() {
    api.methodWithOptionalParams('a', 'b');
    expect(mock.routerCallback.calls.mostRecent().args[1]).toEqual('/a/b/');
  });

  it("should not throw an error when optional parameter is missing", function() {
    api.methodWithOptionalParams('a', 'b');
    expect(mock.routerCallback.calls.mostRecent().args[0]).not.toEqual(jasmine.any(Error));
  });

  it("should scope calls and handle them separately", function() {
    api.createUser();
    expect(mock.routerCallback.calls.mostRecent().args[0]).toEqual(jasmine.any(Error));
    api.createUser('wildcard');
    expect(mock.routerCallback.calls.mostRecent().args[1]).toEqual('/user/create/wildcard');
  });

});