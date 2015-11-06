angular.module('pedidos', ['ionic', 'pedidos.controllers', 'starter.services', 'firebase', 'auth0', 'angular-storage', 'angular-jwt'])


.run(function($ionicPlatform,  $state, auth) {
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

   auth.hookEvents();

})


.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {


  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    // If no token return null
    if (!idToken || !refreshToken) {
      return null;
    }
    // If token is expired, get a new one
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  };

  $httpProvider.interceptors.push('jwtInterceptor');


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

  authProvider.init({
    domain: 'rapifood.auth0.com',
    clientID: 'FaL0gcs7Ndb78sTTH8J549WNOJUtFLWt',
    callbackURL: location.href,
    loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
  });



  $urlRouterProvider.otherwise('/login');


});
