var ContactsFactories = angular.module("ContactsFactories", []);

// We want a factory that is going to help us
// when doing CRUD with a Contact or Contacts
// i.e. we need something to help do http
ContactsFactories.factory("Contacts", ["$http", function($http){
  return {
    all: function() {
      return $http.get("/contacts.json");
    },
    create: function(contact){
      return $http.post("/contacts.json", {contact: contact});
    },
    update: function(contact){
      return $http.patch("/contacts/" + contact.id + ".json", {contact: contact});
    },
    delete: function(contact){
      return $http.delete("/contacts/" + contact.id + ".json");
    }
  };
}]);

ContactsFactories.factory("Trie", function () {
  function Trie(){
    this.characters = {};
  };

  Trie.prototype.learn = function(word, index){
    index = index || 0;
    var letter = word[index];
    if (index < word.length) {
      // recursive condition
      if (this.characters[letter] === undefined) {
        this.characters[letter] = new Trie();
      }
      // recursively learn at next letter position
      this.characters[letter].learn(word, index + 1);
    } else {
      // terminal condition
      this.isWord  = true;
    }
    return this;
  };

  Trie.prototype.getWords = function(words, currentWord){
    words = words || [];
    currentWord = currentWord || "";

    if (this.isWord) {
      words.push(currentWord);
    }
    for (var character in this.characters){
      this.characters[character].getWords(words, currentWord + character);
    }
    return words;
  };

  Trie.prototype.find = function(word, index){
    index = index || 0;
    if (index === word.length) {
      return this;
    }

    if (this.characters[word[index]] !== undefined && index < word.length) {
        return this.characters[word[index]].find(word, index + 1);
    }
  };

  Trie.prototype.autoComplete = function(prefix){
    var foundNode = this.find(prefix);
    var words = [];
    if(foundNode) {
      foundNode.getWords(words, prefix);
    }
    return words;
  };

  return Trie;
});