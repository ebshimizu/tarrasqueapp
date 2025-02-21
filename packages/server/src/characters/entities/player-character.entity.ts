import { ValidateNested } from 'class-validator';

import { CampaignEntity } from '../../campaigns/entities/campaign.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { PlayerCharacterBaseEntity } from './player-character-base.entity';

export class PlayerCharacterEntity extends PlayerCharacterBaseEntity {
  // Created by
  @ValidateNested()
  createdBy: UserEntity;

  // Campaign
  @ValidateNested()
  campaign: CampaignEntity;
}
