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
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const config_1 = require("../../config/config");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const singer_route_1 = require("./singer.route");
const roles_route_1 = require("./roles.route");
const account_route_1 = require("./account.route");
const user_route_1 = require("./user.route");
const authMiddleware = __importStar(require("../../middleware/admin/auth.middleware"));
const auth_route_1 = require("./auth.route");
const adminRoutes = (app) => {
    const PATCH_ADMIN = `/${config_1.systemConfig.prefixAdmin}`;
    app.use(PATCH_ADMIN + '/dashboard', authMiddleware.requireAuth, dashboard_route_1.dashboardRouter);
    app.use(PATCH_ADMIN + '/topics', authMiddleware.requireAuth, topic_route_1.topicRouter);
    app.use(PATCH_ADMIN + '/songs', authMiddleware.requireAuth, song_route_1.songRouter);
    app.use(PATCH_ADMIN + '/singers', authMiddleware.requireAuth, singer_route_1.singerRouter);
    app.use(PATCH_ADMIN + '/roles', authMiddleware.requireAuth, roles_route_1.rolesRouter);
    app.use(PATCH_ADMIN + '/accounts', authMiddleware.requireAuth, account_route_1.accountsRouter);
    app.use(PATCH_ADMIN + '/users', authMiddleware.requireAuth, user_route_1.usersRouter);
    app.use(PATCH_ADMIN + '/upload', authMiddleware.requireAuth, upload_route_1.uploadRouter);
    app.use(PATCH_ADMIN + '/auth', auth_route_1.authRouter);
};
exports.default = adminRoutes;
