angular.module('user', [])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
   .when('/user', {
      templateUrl: 'angular/user/addUser.html',
      controller: 'CreateUserCtrl'
    })

    .when('/user/:id', {
      templateUrl: 'angular/user/showUser.html',
      controller: 'UpdateUserCtrl'
   });
}])

.controller('CreateUserCtrl', ['$scope', 'Users', function ($scope, Users) {
  $scope.users = Users.query();

  $scope.save = function(){
    if(!$scope.name || $scope.name.length < 1) return;
      var user = new Users({name: $scope.name, email: $scope.email});

      user.$save(function(){
        $scope.users.push(user);
        $scope.name = ''; // clear textbox
        $scope.email = ''; // clear textbox
      });
  }

}])

.controller('UpdateUserCtrl', ['$scope', '$routeParams', 'Users', 'Items', 'Outfits', '$location', function ($scope, $routeParams, Users, Items, Outfits, $location) {
	$scope.user = Users.get({id: $routeParams.id});
	$scope.users = Users.query();
  $scope.editing = [];
  $scope.items = Items.query({owner: $scope.user._id});
  $scope.outfits = Outfits.query({owner: $scope.user._id});

	$scope.updateArr = function(where){
	  var string = $scope[where];
	  if(!string || string.length < 1) return;

	  var arr = $scope.user[where];
	  if(arr.indexOf(string) !== -1) return;

	  $scope.user[where].push(string);
	  Users.update({id: $scope.user._id}, $scope.user);
	  $scope[where] = "";
	}

  // $scope.remove = function(){
  //   for (var i = 0, len = $scope.outfits.length; i < len; i++) {
  //     var outfit = $scope.outfits[i];
  //     if(outfit.items.indexOf($scope.item._id) != -1){
  //       outfit.items.splice($scope.item._id, 1);
  //       Outfits.update({id: outfit._id}, outfit);
  //     }
  //   }
  //   Items.remove({id: $scope.item._id});
  //   $location.path('/item');
  // }

  $scope.update = function(index, where) {
    var string = angular.copy($scope.editing[index]);
    var updated = $scope.user[where][index];
    console.log(string + updated);

    angular.forEach($scope.items, function(item, key){
      if(item[where].indexOf(string) !== -1){
        item[where].splice(string, 1);
        item[where].push(updated);
        Items.update({id: item._id}, item);
      }
    });

    if(where === 'tags'){
      angular.forEach($scope.outfits, function(outfit, key){
        if(outfit[where].indexOf(string) !== -1){
          outfit[where].splice(string, 1);
          outfit[where].push(updated);
          Outfits.update({id: outfit._id}, outfit);
        }
      });
    }

    Users.update({id: $scope.user._id}, $scope.user);
    $scope.editing[index] = false;
  }

  $scope.edit = function(index, where){
    console.log(index);
    $scope.editing[index] = angular.copy($scope.user[where][index]);
  }

  $scope.cancel = function(index, where) {
    $scope.user[where][index] = angular.copy($scope.editing[index]);
    $scope.editing[index] = false;
  }

  $scope.remove = function(index, where){
    var string = $scope.user[where][index];

    angular.forEach($scope.items, function(item, key){
      if(item[where].indexOf(string) !== -1){
        item[where].splice(string, 1);
        Items.update({id: item._id}, item);
      }
    });

    if(where === 'tags'){
      angular.forEach($scope.outfits, function(outfit, key){
        if(outfit[where].indexOf(string) !== -1){
          outfit[where].splice(string, 1);
          Outfits.update({id: outfit._id}, outfit);
        }
      });
    }

    $scope.user[where].splice(string, 1);
    Users.update({id: $scope.user._id}, $scope.user);
  }

}]);
