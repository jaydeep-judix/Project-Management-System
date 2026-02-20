import { UserModel } from "./users.model";
import { RegisterDto } from "./dto/register.dto";

export class UsersRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async create(data: RegisterDto & { password: string }) {
    return UserModel.create(data);
  }
}
