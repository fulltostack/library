const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy

const User = require('../app/models').User
const AuthenticationError = require('../app/errors/authenticationError')

function initPassport () {
  passport.use(new BasicStrategy(async (email, password, done) => {
    try {
      const user = await User.count({ where: { email, password } })

      if (!user) {
        return done(new AuthenticationError(`User Does Not Exist!`))
      }
      return done(null, user)
    } catch (error) {
      done(error)
    }
  }))
}

module.exports = initPassport