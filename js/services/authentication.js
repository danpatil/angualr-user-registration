myApp.factory('Authentication',
  ['$rootScope', '$firebaseAuth',
  function($rootScope, $firebaseAuth) {

  var ref = firebase.database().ref('users');
  var auth = $firebaseAuth();

  return {
    login: function(user) {
      // $rootScope.message = "Welcome " + $rootScope.user.email;
    }, //login

    register: function(user) {
      auth.$createUserWithEmailAndPassword(
        user.email,
        user.password
      ).then(function (regUser) {
       var database = firebase.database(); // storing database in database variable.
       var refe = database.ref('users'); // creating first tree with users.
       var data = {
         date: firebase.database.ServerValue.TIMESTAMP,
         firstname: user.firstName,
         lastname: user.lastName,
         bio: user.bio,
         email: user.email
       }
       ref.push(data); // push the data to ref= users tree.
        $rootScope.message = "Hi " + user.firstName +
        ", Thanks for registering";
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); //createUserWithEmailAndPassword
    } //register

  }; //return
}]); //factory