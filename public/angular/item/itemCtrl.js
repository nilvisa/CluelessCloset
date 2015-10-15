angular.module('item', [])


.controller('CreateItemCtrl', ['$scope', 'Items', 'Users', '$location', function ($scope, Items, Users, $location) {
  $scope.items = Items.query();
  var user_id = "561cd088b360d5b022f3fcbe";
  $scope.user = Users.get({id: user_id});

  $scope.save = function(){
    if(!$scope.img || $scope.img.length < 1) return;
      var item = new Items({
      	img: $scope.img,
      	tags: [],
      	types: [],
      	owner: user_id});

      item.$save(function(){
      	$scope.items.push(item);
      	$location.path('/item/'+item._id);
      })
  }
}])

.controller('UpdateItemCtrl', ['$scope', '$routeParams', 'Users', 'Items', '$location', function ($scope, $routeParams, Users, Items, $location) {
	$scope.items = Items.query();
	var user_id = "561cd088b360d5b022f3fcbe";
	$scope.user = Users.get({id: user_id});
	$scope.item = Items.get({id: $routeParams.id});


	// $scope.inTypesArray = function(string){

	// 	var arr = $scope.item.types;
		
	// 	if (arr.indexOf(string) == -1){
	// 		return false	
	// 	} else {
	// 		return true;
	// 	}
	// }

	$scope.inArray = function(where, string){

		var arr = $scope.item[where];
		
		if (arr.indexOf(string) == -1){
			return false	
		} else {
			return true;
		}
	}

	$scope.push = function(where, string){
	  	$scope.item[where].push(string);
  	}

  	$scope.splice = function(where, string){
  		var arr = $scope.item[where];
  		var index = arr.indexOf(string);
  		$scope.item[where].splice(index, 1);
  	}

  	$scope.save = function(){
  		Items.update({id: $scope.item._id}, $scope.item);
      	$location.path('/item');
  	}

}])





.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/item', {
      templateUrl: 'angular/item/addItem.html',
      controller: 'CreateItemCtrl',
   })

    .when('/item/:id', {
      templateUrl: 'angular/item/showItem.html',
      controller: 'UpdateItemCtrl'
   });   
}]);