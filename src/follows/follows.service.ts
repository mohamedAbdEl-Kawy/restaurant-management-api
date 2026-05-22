
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Follow } from './schemas/follow.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Restaurant } from 'src/restaurants/schemas/restuarant.schema';

@Injectable()
export class FollowsService {
  constructor(
    @InjectModel(Follow.name) private followModel: Model<Follow>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async follow(CreateFollowDto: CreateFollowDto) {
    const { userId, restaurantId } = CreateFollowDto;

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const restaurant = await this.restaurantModel.findById(restaurantId);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const existingFollow = await this.followModel.findOne({
      userId,
      restaurantId,
    });

    if (existingFollow) {
      throw new ConflictException('User already follows this restaurant');
    }

    return this.followModel.create(CreateFollowDto);
  }

  async findAll() {
    return this.followModel.find();
  }
}

