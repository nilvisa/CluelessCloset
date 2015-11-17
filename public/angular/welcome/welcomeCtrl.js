angular.module('welcome', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  	.when('/', {
      templateUrl: 'angular/start.html',
      controller: 'startCtrl'
    })

    .when('/_=_', {
      templateUrl: 'angular/start.html',
      controller: 'startCtrl'
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

