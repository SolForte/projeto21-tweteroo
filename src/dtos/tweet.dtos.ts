import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TweetDTO {
  @IsString()
  @IsNotEmpty({ message: 'All fields are required!' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'All fields are required!' })
  tweet: string;
}

export class PageDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page: string;
}
