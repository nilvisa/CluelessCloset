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

    .when('/outfits', {
      templateUrl: 'angular/outfit/browseOutfits.html',
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

    if(!$scope.coll) {
      $scope.coll = [];
    }

    if(!$scope.clicked) {
      $scope.clicked = [];
    }

    if(!$scope.manualArray) {
      $scope.manualArray = [];
    }

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
      $scope.outfitItems = [];
      $scope.coll = [];
      $scope.types.add = [];

      return $scope.closetItems;
    }

    $scope.newBlock = function(){
      var number = $scope.blocks.length+1;
      $scope.blocks.push(number);
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
      console.log('NY RUNDA');

      // check if there's any items
      if($scope.coll.length) {
        for (var i = 1, len = $scope.coll.length; i < len; i++) {
          console.log('NYTT BLOCK');
          var stop = false;
          var blockArr = $scope.coll[i];
          var goThroughArr = [];
          // check if the block isn't empty
          if(blockArr.length) {
            while(stop === false){
              var loop = true;
              // randomize item from block
              var randItem = blockArr[Math.floor(Math.random() * blockArr.length)];
              console.log('(tog ett nytt plagg)');
              if($scope.outfitItems.length){  
                // check if it missmatches with the other items
                angular.forEach($scope.outfitItems, function(oItem){
                  if(loop === true){
                    if(oItem._id !== randItem){
                    console.log('inte samma som tidigare');
                      if(oItem.missmatch){
                        console.log('har missmatcharrayen');
                        if(oItem.missmatch.indexOf(randItem) !== -1){
                          console.log('MM');
                          if(goThroughArr.indexOf(randItem) !== -1){
                            console.log('har redan kollat');
                            if(goThroughArr.length === blockArr.length){
                              randItem = i;
                              console.log('stoppar');
                              stop = true;
                              loop = false;
                              return;
                            }
                          } else {
                            goThroughArr.push(randItem);
                            console.log('till goThroug');
                            loop = false;
                            stop = false;
                          }
                          stop = false;
                        } else {
                          stop = true;
                        }
                      } 
                      // else {
                      //   stop = true;
                      // }
                    } else {
                      goThroughArr.push(randItem);
                      if(goThroughArr.length === blockArr.length){
                        randItem = i;
                        console.log('stoppar');
                        stop = true;
                        return;
                      } else {
                        console.log('samma id, skicka tillbaka');
                        stop = false;
                        return;
                      }
                    }
                  }
                  console.log(oItem._id);

                 
                });
              } else {
                stop = true;
              }
            }
          } else var randItem = i; 
          if(randItem !== i) {
            angular.forEach($scope.allItems, function(findItem) {
              if(findItem._id === randItem){
                $scope.outfitItems.push(findItem);
                $scope.random.push(findItem._id);
              }
            })
          } else {
            $scope.outfitItems.push(i);
          }
        }
      }

      $scope.clicked = [];
  	}
      
    $scope.clicking = function(array, item){
      if($scope[array].indexOf(item) == -1){
        $scope[array].push(item);
      } else {
        var index = $scope[array].indexOf(item);
        $scope[array].splice(index, 1);
      }

      console.log($scope[array]);
    }

    $scope.saveOutfit = function(method){
      if(method === 'manual'){
        var outfit = new Outfits({items: $scope.manualArray, owner: $scope.userId, created: new Date()});
      
        outfit.$save(function(){
          $scope.outfits.push(outfit);
          // $scope.createdOutfit = outfit;
          $location.path('/outfits');
        });

      } else {
      var outfit = new Outfits({items: $scope.random, owner: $scope.userId, created: new Date()});

      outfit.$save(function(){
          $scope.outfits.push(outfit);
          $scope.outfitItems = [];
        });
      }
    }

}])

.controller('UpdateOutfitCtrl', ['$scope', 'Items', 'itemsData', 'tagsData', 'Tags', 'Outfits', 'getOutfit', '$location', 
  function ($scope, Items, itemsData, tagsData, Tags, Outfits, getOutfit, $location) {
    $scope.outfit = getOutfit;
    $scope.items = itemsData;
    $scope.tags = tagsData;


    $scope.inArray = function(where, string){
      var arr = $scope.outfit[where];
      
      if (arr.indexOf(string) === -1){
        return false  
      } else {
        return true;
      }
    }

    if(!$scope.removeArray) {
      $scope.removeArray = [];
    }

    $scope.clicking = function(array, item){
      if($scope[array].indexOf(item) == -1){
        $scope[array].push(item);
      } else {
        var index = $scope[array].indexOf(item);
        $scope[array].splice(index, 1);
      }
    }

    $scope.removeItem = function(){
      angular.forEach($scope.removeArray, function(item, key){
        var index = $scope.outfit.items.indexOf(item);
        $scope.outfit.items.splice(index, 1);
        Outfits.update({id: $scope.outfit._id}, $scope.outfit);
        $scope.removeArray = [];
      });
    }

    $scope.push = function(where, string){
      $scope.outfit[where].push(string);
    }

    $scope.splice = function(where, string){
      var arr = $scope.outfit[where];
      var index = arr.indexOf(string);
      $scope.outfit[where].splice(index, 1);
    }

    $scope.addToArr = function(where, parent){
      $scope[where][0][parent].push($scope[where][parent]);
      
      Tags.update({id: $scope.tags[0]._id}, $scope.tags[0]);

      $scope.tags[parent] = "";
    }

    $scope.save = function(){
      Outfits.update({id: $scope.outfit._id}, $scope.outfit);
    }

    $scope.remove = function(){
      Outfits.remove({id: $scope.outfit._id});
      $location.path('/outfits');
    }
}]);