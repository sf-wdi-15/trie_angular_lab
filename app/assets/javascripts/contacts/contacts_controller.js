(function() {
  'use strict';

  /* - - - - - - - - - - - - - - - - - - - - - - - - */
  /*  Trie for auto-complete                         */
  /* - - - - - - - - - - - - - - - - - - - - - - - - */

  function Trie () {
    this.characters = {};
  } ;

  Trie.prototype.learn = function (word, index) {
    index = index || 0;
    var letter = word[index];
    if (index < word.length) {
      //recursive condition
      if (this.characters[letter] === undefined) {
        this.characters[letter] = new Trie ();
      }
      //recursively learn at next letter position
      this.characters[letter].learn(word, index + 1);
    } else {
      //terminal condition
      this.isWord = true;
    }
    return this;
  };

  Trie.prototype.getWords = function (words, currentWord) {
    words = words || [];
    currentWord = currentWord || "";
    if (this.isWord) {
      words.push(currentWord);
    }
    for (var character in this.characters) {
      this.characters[character].getWords(words, currentWord + character);
    }
    return words;
  };

  Trie.prototype.find = function (word, index) {
    index = index || 0;
    if (index === word.length) {
      return this;
    }

    if (this.characters[word[index]] !== undefined && index < word.length) {
      return this.characters[word[index]].find(word, index + 1);
    }
  };

  Trie.prototype.autoComplete = function (prefix) {
    var foundNode = this.find(prefix);
    var words = [];
    if (foundNode) {
      foundNode.getWords(words, prefix);
    }
    return words;
  };


  /* - - - - - - - - - - - - - - - - - - - - - - - - */
  /*  ContactsCtrls                                   */
  /* - - - - - - - - - - - - - - - - - - - - - - - - */

  var ContactsCtrls = angular.module('ContactsCtrls', []);

  ContactsCtrls.controller('ContactsCtrl', ['$scope', '$http', function ($scope, $http) {
    //define Contacts
    $scope.contacts = [];

    $scope.contactNames = new Trie ();

    //get all contacts
    $http.get('/contacts.json')
         .error(function () {
            console.log(arguments);
         })
         .success(function (data) {
            console.log(data);
            $scope.contacts = data;
            for (var i = 0; i < $scope.contacts.length; i++) {
              $scope.contactNames.learn($scope.contacts[i].name);
            };
         })
         ;

    //create a contact
    $scope.createContact = function () {
      $http.post('/contacts.json', { contact: $scope.newContact })
           .error(function () {
              console.log(arguments);
           })
           .success(function (data) {
              $scope.contacts.push(data);
              $scope.contactNames.learn(data.name);
              $scope.newContact = {};
           })
           ;
    };

    //delete a contact
    $scope.delete = function () {
      var contact = this.contact;
      var that = this;
      $http.delete('/contacts/'+ contact.id +'.json')
           .error(function () {
             console.log(arguments);
           })
           .success(function () {
            $scope.contacts.splice(that.$index, 1);
            $scope.contactNames.find(contact.name).isWord = false;
           })
           ;
    };

    //edit a contact
    $scope.edit = function () {
      this.editing = true;
    };

    //update a contact
    $scope.updateContact = function () {
      var contact = this.contact;
      var that = this;
      $http.patch('/contacts/'+ contact.id +'.json', { contact: contact })
           .error(function () {
             $scope.formError = true;
           })
           .success(function (data) {
             that.editing = false;
           })
           ;
    };

    //get suggestions
    $scope.getSuggestions = function () {
      $scope.searchResult = $scope.contactNames.autoComplete($scope.searchName);
    };

    // find contact
    $scope.findContact = function () {
      var name = this.name;
      for (var i = 0; i < $scope.contacts.length; i++) {
        if ($scope.contacts[i].name === name) {
          $scope.foundContact = $scope.contacts[i];
          return undefined;
        }
      };
    };


  }]);// END ContactsCtrls

})();//END Module