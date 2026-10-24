import { Check, Column, CreateDateColumn, Entity, ForeignKey, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Bill } from './Bill.js';
import { Document } from './Document.js';
import { Notification } from './Notification.js';
import { User } from './User.js';

export enum ReminderRepeatInterval {
  None = 'none',
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
}

@Entity({ name: 'reminders' })
@Check('CHK_reminders_exactly_one_target', '(document_id IS NOT NULL AND bill_id IS NULL) OR (document_id IS NULL AND bill_id IS NOT NULL)')
@Check('CHK_reminders_days_before_nonnegative', 'days_before >= 0')
@Unique('UQ_reminders_user_id_id', ['userId', 'id'])
@ForeignKey(
  () => Document,
  ['userId', 'documentId'] as const,
  ['userId', 'id'] as const,
  { name: 'FK_reminders_user_document', onDelete: 'CASCADE' },
)
@ForeignKey(
  () => Bill,
  ['userId', 'billId'] as const,
  ['userId', 'id'] as const,
  { name: 'FK_reminders_user_bill', onDelete: 'CASCADE' },
)
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.reminders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'document_id', type: 'uuid', nullable: true })
  documentId!: string | null;

  @ManyToOne(() => Document, (document) => document.reminders, {
    nullable: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'document_id' })
  document!: Document | null;

  @Column({ name: 'bill_id', type: 'uuid', nullable: true })
  billId!: string | null;

  @ManyToOne(() => Bill, (bill) => bill.reminders, {
    nullable: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'bill_id' })
  bill!: Bill | null;

  @Column({ name: 'days_before', type: 'integer' })
  daysBefore!: number;

  @Column({ type: 'boolean', default: true })
  enabled!: boolean;

  @Column({ name: 'repeat_interval', type: 'enum', enum: ReminderRepeatInterval, enumName: 'reminders_repeat_interval_enum', default: ReminderRepeatInterval.None })
  repeatInterval!: ReminderRepeatInterval;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @OneToMany(() => Notification, (notification) => notification.reminder)
  notifications!: Notification[];
}
