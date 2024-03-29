import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import * as authController from "../controllers/client/auth.controller" 

// Login with google
export const configLoginWithGG = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL_GG,
    passReqToCallback: true
  },
  
    async function(req, accessToken, refreshToken, profile, cb) {
      const typeAcc: string = "Google";
      const dataRaw = {
        fullName: profile.displayName,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : "",
        avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : profile.id
      }

      let user = await authController.upsertUserSocialMedia(req, typeAcc, dataRaw)
      return cb(null, user)
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}

// Login with facebook
export const configLoginWithFB = () => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL_FB,
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'displayName', 'photos']
  },
  
    async function(req, accessToken, refreshToken, profile, cb) {
      const typeAcc: string = "Facebook";
      const dataRaw = {
        fullName: profile.displayName,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : profile.id
      }

      let user = await authController.upsertUserSocialMedia(req, typeAcc, dataRaw)
      return cb(null, user)
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
}


