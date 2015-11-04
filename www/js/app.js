angular.module('pedidos', ['ionic', 'pedidos.controllers', 'starter.services', 'firebase'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.pedidos', {
    url: '/pedidos',
    views: {
      'tab-pedidos': {
        templateUrl: 'templates/tab-pedidos.html',
        controller: 'PedidosCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-restaurantes.html',
          controller: 'PlatosCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:restId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/restaurante-detalles.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })



  .state('tab.cuenta', {
    url: '/cuenta',
    views: {
      'tab-cuenta': {
        templateUrl: 'templates/tab-cuenta.html',
        controller: 'CuentaCtrl'
      }
    }
  });


  $urlRouterProvider.otherwise('/login');

var fb = new Firebase("https://rapifood.firebaseio.com/");
});
