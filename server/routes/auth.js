'use strict'

module.exports = {
  'GET /login': {
    handler: 'AuthController.create',
    config: { auth: 'github' }
  },

  'GET /logout': 'AuthController.delete',

  'GET /current_user': {
    handler: 'AuthController.read',
    config: { auth: 'cookie' }
  }
}
