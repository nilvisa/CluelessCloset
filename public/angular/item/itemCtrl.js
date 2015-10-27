angular.module('item', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/item', {
      templateUrl: 'angular/item/addItem.html',
      controller: 'CreateItemCtrl',
      resolve: {
        itemsData: ['Items', function(Items) {
          return Items.query();
        }]
      }
   })

  .when('/item/:id', {
    templateUrl: 'angular/item/showItem.html',
    controller: 'UpdateItemCtrl',
    resolve: {
      itemsData: ['Items', function(Items) {
        return Items.query();
      }],
      getItem: ['$route', 'Items', function($route, Items) {
        var id = $route.current.params.id;
        return Items.get({id: id});
      }],
      typesData: ['Types', function(Types) {
        return Types.query();
      }],
      tagsData: ['Tags', function(Tags) {
        return Tags.query();
      }]
    }
   });   
}])

.controller('CreateItemCtrl', ['$scope', 'Items', 'itemsData', '$location',
 function ($scope, Items, itemsData, $location) {
  $scope.items = itemsData;
  
  $scope.save = function(){
    if(!$scope.img || $scope.img.length < 1) return;
      var item = new Items({
      	img: $scope.img,
      	tags: [],
      	types: [],
      	owner: $scope.userId});

      item.$save(function(){
      	$scope.items.push(item);
      	$location.path('/item/'+item._id);
      })
  }
}])

.controller('UpdateItemCtrl', ['$scope', '$routeParams', 'Items', 'itemsData', 'Outfits', 'typesData', 'tagsData', '$location', 'getItem', 
function ($scope, $routeParams, Items, itemsData, Outfits, typesData, tagsData, $location, getItem) {
	$scope.items = itemsData;
  $scope.item = getItem;
  $scope.outfits = Outfits.query();
  $scope.types = typesData;
  $scope.tags = tagsData;


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

  $scope.remove = function(){
    for (var i = 0, len = $scope.outfits.length; i < len; i++) {
      var outfit = $scope.outfits[i];
      if(outfit.items.indexOf($scope.item._id) !== -1){
        outfit.items.splice($scope.item._id, 1);
        Outfits.update({id: outfit._id}, outfit);
      }
    }
    Items.remove({id: $scope.item._id});
    $location.path('/item');
  }

}]);