myApp.factory('Authentication',
  ['$rootScope','$location', '$firebaseAuth',
  function($rootScope,$location, $firebaseAuth) {

  var ref = firebase.database().ref('users');
  var auth = $firebaseAuth();

  return {
    login: function(user) {
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
        $location.path('/success');
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); //$signInWithEmailAndPassword
    }, //login

    logout: function() {
      auth.$signOut();
    }, // logout function

    register: function(user) {
      auth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(function (regUser) {
       var database = firebase.database(); // storing database in database variable.
       var refe = database.ref('users'); // creating first tree with users.
       var data = {
         firstname: user.firstName,
         lastname: user.lastName,
         bio: user.bio,
         email: user.email,
         BirthDate: user.birthDate,
         password: user.password
       }
       ref.push(data); // push the data to ref= users tree.
        $rootScope.message = "Hi " + user.firstName +
        ", Thanks for registering. Now login.";
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); //createUserWithEmailAndPassword
    } //register

  }; //return
}]); //factory