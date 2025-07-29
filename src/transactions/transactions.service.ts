import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ){}


  async create(createTransactionDto: CreateTransactionDto) {

    const transaction = new Transaction()
    transaction.total = createTransactionDto.total
    await this.transactionRepository.save(transaction)

//INICIO CORRECCION CODIGO PARA RESTAR PRODUCTOS

    for (const contents of createTransactionDto.contents) {
      const product = await this.productRepository.findOneBy({ id: contents.productId });
      console.log(product)
        if (!product) {
        throw new Error(`Producto con ID ${contents.productId} no encontrado`);
        }
      product.inventory -= contents.quantity;
      // Guardar cambios de inventario
      await this.productRepository.save(product);
      // Guardar relación con solo el id del producto
      await this.transactionContentsRepository.save({...contents, transaction, product: { id: contents.productId },
      });
    }

//FIN CORRECCION CODIGO PARA RESTAR PRODUCTOS

/* //465 INICIO CODIGO ORIGINAL PARA RESTAR PRODUCTOS EN LA BASE DE DATOS
    for(const contents of createTransactionDto.contents) {
      const product = await this.productRepository.findOneBy({id: contents.productId})
      product.inventory -= contents.quantity
      console.log(product)
//465 INICIO DE CORRECCION PRODUCTID NULL
      await this.transactionContentsRepository.save({...contents, transaction, product: { id: contents.productId } // ← solo pasa el id
});
//465 FIN DE CORRECCION PRODUCTID NULL
//      await this.transactionContentsRepository.save({...contents, transaction, product}) //CODIGO ORIGINAL PRESENTA FALLO EN BASE DE DATOS REGISTRA NULL
    }
*/ //465 FIN CODIGO ORIGINAL PARA RESTAR PRODUCTOS EN LA BASE DE DATOS

    return "Venta almacenada correctamente"
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
