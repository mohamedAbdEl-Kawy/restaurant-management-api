
import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Follow, FollowSchema } from 'src/follows/schemas/follow.schema';
import { Restaurant, RestaurantSchema } from 'src/restaurants/schemas/restuarant.schema';

@Module({
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Follow.name, schema: FollowSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
})
export class RecommendationsModule {}

