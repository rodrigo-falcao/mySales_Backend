import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'decimal' })
  price!: number;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'timestamp' })
  createdAt!: Date;

  @Column({ type: 'timestamp' })
  updatedAt!: Date;
}
