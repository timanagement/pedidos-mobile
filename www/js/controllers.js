angular.module('pedidos.controllers', [])

.controller('PedidosCtrl', function($scope) {})

.controller('PlatosCtrl', function($scope, Restaurantes, $firebaseArray ) {
  $scope.restaurantes =  Restaurantes.all();

})
.controller('ChatDetailCtrl', function($scope, $stateParams, Restaurantes) {
  $scope.rest = Restaurantes.getOne($stateParams.restId);

})

.controller('LoginCtrl',['$scope', '$location', 'store', 'auth', function(store, $scope, $location, auth) {

  $scope.redirect = function() {
    $location.path('/cuenta');
  };

  $scope.unAuth = function() {
    Auth.$unauth();
  };

  $scope.login = function() {
    // auth.signin({
    //   authParams: {
    //     scope: 'openid offline_access',
    //     device: 'Mobile device'
    //   }
    // }, function(profile, token, accessToken, state, refreshToken) {
    //   // Success callback
    //   store.set('profile', profile);
    //   store.set('token', token);
    //   store.set('refreshToken', refreshToken);
    //   $location.path('/');
    // }, function() {
    //   // Error callback
    // });

    function doAuth() {
   auth.signin({
     closable: false,
     // This asks for the refresh token
     // So that the user never has to log in again
     authParams: {
       scope: 'openid offline_access'
     }
   }, function(profile, idToken, accessToken, state, refreshToken) {
     store.set('profile', profile);
     store.set('token', idToken);
     store.set('refreshToken', refreshToken);
     $state.go('tab.dash');
   }, function(error) {
     console.log("There was an error logging in", error);
   });
 }

 $scope.$on('$ionic.reconnectScope', function() {
   doAuth();
 });

 doAuth();
 

  };

  $scope.signin = function() {
      auth.signin({
        authParams: {
          scope: 'openid name email' // Specify the scopes you want to retrieve
        }
      }, function(profile, idToken, accessToken, state, refreshToken) {
        $location.path('/user-info');
      }, function(err) {
        console.log("Error :(", err);
      });
    };



}])



.controller('CuentaCtrl', function($scope, $rootScope) {
  $scope.settings = {
    enableFriends: true
  };

})

.controller('bienvenidoCtrl', function($scope, $rootScope) {
  $scope.settings = {
    enableFriends: true
  };

});
