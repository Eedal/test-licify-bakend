import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class CreateItemDto {
  @IsString()
  readonly name!: string;

  @IsNumber()
  readonly quantity!: number;

  @IsNumber()
  readonly price!: number;

  @IsNumber()
  readonly iva!: number;

  @IsOptional()
  @IsNumber()
  readonly total?: number;
}
