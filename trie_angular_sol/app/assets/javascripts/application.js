// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


angular.module("ContactsApp", []).
  config(["$httpProvider", function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }]).
  controller("ContactsCtrl", ["$scope", "$http", function ($scope, $http) {
    // define contacts
    $scope.contacts = [];

    // get all contacts
    $http.get("/contacts.json").
      error(function () {
        console.log(arguments);
      }).
      success(function (data) {
        console.log(data)
        $scope.contacts = data;
      });

    // create a contact
    $scope.createContact = function () {
      $http.post("/contacts.json",{contact: $scope.newContact}).
        error(function () {
          $scope.formError = true;
        }).
        success(function (data) {
          $scope.contacts.push(data);
          $scope.newContact = {};
        });
    };

    $scope.delete = function () {
      var contact = this.contact;
      var that = this;
      $http.delete("/contacts/" + contact.id + ".json").
        error(function () {
          console.log(arguments);
        }). 
        success(function () {
          $scope.contacts.splice(that.$index, 1);
        });
    };

    $scope.edit = function () {
      this.editing = true;
    };

    $scope.updateContact = function () {
      var contact = this.contact;
      var that = this;
      $http.patch("/contacts/" + contact.id + ".json",{contact: contact}).
        error(function () {
          $scope.formError = true;
        }).
        success(function (data) {
          that.editing = false;
        });
    };

  }]);


