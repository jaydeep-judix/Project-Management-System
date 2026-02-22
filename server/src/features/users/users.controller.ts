import { Request, Response } from "express";
import { UsersService } from "./users.service";
import { successResponse } from "../../common/utils/response";

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
    });

    return res.status(200).json(successResponse({ user }));
  };
}
