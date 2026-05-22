
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  findAll(@Query('cuisine') cuisine?: string) {
    return this.restaurantsService.findAll(cuisine);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.restaurantsService.findOne(slug);
  }

  @Get('nearby/search')
  findNearby(@Query('lng') lng: number, @Query('lat') lat: number) {
    return this.restaurantsService.findNearby(Number(lng), Number(lat));
  }
}

