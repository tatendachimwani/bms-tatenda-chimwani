import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsNumber()
  publishedYear?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
