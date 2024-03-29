import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import session from 'express-session'

import * as controller from "../../controllers/client/auth.controller"

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router: Router = Router();

// Sử dụng middleware session
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Sử dụng middleware Passport.js
router.use(passport.initialize());
router.use(passport.session());

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    res.cookie("tokenUser", req.user.tokenUser);
    res.redirect("/");
  } else {
    res.sendStatus(401);
  }
}

// Login with google
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure"
  })
);

// Login with facebook
router.get('/facebook', passport.authenticate('facebook',  { scope: ["email"] }));

router.get('/facebook/callback',
  passport.authenticate("facebook", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/facebook/failure"
  })
);



router.get("/protected", isLoggedIn, controller.upsertUserSocialMedia);

router.get("/google/failure", (req, res) => {
  res.send("Something went wrong");
});

router.get("/facebook/failure", (req, res) => {
  res.send("Something went wrong");
});

export const authRouter: Router = router;
