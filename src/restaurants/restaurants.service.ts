
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restuarant.schema';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantsService {
  constructor(@InjectModel(Restaurant.name) private model: Model<Restaurant>) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    return this.model.create(createRestaurantDto);
  }

  findAll(cuisine?: string) {
    // filter by cuisine
    if (cuisine) {
      return this.model.find({ cuisines: cuisine });
    }
    return this.model.find();
  }

  async findOne(slug: string) {
    const restaurant = await this.model.findOne({ slug });
    if (!restaurant) {
      throw new NotFoundException('Restaurant Not Found');
    }
    return restaurant;
  }

  /**
   * Find nearby restaurants via MongoDB GeoSpatial Queries.
   * Uses MongoDB $near with 2dsphere index
   *
   * @param lng Longitude
   * @param lat Latitude
   * @returns restaurants within 1km
   */
  async findNearby(lng: number, lat: number) {
    const restaurants = await this.model.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: 1000,
        },
      },
    });

    return restaurants;
  }
}

