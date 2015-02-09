(function () {
  
  var ContactsCtrls = angular.module("ContactsCtrls", []);

  ContactsCtrls.controller("ContactsCtrl", ["$scope", "$http", function ($scope, $http) {
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
})();