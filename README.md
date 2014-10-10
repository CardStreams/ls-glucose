# glucose

glucose is an API generator.

it will digest your API blueprint provided in the following format:

    {
      'getPost': {
        url: '/post/{id}',
        method: 'GET'
      },

      'createPost': {
        url: '/post',
        method: 'POST'
      }
    }

and return object with generated 'sugar' methods: `getPost`, `createPost`. few examples:

    'getPost': {
      url: '/post/{id}',
      method: 'GET'
    },

 -> `api.getPost(requiredParameter, callback);`

    'createPost': {
      url: '/post/',
      method: 'POST'
    },

 -> `api.createPost(postData, callback);`

    'getUser': {
      url: '/user/{?id}',
      method: 'GET'
    },

 -> `api.getUser(optionalParameter, callback);`

# features

 - transforms url templates into api method arguments
 - validates parameters passed to generated api methods
 - provides meaningful errors about missing parameters
 - supports optional parameters

## install

    npm install ls-glucose

## dev build

    npm install ls-glucose
    cd ls-glucose
    npm run-script install-dev # depending on your config may ask for sudo

## test

jasmine & istanbul are used for testing

    npm test # --coverage for coverage report


## example usage

    var glucose = require('ls-glucose');

    var apiConfig = {

    'getPosts': {
      url: '/posts',
      method: 'GET'
    },

    'getPost': {
      url: '/post/{id}',
      method: 'GET'
    },

    'createPost': {
      url: '/post',
      method: 'POST'
    }

    }

    function apiRouter(error, url, method, data, callback) {

      // make HTTP request

    }

    var api = glucose.digest(apiConfig, apiRouter);

    api.getPosts(function(error, response){
      if (!error) console.log(response);
    });

    api.getPost(123, function(error, response){
      if (!error) console.log(response);
    });

    api.createPost({
      title: 'post title',
      body: 'lorem ipsum'
    }, function(error, response){
      console.log(response);
    });

## license

MIT