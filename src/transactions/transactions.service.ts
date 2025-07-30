import { BadRequestException, Injectable } from '@nestjs/common';
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
  await this.productRepository.manager.transaction(async (transactionEntityManager) => {
    const transaction = new Transaction();
    transaction.total = createTransactionDto.total;

    await transactionEntityManager.save(transaction);

    for (const contents of createTransactionDto.contents) {
      const product = await transactionEntityManager.findOneBy(Product, { id: contents.productId });
      if (!product) {
        throw new Error(`Producto con ID ${contents.productId} no encontrado`);
      }
      if (contents.quantity > product.inventory) {
        throw new BadRequestException(`El artículo ${product.name} excede la cantidad disponible`);
      }

      product.inventory -= contents.quantity;
      await transactionEntityManager.save(product);

      const transactionContent = new TransactionContents();
      transactionContent.price = contents.price;
      transactionContent.quantity = contents.quantity;
      transactionContent.transaction = transaction;
      transactionContent.product = product;

      await transactionEntityManager.save(transactionContent);
    }
  });

  return "Venta almacenada correctamente";
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
