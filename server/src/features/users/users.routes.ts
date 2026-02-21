import { Router } from "express";
import { UsersController } from "./users.controller";
import { validate } from "../../common/middleware/validate.middleware";
import { RegisterSchema } from "./dto/register.dto";
import { LoginSchema } from "./dto/login.dto";

const router = Router();
const controller = new UsersController();

router.post("/register", validate(RegisterSchema), controller.register);
router.post("/login", validate(LoginSchema), controller.login);

export default router;
