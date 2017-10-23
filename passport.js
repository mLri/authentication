const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { JWT_SECRET } = require('./config/token');
const User = require('./models/user');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try{

        console.log('payload =>', payload);
        console.log('done =>', done);

        //find the user specified in token
        const user = await User.findById(payload.sub);

        //if !user, handle it.
        if(!user){
            return done(null, false);
        }

        //return the user
        done(null, user);

    }catch(error){
        done(error, false);
    }
}));