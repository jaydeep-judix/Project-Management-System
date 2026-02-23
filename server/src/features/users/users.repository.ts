import { UserModel } from "./users.model";
import { RegisterDto } from "./dto/register.dto";

export class UsersRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findById(id: string) {
    return UserModel.findById(id).select("-password");
  }

  async create(data: RegisterDto & { password: string }) {
    return UserModel.create(data);
  }
}
