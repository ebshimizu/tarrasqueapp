import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PasswordResetToken } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { config } from '../config';
import { toMillisecondsFromString } from '../helpers';
import { PasswordResetDto } from './dto/password-reset.dto';
import { GenericTokensService } from './generic-tokens.service';

@Injectable()
export class PasswordResetTokensService {
  private logger: Logger = new Logger(PasswordResetTokensService.name);

  constructor(private prisma: PrismaService, private readonly genericTokensService: GenericTokensService) {}

  /**
   * Get token by value
   * @param value - The token's value
   * @returns The token
   */
  async getToken(value: string): Promise<PasswordResetToken> {
    this.logger.verbose(`📂 Getting password reset token by value "${value}"`);
    try {
      // Ensure the token exists
      const token = await this.prisma.passwordResetToken.findUniqueOrThrow({ where: { value } });
      this.logger.debug(`✅️ Found password reset token by value "${value}"`);
      // Return the token
      return token;
    } catch (error) {
      this.logger.error(`🚨 Failed to get password reset token by value "${value}"`);
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Create a new token for password reset
   * @param data - The token's data
   * @returns The created token
   */
  async createToken(data: PasswordResetDto): Promise<PasswordResetToken> {
    this.logger.verbose(`📂 Creating password reset token for user "${data.userId}"`);
    try {
      // Delete any existing tokens for the user
      await this.prisma.passwordResetToken.deleteMany({ where: { userId: data.userId } });
      // Create the token
      const token = await this.prisma.passwordResetToken.create({
        data: {
          value: this.genericTokensService.generateToken({ userId: data.userId }),
          userId: data.userId,
        },
      });
      this.logger.debug(`✅️ Created password reset token for user "${data.userId}"`);
      return token;
    } catch (error) {
      this.logger.error(`🚨 Failed to create password reset token for user "${data.userId}"`);
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Delete token by value
   * @param value - The token's value
   * @returns Deleted token
   */
  async deleteToken(value: string): Promise<PasswordResetToken> {
    this.logger.verbose(`📂 Deleting password reset token by value "${value}"`);
    try {
      // Delete the token
      const token = await this.prisma.passwordResetToken.delete({ where: { value } });
      this.logger.debug(`✅️ Deleted password reset token by value "${value}"`);
      return token;
    } catch (error) {
      this.logger.error(`🚨 Failed to delete password reset token by value "${value}"`);
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * Remove old tokens at midnight
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeOldTokens(): Promise<void> {
    this.logger.verbose(`📂 Removing old password reset tokens`);
    // Convert the expiration time to milliseconds
    const expirationTime = toMillisecondsFromString(config.JWT_GENERIC_TOKEN_EXPIRATION_TIME);
    // Get the expiry date by subtracting the expiration time from the current date
    const expiryDate = new Date(Date.now() - expirationTime);
    // Delete the password reset tokens
    await this.prisma.passwordResetToken.deleteMany({ where: { createdAt: { lte: expiryDate } } });
    this.logger.debug(`✅️ Removed old password reset tokens`);
  }
}
