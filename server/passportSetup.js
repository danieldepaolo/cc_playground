const passport       = require('passport'),
      passportJWT    = require("passport-jwt"),
      JWTStrategy    = passportJWT.Strategy,
      ExtractJWT     = passportJWT.ExtractJwt;

const User = require('./models/user');

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'Bountiful Rewards Await'
}, function (jwtPayload, done) {
    console.log("JWT payload: ", jwtPayload);
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findOne({_id: jwtPayload.id}, (err, user) => {
      console.log('JWT Strat user: ', user);
      if (err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }
));
