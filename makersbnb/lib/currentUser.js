

UserSession = function() {
  this.currentUser = null

  this.setCurrentUser = function(new_user) {
    this.currentUser = new_user
  };

  this.removeCurrentUser = function () {
    this.currentUser = null
  };

  this.hasCurrentUser = function(){
    return !(this.currentUser === null)
  }
}
