import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UsersRepository } from "./users.repository";

export class UsersService {
  private repo = new UsersRepository();

  async register(dto: RegisterDto) {
    const existing = await this.repo.findByEmail(dto.email);

    if (existing) {
      throw {
        code: "EMAIL_ALREADY_EXISTS",
        message: "Email already registered",
        field: "email",
      };
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.repo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.repo.findByEmail(dto.email);

    if (!user) {
      throw {
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
        field: null,
      };
    }

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      throw {
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
        field: null,
      };
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
