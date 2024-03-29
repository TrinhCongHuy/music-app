import { Router } from "express";
import multer from "multer";
const router: Router = Router();
const upload = multer();

import * as controller from "../../controllers/admin/user.controller";
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";


router.get("/", controller.index);

export const usersRouter: Router = router;
