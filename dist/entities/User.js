var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Bill } from './Bill.js';
import { Document } from './Document.js';
import { Notification } from './Notification.js';
import { Reminder } from './Reminder.js';
let User = class User {
    id;
    name;
    email;
    passwordHash;
    createdAt;
    updatedAt;
    documents;
    bills;
    reminders;
    notifications;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({ type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column({ type: 'varchar', length: 320 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ name: 'password_hash', type: 'varchar', length: 255, select: false }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => Document, (document) => document.user),
    __metadata("design:type", Array)
], User.prototype, "documents", void 0);
__decorate([
    OneToMany(() => Bill, (bill) => bill.user),
    __metadata("design:type", Array)
], User.prototype, "bills", void 0);
__decorate([
    OneToMany(() => Reminder, (reminder) => reminder.user),
    __metadata("design:type", Array)
], User.prototype, "reminders", void 0);
__decorate([
    OneToMany(() => Notification, (notification) => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
User = __decorate([
    Entity({ name: 'users' }),
    Index('UQ_users_email', ['email'], { unique: true })
], User);
export { User };
