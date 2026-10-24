import { Check, Column, CreateDateColumn, Entity, ForeignKey, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Bill } from './Bill.js';
import { Document } from './Document.js';
import { Reminder } from './Reminder.js';
import { User } from './User.js';

export enum NotificationType {
  DocumentExpiry = 'document_expiry',
  BillDue = 'bill_due',
}

export enum NotificationStatus {
  Pending = 'pending',
  Sent = 'sent',
  Failed = 'failed',
}

export enum NotificationChannel {
  InApp = 'in_app',
  Email = 'email',
}

@Entity({ name: 'notifications' })
@Index('IDX_notifications_user_created_at', ['userId', 'createdAt'])
@Check('CHK_notifications_exactly_one_target', '(document_id IS NOT NULL AND bill_id IS NULL) OR (document_id IS NULL AND bill_id IS NOT NULL)')
@Unique('UQ_notifications_reminder_scheduled_at', ['reminderId', 'scheduledAt'])
@ForeignKey(
  () => Reminder,
  ['userId', 'reminderId'] as const,
  ['userId', 'id'] as const,
  { name: 'FK_notifications_user_reminder', onDelete: 'CASCADE' },
)
@ForeignKey(
  () => Document,
  ['userId', 'documentId'] as const,
  ['userId', 'id'] as const,
  { name: 'FK_notifications_user_document', onDelete: 'CASCADE' },
)
@ForeignKey(
  () => Bill,
  ['userId', 'billId'] as const,
  ['userId', 'id'] as const,
  { name: 'FK_notifications_user_bill', onDelete: 'CASCADE' },
)
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'reminder_id', type: 'uuid' })
  reminderId!: string;

  @ManyToOne(() => Reminder, (reminder) => reminder.notifications, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'reminder_id' })
  reminder!: Reminder;

  @Column({ name: 'document_id', type: 'uuid', nullable: true })
  documentId!: string | null;

  @ManyToOne(() => Document, (document) => document.notifications, {
    nullable: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'document_id' })
  document!: Document | null;

  @Column({ name: 'bill_id', type: 'uuid', nullable: true })
  billId!: string | null;

  @ManyToOne(() => Bill, (bill) => bill.notifications, {
    nullable: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'bill_id' })
  bill!: Bill | null;

  @Column({ type: 'enum', enum: NotificationType, enumName: 'notifications_type_enum' })
  type!: NotificationType;

  @Column({ name: 'scheduled_at', type: 'timestamptz' })
  scheduledAt!: Date;

  @Column({ type: 'enum', enum: NotificationStatus, enumName: 'notifications_status_enum', default: NotificationStatus.Pending })
  status!: NotificationStatus;

  @Column({ type: 'enum', enum: NotificationChannel, enumName: 'notifications_channel_enum', default: NotificationChannel.InApp })
  channel!: NotificationChannel;

  @Column({ name: 'sent_at', type: 'timestamptz', nullable: true })
  sentAt!: Date | null;

  @Column({ name: 'read_at', type: 'timestamptz', nullable: true })
  readAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
