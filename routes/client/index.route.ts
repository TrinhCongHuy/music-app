import { Express } from "express";
import { topicRouter } from "./topic.route";
import { songRouter } from "./song.route";
import { favoriteSongRouter } from "./favorite-song.route";
import { searchRouter } from "./search.route";
import { userRouter } from "./user.route";
import * as userMiddleware from "../../middleware/client/user.middleware";
import { homeRouter } from "./home.route";
import { authRouter } from "./auth.route";
import * as authMiddleware from'../../middleware/client/auth.middleware'



const clientRoute = (app: Express): void => {
    app.use(userMiddleware.infoUser)
    app.use('/', homeRouter)
    app.use('/topics', topicRouter)
    app.use('/songs', songRouter)
    app.use('/favorite-songs', authMiddleware.requireAuth, favoriteSongRouter)
    app.use('/search', searchRouter)
    app.use('/user', userRouter)
    app.use('/auth', authRouter)


}

export default clientRoute
