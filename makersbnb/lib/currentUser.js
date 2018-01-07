

UserSession = function() {
  this.currentUser = null
  this.search = null

  this.setCurrentUser = function(new_user) {
    this.currentUser = new_user
  };

  this.removeCurrentUser = function () {
    this.currentUser = null
  };

  this.currentUserSearch = function(search) {
    this.search = search
  }

}
