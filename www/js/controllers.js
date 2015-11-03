angular.module('pedidos.controllers', [])

.controller('PedidosCtrl', function($scope) {})

.controller('PlatosCtrl', function($scope, Restaurantes, $firebaseArray ) {
  $scope.restaurantes =  Restaurantes.all();

})
.controller('ChatDetailCtrl', function($scope, $stateParams, Restaurantes) {
  $scope.rest = Restaurantes.getOne($stateParams.restId);
  console.log($scope.rest);
  console.log($stateParams.restId);

})

.controller('CuentaCtrl', function() {
  this.settings = {
    enableFriends: true
  };
});
