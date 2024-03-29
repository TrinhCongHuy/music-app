import { Router } from "express";
import multer from "multer";
const router: Router = Router();
const upload = multer();

import * as controller from "../../controllers/client/user.controller";
import * as uploadCloud from "../../middleware/client/uploadCloud.middleware";
import * as validate from '../../validates/client/user.validate'


router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot", controller.forgotPasswordPost);

router.get("/password/otp", controller.otpPassword);

router.post("/password/otp", controller.otpPasswordPost);

router.get("/password/reset", controller.resetPassword);

router.post("/password/reset", controller.resetPasswordPost);

router.get("/infoUser", controller.infoUser);

router.get(
  "/infoUser/edit/:id",
  controller.editUser
);

router.patch(
    "/infoUser/edit/:id",
    upload.single("avatar"),
    uploadCloud.uploadSingle,
    validate.updateInfoPost,
    controller.editUserPost
); 



export const userRouter: Router = router;
