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
    controller: 'ShowItemCtrl',
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
   }) 

  .when('/item/edit/:id', {
    templateUrl: 'angular/item/tagItem.html',
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

.controller('CreateItemCtrl', ['$scope', 'multipartForm', 'Items', 'itemsData', '$location',
function ($scope, multipartForm, Items, itemsData, $location) {
  $scope.items = itemsData;
  $scope.newItem = {};

  $scope.Submit = function(){
    var item = new Items({
      img: $scope.newItem.img.name,
      tags: [],
      types: [],
      owner: $scope.userId});

      item.$save(function(){
        var uploadUrl = '/items/upload/'+item._id;
        multipartForm.post(uploadUrl, $scope.newItem);
        $location.path('/item/edit/'+item._id);
      });

      // $scope.items.push(item);
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
		Items.update({id: $scope.item._id}, {tags: $scope.item.tags, types: $scope.item.types});
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

}])

.controller('ShowItemCtrl', ['$scope', '$routeParams', 'Items', 'itemsData', 'Outfits', 'typesData', 'tagsData', '$location', 'getItem', 
function ($scope, $routeParams, Items, itemsData, Outfits, typesData, tagsData, $location, getItem) {
  $scope.items = itemsData;
  $scope.item = getItem;
  $scope.outfits = Outfits.query();
  $scope.types = typesData;
  $scope.tags = tagsData;

  }]);