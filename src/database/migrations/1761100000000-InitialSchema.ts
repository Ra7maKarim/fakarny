import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1761100000000 implements MigrationInterface {
  name = 'InitialSchema1761100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
    await queryRunner.query("CREATE TYPE documents_category_enum AS ENUM ('warranty', 'personal', 'travel')");
    await queryRunner.query("CREATE TYPE bills_payment_status_enum AS ENUM ('unpaid', 'paid')");
    await queryRunner.query("CREATE TYPE reminders_repeat_interval_enum AS ENUM ('none', 'daily', 'weekly', 'monthly')");
    await queryRunner.query("CREATE TYPE notifications_type_enum AS ENUM ('document_expiry', 'bill_due')");
    await queryRunner.query("CREATE TYPE notifications_status_enum AS ENUM ('pending', 'sent', 'failed')");
    await queryRunner.query("CREATE TYPE notifications_channel_enum AS ENUM ('in_app', 'email')");

    await queryRunner.query(`CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name varchar(120) NOT NULL,
      email varchar(320) NOT NULL,
      password_hash varchar(255) NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT UQ_users_email UNIQUE (email)
    )`);

    await queryRunner.query(`CREATE TABLE documents (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title varchar(200) NOT NULL,
      category documents_category_enum NOT NULL,
      description text NULL,
      issue_date date NULL,
      expiry_date date NULL,
      storage_key varchar(500) NULL,
      original_file_name varchar(255) NULL,
      mime_type varchar(127) NULL,
      file_size_bytes bigint NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`);
    await queryRunner.query('CREATE INDEX IDX_documents_user_expiry_date ON documents(user_id, expiry_date)');
    await queryRunner.query('ALTER TABLE documents ADD CONSTRAINT UQ_documents_user_id_id UNIQUE (user_id, id)');

    await queryRunner.query(`CREATE TABLE bills (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title varchar(200) NOT NULL,
      provider varchar(200) NULL,
      amount numeric(12, 2) NULL,
      due_date date NOT NULL,
      payment_status bills_payment_status_enum NOT NULL DEFAULT 'unpaid',
      storage_key varchar(500) NULL,
      original_file_name varchar(255) NULL,
      mime_type varchar(127) NULL,
      file_size_bytes bigint NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT CHK_bills_amount_nonnegative CHECK (amount IS NULL OR amount >= 0)
    )`);
    await queryRunner.query('CREATE INDEX IDX_bills_user_due_date ON bills(user_id, due_date)');
    await queryRunner.query('ALTER TABLE bills ADD CONSTRAINT UQ_bills_user_id_id UNIQUE (user_id, id)');

    await queryRunner.query(`CREATE TABLE reminders (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      document_id uuid NULL,
      bill_id uuid NULL,
      days_before integer NOT NULL,
      enabled boolean NOT NULL DEFAULT true,
      repeat_interval reminders_repeat_interval_enum NOT NULL DEFAULT 'none',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT CHK_reminders_exactly_one_target CHECK ((document_id IS NOT NULL AND bill_id IS NULL) OR (document_id IS NULL AND bill_id IS NOT NULL)),
      CONSTRAINT CHK_reminders_days_before_nonnegative CHECK (days_before >= 0),
      CONSTRAINT UQ_reminders_user_id_id UNIQUE (user_id, id),
      CONSTRAINT FK_reminders_user_document FOREIGN KEY (user_id, document_id) REFERENCES documents(user_id, id) ON DELETE CASCADE,
      CONSTRAINT FK_reminders_user_bill FOREIGN KEY (user_id, bill_id) REFERENCES bills(user_id, id) ON DELETE CASCADE
    )`);

    await queryRunner.query(`CREATE TABLE notifications (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      reminder_id uuid NOT NULL,
      document_id uuid NULL,
      bill_id uuid NULL,
      type notifications_type_enum NOT NULL,
      scheduled_at timestamptz NOT NULL,
      status notifications_status_enum NOT NULL DEFAULT 'pending',
      channel notifications_channel_enum NOT NULL DEFAULT 'in_app',
      sent_at timestamptz NULL,
      read_at timestamptz NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      CONSTRAINT CHK_notifications_exactly_one_target CHECK ((document_id IS NOT NULL AND bill_id IS NULL) OR (document_id IS NULL AND bill_id IS NOT NULL)),
      CONSTRAINT UQ_notifications_reminder_scheduled_at UNIQUE (reminder_id, scheduled_at),
      CONSTRAINT FK_notifications_user_reminder FOREIGN KEY (user_id, reminder_id) REFERENCES reminders(user_id, id) ON DELETE CASCADE,
      CONSTRAINT FK_notifications_user_document FOREIGN KEY (user_id, document_id) REFERENCES documents(user_id, id) ON DELETE CASCADE,
      CONSTRAINT FK_notifications_user_bill FOREIGN KEY (user_id, bill_id) REFERENCES bills(user_id, id) ON DELETE CASCADE
    )`);
    await queryRunner.query('CREATE INDEX IDX_notifications_user_created_at ON notifications(user_id, created_at)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE notifications');
    await queryRunner.query('DROP TABLE reminders');
    await queryRunner.query('DROP TABLE bills');
    await queryRunner.query('DROP TABLE documents');
    await queryRunner.query('DROP TABLE users');
    await queryRunner.query('DROP TYPE notifications_channel_enum');
    await queryRunner.query('DROP TYPE notifications_status_enum');
    await queryRunner.query('DROP TYPE notifications_type_enum');
    await queryRunner.query('DROP TYPE reminders_repeat_interval_enum');
    await queryRunner.query('DROP TYPE bills_payment_status_enum');
    await queryRunner.query('DROP TYPE documents_category_enum');
  }
}
