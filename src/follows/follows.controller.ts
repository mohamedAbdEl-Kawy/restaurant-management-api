
import { Controller, Get, Post, Body } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follows')
export class FollowsController {
  constructor(private service: FollowsService) {}

  @Post()
  follow(@Body() dto: CreateFollowDto) {
    return this.service.follow(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}

