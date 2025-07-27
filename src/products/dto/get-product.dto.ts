import { IsNumberString, IsOptional } from 'class-validator'

export class GetProductsQueryDTO {
    @IsOptional()
    @IsNumberString({}, {message: 'La categoria debe ser un numero'})
    category_id?: number
}