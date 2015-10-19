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
          return Items.query();
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
    $scope.items = Items.query();
  	$scope.outfits = Outfits.query();
  	$scope.blocks = [];

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

    // $scope.missMatch = function(){
    //   for (var i = 0, len = $scope.random.length; i < len; i++) {
    //     var randomId = $scope.random[i];
    //     console.log('randomId:'+randomId);        
    //     item = Items.get({id: randomId});
    //     console.log('item:');
    //     console.log(item);

    //     for (var j = 0, len = $scope.clicked.length; j < len; j++) {
    //     var clickedId = $scope.clicked[j];
    //     console.log('clickedId: '+clickedId);

    //       if(randomId != clickedId){
    //         console.log('push');
    //         item.missmatch.push(clickedId);
    //         console.log('pushed');
    //       }
    //     }
    //     console.log('varv');

    //     Items.update({id: randomId}, item);      
    //   }      
    // }

    $scope.saveOutfit = function(){
      var outfit = new Outfits({items: $scope.random, owner: $scope.user._id});

      outfit.$save(function(){
        $scope.outfits.push(outfit);
        $scope.outfitItems = [];
      });
    }

}])

.controller('UpdateOutfitCtrl', ['$scope', 'Users', 'Items', 'Outfits', 'getOutfit', '$location', 
  function ($scope, Users, Items, Outfits, getOutfit, $location) {
    $scope.outfit = getOutfit;
}]);