angular.module('starter.services', [])

.factory('Restaurantes', function($firebaseArray) {
  // Might use a resource here that returns a JSON array

    var restaurateRef = new Firebase('https://rapifood.firebaseio.com/');
    var restaurantes =  $firebaseArray(restaurateRef.child('restaurantes'));

  return {
    all: function() {
      return restaurantes;
    },
    getOne: function(restId) {
      for (var i = 0; i < restaurantes.length; i++) {
        if (restaurantes[i].$id === restId) {
          return restaurantes[i];
        }
      }
      return null;
    }
  };
})

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https://rapifood.firebaseio.com/users");
  return $firebaseAuth(usersRef);
});
