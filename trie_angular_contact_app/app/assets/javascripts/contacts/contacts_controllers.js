(function () {
  "use strict";
  
  var ContactsCtrls = angular.module("ContactsCtrls", []);

  // Be sure to pass in factories as dependencies 
  ContactsCtrls.controller("ContactsCtrl", ["$scope", "$http", "Contacts", "Trie", function ($scope, $http, Contacts, Trie) {
    
    // Define contacts
    $scope.contacts = [];

    $scope.contactNames = new Trie();

    // A method to Get all contacts
    Contacts.all().
      error(function () {
        console.log(arguments);
      }).
      success(function (data) {
        console.log(data)
        $scope.contacts = data;
        for (var i = 0; i < $scope.contacts.length; i+=1) {
          $scope.contactNames.learn($scope.contacts[i].name);
        };
      });

    // A method to Create a contact
    $scope.createContact = function () {
      Contacts.create($scope.newContact).
        error(function () {
          $scope.formError = true;
        }).
        success(function (data) {
          $scope.contacts.push(data);
          $scope.contactNames.learn(data.name);
          $scope.newContact = {};
        });
    };

    // A method to Delete a contact
    $scope.delete = function () {
      var contact = this.contact;
      var that = this;
      Contacts.delete(contact).
        error(function () {
          console.log(arguments);
        }). 
        success(function () {
          $scope.contacts.splice(that.$index, 1);
          $scope.contactNames.find(contact.name).isWord = false;
        });
    };

    // A method to call an Update on a Contact
    $scope.startEdit = function () {
      console.log("EDITING")
      $scope.editing = true;
      $scope.newContact = this.contact;
    };

    // A method to update a Contact
    $scope.updateContact = function () {
      var contact = $scope.newContact;
      var that = this;
      Contacts.update(contact).
        error(function () {
          $scope.formError = true;
        }).
        success(function (data) {
          $scope.editing = false;
          $scope.newContact = {};
        });
    };

    // A method to handle the form function
    // as either creating or editing
    $scope.handleForm  = function () {
      if ($scope.editing) {
        $scope.updateContact();
      } else {
        $scope.createContact();
      }
    };

    $scope.getSuggestions = function () {
      $scope.searchResults = $scope.contactNames.autoComplete($scope.searchName);
    };

    $scope.findContact = function () {
      var name = this.name;
      for (var i = 0; i < $scope.contacts.length; i++) {
        if ($scope.contacts[i].name === name) {
          $scope.foundContact = $scope.contacts[i];
          return undefined;
        }
      };
    };


  }]);






})();