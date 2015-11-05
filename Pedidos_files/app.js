angular.module('pedidos', ['ionic', 'pedidos.controllers', 'starter.services', 'firebase'])


.run(function($ionicPlatform, $rootScope, $state) {
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


  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });


})


.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete

          return Auth.$waitForAuth();
      }]
    }
  })


  .state('bienvenido', {
    url: '/bienvenido',
    templateUrl: 'templates/bienvenido.html',
    controller: 'bienvenidoCtrl',
    resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireAuth();
      }]
    }
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



});
