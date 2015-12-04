var app = angular.module('redditApp', [])

app.config(function( $locationProvider){
  $locationProvider.html5Mode(true)
})

app.controller('reddit', function($scope, $http){
  $scope.newPost = []
  $scope.sortOrder = '-rating';

 $http.get('/reddit').then(function(response){
    for (var i = 0; i < response.data.length; i++) {
      $scope.newPost.push(response.data[i]);
    }
  })

  $scope.insert = function(isValid) {
    if (isValid) {
      $scope.post = {title: $scope.title, author: $scope.author,
      image: $scope.image, desc: $scope.desc, date: new Date(), rating: 0, comments: [] }
      
      $http.post('/reddit', $scope.post).then(function(response){
        $scope.post._id = response.data._id;
        $scope.newPost.push($scope.post)
        $scope.post = {};
        $scope.title = '', $scope.author = '', $scope.image = '', $scope.desc = '';
        $scope.showForm();
      });
      
    }
    else { $scope.error = true; }
  }

  $scope.showForm = function() {
   this.show = !this.show
  }

  $scope.addComment = function() {
   this.add = !this.add;
  }

  $scope.hideComment = function() {
    console.log(this);
  this.add = !this.add;
  }

  $scope.hideShow = function() {
  this.hide = !this.hide;
  }

  $scope.showComments =  function() {
  $scope.showCom = true;
  }

  $scope.hideShow();

  $scope.submit = function(thisComment, isValid) {
      thisComment.post.comments.push(this.elem);
      $http.post('/reddit/' + this.post._id, this.post.comments);
      this.elem = {};
   }

  $scope.addRating = function(elem) {
  elem.post.rating += 1;
  }

  $scope.minusRating = function(elem){
  elem.post.rating -= 1;
 }
})
