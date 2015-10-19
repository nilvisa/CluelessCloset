angular.module('item', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/item', {
      templateUrl: 'angular/item/addItem.html',
      controller: 'CreateItemCtrl',
      resolve: {
        getUser: ['$route', 'Users', function($route, Users) {
          var id = "561cd088b360d5b022f3fcbe";
          return Users.get({id: id});
        }],
        itemsData: ['Items', function(Items) {
          return Items.query();
        }]
      }
   })

  .when('/item/:id', {
    templateUrl: 'angular/item/showItem.html',
    controller: 'UpdateItemCtrl',
    resolve: {
      getUser: ['$route', 'Users', function($route, Users) {
        var id = "561cd088b360d5b022f3fcbe";
        return Users.get({id: id});
      }],
      itemsData: ['Items', function(Items) {
        return Items.query();
      }],
      getItem: ['$route', 'Items', function($route, Items) {
        var id = $route.current.params.id;
        return Items.get({id: id});
      }],
    }
   });   
}])

.controller('CreateItemCtrl', ['$scope', 'Items', 'itemsData', 'getUser', '$location', function ($scope, Items, itemsData, getUser, $location) {
  $scope.items = itemsData;
  $scope.user = getUser;

  $scope.save = function(){
    if(!$scope.img || $scope.img.length < 1) return;
      var item = new Items({
      	img: $scope.img,
      	tags: [],
      	types: [],
      	owner: $scope.user._id});

      item.$save(function(){
      	$scope.items.push(item);
      	$location.path('/item/'+item._id);
      })
  }
}])

.controller('UpdateItemCtrl', ['$scope', 'Items', '$routeParams', 'Users', 'getUser', 'itemsData', 'Outfits', '$location', 'getItem', 
function ($scope, Items, $routeParams, Users, getUser, itemsData, Outfits, $location, getItem) {
  $scope.user = getUser;
	$scope.items = itemsData;
  $scope.item = getItem;
  $scope.outfits = Outfits.query();

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
    console.log($scope.item);
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

  $scope.updateArr = function(where){
    var string = $scope[where];
    if(!string || string.length < 1) return;

    var arr = $scope.user[where];
    if(arr.indexOf(string) != -1) return;

    $scope.user[where].push(string);
    Users.update({id: $scope.user._id}, $scope.user);
    $scope[where] = "";
  }

  $scope.remove = function(){
    for (var i = 0, len = $scope.outfits.length; i < len; i++) {
      var outfit = $scope.outfits[i];
      if(outfit.items.indexOf($scope.item._id) != -1){
        outfit.items.splice($scope.item._id, 1);
        Outfits.update({id: outfit._id}, outfit);
      }
    }
    Items.remove({id: $scope.item._id});
    $location.path('/item');
  }

}]);