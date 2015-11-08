angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, auth, $state, store) {
  function doAuth() {
    auth.signin({
      closable: false,
      dict: 'es',
      // This asks for the refresh token
      // So that the user never has to log in again
      authParams: {
        scope: 'openid offline_access'
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      store.set('profile', profile);
      store.set('token', idToken);
      store.set('refreshToken', refreshToken);
      $state.go('tab.account');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }


  $scope.$on('$ionic.reconnectScope', function() {
    doAuth();
  });

  doAuth();


})

.controller('DashCtrl', function($scope, $http) {

})

.controller('ChatsCtrl', function($scope, Restaurantes, $firebaseArray ) {
  $scope.restaurantes =  Restaurantes.all();

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Restaurantes) {
  $scope.rest = Restaurantes.getOne($stateParams.restId);
  console.log($scope.rest);
})

.controller('AccountCtrl', function($scope, auth, store, $state) {
  $scope.auth = auth;
  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login', {}, {reload: true});
  };
});
