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

// Name the App as an angular module
var ContactApp = angular.module("ContactApp", []);

ContactApp.config(["$httpProvider", function($httpProvider){
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('name', 'cell', 'home', 'address')
}]);

// Create a controller
ContactApp.controller("ContactsCtrl", ["$scope", "$http", function($scope, $http){
  
  $http.get('/contacts.json')
    .success(function (data){
      console.log(data);
      $scope.contacts = data;
    });

  // Set your model to be stored in an empty array  
  $scope.contacts = [];

  // Create your create method
  $scope.addContact = function () {
    console.log($scope.newContact);

    $http.post('/contacts.json', {contact: $scope.newContact})
      .success(function (data){
        console.log(data);
        $scope.contacts.push(data);
        $scope.newContact = {};
      });
  };

  // Create your edit method
  $scope.startEdit = function (){
    $scope.newContact = this.contact;
    $scope.editing = true/false;
    if ($scope.editing === true) {
      $scope.contacts.patch(data)
      $scope.newContact = {};
    }
  };

  // Create the delete method
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

  Trie = function(){
    this.characters = {};
  };

  Trie.prototype.learn = function(word, index){
    index = index || 0;
    if (index < word.length) {
      if (this.characters[word[index]] === undefined) {
        this.characters[word[index]] = new Trie();
      }
        this.characters[word[index]].learn(word, index + 1);
      } else {
        this.isWord = true;
      }
      return this;
  };
    // This function should add the given word,
    // starting from the given index,
    // to this Trie.

    // It will be recursive.  It will tell
    // the correct child of this Trie to learn the word
    // starting from a later index.

    // Consider what the learn function should do
    // when it reaches the end of the word?
    // A word does not necessarily end at a leaf.
    // You must mark nodes which are the ends of words,
    // so that the words can be reconstructed later.

  Trie.prototype.getWords = function(words, currentWord){
    words = words || [];
    currentWord = currentWord || "";
    console.dir(currentWord);
    // This function will return all the words which are
    // contained in this Trie.
    // it will use currentWord as a prefix,
    // since a Trie doesn't know about its parents.
    if (this.isWord) {
      words.push(currentWord);
    }
    for (var character in this.characters){
      this.characters[character].getWords(words, currentWord + character)
    }
    return words;
  };

  Trie.prototype.find = function(word, index){
    index = index || 0;
    // This function will return the node in the trie
    // which corresponds to the end of the passed in word.
    if (index === word.length) {
      return this;
    }

    if (this.characters[word[index]] !== undefined && index < word.length){
        return this.characters[word[index]].find(word, index + 1);
      } 
    // Be sure to consider what happens if the word is not in this Trie.
  };

  Trie.prototype.autoComplete = function(prefix){
    // This function will return all completions 
    // for a given prefix.
    // It should use find and getWords.
    var foundNode = this.find(prefix);
    var words = [];
    if(foundNode) {
      foundNode.getWords(words, prefix);
    }
    return words;
  };

  try{
    module.exports = Trie;
  } catch(e){

  }

  $scope.contactNames = new Trie();
  


}]);