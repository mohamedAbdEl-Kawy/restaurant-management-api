import { Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { Follow } from 'src/follows/schemas/follow.schema';
import { Restaurant } from 'src/restaurants/schemas/restuarant.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Follow.name) private followModel: Model<Follow>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async recommend(userId: string) {
    const user = await this.userModel.findById(userId);

    // Step 1 - Find other users who share the same Favorite cuisine as the user Id in the input.
    const similarUsers = await this.userModel.find({
      favoriteCuisines: { $in: user.favoriteCuisines },
      _id: { $ne: user._id },
    });

    const similarUserIds = similarUsers.map((u) => u._id);

    // Step 2 - Retrieve the aggregated list of restaurants that are followed by those users (from step 1).
    const follows = await this.followModel.find({
      userId: { $in: similarUserIds.map((id) => id.toString()) },
    });

    const restaurantIds = [...new Set(follows.map((f) => f.restaurantId))];

    const restaurants = await this.restaurantModel.find({
      _id: { $in: restaurantIds },
    });

    // Step 3 - Respond with the list of users from Step 1 and the list of restaurants from Step 2.
    return {
      similarUsers,
      recommendedRestaurants: restaurants,
    };
  }
}
