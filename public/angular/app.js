angular.module('CC', ['ngRoute', 'ngResource', 'item', 'outfit', 'closet', 'type', 'tag'])

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

.service('multipartForm', ['$http', function($http){
  this.post = function(uploadUrl, data){
    var fd = new FormData();
    for(var key in data)
      fd.append(key, data[key]); 
    $http.post(uploadUrl, fd, {
      transformRequest: angular.indentity,
      headers: {'Content-Type': undefined}
    })
  }
}])

.directive('fileModel', ['$parse', function ($parse) {
     return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function(){   
          scope.$apply(function(){
            modelSetter(scope, element[0].files[0]);                         
          });
        });
      }
    };
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