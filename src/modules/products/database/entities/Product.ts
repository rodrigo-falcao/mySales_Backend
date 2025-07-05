import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({
  type: 'decimal',
  transformer: {
    to: (value: number) => value,
    from: (value: string) => Number(value),
    },
  })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
