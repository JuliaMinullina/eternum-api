import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  UserID: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  Role: UserRole;

  @Column({ length: 100 })
  UserName: string;

  @Column({ length: 100 })
  UserSurname: string;

  @Column({ unique: true })
  Email: string;

  @Column({ select: false })
  password?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany('ViewHistory', 'user')
  viewHistory: any[];
}
