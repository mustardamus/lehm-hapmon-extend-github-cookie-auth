# GitHub Cookie Auth

tl;dr

- gets information about a user from the GitHub OAuth on `/login`
- saves/updates that info to the database, User model
- stores the current user in a cookie session
- logout on `/logout`

To secure a route, do:

    'POST /resources': {
      handler: 'ResourcesController.create',
      config: {
        auth: 'cookie'
      }
    }

To get the infos from the current logged in user, GET `/current_user`. It will
return a `Unauthorized` error if the user is not logged in.

On the client, you can call the action `this.$actions.auth.getCurrentuser()` to
hit that API endpoint. It will in turn set the global states:

- `this.$state.userIsAuthenticated` to `true`
- `this.$state.currentUser` to the `Object` that is returned from the
  `/current_user` endpoint

To get the current user in any Controller action you can access
`request.auth.credentials`. This represents the current User model, eg
`request.auth.credentials._id` or `request.auth.credentials.username`.

