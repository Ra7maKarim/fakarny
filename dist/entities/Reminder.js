var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Check, Column, CreateDateColumn, Entity, ForeignKey, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Bill } from './Bill.js';
import { Document } from './Document.js';
import { Notification } from './Notification.js';
import { User } from './User.js';
export var ReminderRepeatInterval;
(function (ReminderRepeatInterval) {
    ReminderRepeatInterval["None"] = "none";
    ReminderRepeatInterval["Daily"] = "daily";
    ReminderRepeatInterval["Weekly"] = "weekly";
    ReminderRepeatInterval["Monthly"] = "monthly";
})(ReminderRepeatInterval || (ReminderRepeatInterval = {}));
let Reminder = class Reminder {
    id;
    userId;
    user;
    documentId;
    document;
    billId;
    bill;
    daysBefore;
    enabled;
    repeatInterval;
    createdAt;
    updatedAt;
    notifications;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Reminder.prototype, "id", void 0);
__decorate([
    Column({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Reminder.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.reminders, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User)
], Reminder.prototype, "user", void 0);
__decorate([
    Column({ name: 'document_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Reminder.prototype, "documentId", void 0);
__decorate([
    ManyToOne(() => Document, (document) => document.reminders, {
        nullable: true,
        onDelete: 'CASCADE',
        createForeignKeyConstraints: false,
    }),
    JoinColumn({ name: 'document_id' }),
    __metadata("design:type", Object)
], Reminder.prototype, "document", void 0);
__decorate([
    Column({ name: 'bill_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Reminder.prototype, "billId", void 0);
__decorate([
    ManyToOne(() => Bill, (bill) => bill.reminders, {
        nullable: true,
        onDelete: 'CASCADE',
        createForeignKeyConstraints: false,
    }),
    JoinColumn({ name: 'bill_id' }),
    __metadata("design:type", Object)
], Reminder.prototype, "bill", void 0);
__decorate([
    Column({ name: 'days_before', type: 'integer' }),
    __metadata("design:type", Number)
], Reminder.prototype, "daysBefore", void 0);
__decorate([
    Column({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Reminder.prototype, "enabled", void 0);
__decorate([
    Column({ name: 'repeat_interval', type: 'enum', enum: ReminderRepeatInterval, enumName: 'reminders_repeat_interval_enum', default: ReminderRepeatInterval.None }),
    __metadata("design:type", String)
], Reminder.prototype, "repeatInterval", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Reminder.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Reminder.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => Notification, (notification) => notification.reminder),
    __metadata("design:type", Array)
], Reminder.prototype, "notifications", void 0);
Reminder = __decorate([
    Entity({ name: 'reminders' }),
    Check('CHK_reminders_exactly_one_target', '(document_id IS NOT NULL AND bill_id IS NULL) OR (document_id IS NULL AND bill_id IS NOT NULL)'),
    Check('CHK_reminders_days_before_nonnegative', 'days_before >= 0'),
    Unique('UQ_reminders_user_id_id', ['userId', 'id']),
    ForeignKey(() => Document, ['userId', 'documentId'], ['userId', 'id'], { name: 'FK_reminders_user_document', onDelete: 'CASCADE' }),
    ForeignKey(() => Bill, ['userId', 'billId'], ['userId', 'id'], { name: 'FK_reminders_user_bill', onDelete: 'CASCADE' })
], Reminder);
export { Reminder };
