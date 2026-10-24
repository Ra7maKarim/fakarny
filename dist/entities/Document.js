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
export var DocumentCategory;
(function (DocumentCategory) {
    DocumentCategory["Warranty"] = "warranty";
    DocumentCategory["Personal"] = "personal";
    DocumentCategory["Travel"] = "travel";
})(DocumentCategory || (DocumentCategory = {}));
let Document = class Document {
    id;
    userId;
    user;
    title;
    category;
    description;
    issueDate;
    expiryDate;
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
], Document.prototype, "id", void 0);
__decorate([
    Column({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Document.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.documents, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", User)
], Document.prototype, "user", void 0);
__decorate([
    Column({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    Column({ type: 'enum', enum: DocumentCategory, enumName: 'documents_category_enum' }),
    __metadata("design:type", String)
], Document.prototype, "category", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "description", void 0);
__decorate([
    Column({ name: 'issue_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "issueDate", void 0);
__decorate([
    Column({ name: 'expiry_date', type: 'date', nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "expiryDate", void 0);
__decorate([
    Column({ name: 'storage_key', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "storageKey", void 0);
__decorate([
    Column({ name: 'original_file_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "originalFileName", void 0);
__decorate([
    Column({ name: 'mime_type', type: 'varchar', length: 127, nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "mimeType", void 0);
__decorate([
    Column({ name: 'file_size_bytes', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Document.prototype, "fileSizeBytes", void 0);
__decorate([
    CreateDateColumn({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Document.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], Document.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => Reminder, (reminder) => reminder.document),
    __metadata("design:type", Array)
], Document.prototype, "reminders", void 0);
__decorate([
    OneToMany(() => Notification, (notification) => notification.document),
    __metadata("design:type", Array)
], Document.prototype, "notifications", void 0);
Document = __decorate([
    Entity({ name: 'documents' }),
    Index('IDX_documents_user_expiry_date', ['userId', 'expiryDate']),
    Unique('UQ_documents_user_id_id', ['userId', 'id'])
], Document);
export { Document };
