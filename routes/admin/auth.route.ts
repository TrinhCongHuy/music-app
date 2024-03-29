import { Router } from "express";
const router: Router = Router();
import * as controller from'../../controllers/admin/auth.controller'

router.get('/login', controller.login)

router.post('/login', controller.loginPost)

router.get('/logout', controller.logout)


// router.get('/logout', controller.logout)

export const authRouter: Router = router;