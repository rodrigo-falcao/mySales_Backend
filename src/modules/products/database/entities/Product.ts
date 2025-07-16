import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProducts } from "@modules/orders/database/entities/OrderProducts";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => OrderProducts, order_products => order_products.product )
  orders_products: OrderProducts[];

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'decimal'})
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
