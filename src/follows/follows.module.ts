
import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Restaurant, RestaurantSchema } from 'src/restaurants/schemas/restuarant.schema';
import { Follow, FollowSchema } from './schemas/follow.schema';

@Module({
  controllers: [FollowsController],
  providers: [FollowsService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Follow.name, schema: FollowSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
})
export class FollowsModule {}

