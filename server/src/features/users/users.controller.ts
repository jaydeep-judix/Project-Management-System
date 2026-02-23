import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { successResponse } from "../../common/utils/response";
import { AuthRequest } from "../../common/middleware/auth.middleware";

export class UsersController {
  private service = new UsersService();

  register = async (req: Request, res: Response) => {
    const result = await this.service.register(req.body);
    return res.status(201).json(successResponse(result));
  };

  login = async (req: Request, res: Response) => {
    const { user, token } = await this.service.login(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json(successResponse({ user }));
  };

  logout = async (_req: Request, res: Response) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return res.status(200).json(successResponse({ message: "Logged out" }));
  };
  me = async (req: AuthRequest, res: Response) => {
    const result = await this.service.me(req.user!.id);
    return res.status(200).json(successResponse(result));
  };
}
