import { Module } from '@nestjs/common';
import { AuthModuleController } from './auth-module.controller';
import { AuthModuleService } from './auth-module.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { KeycloackModule } from './resource/keycloack/keycloack.module';
// import { KeycloackModule } from './auth/keycloack/keycloack.module';
// import { KeycloackModule } from './keycloack/keycloack.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_CLIENT',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [AuthModuleController],
  providers: [AuthModuleService],
})
export class AuthModule {}
