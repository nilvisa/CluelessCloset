angular.module('user', [])


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

.controller('UpdateUserCtrl', ['$scope', '$routeParams', 'Users', 'Items', '$location', function ($scope, $routeParams, Users, $location) {
	$scope.user = Users.get({id: $routeParams.id});
	$scope.users = Users.query();

	$scope.updateArr = function(where){
	  var string = $scope[where];
	  if(!string || string.length < 1) return;

	  var arr = $scope.user[where];
	  if(arr.indexOf(string) != -1) return;

	  $scope.user[where].push(string);
	  Users.update({id: $scope.user._id}, $scope.user);
	  $scope[where] = "";
	}

}])


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
}]);