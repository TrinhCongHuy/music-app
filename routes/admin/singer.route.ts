import { Router } from "express";
import multer from "multer";
const router: Router = Router();
const upload = multer();

import * as controller from "../../controllers/admin/singer.controller";
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";

router.get("/", controller.index);

router.get("/create", controller.create);

router.patch("/change-status/:status/:id", controller.changeStatus);


router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
);

router.delete("/delete/:id", controller.deleteItem);


export const singerRouter: Router = router;
