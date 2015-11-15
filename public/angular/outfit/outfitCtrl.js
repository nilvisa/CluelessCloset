angular.module('outfit', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
   .when('/outfit', {
      templateUrl: 'angular/outfit/generateOutfit.html',
      controller: 'CreateOutfitCtrl',
      resolve: {
        outfitsData: ['Outfits', function(Outfits) {
          return Outfits.query();
        }],
        itemsData: ['Items', function(Items) {
          return Items.query();
        }],
        typesData: ['Types', function(Types) {
          return Types.query();
        }],
        closetsData: ['Closets', function(Closets) {
          return Closets.query();
        }]
      }
    })

   .when('/outfit-manual', {
      templateUrl: 'angular/outfit/manuallyOutfit.html',
      controller: 'CreateOutfitCtrl',
      resolve: {
        outfitsData: ['Outfits', function(Outfits) {
          return Outfits.query();
        }],
        itemsData: ['Items', function(Items) {
          return Items.query();
        }],
        typesData: ['Types', function(Types) {
          return Types.query();
        }],
        closetsData: ['Closets', function(Closets) {
          return Closets.query();
        }]
      }
    })

    .when('/outfit/:id', {
      templateUrl: 'angular/outfit/showOutfit.html',
      controller: 'UpdateOutfitCtrl',
      resolve: {
        itemsData: ['Items', function(Items) {
          return Items.query({owner: "561cd088b360d5b022f3fcbe"});
        }],
        tagsData: ['Tags', function(Tags) {
	      return Tags.query();
	    }],
        getOutfit: ['$route', 'Outfits', function($route, Outfits) {
          var id = $route.current.params.id;
          return Outfits.get({id: id});
        }]
      }
   });
}])

.controller('CreateOutfitCtrl', ['$scope', 'Items', 'itemsData', 'Outfits', 'outfitsData', 'typesData', 'closetsData', '$location', 
  function ($scope, Items, itemsData, Outfits, outfitsData, typesData, closetsData, $location) {
    $scope.outfits = outfitsData;
    $scope.allItems = itemsData;
    $scope.types = typesData;
    $scope.closets = closetsData;
    $scope.blocks = ['1'];
    $scope.closetItems = $scope.allItems;

    $scope.items = Items.query(function (items) {
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
      $scope.clicked = [];
    });

    if(!$scope.coll) {
      $scope.coll = [];
    }

    if(!$scope.clicked) {
      $scope.clicked = [];
    }

    if(!$scope.manualArray) {
      $scope.manualArray = [];
    }
   	
  	$scope.newBlock = function(){
  		var number = $scope.blocks.length+1;
  		$scope.blocks.push(number);
  	}

    $scope.chooseCloset = function(){
      var closetId = $scope.choose.closet;
      if($scope.choose.closet === 'all'){
        $scope.closetItems = $scope.allItems;
      } else {
        $scope.closetItems = [];
        angular.forEach($scope.closets, function(closet){
          if(closet._id === closetId){
            angular.forEach($scope.allItems, function(item){
              if(closet.items.indexOf(item._id) !== -1){
                $scope.closetItems.push(item);
              }
            })
          }
        });
      }
      return $scope.closetItems;
    }

  	$scope.findItems = function(block){
		$scope.arr = [];
	  	var option = $scope.types.add[block];
	  	var items = $scope.closetItems;
      var allTypes = ['tops', 'bottoms', 'shoes', 'accessories'];

      // check if all or just single kind of type
      if(allTypes.indexOf(option) !== -1){ 
        angular.forEach($scope.types[0][option], function(type){
          angular.forEach($scope.closetItems, function(items){
            if(items.types.indexOf(type) !== -1){
              $scope.arr.push(items._id);
            }
          });
        });
      } else {
         angular.forEach($scope.closetItems, function(items){
          if(items.types.indexOf(option) !== -1){
            $scope.arr.push(items._id);
          }
        });
      }

      // add to the item-object that will be randomized
      if(!$scope.arr.length) {
        $scope.arr = [];
      }
  		$scope.coll[block] = $scope.arr;
  	}

  	$scope.randomize = function(){
  		$scope.random = [];
      $scope.outfitItems = [];

      if($scope.coll.length) {
        for (var i = 1, len = $scope.coll.length; i < len; i++) {
          if($scope.coll[i]) {
            var blockArr = $scope.coll[i];
            if(blockArr.length) {
              var randItem = blockArr[Math.floor(Math.random() * blockArr.length)];
            } else var randItem = i; 
          } else var randItem = i;
          $scope.random.push(randItem);
        }

        for (var i = 0, len = $scope.random.length; i < len; i++) {
          if($scope.random[i].length) {
            var item = Items.get({id: $scope.random[i]});
          } else var item = i
            $scope.outfitItems.push(item);
        }
      }
      
  	}
      
    $scope.clicking = function(array, item){
    // if(where === 'generate'){
        //   var item = $scope.outfitItems[index];
        // }
      if($scope[array].indexOf(item) == -1){
        $scope[array].push(item);
      } else {
        var index = $scope[array].indexOf(item);
        $scope[array].splice(index, 1);
      }
    }

    $scope.saveOutfit = function(method){
      if(method === 'manual'){
        var outfit = new Outfits({items: $scope.manualArray, owner: $scope.userId});
      
        outfit.$save(function(){
          $scope.outfits.push(outfit);
          $scope.createdOutfit = outfit;
          $scope.manualArray = [];
        });

      } else {
      var outfit = new Outfits({items: $scope.random, owner: $scope.userId});

      outfit.$save(function(){
          $scope.outfits.push(outfit);
          $scope.outfitItems = [];
        });
      }
    }

}])

.controller('UpdateOutfitCtrl', ['$scope', 'Items', 'itemsData', 'tagsData', 'Outfits', 'getOutfit', '$location', 
  function ($scope, Items, itemsData, tagsData, Outfits, getOutfit, $location) {
    $scope.outfit = getOutfit;
    $scope.items = itemsData;
    $scope.tags = tagsData;


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