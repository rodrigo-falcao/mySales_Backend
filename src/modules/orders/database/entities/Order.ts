import { Customers } from "@modules/customers/database/entities/Customers";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderProducts } from "./OrderProducts";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customers)
  @JoinColumn({ name: "customer_id" })
  customer: Customers

  @OneToMany(() => OrderProducts, order_products => order_products.order, {
    cascade: true,
  })
  orders_products: OrderProducts[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
