angular.module('CC', ['ngRoute', 'ngResource', 'item', 'type', 'tag',])

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

.factory('Types', ['$resource', function($resource){
  return $resource('/types/:id', null, {
    'get': {method: 'GET'},
    'save': {method: 'POST'},
    'query': {method: 'GET', isArray: true},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'},
    'update': {method: 'PUT'}
  });
}])

.factory('Tags', ['$resource', function($resource){
  return $resource('/tags/:id', null, {
    'get': {method: 'GET'},
    'save': {method: 'POST'},
    'query': {method: 'GET', isArray: true},
    'remove': {method: 'DELETE'},
    'delete': {method: 'DELETE'},
    'update': {method: 'PUT'}
  });
}])


.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'angular/start.html'
    })
}])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/_=_', {
      templateUrl: 'angular/start.html'
    })
}])


.config(['$resourceProvider', function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
}])