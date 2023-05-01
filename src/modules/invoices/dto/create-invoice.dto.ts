import "reflect-metadata";
import { ItemI } from "models/item/Item";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateItemDto } from "../../../models/item/dto/create-item.dto";
import { InvoiceI } from "../invoice.schema";

export type InvoiceCreate = Pick<InvoiceI, "items">;

export class CreateInvoiceDTO implements InvoiceCreate {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items!: ItemI[];
}
