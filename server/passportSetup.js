const passport       = require('passport'),
      passportJWT    = require("passport-jwt"),
      JWTStrategy    = passportJWT.Strategy,
      ExtractJWT     = passportJWT.ExtractJwt;

const User = require('./models/user');

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Bountiful Rewards Await'
}, async function (jwtPayload, done) {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    try {
      const user = await User.findOne({_id: jwtPayload.id});
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));
