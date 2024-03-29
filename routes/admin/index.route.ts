import { Express } from "express";
import { dashboardRouter } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRouter } from "./topic.route";
import { songRouter } from "./song.route";
import { uploadRouter } from "./upload.route";
import { singerRouter } from "./singer.route";
import { rolesRouter } from "./roles.route";
import { accountsRouter } from "./account.route";
import { usersRouter } from "./user.route";
import * as authMiddleware from '../../middleware/admin/auth.middleware'
import { authRouter } from "./auth.route";

const adminRoutes = (app: Express): void => {
    const PATCH_ADMIN = `/${systemConfig.prefixAdmin}`
    app.use(PATCH_ADMIN + '/dashboard', authMiddleware.requireAuth, dashboardRouter)
    app.use(PATCH_ADMIN + '/topics', authMiddleware.requireAuth, topicRouter)
    app.use(PATCH_ADMIN + '/songs', authMiddleware.requireAuth, songRouter)
    app.use(PATCH_ADMIN + '/singers', authMiddleware.requireAuth, singerRouter)
    app.use(PATCH_ADMIN + '/roles', authMiddleware.requireAuth, rolesRouter)
    app.use(PATCH_ADMIN + '/accounts', authMiddleware.requireAuth, accountsRouter)
    app.use(PATCH_ADMIN + '/users', authMiddleware.requireAuth, usersRouter)
    app.use(PATCH_ADMIN + '/upload', authMiddleware.requireAuth, uploadRouter)
    app.use(PATCH_ADMIN + '/auth', authRouter)



}

export default adminRoutes
