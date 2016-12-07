const request = require('../helpers/request')

module.exports = {
  getCurrentUser () {
    request('GET', 'current_user', (err, res) => {
      if (err) {
        this.$state.userIsAuthenticated = false
      } else {
        this.$state.userIsAuthenticated = true
        this.$state.currentUser = res
      }
    })
  }
}
