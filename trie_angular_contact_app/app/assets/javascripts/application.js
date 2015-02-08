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

var ContactApp = angular.module("ContactApp", []);

ContactApp.config(["$httpProvider", function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('name', 'cell', 'home', 'address')
}]);

ContactApp.controller("ContactsCtrl", ["$scope", "$http", function($scope, $http){
  
  $http.get('/contacts.json')
    .success(function (data){
      console.log(data);
      $scope.contacts = data;
    });

  $scope.contacts = [];


  $scope.addContact = function () {
    console.log($scope.newContact);

    $http.post('/contacts.json', {contact: $scope.newContact})
      .success(function (data){
        console.log(data);
        $scope.contacts.push(data);
        $scope.newContact = {};
      });
  };

  $scope.startEdit = function (){
    $scope.newContact = this.contact;
  }

  // $scope.updateContact = function(){
  //   console.log("updating", this.contact);
  //   console.log($http);
  //   $http.patch('/contacts/' + this.contact.id + ".json", {contact: this.contact})
  //     .success(function (data){
  //       console.log("updated");
  //     });
  // };

  $scope.deleteContact = function(){
    console.log("deleting", this.contact);
    console.log($http);
    var index = this.$index
    $http.delete('/contacts/' + this.contact.id + ".json", {contact: this.contact})
      .success(function (data){
        $scope.contacts.splice(index,1)
        console.log("deleted");
      });
  };
}]);