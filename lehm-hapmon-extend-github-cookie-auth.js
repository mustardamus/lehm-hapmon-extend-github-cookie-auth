'use strict'

module.exports = {
  name: 'GitHub OAuth Authentication, Cookie Session Storage',
  description: 'https://github.com/mustardamus/lehm-hapmon-extend-github-cookie-auth',
  delimiters: '{{ }}',
  ignore: ['README.md', 'package.json'],

  after: function (srcPath, distPath, variables, utils) {
    let gitignorePath = distPath + '/.gitignore'
    let gitignoreContent = utils.Fs.readFileSync(gitignorePath, 'utf8')
    gitignoreContent += '\nserver/config/auth.js\n'

    console.log(utils.Chalk.yellow('Extending .gitignore...'))
    utils.Fs.writeFileSync(gitignorePath, gitignoreContent, 'utf8')

    console.log(utils.Chalk.green('\n\nExtend `./client/components/nav-bar/nav-bar.html`, or anywhere else, with:'))
    console.log(utils.Chalk.yellow(`
  <template v-if="userIsAuthenticated">
    <a class="nav-item" href="/logout">
      Logout
    </a>
  </template>

  <template v-else>
    <a class="nav-item" href="/login">
      Login
    </a>
  </template>
    `))

    console.log(utils.Chalk.green('\n\nExtend `./client/containers/nav-bar/nav-bar.js`'))
    console.log(utils.Chalk.yellow(`
  mounted () {
    this.$actions.auth.getCurrentUser()
  }
    `))

    console.log(utils.Chalk.green('\n\nInstalling dependencies...'))
    utils.Shell.exec('npm install bell hapi-auth-cookie --save')
  }
}
