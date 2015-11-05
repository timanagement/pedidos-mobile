angular.module('pedidos.controllers', [])

.controller('PedidosCtrl', function($scope) {})

.controller('PlatosCtrl', function($scope, Restaurantes, $firebaseArray ) {
  $scope.restaurantes =  Restaurantes.all();

})
.controller('ChatDetailCtrl', function($scope, $stateParams, Restaurantes) {
  $scope.rest = Restaurantes.getOne($stateParams.restId);

})

.controller('LoginCtrl',['$scope', 'Auth', '$rootScope', '$location',   function($scope, Auth, $rootScope, $location, currentAuth) {


  $scope.login = function() {
    Auth.$authWithOAuthRedirect("facebook");
  };

  $scope.redirect = function() {
    $location.path('/bienvenido');
  };

  $scope.unAuth = function() {
    Auth.$unauth();
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
  })

.controller('bienvenidoCtrl', function($scope, $rootScope, Auth, currentAuth) {
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


});
