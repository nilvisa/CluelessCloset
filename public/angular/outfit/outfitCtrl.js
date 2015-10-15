angular.module('outfit', [])


.controller('CreateOutfitCtrl', ['$scope', 'Users', 'Items', 'Outfits', '$location', function ($scope, Users, Items, Outfits, $location) {
	$scope.items = Items.query();
  	var user_id = "561cd088b360d5b022f3fcbe";
  	$scope.user = Users.get({id: user_id});
  	$scope.outfit = Outfits.query();
  	$scope.blocks = [];

  	if(!$scope.coll) {
  		$scope.coll = [];
  	}
   	
  	$scope.newBlock = function(){
  		var number = $scope.blocks.length+1;
  		$scope.blocks.push(number);
  	}

  	addToCollection = function(arr, number){
  		$scope.coll[number] = arr;
  		console.log($scope.coll);
  	}

  	$scope.findItems = function(){
		$scope.arr = [];
	  	var option = $scope.option;
	  	var items = $scope.items;

	  	for (var i = 0, len = items.length; i < len; i++) {
	  		if(items[i].types.indexOf(option) > -1){
	  			$scope.arr.push(items[i]._id);
	  		}
		}

		addToCollection($scope.arr, $scope.block);
  	}

  	$scope.random = function(){
  		var coll = $scope.coll;
  		$scope.random = [];

		for (var i = 0, len = coll.length; i < len; i++) {
	  		$scope.random.push(coll[i][Math.floor(Math.random() * coll[i].length)]);
		}

		return $scope.random;
  	}

}])


.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
   .when('/outfit', {
      templateUrl: 'angular/outfit/addOutfit.html',
      controller: 'CreateOutfitCtrl'
    })

    .when('/outfit/:id', {
      templateUrl: 'angular/outfit/showOutfit.html',
      controller: 'UpdateOutfitCtrl'
   });
}]);