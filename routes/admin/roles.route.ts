import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/roles.controller";

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.get("/permissions", controller.permissions);

router.patch("/permissions", controller.permissionsPatch);





export const rolesRouter: Router = router;