import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '../auth/auth.service';
import { CampaignsService } from '../campaigns/campaigns.service';
import { MapsService } from '../maps/maps.service';
import { UsersService } from '../users/users.service';
import { SetupController } from './setup.controller';
import { SetupService } from './setup.service';

@Module({
  controllers: [SetupController],
  providers: [SetupService, UsersService, CampaignsService, MapsService, AuthService],
  imports: [JwtModule.register({})],
})
export class SetupModule {}
