import { IsMongoId } from 'class-validator';

export class AssignDeliveryDto {
  @IsMongoId()
  deliveryBoyId: string;
}
