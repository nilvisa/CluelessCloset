angular.module('tag', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/tag', {
      templateUrl: 'angular/tag/addTag.html',
      controller: 'CreateTagCtrl',
      resolve: {
        tagData: ['Tags', function(Tags) {
          return Tags.query();
        }]
      }
   });   
}])

.controller('CreateTagCtrl', ['$scope', 'Tags', 'tagData', '$location', function ($scope, Tags, tagData, $location) {
	$scope.tags = tagData;

	$scope.addStarter = function(){
		var newTags = new Tags({
			colors: ['white', 'beige', 'yellow', 'oragne', 'red', 'pink', 'purple', 'navy', 'blue', 'green', 'brown', 'grey', 'black'],
			pattern: ['striped', 'plaid', 'polka-dots', 'floral', 'leopard', 'camo', 'sequin', 'lace'],
			season: ['spring', 'summer', 'winter', 'autumn'],
			occasion: ['fancy', 'party', 'work', 'school', 'casual', 'sport'],
			custom: ['add your own here'],
			owner: $scope.userId
		});

		newTags.$save(function(){
      	$scope.tags.push(newTags);
      })
	}

	$scope.addToArr = function(parent){
		console.log(parent);
		var string = $scope.tags[parent];
		console.log(string);
		if(!string || string.length < 1) return;

		var arr = $scope.tags[0][parent];
		if(arr.indexOf(string) !== -1) return;

		arr.push(string);
		Tags.update({id: $scope.tags[0]._id}, $scope.tags[0]);
		$scope.tags[parent] = "";
	}

  
}])

