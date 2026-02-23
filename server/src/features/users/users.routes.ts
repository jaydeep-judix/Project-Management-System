import { Router } from "express";
import { UsersController } from "./users.controller";
import { validate } from "../../common/middleware/validate.middleware";
import { auth } from "../../common/middleware/auth.middleware";
import { RegisterSchema } from "./dto/register.dto";
import { LoginSchema } from "./dto/login.dto";

const router = Router();
const controller = new UsersController();

router.post("/register", validate(RegisterSchema), controller.register);
router.post("/login", validate(LoginSchema), controller.login);
router.post("/logout", controller.logout);
router.get("/me", auth, controller.me);

export default router;
