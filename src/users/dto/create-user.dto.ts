
import { IsArray, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsArray()
  favoriteCuisines: string[];
}

