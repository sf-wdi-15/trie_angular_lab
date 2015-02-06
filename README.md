# Trie Angular
## An Autocompletion Lab

For this weekend lab you'll be practicing the modular Angular style we dicussed ealier this week, i.e. separating `controllers`, `directives`, and `main` application logic into different files.


You'll be making a `Contacts` application where a contact has the following:

```
name:string cell:string home:string address:string
```

## Part 1

You'll be creating a contacts application where you can do the following:

* User can create a contact
* User can view all contacts on page
* User can delete a contact
* User can edit a contact

### Bonus Features 

* User can view contacts sorted by name. See `ng-filter`.
* User has a `nav` that allows them to click a letter to get contacts whose name starts with that character.

## Part 2 -- Learning

* Include our `trie.js` in our `application.js` add a `$scope.contactNames` that is a `new Trie`. When you get all of your contacts you should learn each `contact.name` into the `$scope.contactNames` trie. 
* When a user creates a contact add their name to the `$scope.contactNames`.

## Part 3 -- Suggesting

* Add an input to your page with `ng-model="searchName"` and use `ng-change` to call a `getSuggestions` function that should console.log `$scope.searchName`.
* Update you `getSuggestions` function to call `$scope.contactName.autoComplete($scope.searchName)`. 
* Set the results of the `autoComplete` to `$scope.searchResults`. 
* Add a `div` to the application.html.erb to `ng-repeat` through each `result in searchResults`.
* Add an `ng-click` to each div in `searchResults` that runs `findContact` and `console.log` the `result` that was clicked.
* Update your `findContact` method in your application to iterate through the `$scope.contacts` to find the `contact` whose `name` matches the result. Then `console.log` that contact
* After you find the `contact` set them to `$scope.foundContact` and add a `div` to your `application.html.erb` that displays the `foundContact` info.
* Use `ng-show` to only display `foundContact` info if there is a `foundContact`.

## Bonus

* Review directives to create directives to help you make your own templates for components from part 3.

