import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Notification } from './Notification.js';
import { Reminder } from './Reminder.js';
import { User } from './User.js';

export enum DocumentCategory {
  Warranty = 'warranty',
  Personal = 'personal',
  Travel = 'travel',
}

@Entity({ name: 'documents' })
@Index('IDX_documents_user_expiry_date', ['userId', 'expiryDate'])
@Unique('UQ_documents_user_id_id', ['userId', 'id'])
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @Column({ type: 'enum', enum: DocumentCategory, enumName: 'documents_category_enum' })
  category!: DocumentCategory;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ name: 'issue_date', type: 'date', nullable: true })
  issueDate!: string | null;

  @Column({ name: 'expiry_date', type: 'date', nullable: true })
  expiryDate!: string | null;

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

  @OneToMany(() => Reminder, (reminder) => reminder.document)
  reminders!: Reminder[];

  @OneToMany(() => Notification, (notification) => notification.document)
  notifications!: Notification[];
}
