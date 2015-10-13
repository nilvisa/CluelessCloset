angular.module('CC', ['ngRoute', 'ngResource'])

    //---------------
    // Services
    //---------------

    .factory('Users', ['$resource', function($resource){
    	return $resource('/users/:id', null, {
    		'update': {method: 'PUT'}
    	});
    }])

    .factory('Items', ['$resource', function($resource){
      return $resource('/items/:id', null, {
        'update': {method: 'PUT'}
      });
    }])

    .factory('Outfits', ['$resource', function($resource){
      return $resource('/outfits/:id', null, {
        'update': {method: 'PUT'}
      });
    }])

    .factory('Closets', ['$resource', function($resource){
      return $resource('/closets/:id', null, {
        'update': {method: 'PUT'}
      });
    }])

    //---------------
    // Controllers
    //---------------

     .controller('CreateUserCtrl', ['$scope', 'Users', function ($scope, Users) {
	    $scope.editing = [];
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

    	$scope.update = function(index) {
    		var todo = $scope.todos[index];
    		Todos.update({id: todo._id}, todo);
    		$scope.editing[index] = false;
    	}

    	$scope.edit = function(index){
    		$scope.editing[index] = angular.copy($scope.todos[index]);
    	}

    	$scope.cancel = function(index) {
    		$scope.todos[index] = angular.copy($scope.editing[index]);
    		$scope.editing[index] = false;
    	}

    	$scope.remove = function(index){
    		var todo = $scope.todos[index];
    		Todos.remove({id: todo._id}, function(){
    			$scope.todos.splice(index, 1);
    		});
    	}

    }])

    .controller('UpdateUserCtrl', ['$scope', '$routeParams', 'Users', 'Items', '$location',
     function ($scope, $routeParams, Users, Items, $location) {
		  $scope.user = Users.get({id: $routeParams.id});
      $scope.users = Users.query();
      var where = "";


		// $scope.update = function(){
		// 	Todos.update({id: $scope.todo._id}, $scope.todo, function(){
		// 		$location.url('/');
		// });
		// }

  	$scope.updateArr = function(where){
      var string = $scope[where];
      if(!string || string.length < 1) return;
      $scope.user[where].push(string);
		  Users.update({id: $scope.user._id}, $scope.user);
      $scope[where] = "";
    }

    $scope.updateObj = function(where){
  		var string = new Items($scope.add);      
  		$scope.user[where].push(string);
		  Users.update({id: $scope.user._id}, $scope.user);
	    $scope.add = ""; 

    }

    }])

    //---------------
    // Routes
    //---------------

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/views/start.html',
        })

        .when('/user', {
          templateUrl: '/views/addUser.html',
          controller: 'CreateUserCtrl'
        })

        .when('/user/:id', {
          templateUrl: '/views/showUser.html',
          controller: 'UpdateUserCtrl'
       })

        .when('/item', {
          templateUrl: '/views/addItem.html',
          controller: 'CreateItemCtrl'
       })

        .when('/item/:id', {
          templateUrl: '/views/showItem.html',
          controller: 'UpdateItemCtrl'
       });
    }]);