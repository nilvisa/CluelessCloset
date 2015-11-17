angular.module('user', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  	.when('/', {
      templateUrl: '/angular/start.html',
      controller: 'startCtrl'
    })

    .when('/_=_', {
      templateUrl: 'angular/start.html',
      controller: 'startCtrl'
    })

    .when('/user', {
      templateUrl: '/angular/user/showUser.html',
      controller: 'userCtrl',
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
    });     
}])

.controller('startCtrl', ['$scope', 'Tags', 'Types', '$location', function ($scope, Tags, Types, $location) {

	$scope.addStarter = function(){
		$scope.tags = Tags.query(function(tags){
			if($scope.tags[0] === undefined){
				var newTags = new Tags({
						colors: ['white', 'beige', 'yellow', 'oragne', 'red', 'pink', 'purple', 'navy', 'blue', 'green', 'brown', 'grey', 'black'],
						pattern: ['striped', 'plaid', 'polka-dots', 'floral', 'leopard', 'camo', 'sequin', 'lace'],
						season: ['spring', 'summer', 'winter', 'autumn'],
						occasion: ['fancy', 'party', 'work', 'school', 'casual', 'sport'],
						custom: ['add your own here'],
						owner: $scope.userId
					});
			
				newTags.$save(function(){
		      		$scope.tags.push(newTags);
		      	});
			}
		});

		$scope.types = Types.query(function(types){
			if($scope.types[0] === undefined){
				var newTypes = new Types({
					tops: ['tank', 't-shirt', 'blouse', 'shirt', 'jumper', 'sweatshirt', 'sweater', 'cardigan', 'kimono', 'jacket', 'blazer', 'waistcoat', 'dress', 'tunic'],
					bottoms: ['jeans', 'trousers', 'leggings', 'tights', 'shorts', 'skirt'],
					shoes: ['sneakers', 'boots', 'heels', 'flats', 'sandals'],
					accessories: ['hat', 'scarf', 'necklace', 'bracelet', 'watch', 'earrings', 'purse'],
					custom: ['add your own here'],
					owner: $scope.userId
				});

				newTypes.$save(function(){
		      		$scope.types.push(newTypes);
		      	});
			}
		});
	}
  
}])

.controller('userCtrl', ['$scope', 'Items', 'itemsData', 'Outfits', 'outfitsData', 'typesData', 'closetsData', '$location', 
  function ($scope, Items, itemsData, Outfits, outfitsData, typesData, closetsData, $location) {
    $scope.outfits = outfitsData;
    $scope.items = itemsData;
    $scope.closets = closetsData;
    $scope.score = $scope.outfits.length+$scope.items.length+$scope.closets.length;

    var x = $scope.score;
    switch(true) {
    	case (x < 1):
    	$scope.level = 'Travis';
    	$scope.desc = "You couldn't care less...";
    	break;
    	case (x > 10):
    	$scope.level = 'Tai';
    	$scope.desc = "You're really trying...good for you!";
    	break;
    	case (x > 20):
    	$scope.level = 'Dionne';
    	$scope.desc = "Lookin' pretty good...";
    	break;
    	case (x > 80):
    	$scope.level = 'Christian';
    	$scope.desc = "Whoa! You're not a rookie.";
    	break;
    	case (x > 120):
    	$scope.level = 'Cher';
    	$scope.desc = "Full on master of the closet";
    	break;
    }





 }])

