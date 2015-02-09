(function () {
  "use strict";

  var ContactsApp = angular.module("ContactsApp", []);

  ContactsApp.config(["$httpProvider", function($httpProvider){
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }]);
  
})();