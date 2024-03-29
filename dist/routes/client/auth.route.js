"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const controller = __importStar(require("../../controllers/client/auth.controller"));
const router = (0, express_1.Router)();
router.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
router.use(passport_1.default.initialize());
router.use(passport_1.default.session());
function isLoggedIn(req, res, next) {
    if (req.user) {
        res.cookie("tokenUser", req.user.tokenUser);
        res.redirect("/");
    }
    else {
        res.sendStatus(401);
    }
}
router.get("/google", passport_1.default.authenticate("google", { scope: ["email", "profile"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure"
}));
router.get('/facebook', passport_1.default.authenticate('facebook', { scope: ["email"] }));
router.get('/facebook/callback', passport_1.default.authenticate("facebook", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/facebook/failure"
}));
router.get("/protected", isLoggedIn, controller.upsertUserSocialMedia);
router.get("/google/failure", (req, res) => {
    res.send("Something went wrong");
});
router.get("/facebook/failure", (req, res) => {
    res.send("Something went wrong");
});
exports.authRouter = router;
