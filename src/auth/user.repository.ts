import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async register(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(password, salt);
    const user = new User();

    user.salt = salt;
    user.username = username;
    user.password = hashedPassword;

    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('User already exists')
      }
      throw new InternalServerErrorException()
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}

export { UserRepository };
