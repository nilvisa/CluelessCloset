angular.module('closet', [])

// .config(['$routeProvider', function ($routeProvider) {
//   $routeProvider

//   .when('/closet', {
//       templateUrl: 'angular/closet/addCloset.html',
//       controller: 'CreateClosetCtrl',
//       resolve: {
//         getUser: ['$route', 'Users', function($route, Users) {
//           var id = "561cd088b360d5b022f3fcbe";
//           return Users.get({id: id});
//         }],
//         closetsData: ['Closets', function(Closets) {
//           return Closets.query();
//         }]
//       }
//    })

//   .when('/closet/:id', {
//     templateUrl: 'angular/closet/showCloset.html',
//     controller: 'UpdateClosetCtrl',
//     resolve: {
//       getUser: ['$route', 'Users', function($route, Users) {
//         var id = "561cd088b360d5b022f3fcbe";
//         return Users.get({id: id});
//       }],
//       getCloset: ['$route', 'Closets', function($route, Closets) {
//         var id = $route.current.params.id;
//         return Closets.get({id: id});
//       }],
//       closetsData: ['Closets', function(Closets) {
//         return Closets.query({owner: "561cd088b360d5b022f3fcbe"});
//       }],
//       itemsData: ['Items', function(Items) {
//         return Items.query({owner: "561cd088b360d5b022f3fcbe"});
//       }],
//     }
//    });   
// }])

// .controller('CreateClosetCtrl', ['$scope', 'Items', 'Closets', 'closetsData', 'getUser', '$location', function ($scope, Items, Closets, closetsData, getUser, $location) {
//   $scope.closets = closetsData;
//   $scope.user = getUser;

//   $scope.save = function(){
//     if(!$scope.name || $scope.name.length < 1) return;
//       var closet = new Closets({
//         name: $scope.name,
//         owner: $scope.user._id});

//       closet.$save(function(){
//         $scope.closets.push(closet);
//         $location.path('/closet/'+closet._id);
//       })
//   }

// }])

// .controller('UpdateClosetCtrl', ['$scope', '$routeParams', 'Items', 'itemsData', 'Closets', 'getCloset', 'closetsData', 'getUser', '$location', 
// function ($scope, $routeParams, Items, itemsData, Closets, getCloset, closetsData, getUser, $location) {
//   $scope.closets = closetsData;
//   $scope.user = getUser;
//   $scope.closet = getCloset;
//   $scope.items = itemsData;

//   if(!$scope.clicked) {
//     $scope.clicked = [];
//   }

//   $scope.inCloset = function () {
//     return $scope.items.filter(function (item) {
//       return $scope.closet.items.indexOf(item._id) === -1;
//     });
//   };

//   $scope.clicking = function(item){
//     if($scope.clicked.indexOf(item) == -1){
//       $scope.clicked.push(item);
//     } else {
//       var index = $scope.clicked.indexOf(item);
//       $scope.clicked.splice(index, 1);
//     }

//     console.log($scope.clicked);
//   }

//   $scope.add = function(index){
//     angular.forEach($scope.clicked, function(item, key){
//       $scope.closet.items.push(item);
//       Closets.update({id: $scope.closet._id}, $scope.closet);
//       $scope.clicked = [];
//     });
//   }

//   $scope.remove = function(item){
//     $scope.closet.items.splice(item, 1);
//     Closets.update({id: $scope.closet._id}, $scope.closet);
//   }

// }]);
