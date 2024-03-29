import { Router } from "express";
import multer from "multer";
const router: Router = Router();
const upload = multer();

import * as controller from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middleware/admin/uploadCloud.middleware";

router.get("/", controller.index);

router.get("/create", controller.create);

router.patch("/change-status/:status/:id", controller.changeStatus);


router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  controller.editPatch
);

router.delete("/delete/:id", controller.deleteItem);

export const songRouter: Router = router;
