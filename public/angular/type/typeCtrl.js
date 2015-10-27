angular.module('type', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/type', {
      templateUrl: 'angular/type/addType.html',
      controller: 'CreateTypeCtrl',
      resolve: {
        tagData: ['Types', function(Types) {
          return Types.query();
        }]
      }
   });   
}])

.controller('CreateTypeCtrl', ['$scope', 'Types', 'tagData', '$location', function ($scope, Types, tagData, $location) {
	$scope.types = tagData;

	$scope.addStarter = function(){
		var newTypes = new Types({
			top: ['tank', 't-shirt', 'blouse', 'shirt', 'jumper', 'sweater', 'cardigan', 'kimono', 'jacket', 'blazer', 'waistcoat', 'dress', 'tunic'],
			bottom: ['jeans', 'trousers', 'leggings', 'tights', 'shorts', 'skirt'],
			shoes: ['sneakers', 'boots', 'heels', 'flats', 'sandals'],
			accessories: ['hat', 'scarf', 'necklace', 'bracelet', 'watch', 'earrings', 'purse'],
			custom: ['add your own here'],
			owner: $scope.userId
		});

		newTypes.$save(function(){
      	$scope.types.push(newTypes);
      })
	}

	$scope.addToArr = function(parent){
		console.log(parent);
		var string = $scope.types[parent];
		console.log(string);
		if(!string || string.length < 1) return;

		var arr = $scope.types[0][parent];
		if(arr.indexOf(string) !== -1) return;

		arr.push(string);
		Types.update({id: $scope.types[0]._id}, $scope.types[0]);
		$scope.types[parent] = "";
	}

  
}])

