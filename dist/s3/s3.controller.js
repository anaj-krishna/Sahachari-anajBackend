"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Controller = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("./s3.service");
let S3Controller = class S3Controller {
    s3Service;
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async getPresignedUrl(fileName, fileType, folder) {
        return this.s3Service.getPresignedUrl(fileName, fileType, folder);
    }
};
exports.S3Controller = S3Controller;
__decorate([
    (0, common_1.Post)('presigned-url'),
    __param(0, (0, common_1.Body)('fileName')),
    __param(1, (0, common_1.Body)('fileType')),
    __param(2, (0, common_1.Body)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], S3Controller.prototype, "getPresignedUrl", null);
exports.S3Controller = S3Controller = __decorate([
    (0, common_1.Controller)('s3'),
    __metadata("design:paramtypes", [s3_service_1.S3Service])
], S3Controller);
//# sourceMappingURL=s3.controller.js.map