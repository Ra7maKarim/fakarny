var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Notification } from './Notification.js';
import { Reminder } from './Reminder.js';
import { User } from './User.js';
export var BillPaymentStatus;
(function (BillPaymentStatus) {
    BillPaymentStatus["Unpaid"] = "unpaid";
    BillPaymentStatus["Paid"] = "paid";
})(BillPaymentStatus || (BillPaymentStatus = {}));
let Bill = class Bill {
    id;
    userId;
    user;
    title;
    provider;
    amount;
    dueDate;
    paymentStatus;
    storageKey;
    originalFileName;
    mimeType;
    fileSizeBytes;
    createdAt;
    updatedAt;
    reminders;
    notifications;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Bill.prototype, "id", void 0);
__decorate([
    Column({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Bill.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.bills, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User)
], Bill.prototype, "user", void 0);
__decorate([
    Column({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Bill.prototype, "title", void 0);
__decorate([
    Column({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", Object)
], Bill.prototype, "provider", void 0);
__decorate([
    Column({ type: 'numeric', precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Bill.prototype, "amount", void 0);
__decorate([
    Column({ name: 'due_date', type: 'date' }),
    __metadata("design:type", String)
], Bill.prototype, "dueDate", void 0);
__decorate([
    Column({ name: 'payment_status', type: 'enum', enum: BillPaymentStatus, enumName: 'bills_payment_status_enum', default: BillPaymentStatus.Unpaid }),
    __metadata("design:type", String)
], Bill.prototype, "paymentStatus", void 0);
__decorate([
    Column({ name: 'storage_key', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Bill.prototype, "storageKey", void 0);
__decorate([
    Column({ name: 'original_file_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Bill.prototype, "originalFileName", void 0);
__decorate([
    Column({ name: 'mime_type', type: 'varchar', length: 127, nullable: true }),
    __metadata("design:type", Object)
], Bill.prototype, "mimeType", void 0);
__decorate([
    Column({ name: 'file_size_bytes', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Bill.prototype, "fileSizeBytes", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Bill.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Bill.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => Reminder, (reminder) => reminder.bill),
    __metadata("design:type", Array)
], Bill.prototype, "reminders", void 0);
__decorate([
    OneToMany(() => Notification, (notification) => notification.bill),
    __metadata("design:type", Array)
], Bill.prototype, "notifications", void 0);
Bill = __decorate([
    Entity({ name: 'bills' }),
    Index('IDX_bills_user_due_date', ['userId', 'dueDate']),
    Unique('UQ_bills_user_id_id', ['userId', 'id'])
], Bill);
export { Bill };
