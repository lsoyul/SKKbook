// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('shoppingApp', ['ionic', 'shoppingApp.controller', 'ngCordova']);

app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $stateProvider

    .state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/welcome.html',
        controller: 'WelcomeCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
    })
    //.state('app', {
    //    url: '/app',
    //    abstract: true,
    //    templateUrl: 'templates/welcome.html',
    //    controller: 'WelcomeCtrl'
    //})

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'mainController'
    })

    .state('app.page1', {
        url: '/page1',
        views: {
            'menuContent': {
                templateUrl: 'templates/page1.html'
            }
        },

        controller: 'mainController'
    })
    .state('app.page2', {
        url: '/page2',
        views: {
            'menuContent': {
                templateUrl: 'templates/page2.html'
            }
        }
    })

    $urlRouterProvider.otherwise('/welcome');

    
})


app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.directive("fileInput", function ($parse) {
    return {
        link: function ($scope, element, attrs) {
            element.on("change", function (event) {
                var files = event.target.files;
                //console.log(files[0].name);

                $parse(attrs.fileInput).assign($scope, element[0].files);
                $scope.$apply();    
            });
        }
    }
})

app.factory('dataShare', function () {
    var savedData = {}
    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }

})
;