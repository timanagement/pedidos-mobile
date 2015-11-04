angular.module('pedidos.controllers', [])

.controller('PedidosCtrl', function($scope) {})

.controller('PlatosCtrl', function($scope, Restaurantes, $firebaseArray ) {
  $scope.restaurantes =  Restaurantes.all();

})
.controller('ChatDetailCtrl', function($scope, $stateParams, Restaurantes) {
  $scope.rest = Restaurantes.getOne($stateParams.restId);

})

.controller('LoginCtrl',['$scope', 'Auth', '$rootScope', '$location',   function($scope, Auth, $rootScope, $location) {


  $scope.login = function() {
    Auth.$authWithOAuthRedirect("facebook");
  };

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log("Not logged in yet");
    } else {
      console.log("Logged in as", authData);
    }
    $scope.user = authData; // This will display the user's name in our view
  });

  $scope.redirect = function() {
    $location.path('/tab/chats');
  };

}])



.controller('CuentaCtrl', function($scope, $rootScope, Auth) {
  $scope.settings = {
    enableFriends: true
  };
  Auth.$onAuth(function(authData) {
  if (authData === null) {
    console.log("Not logged in yet");
  } else {
    console.log("Logged in as", authData.uid);
  }
  $scope.authData = authData; // This will display the user's name in our view
});
});
