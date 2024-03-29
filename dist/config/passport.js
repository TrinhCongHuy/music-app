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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configLoginWithFB = exports.configLoginWithGG = void 0;
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const authController = __importStar(require("../controllers/client/auth.controller"));
const configLoginWithGG = () => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL_GG,
        passReqToCallback: true
    }, function (req, accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeAcc = "Google";
            const dataRaw = {
                fullName: profile.displayName,
                email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : "",
                avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : profile.id
            };
            let user = yield authController.upsertUserSocialMedia(req, typeAcc, dataRaw);
            return cb(null, user);
        });
    }));
    passport_1.default.serializeUser(function (user, done) {
        done(null, user);
    });
    passport_1.default.deserializeUser(function (user, done) {
        done(null, user);
    });
};
exports.configLoginWithGG = configLoginWithGG;
const configLoginWithFB = () => {
    passport_1.default.use(new passport_facebook_1.Strategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL_FB,
        passReqToCallback: true,
        profileFields: ['id', 'emails', 'displayName', 'photos']
    }, function (req, accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const typeAcc = "Facebook";
            const dataRaw = {
                fullName: profile.displayName,
                email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : profile.id
            };
            let user = yield authController.upsertUserSocialMedia(req, typeAcc, dataRaw);
            return cb(null, user);
        });
    }));
    passport_1.default.serializeUser(function (user, done) {
        done(null, user);
    });
    passport_1.default.deserializeUser(function (user, done) {
        done(null, user);
    });
};
exports.configLoginWithFB = configLoginWithFB;
