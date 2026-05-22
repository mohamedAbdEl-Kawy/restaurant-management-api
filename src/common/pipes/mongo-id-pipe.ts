
import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export class MongoIDPipe implements PipeTransform {
  transform(value: string) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('Invalid MongoDB ObjectId');
    }
    return value;
  }
}

