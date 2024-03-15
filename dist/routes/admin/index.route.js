"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const config_1 = require("../../config/config");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    const PATCH_ADMIN = `/${config_1.systemConfig.prefixAdmin}`;
    app.use(PATCH_ADMIN + '/dashboard', dashboard_route_1.dashboardRouter);
    app.use(PATCH_ADMIN + '/topics', topic_route_1.topicRouter);
    app.use(PATCH_ADMIN + '/songs', song_route_1.songRouter);
    app.use(PATCH_ADMIN + '/upload', upload_route_1.uploadRouter);
};
exports.default = adminRoutes;
