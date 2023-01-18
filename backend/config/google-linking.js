const GoogleStrategy = require("passport-google-oauth2").Strategy;
const baseURL = process.env.NODE_ENV === "production" ? "https://ricebook-backend-final.herokuapp.com" : "";

module.exports = (passport) => {
    passport.use(
        "linkGoogleAccount",
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: baseURL + "/link/google/callback",
                passReqToCallback: true,
            },
            (request, accessToken, refreshToken, profile, done) => {
                return done(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};
