angular.module('starter.services', [])

.factory('Restaurantes', function($firebaseArray) {
  // Might use a resource here that returns a JSON array

    var restaurateRef = new Firebase('https://rapifood.firebaseio.com/');
    var restaurantes =  $firebaseArray(restaurateRef.child('restaurantes'));

  return {
    all: function() {
      return restaurantes;
    },
    // Retorna un solo restaurante para que los stateparams comparen el id
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

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
}]);
