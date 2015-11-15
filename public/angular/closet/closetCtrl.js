angular.module('closet', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/closet', {
      templateUrl: 'angular/closet/addCloset.html',
      controller: 'CreateClosetCtrl',
      resolve: {
        closetsData: ['Closets', function(Closets) {
          return Closets.query();
        }]
      }
   })

  .when('/closet/:id', {
    templateUrl: 'angular/closet/showCloset.html',
    controller: 'UpdateClosetCtrl',
    resolve: {
      getCloset: ['$route', 'Closets', function($route, Closets) {
        var id = $route.current.params.id;
        return Closets.get({id: id});
      }],
      closetsData: ['Closets', function(Closets) {
        return Closets.query();
      }],
      itemsData: ['Items', function(Items) {
        return Items.query();
      }],
    }
   });   
}])

.controller('CreateClosetCtrl', ['$scope', 'Items', 'Closets', 'closetsData', '$location', function ($scope, Items, Closets, closetsData, $location) {
  $scope.closets = closetsData;

  $scope.save = function(){
    if(!$scope.name || $scope.name.length < 1) return;
      var closet = new Closets({
        name: $scope.name,
        owner: $scope.userId});

      closet.$save(function(){
        $scope.closets.push(closet);
      })
  }

}])

.controller('UpdateClosetCtrl', ['$scope', '$routeParams', 'Items', 'itemsData', 'Closets', 'getCloset', 'closetsData', '$location', 
function ($scope, $routeParams, Items, itemsData, Closets, getCloset, closetsData, $location) {
  $scope.closets = closetsData;
  $scope.closet = getCloset;
  $scope.items = itemsData;

  if(!$scope.removeArray) {
    $scope.removeArray = [];
  }

  if(!$scope.addArray) {
    $scope.addArray = [];
  }

  $scope.inCloset = function (){
    return $scope.items.filter(function (item) {
      return $scope.closet.items.indexOf(item._id) === -1;
    });
  };

  $scope.clicking = function(array, item){
    if($scope[array].indexOf(item) == -1){
      $scope[array].push(item);
    } else {
      var index = $scope[array].indexOf(item);
      $scope[array].splice(index, 1);
    }
  }

  $scope.add = function(){
    angular.forEach($scope.addArray, function(item, key){
      $scope.closet.items.push(item);
      Closets.update({id: $scope.closet._id}, $scope.closet);
      $scope.addArray = [];
    });
  }

  $scope.remove = function(){
  	angular.forEach($scope.removeArray, function(item, key){
      var index = $scope.closet.items.indexOf(item);
      $scope.closet.items.splice(index, 1);
      Closets.update({id: $scope.closet._id}, $scope.closet);
      $scope.removeArray = [];
    });
  }

	$scope.removeCloset = function(){
		Closets.remove({id: $scope.closet._id});
		$location.path('/closet');
	}

}]);
