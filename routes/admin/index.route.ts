import { Express } from "express";
import { dashboardRouter } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRouter } from "./topic.route";
import { songRouter } from "./song.route";
import { uploadRouter } from "./upload.route";

const adminRoutes = (app: Express): void => {
    const PATCH_ADMIN = `/${systemConfig.prefixAdmin}`
    app.use(PATCH_ADMIN + '/dashboard', dashboardRouter)
    app.use(PATCH_ADMIN + '/topics', topicRouter)
    app.use(PATCH_ADMIN + '/songs', songRouter)
    app.use(PATCH_ADMIN + '/upload', uploadRouter)


}

export default adminRoutes
