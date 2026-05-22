
import { IsString } from "class-validator";

export class CreateFollowDto {
  @IsString()
  userId: string;

  @IsString()
  restaurantId: string;
}
