/* global Helpers, User */
'use strict'

module.exports = {
  create (request, reply) {
    if (!request.auth.isAuthenticated) {
      reply(Helpers.boom.preconditionFailed('Not logged in'))
    } else {
      let profile = request.auth.credentials.profile
      let username = profile.username
      let token = request.auth.credentials.token

      User.findOne({ username }, (err, user) => {
        if (err) {
          return reply(Helpers.boom.badImplementation('Find user'))
        }

        if (user) {
          user.token = token
          user.profile = profile

          user.save((err) => {
            if (err) {
              reply(Helpers.boom.badImplementation('Update user'))
            } else {
              request.cookieAuth.set({ currentUser: user })
              reply.redirect('/')
            }
          })
        } else {
          let user = new User({ username, token, profile })

          user.save((err) => {
            if (err) {
              return reply(Helpers.boom.badImplementation('Update user'))
            }

            request.cookieAuth.set({ currentUser: user })
            reply.redirect('/')
          })
        }
      })
    }
  },

  read (request, reply) {
    if (request.auth.isAuthenticated) {
      User.findById(request.auth.credentials._id, (err, user) => {
        if (err) {
          return reply(Helpers.boom.badImplementation('Find current user'))
        }

        reply(user.toJSON())
      }) 
    } else {
      reply(Helpers.boom.preconditionFailed('Not logged in'))
    }
  },

  delete (request, reply) {
    request.cookieAuth.clear()
    reply.redirect('/')
  }
}
