import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokenBaseEntity } from './entities/token-base.entity';
import { TokenEntity } from './entities/token.entity';

@Injectable()
export class TokensService {
  private logger: Logger = new Logger(TokensService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Get all tokens for a map
   */
  async getTokens(tokenIds: string[]): Promise<TokenEntity[]> {
    this.logger.verbose(`📂 Getting tokens"`);
    try {
      // Get the tokens
      const tokens = await this.prisma.token.findMany({
        where: { id: { in: tokenIds } },
        include: {
          playerCharacter: { include: { controlledBy: true, media: true } },
          nonPlayerCharacter: { include: { controlledBy: true, media: true } },
        },
      });
      this.logger.verbose(`📂 Found ${tokens.length} tokens"`);
      return tokens;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Get all tokens for a map
   */
  async getMapTokens(mapId: string): Promise<TokenEntity[]> {
    this.logger.verbose(`📂 Getting tokens for map "${mapId}"`);
    try {
      // Get the tokens
      const tokens = await this.prisma.token.findMany({
        where: { mapId },
        include: {
          playerCharacter: { include: { controlledBy: true, media: true } },
          nonPlayerCharacter: { include: { controlledBy: true, media: true } },
        },
      });
      this.logger.verbose(`📂 Found ${tokens.length} tokens for map "${mapId}"`);
      return tokens;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Create a token on a map
   */
  async createToken(data: CreateTokenDto, mapId: string, createdById: string): Promise<TokenEntity> {
    this.logger.verbose(`📂 Creating token at ${data.x}x${data.y} on map "${mapId}"`);
    try {
      // Create the token
      const token = await this.prisma.token.create({
        data: { ...data, mapId, createdById },
        include: {
          playerCharacter: { include: { controlledBy: true, media: true } },
          nonPlayerCharacter: { include: { controlledBy: true, media: true } },
        },
      });
      this.logger.verbose(`✅️ Created token "${token.id}"`);
      return token;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Create tokens on a map
   */
  async createTokens(data: CreateTokenDto[], mapId: string, createdById: string): Promise<TokenEntity[]> {
    const promises = data.map((token) => this.createToken(token, mapId, createdById));
    return await Promise.all(promises);
  }

  /**
   * Update a token on a map
   */
  async updateToken(tokenId: string, data: UpdateTokenDto): Promise<TokenBaseEntity> {
    this.logger.verbose(`📂 Updating token "${tokenId}"`);
    try {
      // Update the token
      const token = await this.prisma.token.update({ where: { id: tokenId }, data });
      this.logger.verbose(`✅️ Updated token "${token.id}"`);
      return token;
    } catch (error) {
      this.logger.error(`🚨 Token "${tokenId}" not found`);
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Update tokens on a map
   */
  async updateTokens(tokens: UpdateTokenDto[]): Promise<TokenBaseEntity[]> {
    const promises = tokens.map((token) => this.updateToken(token.id, token));
    return await Promise.all(promises);
  }

  /**
   * Delete a token on a map
   */
  async deleteToken(tokenId: string): Promise<TokenBaseEntity> {
    this.logger.verbose(`📂 Deleting token "${tokenId}"`);
    try {
      // Delete the token
      const token = await this.prisma.token.delete({ where: { id: tokenId } });
      this.logger.verbose(`✅️ Deleted token "${token.id}"`);
      return token;
    } catch (error) {
      this.logger.error(`🚨 Token "${tokenId}" not found`);
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Delete tokens on a map
   */
  async deleteTokens(tokenIds: string[]): Promise<TokenBaseEntity[]> {
    const promises = tokenIds.map((tokenId) => this.deleteToken(tokenId));
    return await Promise.all(promises);
  }
}
