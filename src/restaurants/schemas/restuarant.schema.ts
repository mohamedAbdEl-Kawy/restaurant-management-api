
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class Location {
  @Prop({
    type: String,
    enum: ['Point'],
    default: 'Point',
  })
  type: string;

  @Prop({
    type: [Number],
    required: true,
  })
  coordinates: number[];
}

@Schema()
export class Restaurant {
  @Prop({ required: true })
  englishName: string;

  @Prop({ required: true })
  arabicName: string;

  @Prop({ unique: true })
  slug: string;

  @Prop({ type: [String], required: true, min: 1, max: 3 })
  cuisines: string[];

  @Prop({ type: Location, required: true })
  location: Location;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
RestaurantSchema.index({ location: '2dsphere' });

