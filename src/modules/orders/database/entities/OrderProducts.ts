import { Product } from '@modules/products/database/entities/Product';
import { Order } from '@modules/orders/database/entities/Order';
import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity("orders_products")
export class OrderProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.orders_products)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column()
  order_id: string;

  @ManyToOne(() => Product, product => product.orders_products)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  product_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
