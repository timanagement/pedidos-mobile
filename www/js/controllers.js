angular.module('pedidos.controllers', [])

.controller('PedidosCtrl', function($scope) {})

.controller('PlatosCtrl', function($scope, Chats, $firebaseArray ) {


  var restaurateRef = new Firebase('https://rapifood.firebaseio.com/');
  $scope.restaurantes =  $firebaseArray(restaurateRef.child('restaurantes'));


  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('CuentaCtrl', function() {
  this.settings = {
    enableFriends: true
  };
});
