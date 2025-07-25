import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_tokens")
export default class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  token: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
