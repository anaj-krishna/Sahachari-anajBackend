import { IsNumber, Min } from 'class-validator';

export class UpdateStockDto {
  @IsNumber()
  @Min(0)
  quantity: number;
}
