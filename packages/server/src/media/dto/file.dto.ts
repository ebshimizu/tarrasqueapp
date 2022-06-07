import { IsNumber, IsString } from 'class-validator';

export class FileDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  extension: string;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  size: number;
}
