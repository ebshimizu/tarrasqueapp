export enum SetupStep {
  DATABASE = 1,
  USER = 2,
  CAMPAIGN = 3,
  MAP = 4,
  COMPLETED = 5,
}

export interface SetupInterface {
  step: SetupStep;
  completed: boolean;
}

export interface UserInterface {
  id: string;
  name: string;
  displayName: string;
  email: string;
  // Avatar
  avatar?: MediaInterface;
  avatarId?: string;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Campaigns
  createdCampaigns: CampaignInterface[];
  playerCampaigns: CampaignInterface[];
  // Order of campaigns
  campaignOrder: string[];
}

export interface CampaignInterface {
  id: string;
  name: string;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Maps
  maps: MapInterface[];
  // Players
  players: UserInterface[];
  // Created by
  createdBy: UserInterface;
  createdById: string;
}

export interface MapInterface {
  id: string;
  name: string;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Media
  media: MediaInterface[];
  mediaIds: string[];
  selectedMediaId: string;
  // Campaign
  campaign: CampaignInterface;
  campaignId: string;
  // Created by
  createdBy: UserInterface;
  createdById: string;
}

export interface MovementInterface {
  id: string;
  burrow: number;
  climb: number;
  fly: number;
  hover: boolean;
  swim: number;
  walk: number;
}

export interface HitPointsInterface {
  id: string;
  current: number;
  maximum: number;
  temporary: number;
  formula: string;
}

export interface ArmorClassInterface {
  id: string;
  value: number;
  description: string;
}

export interface SensesInterface {
  id: string;
  blindsight: number;
  darkvision: number;
  tremorsense: number;
  truesight: number;
}

export interface AbilityInterface {
  id: string;
  name: string;
  shortName: string;
  score: number;
  modifier: number;
  save: number;
  // Skills
  skills: SkillInterface[];
}

export interface SkillInterface {
  id: string;
  name: string;
  level: number;
  bonus: number;
  // Ability
  ability: AbilityInterface;
  abilityId: string;
}

export interface CurrenciesInterface {
  id: string;
  copper: number;
  silver: number;
  gold: number;
  electrum: number;
  platinum: number;
}

export enum CharacterSizeEnum {
  Tiny = 'Tiny',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  Huge = 'Huge',
  Gargantuan = 'Gargantuan',
}

export enum AlignmentEnum {
  LawfulGood = 'Lawful Good',
  NeutralGood = 'Neutral Good',
  ChaoticGood = 'Chaotic Good',
  LawfulNeutral = 'Lawful Neutral',
  Neutral = 'Neutral',
  ChaoticNeutral = 'Chaotic Neutral',
  LawfulEvil = 'Lawful Evil',
  NeutralEvil = 'Neutral Evil',
  ChaoticEvil = 'Chaotic Evil',
}

export interface PlayerCharacterInterface {
  id: string;
  name: string;
  size: CharacterSizeEnum;
  alignment: AlignmentEnum;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Armor Class
  armorClass: ArmorClassInterface;
  // Hit Points
  hitPoints: HitPointsInterface;
  // Movement
  movement: MovementInterface;
  // Senses
  senses: SensesInterface;
  // Currencies
  currencies: CurrenciesInterface;
  // Abilities
  abilities: AbilityInterface[];
  // Skills
  skills: SkillInterface[];
  // Tokens
  tokens: TokenInterface[];
  // Media
  media: MediaInterface[];
  mediaIds: string[];
  // Created by
  createdBy: UserInterface;
  createdById: string;
  // Controlled by
  controlledBy: UserInterface[];
  // Campaign
  campaign: CampaignInterface;
  campaignId: string;
}

export interface NonPlayerCharacterInterface {
  id: string;
  name: string;
  size: CharacterSizeEnum;
  alignment: AlignmentEnum;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Armor Class
  armorClass: ArmorClassInterface;
  // Hit Points
  hitPoints: HitPointsInterface;
  // Movement
  movement: MovementInterface;
  // Senses
  senses: SensesInterface;
  // Abilities
  abilities: AbilityInterface[];
  // Skills
  skills: SkillInterface[];
  // Tokens
  tokens: TokenInterface[];
  // Media
  media: MediaInterface[];
  mediaIds: string[];
  // Created by
  createdBy: UserInterface;
  createdById: string;
  // Controlled by
  controlledBy: UserInterface[];
  // Campaign
  campaign: CampaignInterface;
  campaignId: string;
}

export interface DimensionsInterface {
  width: number;
  height: number;
}

export interface FileInterface {
  id: string;
  name: string;
  type: string;
  extension: string;
  size: number;
  width?: number;
  height?: number;
}

export interface MediaInterface {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number;
  format: string;
  extension: string;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // Created by
  createdBy: UserInterface;
  createdById: string;
}

export interface TokenInterface {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  // DateTime
  createdAt: string;
  updatedAt: string;
  // User
  createdBy: UserInterface;
  createdById: string;
  // Map
  map: MapInterface;
  mapId: string;
  // Player Character
  playerCharacter?: PlayerCharacterInterface;
  playerCharacterId?: string;
  // Non Player Character
  nonPlayerCharacter?: NonPlayerCharacterInterface;
  nonPlayerCharacterId?: string;
}
