angular.module('CC', ['ngRoute', 'ngResource', 'user', 'item', 'outfit', 'closet'])

    //---------------
    // Services
    //---------------

    .factory('Users', ['$resource', function($resource){
      return $resource('/users/:id', null, {
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'query': {method: 'GET', isArray: true},
        'remove': {method: 'DELETE'},
        'delete': {method: 'DELETE'},
        'update': {method: 'PUT'}
      });
    }])

    .factory('Items', ['$resource', function($resource){
      return $resource('/items/:id', null, {
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'query': {method: 'GET', isArray: true},
        'remove': {method: 'DELETE'},
        'delete': {method: 'DELETE'},
        'update': {method: 'PUT'}
      });
    }])

    .factory('Outfits', ['$resource', function($resource){
      return $resource('/outfits/:id', null, {
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'query': {method: 'GET', isArray: true},
        'remove': {method: 'DELETE'},
        'delete': {method: 'DELETE'},
        'update': {method: 'PUT'}
      });
    }])

    .factory('Closets', ['$resource', function($resource){
      return $resource('/closets/:id', null, {
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'query': {method: 'GET', isArray: true},
        'remove': {method: 'DELETE'},
        'delete': {method: 'DELETE'},
        'update': {method: 'PUT'}
      });
    }])
  
    //---------------
    // Routes
    //---------------

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'angular/start.html'
        })
    }])

    .config(['$resourceProvider', function($resourceProvider) {
      $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);