import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Notification } from './Notification.js';
import { Reminder } from './Reminder.js';
import { User } from './User.js';

export enum BillPaymentStatus {
  Unpaid = 'unpaid',
  Paid = 'paid',
}

@Entity({ name: 'bills' })
@Index('IDX_bills_user_due_date', ['userId', 'dueDate'])
@Unique('UQ_bills_user_id_id', ['userId', 'id'])
export class Bill {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.bills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  provider!: string | null;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  amount!: string | null;

  @Column({ name: 'due_date', type: 'date' })
  dueDate!: string;

  @Column({ name: 'payment_status', type: 'enum', enum: BillPaymentStatus, enumName: 'bills_payment_status_enum', default: BillPaymentStatus.Unpaid })
  paymentStatus!: BillPaymentStatus;

  @Column({ name: 'storage_key', type: 'varchar', length: 500, nullable: true })
  storageKey!: string | null;

  @Column({ name: 'original_file_name', type: 'varchar', length: 255, nullable: true })
  originalFileName!: string | null;

  @Column({ name: 'mime_type', type: 'varchar', length: 127, nullable: true })
  mimeType!: string | null;

  @Column({ name: 'file_size_bytes', type: 'bigint', nullable: true })
  fileSizeBytes!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => Reminder, (reminder) => reminder.bill)
  reminders!: Reminder[];

  @OneToMany(() => Notification, (notification) => notification.bill)
  notifications!: Notification[];
}
