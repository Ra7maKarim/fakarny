var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Check, Column, CreateDateColumn, Entity, ForeignKey, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Bill } from './Bill.js';
import { Document } from './Document.js';
import { Reminder } from './Reminder.js';
import { User } from './User.js';
export var NotificationType;
(function (NotificationType) {
    NotificationType["DocumentExpiry"] = "document_expiry";
    NotificationType["BillDue"] = "bill_due";
})(NotificationType || (NotificationType = {}));
export var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["Pending"] = "pending";
    NotificationStatus["Sent"] = "sent";
    NotificationStatus["Failed"] = "failed";
})(NotificationStatus || (NotificationStatus = {}));
export var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["InApp"] = "in_app";
    NotificationChannel["Email"] = "email";
})(NotificationChannel || (NotificationChannel = {}));
let Notification = class Notification {
    id;
    userId;
    user;
    reminderId;
    reminder;
    documentId;
    document;
    billId;
    bill;
    type;
    scheduledAt;
    status;
    channel;
    sentAt;
    readAt;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Notification.prototype, "id", void 0);
__decorate([
    Column({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User)
], Notification.prototype, "user", void 0);
__decorate([
    Column({ name: 'reminder_id', type: 'uuid' }),
    __metadata("design:type", String)
], Notification.prototype, "reminderId", void 0);
__decorate([
    ManyToOne(() => Reminder, (reminder) => reminder.notifications, {
        onDelete: 'CASCADE',
        createForeignKeyConstraints: false,
    }),
    JoinColumn({ name: 'reminder_id' }),
    __metadata("design:type", Reminder)
], Notification.prototype, "reminder", void 0);
__decorate([
    Column({ name: 'document_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "documentId", void 0);
__decorate([
    ManyToOne(() => Document, (document) => document.notifications, {
        nullable: true,
        onDelete: 'CASCADE',
        createForeignKeyConstraints: false,
    }),
    JoinColumn({ name: 'document_id' }),
    __metadata("design:type", Object)
], Notification.prototype, "document", void 0);
__decorate([
    Column({ name: 'bill_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "billId", void 0);
__decorate([
    ManyToOne(() => Bill, (bill) => bill.notifications, {
        nullable: true,
        onDelete: 'CASCADE',
        createForeignKeyConstraints: false,
    }),
    JoinColumn({ name: 'bill_id' }),
    __metadata("design:type", Object)
], Notification.prototype, "bill", void 0);
__decorate([
    Column({ type: 'enum', enum: NotificationType, enumName: 'notifications_type_enum' }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    Column({ name: 'scheduled_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Notification.prototype, "scheduledAt", void 0);
__decorate([
    Column({ type: 'enum', enum: NotificationStatus, enumName: 'notifications_status_enum', default: NotificationStatus.Pending }),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
__decorate([
    Column({ type: 'enum', enum: NotificationChannel, enumName: 'notifications_channel_enum', default: NotificationChannel.InApp }),
    __metadata("design:type", String)
], Notification.prototype, "channel", void 0);
__decorate([
    Column({ name: 'sent_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "sentAt", void 0);
__decorate([
    Column({ name: 'read_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "readAt", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
Notification = __decorate([
    Entity({ name: 'notifications' }),
    Index('IDX_notifications_user_created_at', ['userId', 'createdAt']),
    Check('CHK_notifications_exactly_one_target', '(document_id IS NOT NULL AND bill_id IS NULL) OR (document_id IS NULL AND bill_id IS NOT NULL)'),
    Unique('UQ_notifications_reminder_scheduled_at', ['reminderId', 'scheduledAt']),
    ForeignKey(() => Reminder, ['userId', 'reminderId'], ['userId', 'id'], { name: 'FK_notifications_user_reminder', onDelete: 'CASCADE' }),
    ForeignKey(() => Document, ['userId', 'documentId'], ['userId', 'id'], { name: 'FK_notifications_user_document', onDelete: 'CASCADE' }),
    ForeignKey(() => Bill, ['userId', 'billId'], ['userId', 'id'], { name: 'FK_notifications_user_bill', onDelete: 'CASCADE' })
], Notification);
export { Notification };
