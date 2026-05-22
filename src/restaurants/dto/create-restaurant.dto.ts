
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

class LocationDto {
  @IsEnum(['Point'])
  type: string;

  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: number[];
}

export class CreateRestaurantDto {
  @IsString()
  englishName: string;

  @IsString()
  arabicName: string;

  @IsString()
  slug: string;

  @IsArray()
  cuisines: string[];

  @ValidateNested()
  @Type(() => LocationDto)
  @IsNotEmpty()
  location: LocationDto;
}

