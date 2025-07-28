import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDTO } from './dto/get-product.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

//INICIO DE CORRECION DE CODIGO EN products.controllers.ts (category se cambio a categoryId)
  @Get()
findAll(@Query() query: GetProductsQueryDTO) {
  const categoryId = query.category_id ? +query.category_id : undefined;
  const take = query.take ? query.take : 10
  const skip = query.skip ? query.skip : 0
  return this.productsService.findAll(categoryId, take, skip);
}
//FIN DE CORRECION DE CODIGO EN products.controllers.ts (category se cambio a categoryId)

/*
  @Get()
  findAll(@Query() query: GetProductsQueryDTO) {
    const category = query.category_id ? query.category_id : null
    //console.log(category)
    //return this.productsService.findAll(category); //(Antes)
    //return this.productsService.findAll(category as number); // (Correccion si el valor siempre va a ser un numero, si puede ser null rompe el codigo)
  }
*/

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
