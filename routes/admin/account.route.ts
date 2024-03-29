import { Router } from "express";
import multer from "multer";
const router: Router = Router();
const upload = multer();

import * as controller from "../../controllers/admin/account.controller";
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";


router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
);

export const accountsRouter: Router = router;
