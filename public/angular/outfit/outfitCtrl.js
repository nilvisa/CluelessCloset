angular.module('outfit', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
   .when('/outfit', {
      templateUrl: 'angular/outfit/addOutfit.html',
      controller: 'CreateOutfitCtrl',
    })

    .when('/outfit/:id', {
      templateUrl: 'angular/outfit/showOutfit.html',
      controller: 'UpdateOutfitCtrl',
      resolve: {
        getUser: ['$route', 'Users', function($route, Users) {
          var userid = "561cd088b360d5b022f3fcbe";
          return Users.get({id: userid});
        }],
        itemsData: ['Items', function(Items) {
          return Items.query({owner: "561cd088b360d5b022f3fcbe"});
        }],
        getOutfit: ['$route', 'Outfits', function($route, Outfits) {
          var id = $route.current.params.id;
          return Outfits.get({id: id});
        }]
      }
   });
}])

.controller('CreateOutfitCtrl', ['$scope', 'Users', 'Items', 'Outfits', '$location', 
  function ($scope, Users, Items, Outfits, $location) {
  	var userid = "561cd088b360d5b022f3fcbe";
    $scope.user = Users.get({id: userid});
    $scope.outfits = Outfits.query({owner: $scope.user});
    $scope.blocks = [];

    $scope.items = Items.query({owner: $scope.user}, function (items) {
      var itemMap = _.indexBy(items, '_id');
      $scope.missMatch = function() {
        var realItems = _.map($scope.random, function(id) {
          return itemMap[id];
        });
  
        angular.forEach(realItems, function(item){
          angular.forEach($scope.clicked, function(click){
            if(item._id !== click){
              item.missmatch.push(click);
            }
          });
          Items.update({id: item._id}, item);
        });      
      }
      
    });
 
    if(!$scope.coll) {
      $scope.coll = [];
    }

    if(!$scope.clicked) {
      $scope.clicked = [];
    }
   	
  	$scope.newBlock = function(){
  		var number = $scope.blocks.length+1;
  		$scope.blocks.push(number);
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

  		$scope.coll[$scope.block] = $scope.arr;
  	}

  	$scope.randomize = function(){
  		$scope.random = [];
      $scope.outfitItems = [];

  		for (var i = 1, len = $scope.coll.length; i < len; i++) {
          var blockArr = $scope.coll[i];
          var randItem = blockArr[Math.floor(Math.random() * blockArr.length)];
  	  		$scope.random.push(randItem);
  		}

      for (var i = 0, len = $scope.random.length; i < len; i++) {
          var item = Items.get({id: $scope.random[i]});
          $scope.outfitItems.push(item);
      }
      
  	}

    $scope.clicking = function(index){
      var item = $scope.outfitItems[index];
      
      if($scope.clicked.indexOf(item._id) == -1){
        $scope.clicked.push(item._id);
      } else {
        var index = $scope.clicked.indexOf(item._id);
        $scope.clicked.splice(index, 1);
      }

      console.log($scope.clicked);
    }


    $scope.saveOutfit = function(){
      var outfit = new Outfits({items: $scope.random, owner: $scope.user._id});

      outfit.$save(function(){
        $scope.outfits.push(outfit);
        $scope.outfitItems = [];
      });
    }

}])

.controller('UpdateOutfitCtrl', ['$scope', 'Users', 'getUser', 'Items', 'itemsData', 'Outfits', 'getOutfit', '$location', 
  function ($scope, Users, getUser, Items, itemsData, Outfits, getOutfit, $location) {
    $scope.user = getUser;
    $scope.outfit = getOutfit;
    $scope.items = itemsData;


    $scope.inArray = function(where, string){
      var arr = $scope.outfit[where];
      
      if (arr.indexOf(string) == -1){
        return false  
      } else {
        return true;
      }
    }

    $scope.push = function(where, string){
      $scope.outfit[where].push(string);
      console.log($scope.outfit);
    }

    $scope.splice = function(where, string){
    var arr = $scope.outfit[where];
    var index = arr.indexOf(string);
    $scope.outfit[where].splice(index, 1);
    }

    $scope.save = function(){
      Outfits.update({id: $scope.outfit._id}, $scope.outfit);
        $location.path('/outfit');
    }

    $scope.updateArr = function(where){
    var string = $scope[where];
    if(!string || string.length < 1) return;

    var arr = $scope.user[where];
    if(arr.indexOf(string) !== -1) return;

    $scope.user[where].push(string);
    Users.update({id: $scope.user._id}, $scope.user);
    $scope[where] = "";
    }

    $scope.remove = function(){
      Outfits.remove({id: $scope.outfit._id});
      $location.path('/outfit');
    }
}]);