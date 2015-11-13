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

    .when('/items', {
      templateUrl: 'angular/item/browseItems.html',
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
      owner: $scope.userId,
      created: new Date()});
    console.log($scope.newItem.img);

    item.$save(function(){
      var uploadUrl = '/items/upload/'+item._id;
      multipartForm.post(uploadUrl, $scope.newItem);
      $location.path('/item/edit/'+item._id);
    });
  }

}])

.controller('UpdateItemCtrl', ['$scope', '$routeParams', 'Items', 'itemsData', 'Outfits', 'typesData', 'tagsData', '$location', 'getItem', 'Types', 'Tags', 'Closets', 
function ($scope, $routeParams, Items, itemsData, Outfits, typesData, tagsData, $location, getItem, Types, Tags, Closets) {
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
	}

  $scope.addToArr = function(where, parent){
    $scope[where][0][parent].push($scope[where][parent]);
    if(where === 'types'){
      Types.update({id: $scope.types[0]._id}, $scope.types[0]);
    } else {
      Tags.update({id: $scope.tags[0]._id}, $scope.tags[0]);
    }
    $scope[where][parent] = "";
  }

  $scope.changeMind = function(itemID){
    var index = $scope.item.missmatch.indexOf(itemID);
    $scope.item.missmatch.splice(index, 1);
    Items.update({id: $scope.item._id}, $scope.item);

    angular.forEach($scope.items, function(item){
      if(item._id === itemID) {
        var index = item.missmatch.indexOf(itemID);
        item.missmatch.splice(index, 1);
        Items.update({id: item._id}, item);
      }
    })
  }

  $scope.remove = function(){
    angular.forEach($scope.outfits, function(outfit){
      if(outfit.items.indexOf($scope.item._id) !== -1){
        var index = outfit.items.indexOf($scope.item._id)
        outfit.items.splice(index, 1);
        Outfits.update({id: outfit._id}, outfit);
      }
    });

    angular.forEach($scope.items, function(item){
      if(item.missmatch.indexOf($scope.item._id) !== -1){
        var index = item.missmatch.indexOf($scope.item._id);
        item.missmatch.splice(index, 1);
        Items.update({id: item._id}, item);
      }
    });

     angular.forEach($scope.closets, function(closet){
      if(closet.items.indexOf($scope.item._id) !== -1){
        var index = closet.items.indexOf($scope.item._id);
        closet.items.splice(index, 1);
        Closets.update({id: closet._id}, closet);
      }
    });

    Items.remove({id: $scope.item._id});
    $location.path('/items');
  }

}]);