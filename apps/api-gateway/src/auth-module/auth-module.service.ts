import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthModuleDto } from './dto/create-auth-module.dto';
import { UpdateAuthModuleDto } from './dto/update-auth-module.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthModuleService {
  constructor(@Inject('USERS_CLIENT') private authClient: ClientProxy) {}
  create(createAuthModuleDto: CreateAuthModuleDto) {
    return 'This action adds a new authModul';
  }

  findAll() {
     return this.authClient.send('users.findAll', {});
  }

  findOne(id: number) {
    return `This action returns a #${id} authModule`;
  }

  update(id: number, updateAuthModuleDto: UpdateAuthModuleDto) {
    return `This action updates a #${id} authModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} authModule`;
  }
}
