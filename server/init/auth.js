/* global Config */
'use strict'

module.exports = (server) => {
  server.auth.strategy('cookie', 'cookie', {
    password: Config.auth.password,
    cookie: Config.auth.cookieName,
    isSecure: false,
    validateFunc: (request, cookie, cb) => {
      let user = cookie.currentUser

      if (user) {
        cb(null, true, user)
      } else {
        cb(null, false)
      }
    }
  })

  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: Config.auth.password,
    clientId: Config.auth.githubClientId,
    clientSecret: Config.auth.githubClientSecret,
    isSecure: false
  })
}
